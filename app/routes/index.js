const express = require('express');
const alarm = require('../controllers/alarm.controller.js');

const router = express.Router();

router.post('/alarm', alarm.addAlarm);
router.get('/alarm', alarm.getAllAlarm);
router.get('/alarm/:alarmId', alarm.getAlarm);
router.put('/alarm/:alarmId', alarm.updateAlarm);
router.delete('/alarm/:alarmId', alarm.deleteAlarm);
router.delete('/alarm', alarm.deleteAllAlarm);

module.exports = {
    routes: router
}