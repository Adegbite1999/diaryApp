const router = require('express').Router();

const { signin, signup, dashboard, updateProfile } = require('../controllers/auth');
const { authorization } = require('../middlewares/authorization');
const { addNewEntry, getAllEntry, getOneEntry, updateEntry, deleteEntry } = require('../controllers/diary')

router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.get('/user/dashboard', authorization, dashboard)
router.patch('/user/profile/update/:id', authorization,updateProfile )
router.post('/entries', authorization, addNewEntry)
router.get('/entries', authorization, getAllEntry)
router.get('/entries/:id', authorization, getOneEntry)
router.patch('/entries/:id', authorization, updateEntry)
router.delete('/entries/:id', authorization, deleteEntry);

// router.get('/auth/is-verified', authorization, Authentication.isVerified)


module.exports = router;