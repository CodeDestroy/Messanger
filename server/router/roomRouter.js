const Router = require('express');
const router = new Router();

const roomController = require('../controllers/roomController')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/getRooms', authMiddleware, roomController.getRooms);
router.post('/getUsersInRoom', roomController.getUsersInRoom);
router.post('/create', authMiddleware,  roomController.createRoom);
router.post('/addUsers', authMiddleware,  roomController.addUsers);
router.post('/delete', authMiddleware,  roomController.deleteRoom);


module.exports = router;



/* const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController.js')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware,  authController.getUsers);

module.exports = router; */