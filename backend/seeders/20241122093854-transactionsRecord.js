"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    function getRandomDateTime() {
      const year = 2024
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
      const hour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
      const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    console.log('Starting Seeders')

    await queryInterface.bulkInsert("Permissions", [
      { accessType: "Admin" },
      { accessType: "Owner" },
      { accessType: "Editor" },
      { accessType: "Viewer" },
    ]);

    console.log("Seeding Transaction Records...");

    const recordNames = [
      "Office Supplies", "Hardware Purchases", "Travel Expenses", "Software Licenses"
    ]

    const bulkRecords = []
    for (let i = 0; i < 5; i++){
      bulkRecords.push({
        creatorId: Math.floor(Math.random() * 2) + 1,
        recordType: Math.floor(Math.random() * 2) + 1 === 1 ? 'Expenses' : 'Purchases',
        recordName: recordNames[Math.floor(Math.random() * recordNames.length)],
        createdAt: getRandomDateTime(),
        updatedAt: getRandomDateTime(),
      })
    }

    await queryInterface.bulkInsert("TransactionRecords", bulkRecords);

    console.log("seeding Record Permissions");

    await queryInterface.bulkInsert("RecordPermissions", [
      { recordId: 1, permittedUser: 1, accessLevel: 1 },
      { recordId: 1, permittedUser: 2, accessLevel: 2 },
      { recordId: 2, permittedUser: 1, accessLevel: 1 },
      { recordId: 2, permittedUser: 2, accessLevel: 2 },
    ]);

    const randomRecurrance = ['Monthly', 'Semi-Monthly', 'Annually', 'Quarterly']
    const statuses = ["Completed", "Incomplete", "Pending", "Cancelled"]
    console.log("Seeding Transactions");
    // Insert Expenses
    const expenses = [];
    for (let i = 1; i < 100; i++) {
      expenses.push({
        expenseId: Math.floor(Math.random() * 2) + 1,
        account: "Expenses",
        paymentType: i % 3 === 0 ? "Credit Card" : "Cash",
        transactionDate: new Date(`2024-0${(i % 12) + 1}-01 10:00:00`),
        description: `Expense Description ${i}`,
        amount: Math.floor(Math.random() * 1000 + 100) + 1,
        currency: "USD",
        recurring: randomRecurrance[Math.floor(Math.random() * 3)],
        status: statuses[Math.floor(Math.random() * 3)],
        vendorCustomer: `Vendor ${i}`,
        invoiceNumber: `INV${i.toString().padStart(3, "0")}`,
        tax: Math.floor(Math.random() * 100) + 1,
        createdAt: getRandomDateTime(),
        updatedAt: getRandomDateTime(),
      });
    }
    await queryInterface.bulkInsert("Expenses", expenses);

    // Insert Purchases
    const purchases = [];
    for (let i = 1; i < 100; i++) {
      purchases.push({
        purchaseId: Math.floor(Math.random() * 2) + 1,
        account: "Liabilities",
        paymentType: i % 3 === 0 ? "Credit Card" : "Cash",
        transactionDate: new Date(`2024-0${(i % 12) + 1}-01 10:00:00`),
        description: `Purchase Description ${i}`,
        amount: Math.floor(Math.random() * 1000 + 100) + 1,
        currency: "USD",
        recurring: randomRecurrance[Math.floor(Math.random() * 3)],
        status: statuses[Math.floor(Math.random() * 3)],
        vendorCustomer: `Vendor ${i}`,
        invoiceNumber: `INV${i.toString().padStart(3, "0")}`,
        tax: Math.floor(Math.random() * 100) + 1,
        createdAt: getRandomDateTime(),
        updatedAt: getRandomDateTime(),
      });
    }
    await queryInterface.bulkInsert("Purchases", purchases);

    const inventoryCategory = [
      "Raw Materials", "Finished Goods","Work-in-Progress", "Consumables",
      "Office Supplies", "Machinery and Equipment","Furniture", "Electronics",
      "Vehicles", "Health and Safety","Packaging Materials", "Perishable Goods",
      "Non-Perishable Goods", "Tools","Miscellaneous"
    ];

    const inventoryStatus = [
      "In Stock","Out of Stock","Reserved","On Order",
      "In Transit","Backordered","Pending","Damaged",
      "Quarantined","Returned","Ready for Dispatch","Under Maintenance",
      "Expired","On Hold","Sold","Recalled","Available for Allocation"
    ];

    console.log("Seeding Inventory");

    const inventoryData = [];
    for (let i = 0; i < 20; i++) {
      inventoryData.push({
        creatorId: Math.floor(Math.random() * 2) + 1,
        inventoryName:
          Math.floor(Math.random() * 2) + 1 === 1 ? `Stock ${i + 1}` : `Inventory ${i + 1}`,
        description: `Inventory Description ${i}`,
        type:
          Math.floor(Math.random() * 2) + 1 === 1 ? `Goods` : `Service`,
        category: inventoryCategory[Math.floor(Math.random() * inventoryCategory.length)],
        quantity: Math.floor(Math.random() * 100),
        unitPrice: Math.floor(Math.random() * 500),
        status: inventoryStatus[Math.floor(Math.random() * inventoryStatus.length)],
        createdAt: getRandomDateTime(),
        updatedAt: getRandomDateTime(),
      });
      // console.log(inventoryData)
    }
    await queryInterface.bulkInsert("Inventories", inventoryData);

    // Seed data for the "inventorypermissions" table
    const inventoryPermissions = [
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
      }
    ];
    await queryInterface.bulkInsert("InventoryPermissions", inventoryPermissions);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Expenses", null, {});
    await queryInterface.bulkDelete("Purchases", null, {});
    await queryInterface.bulkDelete("TransactionRecords", null, {});
    await queryInterface.bulkDelete("RecordPermissions", null, {});
    await queryInterface.bulkDelete("Inventories", null, {});
    await queryInterface.bulkDelete("InventoryPermissions", null, {});
    await queryInterface.bulkDelete("UserWallets", null, {});

    await queryInterface.bulkDelete("Permissions", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Permissions AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE UserWallets AUTO_INCREMENT = 1"
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
      "ALTER TABLE Inventories AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE InventoryPermissions AUTO_INCREMENT = 1"
    );
  },
};
