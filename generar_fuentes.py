import pandas as pd
import os

CARPETA_FUENTES = "fuentes"
os.makedirs(CARPETA_FUENTES, exist_ok=True)

# ============================================================
# 1. MAESTRO_PRODUCTOS
# ============================================================
productos = pd.DataFrame({
    "Cod_Producto": ["P001","P002","P003","P004","P005","P006","P007","P008","P009","P010"],
    "Producto": ["Laptop Lenovo IdeaPad","Laptop HP 14","Monitor Samsung 24","Monitor LG 27",
                 "Mouse Logitech M185","Teclado Logitech K120","Impresora Epson L3250",
                 "Disco SSD Kingston 1TB","Memoria RAM 16GB","Webcam Logitech C920"],
    "Categoría": ["LAPTOPS","LAPTOPS","MONITORES","MONITORES","ACCESORIOS","ACCESORIOS",
                  "IMPRESORAS","COMPONENTES","COMPONENTES","ACCESORIOS"],
    "Marca": ["Lenovo","HP","Samsung","LG","Logitech","Logitech","Epson","Kingston","Kingston","Logitech"],
    "Precio_Lista": [3200,2900,850,1150,65,75,780,320,280,350]
})
with pd.ExcelWriter(f"{CARPETA_FUENTES}/sistema_ventas_productos.xlsx", engine="openpyxl") as writer:
    productos.to_excel(writer, sheet_name="MAESTRO_PRODUCTOS", index=False)

# ============================================================
# 2. MAESTRO_CLIENTES
# ============================================================
clientes = pd.DataFrame({
    "Cod_Cliente": ["C001","C002","C003","C004","C005","C006","C007","C008"],
    "Cliente": ["Grupo Alpha SAC","Soluciones Digitales SAC","Juan Pérez García","María López Torres",
                "Tecnología Global SAC","Carlos Ramírez Soto","Servicios Integrales SAC","Ana Rodríguez Díaz"],
    "Segmento": ["CORPORATIVO","CORPORATIVO","PERSONA","PERSONA","CORPORATIVO","PERSONA","CORPORATIVO","PERSONA"],
    "Ciudad": ["Lima","Lima","Lima","Lima","Lima","Callao","Lima","Lima"]
})
with pd.ExcelWriter(f"{CARPETA_FUENTES}/crm_clientes.xlsx", engine="openpyxl") as writer:
    clientes.to_excel(writer, sheet_name="MAESTRO_CLIENTES", index=False)

# ============================================================
# 3. MAESTRO_TIENDAS + CANAL_VENTA (mismo archivo, 2 hojas)
# ============================================================
tiendas = pd.DataFrame({
    "Cod_Tienda": ["T01","T02","T03","T04","T05","T06"],
    "Tienda": ["COTEP Centro","COTEP San Isidro","COTEP Miraflores","COTEP San Miguel","COTEP Los Olivos","COTEP Surco"],
    "Distrito": ["Cercado de Lima","San Isidro","Miraflores","San Miguel","Los Olivos","Santiago de Surco"],
    "Zona": ["Centro","Centro","Sur","Oeste","Norte","Sur"]
})
canales = pd.DataFrame({
    "Cod_Canal": [1,2,3],
    "Canal": ["TIENDA FÍSICA","E-COMMERCE","VENTA CORPORATIVA"]
})
with pd.ExcelWriter(f"{CARPETA_FUENTES}/admin_tiendas_canales.xlsx", engine="openpyxl") as writer:
    tiendas.to_excel(writer, sheet_name="MAESTRO_TIENDAS", index=False)
    canales.to_excel(writer, sheet_name="CANAL_VENTA", index=False)

# ============================================================
# 4. VENTAS_ORIGEN — Fecha como TEXTO explícito
# ============================================================
ventas_origen = pd.DataFrame({
    "Id_Venta": [1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,
                 1011,1012,1013,1014,1015,1016,1017,1018],
    "Fecha": ["2/01/2026","3/01/2026","5/01/2026","7/01/2026","10/01/2026","12/01/2026",
              "15/01/2026","18/01/2026","21/01/2026","25/01/2026","2/02/2026","5/02/2026",
              "9/02/2026","12/02/2026","16/02/2026","20/02/2026","24/02/2026","28/02/2026"],
    "Cod_Producto": ["P001","P005","P003","P007","P004","P002","P008","P006","P001","P003",
                      "P001","P005","P004","P007","P002","P008","P003","P009"],
    "Cod_Cliente": ["C001","C003","C004","C002","C005","C006","C007","C008","C005","C003",
                     "C001","C004","C002","C006","C007","C003","C005","C008"],
    "Cod_Tienda": ["T01","T03","T04","T02","T02","T05","T01","T03","T02","T04",
                    "T01","T03","T02","T05","T01","T04","T02","T03"],
    "Cod_Canal": [3,1,1,3,3,1,3,1,3,1,3,1,3,1,3,1,3,1],
    "Cantidad": [5,2,1,3,2,1,4,3,2,2,3,5,2,1,4,3,5,2],
    "Importe": [15500,130,850,2340,2300,2900,1280,225,6200,1700,
                9300,325,2300,780,11600,960,4250,560]
})
# Forzamos Fecha como texto (dtype string explícito)
ventas_origen["Fecha"] = ventas_origen["Fecha"].astype(str)

with pd.ExcelWriter(f"{CARPETA_FUENTES}/sistema_comercial_ventas.xlsx", engine="openpyxl") as writer:
    ventas_origen.to_excel(writer, sheet_name="VENTAS_ORIGEN", index=False)
    # Forzar formato de celda como texto para que Excel/Calc no la reinterprete al abrir
    ws = writer.sheets["VENTAS_ORIGEN"]
    col_fecha = ventas_origen.columns.get_loc("Fecha") + 1  # openpyxl es 1-indexed
    for row in range(2, len(ventas_origen) + 2):
        ws.cell(row=row, column=col_fecha).number_format = "@"

# ============================================================
# 5. VENTAS_CON_PROBLEMAS — igual, Fecha como texto
# ============================================================
ventas_problemas = pd.DataFrame({
    "Id_Venta": [2001,2002,2003,2004,2005,2006],
    "Fecha": ["1/03/2026","2/03/2026","3/03/2026","4/03/2026","5/03/2026","5/03/2026"],
    "Producto": ["laptop hp 14","P005","P004","P007","P001","P001"],
    "Cliente": ["C004","C003","C006","C002","C005","C005"],
    "Cantidad": [1,2,-1,1,2,2],
    "Importe": [2900,130,-1150,None,6400,6400],
    "Problema_identificado": ["Nombre no estandarizado","Formato de fecha","Cantidad negativa",
                                "Importe nulo","Registro válido","Posible duplicado"]
})
ventas_problemas["Fecha"] = ventas_problemas["Fecha"].astype(str)

with pd.ExcelWriter(f"{CARPETA_FUENTES}/sistema_comercial_ventas_calidad.xlsx", engine="openpyxl") as writer:
    ventas_problemas.to_excel(writer, sheet_name="VENTAS_CON_PROBLEMAS", index=False)
    ws = writer.sheets["VENTAS_CON_PROBLEMAS"]
    col_fecha = ventas_problemas.columns.get_loc("Fecha") + 1
    for row in range(2, len(ventas_problemas) + 2):
        ws.cell(row=row, column=col_fecha).number_format = "@"

# ============================================================
# 6. METAS_MENSUALES
# ============================================================
metas = pd.DataFrame({
    "Mes": ["Enero"]*6 + ["Febrero"]*6,
    "Cod_Tienda": ["T01","T02","T03","T04","T05","T06"]*2,
    "Meta_Ventas": [35000,32000,28000,30000,25000,27000,
                     34000,35000,29000,31000,28000,30000]
})
with pd.ExcelWriter(f"{CARPETA_FUENTES}/metas_comerciales.xlsx", engine="openpyxl") as writer:
    metas.to_excel(writer, sheet_name="METAS_MENSUALES", index=False)

print("Los 6 archivos fuente se generaron correctamente en la carpeta 'fuentes/'.")
print("La columna Fecha quedó forzada como texto para evitar reinterpretación de Excel/Calc.")