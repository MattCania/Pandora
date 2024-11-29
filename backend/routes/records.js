const express =require('express')
const router = express.Router()

const recordsController = require('../controllers/recordsController')

router.get('/records/:user', recordsController.getRecords);
router.post('/create-record', recordsController.createRecord)
router.post('/update-record/:recordId', recordsController.updateRecord)
router.get('/edit-record/:recordId', recordsController.getSingleRecord);
router.delete('/delete-record/:recordId', recordsController.deleteRecord);

module.exports = router;