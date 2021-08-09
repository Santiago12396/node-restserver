const bcrypt = require('bcrypt');

const User = require("../models/user");

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});
    
        if(!user) {
            res.status(400).json({
                msg: 'Correo o contraseña no valido'
            });
        }
    
        if(!user.status) {
            res.status(400).json({
                msg: 'Correo o contraseña no valido'
            });
        }

        const validPassword =  bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            res.status(400).json({
                msg: 'Correo o contraseña no valido'
            });
        }

        const token = await generateJWT(user.id);
    
        res.json({
            user,
            token
        }); 
        
    } catch(err) {

        console.log(err);

        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });

    }
}

const googleSingIn = async (req, res) => {

    const { id_token } = req.body;

    try {

        const { email, name, img } = await googleVerify(id_token);

        const user = await User.findOne({email});

        if(!user) {

            const data = {
                email, 
                name, 
                img,
                google: true
            }

            const user = new User(data);

            await user.save();

        }

        if(!user.status) {
            res.status(401).json({
                msg: 'Usuario desactivado'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: 'Usuario de Google autenticado exitosamente',
            user,
            token
        });
        
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'Token de Google no valido'
        });
    }

}

module.exports = {
    login,
    googleSingIn
}