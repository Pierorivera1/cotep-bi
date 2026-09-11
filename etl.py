import pandas as pd
import numpy as np
import os
import sqlite3
from datetime import datetime

# ============================================================
# CONFIGURACIÓN DE RUTAS
# ============================================================
CARPETA_FUENTES = "fuentes"
CARPETA_SALIDA = "salida"
os.makedirs(CARPETA_SALIDA, exist_ok=True)

log_auditoria = []  # aquí guardamos cada decisión tomada, para copiar al documento

def log(mensaje):
    print(mensaje)
    log_auditoria.append(mensaje)

# ============================================================
# PASO 1: EXTRACCIÓN — leer las 6 fuentes
# ============================================================
log("=== PASO 1: EXTRACCIÓN ===")

def leer_excel(ruta, sheet_nombre=None):
    xl = pd.ExcelFile(ruta)
    if sheet_nombre and sheet_nombre in xl.sheet_names:
        return xl.parse(sheet_nombre)
    return xl.parse(0)

productos = leer_excel(f"{CARPETA_FUENTES}/sistema_ventas_productos.xlsx", "MAESTRO_PRODUCTOS")
clientes = leer_excel(f"{CARPETA_FUENTES}/crm_clientes.xlsx", "MAESTRO_CLIENTES")
tiendas = leer_excel(f"{CARPETA_FUENTES}/admin_tiendas_canales.xlsx", "MAESTRO_TIENDAS")
canales = leer_excel(f"{CARPETA_FUENTES}/admin_tiendas_canales.xlsx", "CANAL_VENTA")
ventas_origen = leer_excel(f"{CARPETA_FUENTES}/sistema_comercial_ventas.xlsx", "VENTAS_ORIGEN")
ventas_problemas = leer_excel(f"{CARPETA_FUENTES}/sistema_comercial_ventas_calidad.xlsx", "VENTAS_CON_PROBLEMAS")
metas = leer_excel(f"{CARPETA_FUENTES}/metas_comerciales.xlsx", "METAS_MENSUALES")

log(f"Productos: {len(productos)} filas | Clientes: {len(clientes)} filas")
log(f"Tiendas: {len(tiendas)} filas | Canales: {len(canales)} filas")
log(f"Ventas origen (limpias): {len(ventas_origen)} filas")
log(f"Ventas con problemas (a corregir): {len(ventas_problemas)} filas")
log(f"Metas mensuales: {len(metas)} filas")

# ============================================================
# PASO 2: LIMPIEZA DE VENTAS_ORIGEN (normalizar fecha y tipos)
# ============================================================
log("\n=== PASO 2: LIMPIEZA DE VENTAS_ORIGEN ===")

ventas_origen["Fecha"] = pd.to_datetime(ventas_origen["Fecha"], dayfirst=True)
ventas_origen["Cod_Canal"] = ventas_origen["Cod_Canal"].astype(int)
ventas_origen["Cantidad"] = ventas_origen["Cantidad"].astype(int)
ventas_origen["Importe"] = ventas_origen["Importe"].astype(float)

log(f"Fechas normalizadas a formato datetime. Total filas: {len(ventas_origen)}")

# ============================================================
# PASO 3: LIMPIEZA DE VENTAS_CON_PROBLEMAS (el corazón del ETL)
# ============================================================
log("\n=== PASO 3: LIMPIEZA DE VENTAS_CON_PROBLEMAS ===")

vp = ventas_problemas.copy()

# --- 3.1 Estandarizar nombre de producto no estandarizado (registro 2001) ---
# Creamos un diccionario nombre_normalizado -> Cod_Producto para hacer el match
productos["nombre_normalizado"] = productos["Producto"].str.lower().str.strip()

def resolver_producto(valor):
    """Si 'valor' ya es un código válido (empieza con P), lo deja igual.
    Si es un nombre de texto, busca el código correspondiente."""
    valor_str = str(valor).strip()
    if valor_str.upper().startswith("P") and valor_str[1:].isdigit():
        return valor_str.upper()
    # Es un nombre en texto libre -> buscar coincidencia
    match = productos[productos["nombre_normalizado"] == valor_str.lower().strip()]
    if not match.empty:
        codigo = match.iloc[0]["Cod_Producto"]
        log(f"  Registro con producto '{valor_str}' -> resuelto a código {codigo}")
        return codigo
    log(f"  ADVERTENCIA: no se pudo resolver el producto '{valor_str}'")
    return None

vp["Cod_Producto"] = vp["Producto"].apply(resolver_producto)

# --- 3.2 Normalizar formato de fecha (registro 2002 y todos los demás) ---
vp["Fecha"] = pd.to_datetime(vp["Fecha"], dayfirst=True, errors="coerce")
log(f"  Fechas normalizadas en ventas con problemas.")

# --- 3.3 Cantidad e importe negativos (registro 2003) ---
# DECISIÓN DE NEGOCIO: se asume error de signo por captura manual, no devolución,
# dado que no existe tabla de tipo de movimiento en el dataset.
neg_mask = (vp["Cantidad"] < 0) | (vp["Importe"] < 0)
n_negativos = neg_mask.sum()
vp.loc[neg_mask, "Cantidad"] = vp.loc[neg_mask, "Cantidad"].abs()
vp.loc[neg_mask, "Importe"] = vp.loc[neg_mask, "Importe"].abs()
log(f"  {n_negativos} registro(s) con signo negativo corregidos a valor absoluto "
    f"(asunción: error de captura, no devolución).")

# --- 3.4 Importe nulo (registro 2004) ---
# Se recalcula Importe = Cantidad x Precio_Lista usando el maestro de productos
precio_map = productos.set_index("Cod_Producto")["Precio_Lista"].to_dict()
nulos_mask = vp["Importe"].isna()
n_nulos = nulos_mask.sum()

for idx in vp[nulos_mask].index:
    cod = vp.loc[idx, "Cod_Producto"]
    cant = vp.loc[idx, "Cantidad"]
    precio = precio_map.get(cod)
    if precio is not None:
        importe_calculado = cant * precio
        vp.loc[idx, "Importe"] = importe_calculado
        log(f"  Registro {vp.loc[idx, 'Id_Venta']}: Importe nulo -> recalculado como "
            f"{cant} x {precio} = {importe_calculado}")

log(f"  {n_nulos} registro(s) con importe nulo recalculados desde precio de lista.")

# --- 3.5 Duplicados (registro 2005 vs 2006) ---
# Duplicado = mismo cliente, producto, fecha, cantidad e importe
antes = len(vp)
vp = vp.drop_duplicates(subset=["Fecha", "Cod_Producto", "Cliente", "Cantidad", "Importe"], keep="first")
despues = len(vp)
log(f"  Duplicados eliminados: {antes - despues} registro(s) (se conservó la primera ocurrencia).")

# --- 3.6 Completar columnas faltantes para integrar con ventas_origen ---
# vp no tiene Cod_Tienda ni Cod_Canal -> para este ejercicio académico,
# se asignan valores por defecto documentados explícitamente
vp = vp.rename(columns={"Cliente": "Cod_Cliente"})
vp["Cod_Tienda"] = "T01"   # supuesto: registros de marzo cargados desde tienda principal
vp["Cod_Canal"] = 1        # supuesto: canal tienda física por defecto
log("  NOTA: los registros de marzo no traían Cod_Tienda/Cod_Canal en la fuente. "
    "Se asignó T01 y Canal 1 como supuesto documentado para fines del ejercicio.")

vp_final = vp[["Id_Venta", "Fecha", "Cod_Producto", "Cod_Cliente", "Cod_Tienda", "Cod_Canal", "Cantidad", "Importe"]]

# ============================================================
# PASO 4: INTEGRACIÓN — unir ambas fuentes de ventas
# ============================================================
log("\n=== PASO 4: INTEGRACIÓN ===")

fact_ventas = pd.concat([ventas_origen, vp_final], ignore_index=True)
fact_ventas = fact_ventas.sort_values("Fecha").reset_index(drop=True)
log(f"Tabla de hechos consolidada: {len(fact_ventas)} filas totales "
    f"({len(ventas_origen)} de origen + {len(vp_final)} corregidas de calidad).")

# ============================================================
# PASO 5: TABLA CALENDARIO (Actividad 5)
# ============================================================
log("\n=== PASO 5: TABLA CALENDARIO ===")

fecha_min = fact_ventas["Fecha"].min()
fecha_max = fact_ventas["Fecha"].max()
rango_fechas = pd.date_range(fecha_min, fecha_max, freq="D")

dim_calendario = pd.DataFrame({"Fecha": rango_fechas})
dim_calendario["Año"] = dim_calendario["Fecha"].dt.year
dim_calendario["Mes_Num"] = dim_calendario["Fecha"].dt.month
dim_calendario["Mes_Nombre"] = dim_calendario["Fecha"].dt.strftime("%B")
dim_calendario["Dia"] = dim_calendario["Fecha"].dt.day
dim_calendario["Dia_Semana"] = dim_calendario["Fecha"].dt.day_name()
dim_calendario["Trimestre"] = dim_calendario["Fecha"].dt.quarter

log(f"Tabla calendario generada: {len(dim_calendario)} días, "
    f"desde {fecha_min.date()} hasta {fecha_max.date()}.")

# ============================================================
# PASO 6: CARGA — exportar a CSV y a SQLite
# ============================================================
log("\n=== PASO 6: CARGA ===")

# CSVs (para el dashboard web)
fact_ventas.to_csv(f"{CARPETA_SALIDA}/fact_ventas.csv", index=False)
productos.drop(columns=["nombre_normalizado"]).to_csv(f"{CARPETA_SALIDA}/dim_producto.csv", index=False)
clientes.to_csv(f"{CARPETA_SALIDA}/dim_cliente.csv", index=False)
tiendas.to_csv(f"{CARPETA_SALIDA}/dim_tienda.csv", index=False)
canales.to_csv(f"{CARPETA_SALIDA}/dim_canal.csv", index=False)
dim_calendario.to_csv(f"{CARPETA_SALIDA}/dim_calendario.csv", index=False)
metas.to_csv(f"{CARPETA_SALIDA}/metas.csv", index=False)

# SQLite (para tus consultas SQL)
conn = sqlite3.connect(f"{CARPETA_SALIDA}/cotep_dw.db")
fact_ventas.to_sql("FACT_VENTAS", conn, if_exists="replace", index=False)
productos.drop(columns=["nombre_normalizado"]).to_sql("DIM_PRODUCTO", conn, if_exists="replace", index=False)
clientes.to_sql("DIM_CLIENTE", conn, if_exists="replace", index=False)
tiendas.to_sql("DIM_TIENDA", conn, if_exists="replace", index=False)
canales.to_sql("DIM_CANAL", conn, if_exists="replace", index=False)
dim_calendario.to_sql("DIM_CALENDARIO", conn, if_exists="replace", index=False)
metas.to_sql("METAS", conn, if_exists="replace", index=False)
conn.close()

log(f"Archivos CSV exportados a '{CARPETA_SALIDA}/'.")
log(f"Base de datos SQLite creada en '{CARPETA_SALIDA}/cotep_dw.db'.")

# Guardar el log de auditoría en un archivo de texto (para copiar al documento .docx)
with open(f"{CARPETA_SALIDA}/log_auditoria_etl.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(log_auditoria))

log("\n=== ETL FINALIZADO CORRECTAMENTE ===")