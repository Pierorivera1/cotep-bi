// ============================================================
// COTEP S.A.C. — Data Mart de Ventas
// Datos generados desde SQLite (salida/cotep_dw.db)
// No requiere servidor web (compatible con protocolo file://)
// ============================================================

const FACT_VENTAS = [
  {
    "Id_Venta": 1001,
    "Fecha": "2026-01-02 00:00:00",
    "Cod_Producto": "P001",
    "Cod_Cliente": "C001",
    "Cod_Tienda": "T01",
    "Cod_Canal": 3,
    "Cantidad": 5,
    "Importe": 15500.0
  },
  {
    "Id_Venta": 1002,
    "Fecha": "2026-01-03 00:00:00",
    "Cod_Producto": "P005",
    "Cod_Cliente": "C003",
    "Cod_Tienda": "T03",
    "Cod_Canal": 1,
    "Cantidad": 2,
    "Importe": 130.0
  },
  {
    "Id_Venta": 1003,
    "Fecha": "2026-01-05 00:00:00",
    "Cod_Producto": "P003",
    "Cod_Cliente": "C004",
    "Cod_Tienda": "T04",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 850.0
  },
  {
    "Id_Venta": 1004,
    "Fecha": "2026-01-07 00:00:00",
    "Cod_Producto": "P007",
    "Cod_Cliente": "C002",
    "Cod_Tienda": "T02",
    "Cod_Canal": 3,
    "Cantidad": 3,
    "Importe": 2340.0
  },
  {
    "Id_Venta": 1005,
    "Fecha": "2026-01-10 00:00:00",
    "Cod_Producto": "P004",
    "Cod_Cliente": "C005",
    "Cod_Tienda": "T02",
    "Cod_Canal": 3,
    "Cantidad": 2,
    "Importe": 2300.0
  },
  {
    "Id_Venta": 1006,
    "Fecha": "2026-01-12 00:00:00",
    "Cod_Producto": "P002",
    "Cod_Cliente": "C006",
    "Cod_Tienda": "T05",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 2900.0
  },
  {
    "Id_Venta": 1007,
    "Fecha": "2026-01-15 00:00:00",
    "Cod_Producto": "P008",
    "Cod_Cliente": "C007",
    "Cod_Tienda": "T01",
    "Cod_Canal": 3,
    "Cantidad": 4,
    "Importe": 1280.0
  },
  {
    "Id_Venta": 1008,
    "Fecha": "2026-01-18 00:00:00",
    "Cod_Producto": "P006",
    "Cod_Cliente": "C008",
    "Cod_Tienda": "T03",
    "Cod_Canal": 1,
    "Cantidad": 3,
    "Importe": 225.0
  },
  {
    "Id_Venta": 1009,
    "Fecha": "2026-01-21 00:00:00",
    "Cod_Producto": "P001",
    "Cod_Cliente": "C005",
    "Cod_Tienda": "T02",
    "Cod_Canal": 3,
    "Cantidad": 2,
    "Importe": 6200.0
  },
  {
    "Id_Venta": 1010,
    "Fecha": "2026-01-25 00:00:00",
    "Cod_Producto": "P003",
    "Cod_Cliente": "C003",
    "Cod_Tienda": "T04",
    "Cod_Canal": 1,
    "Cantidad": 2,
    "Importe": 1700.0
  },
  {
    "Id_Venta": 1011,
    "Fecha": "2026-02-02 00:00:00",
    "Cod_Producto": "P001",
    "Cod_Cliente": "C001",
    "Cod_Tienda": "T01",
    "Cod_Canal": 3,
    "Cantidad": 3,
    "Importe": 9300.0
  },
  {
    "Id_Venta": 1012,
    "Fecha": "2026-02-05 00:00:00",
    "Cod_Producto": "P005",
    "Cod_Cliente": "C004",
    "Cod_Tienda": "T03",
    "Cod_Canal": 1,
    "Cantidad": 5,
    "Importe": 325.0
  },
  {
    "Id_Venta": 1013,
    "Fecha": "2026-02-09 00:00:00",
    "Cod_Producto": "P004",
    "Cod_Cliente": "C002",
    "Cod_Tienda": "T02",
    "Cod_Canal": 3,
    "Cantidad": 2,
    "Importe": 2300.0
  },
  {
    "Id_Venta": 1014,
    "Fecha": "2026-02-12 00:00:00",
    "Cod_Producto": "P007",
    "Cod_Cliente": "C006",
    "Cod_Tienda": "T05",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 780.0
  },
  {
    "Id_Venta": 1015,
    "Fecha": "2026-02-16 00:00:00",
    "Cod_Producto": "P002",
    "Cod_Cliente": "C007",
    "Cod_Tienda": "T01",
    "Cod_Canal": 3,
    "Cantidad": 4,
    "Importe": 11600.0
  },
  {
    "Id_Venta": 1016,
    "Fecha": "2026-02-20 00:00:00",
    "Cod_Producto": "P008",
    "Cod_Cliente": "C003",
    "Cod_Tienda": "T04",
    "Cod_Canal": 1,
    "Cantidad": 3,
    "Importe": 960.0
  },
  {
    "Id_Venta": 1017,
    "Fecha": "2026-02-24 00:00:00",
    "Cod_Producto": "P003",
    "Cod_Cliente": "C005",
    "Cod_Tienda": "T02",
    "Cod_Canal": 3,
    "Cantidad": 5,
    "Importe": 4250.0
  },
  {
    "Id_Venta": 1018,
    "Fecha": "2026-02-28 00:00:00",
    "Cod_Producto": "P009",
    "Cod_Cliente": "C008",
    "Cod_Tienda": "T03",
    "Cod_Canal": 1,
    "Cantidad": 2,
    "Importe": 560.0
  },
  {
    "Id_Venta": 2001,
    "Fecha": "2026-03-01 00:00:00",
    "Cod_Producto": "P002",
    "Cod_Cliente": "C004",
    "Cod_Tienda": "T01",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 2900.0
  },
  {
    "Id_Venta": 2002,
    "Fecha": "2026-03-02 00:00:00",
    "Cod_Producto": "P005",
    "Cod_Cliente": "C003",
    "Cod_Tienda": "T01",
    "Cod_Canal": 1,
    "Cantidad": 2,
    "Importe": 130.0
  },
  {
    "Id_Venta": 2003,
    "Fecha": "2026-03-03 00:00:00",
    "Cod_Producto": "P004",
    "Cod_Cliente": "C006",
    "Cod_Tienda": "T01",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 1150.0
  },
  {
    "Id_Venta": 2004,
    "Fecha": "2026-03-04 00:00:00",
    "Cod_Producto": "P007",
    "Cod_Cliente": "C002",
    "Cod_Tienda": "T01",
    "Cod_Canal": 1,
    "Cantidad": 1,
    "Importe": 780.0
  },
  {
    "Id_Venta": 2005,
    "Fecha": "2026-03-05 00:00:00",
    "Cod_Producto": "P001",
    "Cod_Cliente": "C005",
    "Cod_Tienda": "T01",
    "Cod_Canal": 1,
    "Cantidad": 2,
    "Importe": 6400.0
  }
];

const DIM_PRODUCTO = [
  {
    "Cod_Producto": "P001",
    "Producto": "Laptop Lenovo IdeaPad",
    "Categoría": "LAPTOPS",
    "Marca": "Lenovo",
    "Precio_Lista": 3200
  },
  {
    "Cod_Producto": "P002",
    "Producto": "Laptop HP 14",
    "Categoría": "LAPTOPS",
    "Marca": "HP",
    "Precio_Lista": 2900
  },
  {
    "Cod_Producto": "P003",
    "Producto": "Monitor Samsung 24",
    "Categoría": "MONITORES",
    "Marca": "Samsung",
    "Precio_Lista": 850
  },
  {
    "Cod_Producto": "P004",
    "Producto": "Monitor LG 27",
    "Categoría": "MONITORES",
    "Marca": "LG",
    "Precio_Lista": 1150
  },
  {
    "Cod_Producto": "P005",
    "Producto": "Mouse Logitech M185",
    "Categoría": "ACCESORIOS",
    "Marca": "Logitech",
    "Precio_Lista": 65
  },
  {
    "Cod_Producto": "P006",
    "Producto": "Teclado Logitech K120",
    "Categoría": "ACCESORIOS",
    "Marca": "Logitech",
    "Precio_Lista": 75
  },
  {
    "Cod_Producto": "P007",
    "Producto": "Impresora Epson L3250",
    "Categoría": "IMPRESORAS",
    "Marca": "Epson",
    "Precio_Lista": 780
  },
  {
    "Cod_Producto": "P008",
    "Producto": "Disco SSD Kingston 1TB",
    "Categoría": "COMPONENTES",
    "Marca": "Kingston",
    "Precio_Lista": 320
  },
  {
    "Cod_Producto": "P009",
    "Producto": "Memoria RAM 16GB",
    "Categoría": "COMPONENTES",
    "Marca": "Kingston",
    "Precio_Lista": 280
  },
  {
    "Cod_Producto": "P010",
    "Producto": "Webcam Logitech C920",
    "Categoría": "ACCESORIOS",
    "Marca": "Logitech",
    "Precio_Lista": 350
  }
];

const DIM_CLIENTE = [
  {
    "Cod_Cliente": "C001",
    "Cliente": "Grupo Alpha SAC",
    "Segmento": "CORPORATIVO",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C002",
    "Cliente": "Soluciones Digitales SAC",
    "Segmento": "CORPORATIVO",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C003",
    "Cliente": "Juan Pérez García",
    "Segmento": "PERSONA",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C004",
    "Cliente": "María López Torres",
    "Segmento": "PERSONA",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C005",
    "Cliente": "Tecnología Global SAC",
    "Segmento": "CORPORATIVO",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C006",
    "Cliente": "Carlos Ramírez Soto",
    "Segmento": "PERSONA",
    "Ciudad": "Callao"
  },
  {
    "Cod_Cliente": "C007",
    "Cliente": "Servicios Integrales SAC",
    "Segmento": "CORPORATIVO",
    "Ciudad": "Lima"
  },
  {
    "Cod_Cliente": "C008",
    "Cliente": "Ana Rodríguez Díaz",
    "Segmento": "PERSONA",
    "Ciudad": "Lima"
  }
];

const DIM_TIENDA = [
  {
    "Cod_Tienda": "T01",
    "Tienda": "COTEP Centro",
    "Distrito": "Cercado de Lima",
    "Zona": "Centro"
  },
  {
    "Cod_Tienda": "T02",
    "Tienda": "COTEP San Isidro",
    "Distrito": "San Isidro",
    "Zona": "Centro"
  },
  {
    "Cod_Tienda": "T03",
    "Tienda": "COTEP Miraflores",
    "Distrito": "Miraflores",
    "Zona": "Sur"
  },
  {
    "Cod_Tienda": "T04",
    "Tienda": "COTEP San Miguel",
    "Distrito": "San Miguel",
    "Zona": "Oeste"
  },
  {
    "Cod_Tienda": "T05",
    "Tienda": "COTEP Los Olivos",
    "Distrito": "Los Olivos",
    "Zona": "Norte"
  },
  {
    "Cod_Tienda": "T06",
    "Tienda": "COTEP Surco",
    "Distrito": "Santiago de Surco",
    "Zona": "Sur"
  }
];

const DIM_CANAL = [
  {
    "Cod_Canal": 1,
    "Canal": "TIENDA FÍSICA"
  },
  {
    "Cod_Canal": 2,
    "Canal": "E-COMMERCE"
  },
  {
    "Cod_Canal": 3,
    "Canal": "VENTA CORPORATIVA"
  }
];

const DIM_CALENDARIO = [
  {
    "Fecha": "2026-01-02 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 2,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-03 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 3,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-04 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 4,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-05 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 5,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-06 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 6,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-07 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 7,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-08 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 8,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-09 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 9,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-10 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 10,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-11 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 11,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-12 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 12,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-13 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 13,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-14 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 14,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-15 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 15,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-16 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 16,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-17 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 17,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-18 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 18,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-19 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 19,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-20 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 20,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-21 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 21,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-22 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 22,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-23 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 23,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-24 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 24,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-25 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 25,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-26 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 26,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-27 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 27,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-28 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 28,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-29 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 29,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-30 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 30,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-01-31 00:00:00",
    "Año": 2026,
    "Mes_Num": 1,
    "Mes_Nombre": "January",
    "Dia": 31,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-01 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 1,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-02 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 2,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-03 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 3,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-04 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 4,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-05 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 5,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-06 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 6,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-07 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 7,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-08 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 8,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-09 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 9,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-10 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 10,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-11 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 11,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-12 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 12,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-13 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 13,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-14 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 14,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-15 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 15,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-16 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 16,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-17 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 17,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-18 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 18,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-19 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 19,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-20 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 20,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-21 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 21,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-22 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 22,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-23 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 23,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-24 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 24,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-25 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 25,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-26 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 26,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-27 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 27,
    "Dia_Semana": "Friday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-02-28 00:00:00",
    "Año": 2026,
    "Mes_Num": 2,
    "Mes_Nombre": "February",
    "Dia": 28,
    "Dia_Semana": "Saturday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-03-01 00:00:00",
    "Año": 2026,
    "Mes_Num": 3,
    "Mes_Nombre": "March",
    "Dia": 1,
    "Dia_Semana": "Sunday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-03-02 00:00:00",
    "Año": 2026,
    "Mes_Num": 3,
    "Mes_Nombre": "March",
    "Dia": 2,
    "Dia_Semana": "Monday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-03-03 00:00:00",
    "Año": 2026,
    "Mes_Num": 3,
    "Mes_Nombre": "March",
    "Dia": 3,
    "Dia_Semana": "Tuesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-03-04 00:00:00",
    "Año": 2026,
    "Mes_Num": 3,
    "Mes_Nombre": "March",
    "Dia": 4,
    "Dia_Semana": "Wednesday",
    "Trimestre": 1
  },
  {
    "Fecha": "2026-03-05 00:00:00",
    "Año": 2026,
    "Mes_Num": 3,
    "Mes_Nombre": "March",
    "Dia": 5,
    "Dia_Semana": "Thursday",
    "Trimestre": 1
  }
];

const METAS = [
  {
    "Mes": "Enero",
    "Cod_Tienda": "T01",
    "Meta_Ventas": 35000
  },
  {
    "Mes": "Enero",
    "Cod_Tienda": "T02",
    "Meta_Ventas": 32000
  },
  {
    "Mes": "Enero",
    "Cod_Tienda": "T03",
    "Meta_Ventas": 28000
  },
  {
    "Mes": "Enero",
    "Cod_Tienda": "T04",
    "Meta_Ventas": 30000
  },
  {
    "Mes": "Enero",
    "Cod_Tienda": "T05",
    "Meta_Ventas": 25000
  },
  {
    "Mes": "Enero",
    "Cod_Tienda": "T06",
    "Meta_Ventas": 27000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T01",
    "Meta_Ventas": 34000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T02",
    "Meta_Ventas": 35000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T03",
    "Meta_Ventas": 29000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T04",
    "Meta_Ventas": 31000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T05",
    "Meta_Ventas": 28000
  },
  {
    "Mes": "Febrero",
    "Cod_Tienda": "T06",
    "Meta_Ventas": 30000
  }
];

// Exportación global consolidada
const COTEP_DW = {
  FACT_VENTAS,
  DIM_PRODUCTO,
  DIM_CLIENTE,
  DIM_TIENDA,
  DIM_CANAL,
  DIM_CALENDARIO,
  METAS,
};
