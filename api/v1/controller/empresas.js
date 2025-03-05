const { validateParams } = require("../helpers/params")
const model = require("../model/empresas")

const create = async (req, res) => {
  const requiredParamsToCreate = []

  try {
    const missingParams = validateParams(req.body, requiredParamsToCreate)
    if (missingParams.length > 0) {
      return res.status(400).json({ error: 'Faltan parametros requeridos', missingParams })
    }

    const response = await model.createEmpresa(req.body)

    res.status(201).json({ message: "Agente creado correctamente", data: response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor', details: error })
  }
}

const read = async (req, res) => {
  const requiredParamsToGet = []

  try {
    const missingParams = validateParams(req.query, requiredParamsToGet)
    if (missingParams.length > 0) {
      return res.status(400).json({ error: 'Faltan parametros requeridos', missingParams })
    }

    const agentes = await model.getEmpresas()
    res.status(200).json(agentes)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor', details: error })
  }
}

module.exports = {
  create,
  read
}