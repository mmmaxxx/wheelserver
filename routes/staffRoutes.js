const express = require('express');

const router = express.Router();
const staffController = require('../controllers/staffController');


router.get('/members', staffController.getMembers);

router.get('/members/:memberId', staffController.getMember)

router.post('/members', staffController.createMember);

router.put('/members/:memberId', staffController.updateMember);

router.delete('/members/:memberId', staffController.deleteMember);




module.exports = router;
