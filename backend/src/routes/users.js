const express =  require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const {getAllUsers, getUserInfo} = require('../controllers/userControllers');

router.get("/", auth, admin, getAllUsers);

router.get("/:userId", auth, admin, getUserInfo);

module.exports = router;