const express =require('express')
const router = express.Router()

const recordsController = require('../controllers/recordsController')

router.get('/records/:user', recordsController.getRecords);
router.get('/records/open/:recordId', recordsController.getSingleRecord)
router.get('/get-permission/:recordId', recordsController.authenticateAccess)
router.get('/permitted-users/:recordId', recordsController.getPermittedUsers)
router.get('/recordAmount/:transaction/:recordId', recordsController.getRecordAmount)
router.post('/create-record', recordsController.createRecord)
router.post('/update-record/:recordId', recordsController.updateRecord)
router.delete('/delete-record/:recordId', recordsController.deleteRecord);
router.delete('/delete-permission', recordsController.removePermission)

module.exports = router;