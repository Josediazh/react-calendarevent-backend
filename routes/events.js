const express = require('express');
const {param,body} = require('express-validator');
const router = express.Router();
const { newEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/eventController');
const { validFields } = require('../middlewares/validFieldsMiddleware');
const { validJWT } = require('../middlewares/checkJWTMiddleware');


router.post('/newevent',
[
    validJWT,
    body('start','La fecha inicio no debe ser vacia').not().isEmpty(),
    body('end','La fecha fin no deber ser vacia').not().isEmpty(),
    validFields
]
,newEvent);


router.put('/updateevent/:_id',
[
    validJWT,
    param('_id','No se recibio el id del evento').not().isEmpty(),
    validFields
]
,updateEvent)


router.delete('/deleteevent/:_id',
[
    validJWT,
    param('_id','No se recibio el id del evento').not().isEmpty(),
    validFields
]
,deleteEvent)


router.get('/',getEvents)

module.exports = router;