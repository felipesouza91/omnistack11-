const express = require('express');
const router = express.Router();

const ongController = require('./controller/OngController');
const insidentsController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');

router.post('/session', sessionController.create);

router.get('/ongs', ongController.index);
router.post('/ongs', ongController.create);

router.get('/profile', profileController.index);

router.get('/incidents', insidentsController.index);
router.post('/incidents', insidentsController.create);
router.delete('/incidents/:id', insidentsController.delete);

module.exports = router;