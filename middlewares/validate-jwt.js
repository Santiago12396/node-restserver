const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const { id } = req.params;

    const token = req.header('x-token');

    if(!token) {
        res.status(401).json({
            msg: 'No existe un token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        if(id === uid) {
            res.status(400).json({
                msg: 'token no valido - no se puede eliminar desde el mismo usuario'
            });
        }

        const user = await User.findById(uid);

        if(!user) {
            res.status(400).json({
                msg: 'token no valido - usuario no existe'
            });
        }

        
        if(!user.status) {
            res.status(400).json({
                msg: 'token no valido - usuario desactivado'
            });
        }

        req.user = user;

        next();
        
    } catch (err) {

        console.log(err);

        res.status(401).json({
            msg: 'Token no valido'
        });
    }



}

module.exports = {
    validateJWT
}