const bcrypt = require('bcrypt');

const User = require("../models/user");

const { generateJWT } = require('../helpers/generate-jwt');

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

module.exports = {
    login
}