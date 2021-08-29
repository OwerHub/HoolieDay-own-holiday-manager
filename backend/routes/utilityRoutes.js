const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../utility/openapi.json");

const utilController = require("../utility/copyHolydayData");
const serviceController = require("../controllers/serviceController");

router.get("/ping", serviceController.testFunct);

router.get("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//router.get("/copyHolyday", utilController.copyHolydayFromJson);
//router.get("/copyTypes", utilController.copyTypesFromJson);

module.exports = router;
