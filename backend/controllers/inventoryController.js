const { UserAccounts, UserProfiles, Inventory, InventoryTransactions } = require('../models') 
const iaAuthernticated = require('../middleware/authenticator')

const getInventory = async(req, res) => {
	
	try {
		const inventory = await Inventory.findAll()
	
		

	} catch (err) {
		console.log(err)
		return res.status(500).json({message: 'Error Fetching Inventory Data', error: err.message})
	}



}

const addInventory = async(req, res) => {


}

const deleteInventory = async (req, res) => {
	
}

const updateInventory = async (req, res) => {

}

const getInventoryTransaction = async (req, res) => {
	
}

const addInventoryTransaction = async (req, res) => {

}

const deleteInventoryTransaction = async (req, res) => {

}

const updateInventoryTransaction = async (req, res) => {

}

module.exports = {
}