/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use( validateJWT );

router.get(
    '/',
    [
        
    ]
    , getEvents
);

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de final es obligatoria').custom( isDate ),
        fieldsValidator,
    ]
    , createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;