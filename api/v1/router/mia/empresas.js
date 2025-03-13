const router = require("express").Router()
const controller = require("../../controller/empresas")
const middleware = require("../../middleware/validateParams")

router.post("/", middleware.validateParams(["agente_id", "razon_social", "nombre_comercial", "direccion", "tipo_persona"]), controller.create)

router.get("/", controller.read)

module.exports = router