const { response } = require('express');

const getEvents = async( req, res = response ) => {

    //const { email, password } = req.body;
        
    return res.status(200).json({
        ok: true,
        msg: 'get events'
    });

}

const createEvent = async( req, res = response ) => {

    const { title, start } = req.body;
    
    return res.status(200).json({
        ok: true,
        msg: 'create event'
    });

}

const updateEvent = async( req, res = response ) => {

    //const { email, password } = req.body;
        
    return res.status(200).json({
        ok: true,
        msg: 'update event'
    });

}

const deleteEvent = async( req, res = response ) => {

    //const { email, password } = req.body;
        
    return res.status(200).json({
        ok: true,
        msg: 'delete event'
    });

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}