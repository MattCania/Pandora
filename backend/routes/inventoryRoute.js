const express =require('express')
const router = express.Router()

const inventoryController = require('../controllers/inventoryController')

router.get('/inventory/:user', inventoryController.getInventories);
router.get('/inventory/open/:inventoryId', inventoryController.getSingleInventory)
router.get('/inventory/get-permission/:inventoryId', inventoryController.getInventoryPermissions)
router.post('/create-inventory', inventoryController.createInventory)
router.post('/update-inventory/:inventoryId', inventoryController.updateInventory)
router.delete('/delete-inventory/:inventoryId', inventoryController.deleteInventory);
router.delete('/delete-permission/:userId', inventoryController.removePermission)

module.exports = router;