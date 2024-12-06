"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        accessType: "Admin",
      },
      {
        accessType: "Owner",
      },
      {
        accessType: "Editor",
      },
      {
        accessType: "Viewer",
      },
    ]);

    await queryInterface.bulkInsert("TransactionRecords", [
      {
        creatorId: 1,
        recordType: "Expenses",
        recordName: "Office Supplies",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 2,
        recordType: "Purchases",
        recordName: "Hardware Purchases",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 3,
        recordType: "Expenses",
        recordName: "Travel Expenses",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 4,
        recordType: "Purchases",
        recordName: "Software Licenses",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("RecordPermissions", [
      { recordId: 1, permittedUser: 1, accessLevel: 1 },
      { recordId: 1, permittedUser: 3, accessLevel: 2 },
      { recordId: 2, permittedUser: 2, accessLevel: 1 },
      { recordId: 2, permittedUser: 4, accessLevel: 2 },
      { recordId: 3, permittedUser: 1, accessLevel: 2 },
      { recordId: 3, permittedUser: 2, accessLevel: 1 },
      { recordId: 4, permittedUser: 3, accessLevel: 1 },
      { recordId: 4, permittedUser: 4, accessLevel: 2 },
    ]);

    // Insert Expenses
    const expenses = [];
    for (let i = 1; i <= 4; i++) {
      expenses.push({
        expenseId: i,
        orderNumber: `ORD${i.toString().padStart(3, "0")}`,
        account: "Expenses",
        category: i % 2 === 0 ? "Travel" : "Office",
        paymentType: i % 3 === 0 ? "Credit Card" : "Cash",
        transactionDate: new Date(`2024-0${(i % 12) + 1}-01 10:00:00`),
        description: `Expense Description ${i}`,
        amount: Math.floor(Math.random() * 1000 + 100),
        credit: 0,
        debit: 0,
        currency: "USD",
        vendorCustomer: `Vendor ${i}`,
        invoiceNumber: `INV${i.toString().padStart(3, "0")}`,
        tax: Math.floor(Math.random() * 100),
        balance: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Expenses", expenses);

    // Insert Purchases
    const purchases = [];
    for (let i = 1; i <= 4; i++) {
      purchases.push({
        purchaseId: i,
        orderNumber: `ORD${(i + 20).toString().padStart(3, "0")}`,
        account: "Liabilities",
        category: i % 2 === 0 ? "Software" : "Hardware",
        paymentType: i % 3 === 0 ? "Bank Transfer" : "Check",
        transactionDate: new Date(`2024-0${(i % 12) + 1}-10 15:00:00`),
        description: `Purchase Description ${i}`,
        amount: Math.floor(Math.random() * 2000 + 200),
        credit: 0,
        debit: 0,
        currency: "USD",
        vendorCustomer: `Customer ${i}`,
        invoiceNumber: `INV${(i + 20).toString().padStart(3, "0")}`,
        tax: Math.floor(Math.random() * 150),
        balance: Math.floor(Math.random() * 2000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Purchases", purchases);

    console.log("Inserting Transactions");
    const inventoryTransactionsData = [
      {
        inventoryId: 1,
        creatorId: 1,
		inventoryName: 'Inventory Sample A',
        description: "Received additional raw materials",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryId: 2,
        creatorId: 2,
		inventoryName: 'Inventory Sample B',
        description: "Office chairs delivered to office",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryId: 3,
        creatorId: 3,
		inventoryName: 'Inventory Sample C',
        description: "Printer ink reordered",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryId: 4,
        creatorId: 4,
		inventoryName: 'Inventory Sample D',
        description: "Packaging boxes sent to production",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Inventories", inventoryTransactionsData);

    console.log("Inserting Permissions");
    // Seed data for the "inventorypermissions" table
    const inventoryPermissionsData = [
      {
        permissionId: 1,
        inventoryId: 1,
        permittedUser: 1,
        accessLevel: 1,
      },
      {
        permissionId: 2,
        inventoryId: 2,
        permittedUser: 2,
        accessLevel: 2,
      },
      {
        permissionId: 3,
        inventoryId: 3,
        permittedUser: 3,
        accessLevel: 1,
      },
      {
        permissionId: 4,
        inventoryId: 4,
        permittedUser: 4,
        accessLevel: 3,
      },
    ];
    await queryInterface.bulkInsert(
      "InventoryPermissions",
      inventoryPermissionsData
    );

    console.log("Inserting Inventory");
    const inventoryData = [
      {
        inventoryRecord: 1,
        name: "Raw Material A",
        description: "High-quality raw material for production",
        category: "Raw Materials",
        quantity: 100,
        unitPrice: 50.0,
        supplier: "Supplier A",
        location: "Warehouse 1",
        minQty: 10,
        status: "In Stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryRecord: 2,
        name: "Office Chair",
        description: "Ergonomic office chair",
        category: "Furniture",
        quantity: 20,
        unitPrice: 150.0,
        supplier: "Office Supplies Inc.",
        location: "Main Office",
        minQty: 5,
        status: "In Stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryRecord: 3,
        name: "Printer Ink",
        description: "High-quality ink for printers",
        category: "Office Supplies",
        quantity: 50,
        unitPrice: 25.0,
        supplier: "Tech Supplies",
        location: "Office Storage",
        minQty: 10,
        status: "Reserved",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        inventoryRecord: 4,
        name: "Packaging Boxes",
        description: "Boxes for product packaging",
        category: "Packaging Materials",
        quantity: 200,
        unitPrice: 2.5,
        supplier: "Packaging Solutions",
        location: "Warehouse 2",
        minQty: 50,
        status: "In Stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("InventoryTransactions", inventoryData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Expenses", null, {});
    await queryInterface.bulkDelete("Purchases", null, {});
    await queryInterface.bulkDelete("TransactionRecords", null, {});
    await queryInterface.bulkDelete("RecordPermissions", null, {});
    await queryInterface.bulkDelete("Inventories", null, {});
    await queryInterface.bulkDelete("InventoryTransactions", null, {});
    await queryInterface.bulkDelete("InventoryPermissions", null, {});

    await queryInterface.bulkDelete("Permissions", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Permissions AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Expenses AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Purchases AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE TransactionRecords AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE RecordPermissions AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE InventoryTransactions AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Inventories AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE InventoryPermissions AUTO_INCREMENT = 1"
    );
  },
};
