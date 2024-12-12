const {
  Inventories,
  InventoryTransaction,
  Permissions,
  InventoryPermissions,
} = require("../models");
const { Op, Sequelize, where } = require("sequelize");

// Get all inventory records the user has access to
const getInventories = async (req, res) => {
  const userId = req.session.userId;

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

    if (!inventories)
      return res.status(404).json({ message: "No inventory records found" });

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
	const {
    inventoryName,
	  type,
    category,
    quantity,
    unitPrice,
    status,
    description,
	} = req.body;
  
	try {
	  // Validate required fields
	  if (
		!inventoryName ||
		!category ||
		quantity === undefined ||
		unitPrice === undefined ||
    !type
	  ) {
		return res.status(400).json({ message: "Missing required fields" });
	  }
  
	  // Create inventory record
	  const newInventory = await Inventories.create({
		creatorId: userId,
		inventoryName,
		description: description || null, // Optional field
		category,
		quantity,
		unitPrice,
    type,
		status: status || "In Stock", // Default status if not provided
		createdAt: new Date(),
		updatedAt: new Date(),
	  });
  
	  if (!newInventory) throw new Error("Inventory Creation Failure");
  
	  await InventoryPermissions.create({
		inventoryId: newInventory.inventoryId,
		permittedUser: userId,
		accessLevel: 1,
	  });
  
	  res.status(200).json({ message: "Inventory successfully created", newInventory });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Server Error", error: err.message });
	}
  };

// Update an inventory record
const updateInventory = async (req, res) => {
  const { inventoryId } = req.params;
  const {
    inventoryName,
	  type,
    category,
    quantity,
    unitPrice,
    status,
    description,
	} = req.body;

  try {
    // Perform the update
    const [updated] = await Inventories.update(
      {
        inventoryName: inventoryName,
        type:type,
        category:category,
        quantity:quantity,
        unitPrice: unitPrice,
        status: status, 
        description: description,
        updatedAt: new Date(), // To track updates
      },
      {
        where: { inventoryId },
      }
    );

    // Handle cases where the inventory was not found
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Inventory not found or update failed." });
    }

    // Success response
    res.status(200).json({ message: "Inventory updated successfully." });
  } catch (error) {
    // Log and handle errors
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
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
      return res.status(400).json({ message: "Failed to remove permission" });

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
