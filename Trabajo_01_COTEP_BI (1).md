# Trabajo N° 01 — Implementación de una Solución de Business Intelligence para COTEP S.A.C.

**Escuela:** Ingeniería de Informática
**Asignatura:** Gestión y Análisis de Datos e Información
**Ciclo:** VI
**Semestre:** 2026-I
**Tema:** Conceptos y componentes de una solución de Inteligencia de Negocios

---

## 1. Contexto del proyecto

COTEP S.A.C. (Comercializadora Tecnológica del Perú S.A.C.) es una empresa peruana
dedicada a la comercialización de productos tecnológicos, con 6 tiendas físicas en
Lima, un canal de e-commerce, aproximadamente 18,000 clientes registrados y 250
productos activos. La gerencia identificó problemas de fragmentación de la
información (reportes por área, cifras que no coinciden entre sistemas, códigos de
producto inconsistentes, clientes duplicados, ausencia de un dashboard único) y
solicitó implementar un **Data Mart de Ventas** como primera etapa de una solución
de Business Intelligence.

La solución desarrollada sigue la lógica: **fuentes de datos → proceso ETL →
almacenamiento/modelamiento → análisis → dashboard → toma de decisiones.**

---

## 2. PRIMERA PARTE: Configuraciones previas de la solución

### ACTIVIDAD 1 — Identificación de las fuentes de datos

Se identificaron y simularon **6 fuentes de datos independientes**, representando
sistemas distintos de la organización (tal como ocurre en la realidad: cada área
genera su propia información en sistemas separados):

| N° | Fuente (archivo) | Sistema que simula | Hoja(s) | Registros |
|---|---|---|---|---|
| 1 | `sistema_ventas_productos.xlsx` | Sistema de inventario/productos | MAESTRO_PRODUCTOS | 10 productos |
| 2 | `crm_clientes.xlsx` | CRM de clientes | MAESTRO_CLIENTES | 8 clientes |
| 3 | `admin_tiendas_canales.xlsx` | Sistema administrativo (tiendas y canales) | MAESTRO_TIENDAS, CANAL_VENTA | 6 tiendas, 3 canales |
| 4 | `sistema_comercial_ventas.xlsx` | Sistema transaccional de ventas (registros limpios) | VENTAS_ORIGEN | 18 ventas |
| 5 | `sistema_comercial_ventas_calidad.xlsx` | Extracción del sistema comercial con errores de calidad | VENTAS_CON_PROBLEMAS | 6 ventas |
| 6 | `metas_comerciales.xlsx` | Archivos Excel de metas comerciales (mencionados como problema #8 en el caso) | METAS_MENSUALES | 12 metas |

Esta separación en múltiples archivos responde directamente al problema #1 del caso
("cada área genera sus propios reportes") y evidencia la necesidad de un proceso de
integración (ETL) antes de poder analizar la información de forma unificada.

### ACTIVIDAD 2 — Configuración del proceso ETL

Se implementó un proceso ETL en Python (librería `pandas`), documentado en el script
`etl.py`, que ejecuta las siguientes transformaciones sobre la fuente
`VENTAS_CON_PROBLEMAS` (los 6 registros de marzo con errores de calidad
identificados en el caso):

| Registro | Problema identificado | Transformación aplicada |
|---|---|---|
| 2001 | Nombre de producto no estandarizado (`"laptop hp 14"`) | Se resolvió por coincidencia de texto contra `MAESTRO_PRODUCTOS`, obteniendo el código `P002`. |
| 2002 | Formato de fecha no estándar | Se normalizó al formato de fecha estándar del sistema (`dayfirst=True`, día/mes/año) usado en el resto del Data Mart. |
| 2003 | Cantidad e importe negativos (-1, -1150) | **Decisión de negocio documentada:** se asumió que el signo negativo corresponde a un error de captura y no a una devolución, dado que el dataset no cuenta con una tabla de tipo de movimiento que permita diferenciar ventas de devoluciones. Se transformó a valor absoluto. |
| 2004 | Importe nulo | Se recalculó como `Cantidad × Precio_Lista`, cruzando con el maestro de productos: `1 × 780 = 780`. |
| 2005 | Registro válido | Sin transformación. |
| 2006 | Posible duplicado de 2005 (mismo cliente, producto, fecha, cantidad e importe) | Se identificó como duplicado exacto y se eliminó, conservando la primera ocurrencia (2005). |

Adicionalmente, se detectó y corrigió un problema de calidad **no declarado
explícitamente en el enunciado pero encontrado durante el desarrollo**: al registrar
las fechas en la hoja de cálculo de origen, el software (LibreOffice Calc)
reinterpretó automáticamente algunas fechas con día ≤ 12 invirtiendo día y mes
(ambigüedad día/mes típica de sistemas con configuración regional distinta). Se
corrigió regenerando las fuentes con la columna Fecha forzada a formato de texto,
evitando la reinterpretación automática del programa ofimático. Esto se documenta
como evidencia de validación de calidad de datos en el proceso ETL.

**Registro de auditoría del proceso (salida real de ejecución del script):**

```
=== PASO 1: EXTRACCIÓN ===
Productos: 10 filas | Clientes: 8 filas
Tiendas: 6 filas | Canales: 3 filas
Ventas origen (limpias): 18 filas
Ventas con problemas (a corregir): 6 filas
Metas mensuales: 12 filas

=== PASO 2: LIMPIEZA DE VENTAS_ORIGEN ===
Fechas normalizadas a formato datetime. Total filas: 18

=== PASO 3: LIMPIEZA DE VENTAS_CON_PROBLEMAS ===
  Registro con producto 'laptop hp 14' -> resuelto a código P002
  Fechas normalizadas en ventas con problemas.
  1 registro(s) con signo negativo corregidos a valor absoluto
  (asunción: error de captura, no devolución).
  Registro 2004: Importe nulo -> recalculado como 1 x 780 = 780
  1 registro(s) con importe nulo recalculados desde precio de lista.
  Duplicados eliminados: 1 registro(s) (se conservó la primera ocurrencia).
  NOTA: los registros de marzo no traían Cod_Tienda/Cod_Canal en la fuente.
  Se asignó T01 y Canal 1 como supuesto documentado para fines del ejercicio.

=== PASO 4: INTEGRACIÓN ===
Tabla de hechos consolidada: 23 filas totales (18 de origen + 5 corregidas de calidad).

=== PASO 5: TABLA CALENDARIO ===
Tabla calendario generada: 63 días, desde 2026-01-02 hasta 2026-03-05.

=== PASO 6: CARGA ===
Archivos CSV exportados a 'salida/'.
Base de datos SQLite creada en 'salida/cotep_dw.db'.

=== ETL FINALIZADO CORRECTAMENTE ===
```

**Supuesto documentado adicional:** los registros corregidos de `VENTAS_CON_PROBLEMAS`
no incluían `Cod_Tienda` ni `Cod_Canal` en la fuente original. Para permitir su
integración a la tabla de hechos, se asignó por defecto la tienda `T01` (COTEP
Centro) y el canal `1` (Tienda física), dejando este supuesto explícito para fines
del ejercicio académico.

### ACTIVIDAD 3 — Diseño del modelo de datos

Se diseñó un **modelo dimensional en esquema estrella**, compuesto por una tabla de
hechos central y cinco tablas de dimensión:

**Tabla de hechos: `FACT_VENTAS`**
Contiene las métricas cuantificables de cada transacción de venta:
- `Id_Venta`, `Fecha` (atributos de la transacción)
- `Cantidad`, `Importe` (métricas numéricas — lo que se suma, promedia, compara)
- `Cod_Producto`, `Cod_Cliente`, `Cod_Tienda`, `Cod_Canal` (llaves foráneas hacia
  las dimensiones)

**Tablas de dimensión:**

| Dimensión | Origen | Atributos descriptivos |
|---|---|---|
| `DIM_PRODUCTO` | `sistema_ventas_productos.xlsx` | Categoría, Marca, Precio_Lista |
| `DIM_CLIENTE` | `crm_clientes.xlsx` | Segmento, Ciudad |
| `DIM_TIENDA` | `admin_tiendas_canales.xlsx` | Distrito, Zona |
| `DIM_CANAL` | `admin_tiendas_canales.xlsx` | Nombre de canal |
| `DIM_CALENDARIO` | Generada por el ETL (no proviene de ninguna fuente externa) | Año, mes, día, día de semana, trimestre |

Este modelo permite responder preguntas de negocio cruzando la tabla de hechos con
cualquier combinación de dimensiones (por ejemplo: ventas por categoría y mes, o
por tienda y canal).

### ACTIVIDAD 4 — Configuración de relaciones

Se estableció la relación **uno a muchos (1:\*)** desde cada tabla de dimensión
hacia la tabla de hechos, tal como especifica la guía del trabajo:

- 1 producto → muchas ventas (`DIM_PRODUCTO.Cod_Producto` → `FACT_VENTAS.Cod_Producto`)
- 1 cliente → muchas ventas (`DIM_CLIENTE.Cod_Cliente` → `FACT_VENTAS.Cod_Cliente`)
- 1 tienda → muchas ventas (`DIM_TIENDA.Cod_Tienda` → `FACT_VENTAS.Cod_Tienda`)
- 1 canal → muchas ventas (`DIM_CANAL.Cod_Canal` → `FACT_VENTAS.Cod_Canal`)
- 1 fecha (día) → muchas ventas (`DIM_CALENDARIO.Fecha` → `FACT_VENTAS.Fecha`)

Estas relaciones se implementaron físicamente al cargar el modelo en una base de
datos relacional SQLite (`cotep_dw.db`), permitiendo su explotación mediante
consultas SQL con `JOIN`.

### ACTIVIDAD 5 — Configuración de una tabla calendario

Se generó una tabla `DIM_CALENDARIO` de forma independiente a las fuentes de datos
originales, cubriendo el rango completo de fechas presentes en la tabla de hechos
(63 días, del 2026-01-02 al 2026-03-05). Contiene los atributos: Año, número de mes,
nombre de mes, día, día de la semana y trimestre — necesarios para realizar análisis
temporal (comparación mensual, identificación de patrones por día de semana, etc.)
que no serían posibles usando únicamente la columna `Fecha` de la tabla de hechos.

### ACTIVIDAD 6 — Configuración de indicadores

Se construyeron los siguientes indicadores mínimos solicitados, calculados mediante
consultas SQL sobre el Data Mart (ver Segunda Parte para el detalle de resultados):

- **Ventas Totales**: suma de `Importe` en `FACT_VENTAS`
- **Unidades Vendidas**: suma de `Cantidad` en `FACT_VENTAS`
- **Número de Ventas**: conteo de transacciones (`COUNT`)
- **Meta Total**: suma de `Meta_Ventas` en `METAS`
- **Cumplimiento**: `(Ventas_Reales / Meta_Ventas) × 100`, calculado por tienda y mes
- **Variación mensual**: `((Ventas_mes2 - Ventas_mes1) / Ventas_mes1) × 100`

---

## 3. SEGUNDA PARTE: Preguntas del caso

### Pregunta 1 — ¿Cuál fue el total de ventas durante enero y febrero?

| Mes | Total Ventas | Unidades Vendidas | N° Ventas |
|---|---|---|---|
| Enero 2026 | S/ 33,425 | 25 | 10 |
| Febrero 2026 | S/ 30,075 | 25 | 8 |
| **Total** | **S/ 63,500** | **50** | **18** |

### Pregunta 2 — ¿Cuál fue la variación de ventas entre enero y febrero?

Las ventas de febrero (S/ 30,075) disminuyeron respecto a enero (S/ 33,425),
representando una **variación de -10.02%**. Esto indica una contracción en el
segundo mes analizado que amerita revisión por parte de la gerencia comercial.

### Pregunta 3 — ¿Qué categoría generó mayores ventas?

| Categoría | Total Ventas |
|---|---|
| **LAPTOPS** | **S/ 54,800** |
| MONITORES | S/ 12,550 |
| IMPRESORAS | S/ 3,900 |
| COMPONENTES | S/ 2,800 |
| ACCESORIOS | S/ 810 |

La categoría **LAPTOPS** concentra la mayor parte de la facturación, muy por
encima del resto de categorías combinadas.

### Pregunta 4 — ¿Cuál fue el canal de ventas con mayor facturación?

| Canal | Total Facturado |
|---|---|
| **VENTA CORPORATIVA** | **S/ 55,070** |
| TIENDA FÍSICA | S/ 19,790 |

El canal de **venta corporativa** concentra la mayor facturación, lo que se
explica por tickets promedio de mayor valor por transacción (compras
empresariales de mayor volumen), a pesar de no tener necesariamente más
transacciones que el canal físico.

### Pregunta 5 — ¿Cuál fue el cliente con mayor volumen de compras?

Por **unidades compradas**:

| Cliente | Segmento | Unidades | Monto total |
|---|---|---|---|
| **Tecnología Global SAC** | Corporativo | **11** | S/ 19,150 |
| Juan Pérez García | Persona | 9 | S/ 2,920 |
| Servicios Integrales SAC | Corporativo | 8 | S/ 12,880 |
| Grupo Alpha SAC | Corporativo | 8 | S/ 24,800 |

Por **monto comprado**: **Grupo Alpha SAC** lidera con S/ 24,800, aunque no es el
cliente con más unidades. Esto evidencia que el criterio de "volumen" debe
precisarse: en unidades, el líder es Tecnología Global SAC; en monto facturado, es
Grupo Alpha SAC.

### Pregunta 6 — ¿La empresa cumplió las metas comerciales?

**No.** Ninguna tienda alcanzó el 100% de la meta mensual asignada en ninguno de
los dos meses analizados:

| Mes | Tienda | Meta | Ventas reales | Cumplimiento |
|---|---|---|---|---|
| Enero | COTEP Centro | S/ 35,000 | S/ 16,780 | 47.9% |
| Enero | COTEP San Isidro | S/ 32,000 | S/ 10,840 | 33.9% |
| Enero | COTEP Los Olivos | S/ 25,000 | S/ 2,900 | 11.6% |
| Enero | COTEP San Miguel | S/ 30,000 | S/ 2,550 | 8.5% |
| Enero | COTEP Miraflores | S/ 28,000 | S/ 355 | 1.3% |
| Enero | COTEP Surco | S/ 27,000 | S/ 0 | 0.0% |
| Febrero | COTEP Centro | S/ 34,000 | S/ 20,900 | 61.5% |
| Febrero | COTEP San Isidro | S/ 35,000 | S/ 6,550 | 18.7% |
| Febrero | COTEP Miraflores | S/ 29,000 | S/ 885 | 3.1% |
| Febrero | COTEP San Miguel | S/ 31,000 | S/ 960 | 3.1% |
| Febrero | COTEP Los Olivos | S/ 28,000 | S/ 780 | 2.8% |
| Febrero | COTEP Surco | S/ 30,000 | S/ 0 | 0.0% |

### Pregunta 7 — ¿Qué tiendas requieren atención?

Todas las tiendas presentan bajo cumplimiento, pero destacan como **casos
críticos**:

- **COTEP Surco**: 0% de cumplimiento en ambos meses — no registra ninguna venta
  en el periodo analizado. Requiere atención inmediata.
- **COTEP Miraflores**: cumplimiento por debajo del 4% en ambos meses.
- **COTEP San Miguel** y **COTEP Los Olivos**: cumplimiento igualmente crítico,
  por debajo del 12%.

La única tienda con desempeño relativamente aceptable (aunque tampoco cumple meta)
es **COTEP Centro**, con 47.9% en enero y 61.5% en febrero — siendo además la única
tienda cuyo cumplimiento mejora de un mes a otro.

### Pregunta 8 — ¿Cuál es el producto más vendido según unidades?

| Producto | Categoría | Unidades | Facturación |
|---|---|---|---|
| **Laptop Lenovo IdeaPad** | LAPTOPS | **12** | S/ 37,400 |
| Mouse Logitech M185 | ACCESORIOS | 9 | S/ 585 |
| Monitor Samsung 24 | MONITORES | 8 | S/ 6,800 |
| Disco SSD Kingston 1TB | COMPONENTES | 7 | S/ 2,240 |
| Laptop HP 14 | LAPTOPS | 6 | S/ 17,400 |

La **Laptop Lenovo IdeaPad** es el producto más vendido tanto en unidades como en
facturación, consistente con el liderazgo de la categoría LAPTOPS observado en la
Pregunta 3.

---

## 4. TERCERA PARTE: Diseño del dashboard

El dashboard fue diseñado como una herramienta de solo lectura para la Gerencia
Comercial, organizada en 3 páginas con navegación por pestañas. A continuación se
documenta cada página con su captura correspondiente.

### 4.1. Página 1 — Resumen ejecutivo

**[INSERTAR AQUÍ: captura de pantalla de la pestaña "Resumen ejecutivo"]**

La captura debe mostrar, visibles en una sola pantalla:
- Las 4 tarjetas de KPI (Ventas Totales S/ 63,500, Unidades Vendidas 50, N° de
  Ventas 18, Variación mensual -10.02%)
- El gráfico de barras de ventas por mes (enero vs. febrero)
- El gráfico de ventas por categoría (donde debe verse LAPTOPS dominando)
- El gráfico de ventas por canal (Venta corporativa vs. Tienda física)

Debajo de la captura, incluir un párrafo breve (3-4 líneas) explicando qué
decisión gerencial permite tomar esta vista: por ejemplo, que la caída de -10.02%
en febrero es la primera alerta que la gerencia vería al abrir el dashboard, y que
la concentración de ventas en la categoría LAPTOPS sugiere revisar el stock y
las promociones de esa categoría antes que las demás.

### 4.2. Página 2 — Análisis de tiendas

**[INSERTAR AQUÍ: captura de pantalla de la pestaña "Análisis de tiendas"]**

La captura debe mostrar:
- La tabla o gráfico de cumplimiento de meta por tienda y mes, con el código de
  color de alerta (rojo/amarillo/verde) visible
- El caso de COTEP Surco resaltado en rojo (0% de cumplimiento, sin ventas
  registradas en ningún mes)
- El ranking de tiendas ordenado de peor a mejor desempeño

Debajo de la captura, explicar en 3-4 líneas la lectura gerencial: ninguna tienda
alcanza el 100% de su meta, COTEP Surco requiere intervención inmediata (posible
problema operativo, no solo comercial, dado el 0% total), y COTEP Centro es la
única tienda con tendencia de mejora entre enero y febrero.

### 4.3. Página 3 — Análisis de clientes y productos

**[INSERTAR AQUÍ: captura de pantalla de la pestaña "Análisis de clientes y
productos"]**

La captura debe mostrar:
- El top 5 de clientes por unidades compradas
- El top 5 de clientes por monto comprado (evidenciando que el orden cambia según
  el criterio)
- El ranking de productos más vendidos por unidades (con Laptop Lenovo IdeaPad
  liderando)

Debajo de la captura, señalar en 3-4 líneas que el criterio de "mejor cliente"
depende de si se mide por unidades (Tecnología Global SAC) o por monto (Grupo
Alpha SAC), y que esto es relevante para diseñar estrategias de fidelización
distintas según el segmento (corporativo vs. persona natural).

### 4.4. Cómo se generó el dashboard

Los datos del Data Mart (`cotep_dw.db`) se exportaron a un archivo de datos
embebido en JavaScript, y se construyó una página HTML única con navegación por
pestañas, usando Chart.js (vía CDN) para los gráficos. El archivo se ejecuta
abriéndolo directamente en el navegador, sin necesidad de servidor ni conexión a
base de datos en tiempo real — apropiado para una primera solución de BI de bajo
volumen como la solicitada en este trabajo.

---

## 5. Arquitectura técnica de la solución

**Stack utilizado:**
- **Fuentes de datos**: 6 archivos Excel (`.xlsx`), simulando sistemas independientes
- **ETL**: Python (librería `pandas`), con script documentado y log de auditoría
- **Almacenamiento analítico (Data Mart)**: SQLite — se evaluó el uso de SQL Server,
  pero se optó por SQLite al ser la herramienta apropiada para un Data Mart
  analítico de bajo volumen y consulta de solo lectura, sin necesidad de
  infraestructura cliente-servidor. SQLite ejecuta SQL estándar (SELECT, JOIN,
  GROUP BY) de forma idéntica a motores más complejos, permitiendo validar el
  modelo relacional y las consultas de negocio sin sobrecarga de configuración.
- **Consultas de negocio**: SQL (8 consultas documentadas en `consultas.sql`,
  correspondientes a las 8 preguntas del caso)
- **Visualización**: Dashboard web (HTML + JS + Chart.js), ejecutable en local sin
  servidor

---

## 6. Referencias

- Material de clase: Sesión 01 — Toma de decisiones y la inteligencia de negocios.
  Ing. Edgar Jesús Muñante Villafuerte, 2026-I.
- Material de clase: Sesión 02 — Componentes de una solución de Inteligencia de
  Negocios. Ing. Edgar Jesús Muñante Villafuerte, 2026-I.
- Trabajo N° 01 — Conceptos, componentes de una solución de Inteligencia de
  Negocios. Escuela de Ingeniería Informática, 2026.
