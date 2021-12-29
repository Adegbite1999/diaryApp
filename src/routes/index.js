const router = require('express').Router();

const Authentication = require('../controllers/auth');
const {authorization} = require('../middlewares/authorization');
const {addNewEntry,getAllEntry, getOneEntry, updateEntry, deleteEntry} = require('../controllers/diary')

router.post('/auth/signup', Authentication.signup)
router.post('/auth/signin', Authentication.signin)
router.post('/entries', authorization, addNewEntry)
router.get('/entries', authorization, getAllEntry)
router.get('/entries/:id', authorization, getOneEntry)
router.patch('/entries/:id', authorization,updateEntry)
router.delete('/entries/:id', authorization, deleteEntry);
// router.get('/auth/is-verified', authorization, Authentication.isVerified)


module.exports = router;