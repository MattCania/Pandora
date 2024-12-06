const {
	Inventories,
	InventoryTransaction,
	Permissions,
	InventoryPermissions,
  } = require("../models");
  const { Op, Sequelize } = require("sequelize");
  
  // Get all inventory records the user has access to
  const getInventories = async (req, res) => {
	const userId = req.params.user;
  
	try {
	  const inventories = await Inventories.findAll({
		include: [
		  {
			model: InventoryPermissions,
			as: "permissions",
			where: { permittedUser: userId },
			accessType: {
				[Sequelize.Op.gte]: 1,
			},
			include: [
				{
				  model: Permissions,
				  as: "userAccess",
				},
			  ],
		  },
		],
	  });
  
	  if (!inventories) return res.status(404).json({ message: "No inventory records found" });
  
	  res.status(200).json(inventories);
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Get a single inventory record by ID
  const getSingleInventory = async (req, res) => {
	const inventoryId = req.params.inventoryId;
  
	try {
	  const inventory = await Inventories.findOne({
		where: { inventoryId },
	  });
  
	  if (!inventory)
		return res.status(404).json({ message: "Inventory record not found" });
  
	  res.status(200).json(inventory);
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Create a new inventory record
  const createInventory = async (req, res) => {
	const userId = req.session.userId;
	const { inventoryName, description, userPermissions } = req.body;
  
	try {
	  const results = await Inventories.create({
		creatorId: userId,
		inventoryName: inventoryName,
		description: description,
		createdAt: new Date(),
		updatedAt: new Date(),
	  });
  
	  if (!results) throw new Error("Inventory Creation Failure");
  
	  const newInventoryId = results.inventoryId;
  
	  const response = await InventoryPermissions.create({
		inventoryId: newInventoryId,
		permittedUser: userId,
		accessLevel: 1,
	  });
  
	  if (!response) throw new Error("Inventory Creation Failure");
  
	  if (Array.isArray(userPermissions) && userPermissions.length > 0) {
		const permissions = await Promise.all(
		  userPermissions.map(async (userName) => {
			const user = await UserProfiles.findOne({
			  where: { userName: userName },
			});
  
			if (!user) {
			  throw new Error(`User with userName ${userName} not found`);
			}
  
			return {
			  recordId: newRecordId,
			  accessLevel: 3,
			  permittedUser: user.profileId,
			};
		  })
		);
  
		await RecordPermissions.bulkCreate(permissions);
	  }
	  res.status(200).json({ message: "Successful Record Creation", results });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Update an inventory record
  const updateInventory = async (req, res) => {
	const inventoryId = req.params.inventoryId;
	const { description, category, quantity, unitPrice, supplier, location } =
	  req.body;
  
	try {
	  const [updated] = await Inventories.update(
		{
		  description,
		  category,
		  quantity,
		  unitPrice,
		  supplier,
		  location,
		  updatedAt: new Date(),
		},
		{
		  where: { inventoryId },
		}
	  );
  
	  if (!updated)
		return res
		  .status(404)
		  .json({ message: "Failed to update inventory record" });
  
	  res.status(200).json({ message: "Inventory updated successfully" });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Delete an inventory record
  const deleteInventory = async (req, res) => {
	const inventoryId = req.params.inventoryId;
  
	try {
	  const inventory = await Inventories.findOne({ where: { inventoryId } });
  
	  if (!inventory)
		return res.status(404).json({ message: "Inventory record not found" });
  
	  await inventory.destroy();
  
	  res.status(200).json({ message: "Inventory deleted successfully" });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Get permissions for an inventory record
  const getInventoryPermissions = async (req, res) => {
	const inventoryId = req.params.inventoryId;
  
	try {
	  const permissions = await InventoryPermissions.findAll({
		where: { inventoryId },
	  });
  
	  if (!permissions.length)
		return res.status(404).json({ message: "No permissions found" });
  
	  res.status(200).json(permissions);
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  // Remove a user's permission for an inventory record
  const removePermission = async (req, res) => {
	const { inventoryId, userId } = req.params;
  
	try {
	  const result = await InventoryPermissions.destroy({
		where: { inventoryId, permittedUser: userId },
	  });
  
	  if (!result)
		return res
		  .status(400)
		  .json({ message: "Failed to remove permission" });
  
	  res.status(200).json({ message: "Permission removed successfully" });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };
  
  module.exports = {
	getInventories,
	getSingleInventory,
	createInventory,
	updateInventory,
	deleteInventory,
	getInventoryPermissions,
	removePermission,
  };
  