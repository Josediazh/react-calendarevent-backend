const {response} = require('express');
const Evento = require('../models/eventModel');

const newEvent = async(req,resp = response) =>{
    try{

        //const {title,start,end,notes} = req.body;

        const evento = new Evento(req.body);

        evento.usr = req.uid;

        const newEvento = await evento.save();

        resp.status(201).json({
            ok: true,
            evento: newEvento
            
        });

    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });
    }
}

const updateEvent = async(req,resp = response) =>{

    const uid = req.params;
    const iduser = req.uid;

    try{

        const eventUpdate = await Evento.findOne(uid);

        if (!eventUpdate){

            return resp.status(400).json({
                ok: false,
                msg: 'No se encontro el evento'
            });

        }

        if (eventUpdate.usr.toString() !== iduser ){
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar este evento'
            });
        }

        const payload = {
            ...req.body,
            usr: iduser
        }

        const eventoUpdate = await Evento.findOneAndUpdate(uid,payload,{
            new: true
          });

        resp.status(201).json({
            ok: true,
            evento: eventoUpdate
        });

    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });
    }
}


const deleteEvent = async(req,resp = response) =>{

    try{

        const uid = req.params;

        const iduser = req.uid;

        const event = await Evento.findOne(uid);

        if (!event){
            return resp.status(500).json({
                ok: false,
                msg: 'No se encontro el evento'
            });
        }

        if (event.usr.toString() !== iduser ){
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(uid);

        resp.status(201).json({
            ok: true            
        });

    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });
    }
}

const getEvents = async(req,resp = response) =>{
    try{

        const eventos = await Evento.find()
                                    .populate('usr','name')

        resp.status(201).json({
            ok: true,
            eventos
        });

    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });
    }
}

module.exports = {
    newEvent,
    updateEvent,
    deleteEvent,
    getEvents
}