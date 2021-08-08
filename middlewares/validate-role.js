
const validateAdmin = (req, res, next) => {

    if(!req.user) {
        res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, name } = req.user;
    
    if(role !== 'ADMIN_ROLE') {
        res.status(403).json({
            msg: `El usuario ${name} no esta autorizado`
        });
    }

    next();

}

const validateRole = (...roles) => {

    return (req, res, next) => {

        if(!req.user) {
            res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.user.role)) {
            res.status(403).json({
                msg: `Los autorizados para esta petición son los roles: ${roles}`
            });
        }

        next();

    }

} 

module.exports = {
    validateAdmin,
    validateRole
}