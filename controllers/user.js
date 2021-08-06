const { response, request} = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0} = req.query;

    const [ total, user ] = await Promise.all([
        User.countDocuments({status: true}),
        User.find({status: true}).limit(Number(limit)).skip(Number(from))
    ]);

    res.json({
        total,
        user
    });
}

const usersPost = async (req, res = response) => {

    const {name, email, password, role} = req.body;

    const user = new User({name, email, password, role});

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en la base de datos
    await user.save();

    res.json({
        msg: 'Consumo Post exitoso',
        user
    });
}

const usersPut =  async (req, res = response) => {

    const { id } = req.params;

    const { _id, password, email, google, ...userResult } = req.body;

    if(password) {
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        userResult.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userResult);

    res.json({
        msg: 'Consumo Post exitoso',
        user
    });
}

const usersDelete = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: 'Consumo Delete exitoso',
        user
    });

}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}