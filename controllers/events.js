const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event  .find()
                                .populate('user','name');
        
    return res.status(200).json({
        ok: true,
        events: events
    });

}

const createEvent = async( req, res = response ) => {

    const event = new Event(req.body);
    
    try {

        event.user = req.uid;
        const savedEvent = await event.save();

        return res.json({
            ok:true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacte a su administrador'
        });
    }
}

const updateEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok:false,
                msg:"El evento no existe"
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene permisos para editar este evento"
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        return res.status(200).json({
            ok: true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Contacte a su administrador"
        });
    }

}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok:false,
                msg:"El evento no existe"
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene permisos para eliminar este evento"
            });
        }

        const deletedEvent = await Event.findByIdAndDelete( eventId );

        return res.status(200).json({
            ok: true,
            event: deletedEvent
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Contacte a su administrador"
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}