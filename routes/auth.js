const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();

const {newUser,loginUser,revalidarToken} = require('../controllers/authController');
const { validFields } = require('../middlewares/validFieldsMiddleware');
const { validJWT } = require('../middlewares/checkJWTMiddleware');

router.post('/new',
[
    body('name','El nombre es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    body('password','El password debe ser mayor a 6 caracteres').isLength(6),
    validFields
]
,newUser);

router.post('/',
[
    body('email','El email es obligatorio').not().isEmpty(),
    body('password','El password es obligatorio').not().isEmpty(),
    validFields
]
,loginUser);

router.get('/renew',validJWT,revalidarToken);


module.exports = router;