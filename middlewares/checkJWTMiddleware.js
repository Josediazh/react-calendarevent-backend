const {response} = require('express');
const jwt = require('jsonwebtoken');

const validJWT = (req,resp = response,next) =>{

    const token = req.header('x-token');
    if (!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No se recibio ningun token'
        }) 
    }

    try{
        const { uid,name } = jwt.verify(token,process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

    }catch{

        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }

    next();

}

module.exports = {
    validJWT
}