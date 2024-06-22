const {response} = require('express');
const Usuario = require('../models/userModel');
const bycrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');

const newUser = async(req,resp = response) =>{

    try{
         
        const {email,password} = req.body;

        let usuario = await Usuario.findOne({email});
        
        if (usuario){

            return resp.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado, intente con otro'
            });
        }

        const salt = bycrypt.genSaltSync();

        usuario = new Usuario(req.body);

        usuario.password = bycrypt.hashSync(password,salt);

        await usuario.save();

        const token = await createJWT(usuario.id,usuario.name);

        resp.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }catch(error){

        console.log(error);
        resp.status(500).json({
            ok: true,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });

    }
}

const loginUser = async(req,resp = response) =>{

    const {email,password} = req.body;

    try{

        const usuario = await Usuario.findOne({email});

        if (!usuario){

            return resp.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no existen'
            });
        }

        const validPass = bycrypt.compareSync(password,usuario.password);

        if (!validPass){
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            }); 
        }

        const token = await createJWT(usuario.id,usuario.name);

        resp.status(200).json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ocurrio en error contacte con el administrador del sitio'
        });
    }
}

const revalidarToken = async(req,resp = response) =>{

    const { uid,name } = req;

    const token = await createJWT(uid,name);

    resp.json({
        ok: true,
        token
    });
}

module.exports = {
    newUser,
    loginUser,
    revalidarToken
}