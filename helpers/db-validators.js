const Role = require('../models/role');
const User = require('../models/user');


const validRole = async (role = '') => {

    const existRole = await Role.findOne({role});

    if(!existRole) {
        throw new Error(`El rol ${role} no existe en la BD`);
    }

}

const validExistEmail = async (email = '') => {

    const existEmail = await User.findOne({email});
    
    if(existEmail) {
        throw new Error(`El email ${email} ya existe`);
    }
}

const validExistUser = async id => {

    const existUser = await User.findById(id);
    
    if(!existUser) {
        throw new Error(`El usuario no existe`);
    }
}


module.exports = {
    validRole,
    validExistEmail,
    validExistUser
}