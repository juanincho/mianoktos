const { executeTransaction, executeQuery } = require("../../../config/db");

const createAgente = async (data) => {
  try {
    let query = `INSERT INTO agentes (id_agente, nombre) VALUES (?,?)`;
    let nombre = [data.primer_nombre, data.segundo_nombre, data.apellido_paterno, data.apellido_materno].filter(item => typeof item == "string").join(" ");
    let params = [data.id, nombre];
    let response = await executeQuery(query, params);
    console.log(response);

    return response;
  } catch (error) {
    throw error
  }
}

const getAgente = async (id_agente) => {
  try {
    const query = "SELECT * FROM viajeros_con_empresas_con_agentes WHERE id_agente = ?";
    const params = [id_agente];
    const response = await executeQuery(query, params);
    console.log(response);
    return response;
  } catch (error) {
    throw error
  }
}

const getAgenteEmpresa = async (id_agente) => {
  try {
    const query = "SELECT * FROM empresas_con_agentes WHERE id_agente = ?";
    const params = [id_agente];
    const response = await executeQuery(query, params);
    console.log("hola");
    console.log(response);
    return response;
  } catch (error) {
    throw error
  }
}

const getEmpresasDatosFiscales = async (id_agente) => {
  try {
    const query = "SELECT * FROM vw_datos_fiscales_detalle WHERE id_agente = ?";
    const params = [id_agente];
    const response = await executeQuery(query, params);
    console.log("hola");
    console.log(response);
    return response;
  } catch (error) {
    throw error
  }
}

module.exports = {
  createAgente,
  getAgente,
  getAgenteEmpresa,
  getEmpresasDatosFiscales
}