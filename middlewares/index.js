const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');
const validateFields = require('../middlewares/validate-fields');

module.exports = {
    ...validateJWT,
    ...validateRole,
    ...validateFields
}