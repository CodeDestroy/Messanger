const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController.js')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware,  authController.getUsers);

module.exports = router;