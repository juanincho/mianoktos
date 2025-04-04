const { executeQuery, executeTransaction } = require("../../../config/db")
const { v4: uuidv4 } = require("uuid")

const insertarReserva = async (solicitud) => {
  try {
    const id_booking = `boo-${uuidv4()}`
    const id_hospedaje = `hos-${uuidv4()}`
    const { id_servicio, estado, check_in, check_out, id_viajero, nombre_hotel, total, subtotal, impuestos, tipo_cuarto, noches, costo_subtotal, costo_total, costo_impuestos, codigo_reservacion_hotel, items, id_solicitud } = solicitud
    const query = `INSERT INTO bookings (id_booking, id_servicio, check_in, check_out, total, subtotal, impuestos, estado, costo_total, costo_subtotal, costo_impuestos, fecha_pago_proveedor, fecha_limite_cancelacion, id_solicitud ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
    const params = [id_booking, id_servicio, check_in, check_out, total, subtotal, impuestos, estado, costo_total, costo_subtotal, costo_impuestos, null, null, id_solicitud];

    const response = await executeTransaction(query, params, async (results, connection) => {
      try {
        const query_hospedaje = `INSERT INTO hospedajes (id_hospedaje, id_booking, nombre_hotel, cadena_hotel, codigo_reservacion_hotel, tipo_cuarto, noches, is_rembolsable, monto_penalizacion, conciliado, credito) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
        const params_hospedaje = [id_hospedaje, id_booking, nombre_hotel, null, codigo_reservacion_hotel, tipo_cuarto, noches, null, null, null, null]

        const response_hospedaje = await connection.execute(query_hospedaje, params_hospedaje)

        const query_items = `INSERT INTO items (id_catalogo_item, id_factura, total, subtotal, impuestos, is_facturado, fecha_uso, id_hospedaje) VALUES ${items.map(item => "(?,?,?,?,?,?,?,?)").join(",")};`

        const params_items = items.flatMap(item => [null, null, item.total, item.subtotal, item.impuestos, null, (new Date()).toISOString().split("T")[0], id_hospedaje])

        const response_items = await connection.execute(query_items, params_items)

        const response_solicitud = await connection.execute(`UPDATE solicitudes SET status = "complete" WHERE id_solicitud = ?;`, [id_solicitud])

        return { response_hospedaje, response_items, response_solicitud }
      } catch (error) {
        throw error;
      }
    })

    return response
  } catch (error) {
    throw error; // Lanza el error para que puedas manejarlo donde llames la función
  }
};
const getReserva = async () => {
  try {

    const query = `select * from bookings left join hospedajes on bookings.id_booking = hospedajes.id_booking;`

    // Ejecutar el procedimiento almacenado
    const response = await executeQuery(query)

    return response; // Retorna el resultado de la ejecución

  } catch (error) {
    throw error; // Lanza el error para que puedas manejarlo donde llames la función
  }
};



module.exports = {
  insertarReserva,
  getReserva
}