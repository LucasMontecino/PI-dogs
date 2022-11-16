const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoute = require("./dogsRoute");
const postRoute = require('./postRoute');
const temperamentsRoute = require("./temperamentsRoute");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRoute);
router.use("/dog", postRoute);
router.use("/temperaments", temperamentsRoute);

module.exports = router;
