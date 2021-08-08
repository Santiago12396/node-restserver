const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user');

const { validateJWT,  validateRole, validateAdmin, validateFields  } = require('../middlewares');

const { validRole, validExistEmail, validExistUser } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres como minimo').isLength({min: 6}),
    check('email', 'El correo ya existe').custom(validExistEmail),
    check('role', 'El rol ingresado no es valido').custom(validRole),
    validateFields
] ,usersPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validExistUser),
    check('role', 'El rol ingresado no es valido').custom(validRole),
    validateFields
], usersPut);

router.delete('/:id', [
    validateJWT,
    // validateAdmin,
    validateRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validExistUser),
    validateFields
], usersDelete);

module.exports = router;