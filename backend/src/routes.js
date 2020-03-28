const express = require('express');
const router = express.Router();
const { celebrate, Segments, Joi } =require('celebrate');

const ongController = require('./controller/OngController');
const insidentsController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');

router.post('/session', sessionController.create);

router.get('/ongs', ongController.index);

router.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    cidade: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}) ,ongController.create);

router.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) ,profileController.index);

router.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}) ,insidentsController.index);

router.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS] :  Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) ,insidentsController.create);


router.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),insidentsController.delete);

module.exports = router;