const router = require('express').Router();

const Authentication = require('../controllers/auth')

router.post('/auth/register', Authentication.signup)
router.post('/auth/login', Authentication.signin)



module.exports = router;