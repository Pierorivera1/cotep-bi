import sqlite3
import json
import os

DB_PATH = "salida/cotep_dw.db"
OUTPUT_JS = "datos.js"

def exportar_tablas_a_js():
    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(f"No se encontró la base de datos en {DB_PATH}")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    tablas = [
        "FACT_VENTAS",
        "DIM_PRODUCTO",
        "DIM_CLIENTE",
        "DIM_TIENDA",
        "DIM_CANAL",
        "DIM_CALENDARIO",
        "METAS"
    ]

    datos = {}
    for tabla in tablas:
        cursor.execute(f"SELECT * FROM {tabla}")
        filas = [dict(row) for row in cursor.fetchall()]
        datos[tabla] = filas
        print(f"Exportada tabla {tabla}: {len(filas)} filas")

    conn.close()

    # Generar archivo JavaScript compatible con file://
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("// ============================================================\n")
        f.write("// COTEP S.A.C. — Data Mart de Ventas\n")
        f.write("// Datos generados desde SQLite (salida/cotep_dw.db)\n")
        f.write("// No requiere servidor web (compatible con protocolo file://)\n")
        f.write("// ============================================================\n\n")

        for tabla, filas in datos.items():
            json_str = json.dumps(filas, ensure_ascii=False, indent=2)
            f.write(f"const {tabla} = {json_str};\n\n")

        f.write("// Exportación global consolidada\n")
        f.write("const COTEP_DW = {\n")
        for tabla in tablas:
            f.write(f"  {tabla},\n")
        f.write("};\n")

    print(f"\n¡Datos exportados con éxito a '{OUTPUT_JS}'!")

if __name__ == "__main__":
    exportar_tablas_a_js()
