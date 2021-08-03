const { response, request} = require('express');

const usersGet = (req = request, res = response) => {

    const { page = '1', limit = '10' } = req.query;

    res.json({
        msg: 'Consumo Get exitoso',
        page,
        limit
    });
}

const usersPost = (req, res = response) => {

    const { name , apell} = req.body;

    res.json({
        msg: 'Consumo Post exitoso',
        name,
        apell
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Consumo Post exitoso',
        id
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut
}