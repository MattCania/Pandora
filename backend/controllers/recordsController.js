const dbHandler = require("../models/accounts");

const getRecords = async (req, res) => {
  const { user_id } = req.session.user;

  const recordsQry = `SELECT records.record_id,  records.record_name,  users.username, records.type, permissions.access_level
  FROM records
  LEFT JOIN permissions ON permissions.record_id = records.record_id
  LEFT JOIN users ON users.user_id = permissions.user_id
  WHERE permissions.user_id = ?`;

  try {
    const recordsData = await dbHandler.query(recordsQry, [user_id]);
    if (recordsData.length === 0)
      return res.status(404).json({ message: "Records are Empty" });
    else return res.status(200).json(recordsData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getExpenses = async (req, res) => {
  const { user_id } = req.session.user;
  const expenseId = req.params.id;

  const expenseQry = `
    SELECT 
      expenses.transaction_id, expenses.record_id,
      expenses.order_number, expenses.account,
      expenses.category, expenses.payment_type,
      expenses.transaction_date, expenses.description,
      expenses.amount, expenses.debit,
      expenses.credit, expenses.currency,
      expenses.vendor_customer, expenses.invoice_number,
      expenses.status, expenses.tax,
      expenses.balance, records.record_name
    FROM 
      expenses 
    LEFT JOIN 
      records ON records.record_id = expenses.record_id
    LEFT JOIN 
      permissions ON permissions.record_id = records.record_id
    WHERE 
      permissions.user_id = ? AND records.record_id = ?
  `;

  try {
    const expenseData = await dbHandler.query(expenseQry, [user_id, expenseId]);
    if (expenseData.length === 0)
      return res.status(404).json({ message: "No expenses found" });
    else return res.json(expenseData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching expenses" });
  }
};

const getPurchases = async (req, res) => {
  const { user_id } = req.session.user;
  const purchaseId = req.params.id;

  const purchaseQry = `
  SELECT 
    purchases.transaction_id,
    purchases.record_id,
    purchases.order_number,
    purchases.account,
    purchases.category,
    purchases.payment_type,
    purchases.transaction_date,
    purchases.description,
    purchases.amount,
    purchases.debit,
    purchases.credit,
    purchases.currency,
    purchases.vendor_customer,
    purchases.invoice_number,
    purchases.status,
    purchases.tax,
    purchases.balance,
    records.record_name
  FROM 
    purchases
  LEFT JOIN 
    records ON records.record_id = purchases.record_id
  LEFT JOIN 
    permissions ON permissions.record_id = records.record_id
  WHERE 
    permissions.user_id = ? AND records.record_id = ?
`;

  try {
    const purchasesData = await dbHandler.query(purchaseQry, [
      user_id,
      purchaseId,
    ]);
    if (purchasesData.length === 0)
      return res.status(404).json({ message: "No purchases found" });
    else return res.json(purchasesData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching purchases" });
  }
};

const newData = async (req, res) => {
  const {
    record_id,
    order_number,
    account,
    category,
    payment_type,
    transaction_date,
    description,
    amount,
    debit,
    credit,
    currency,
    vendor_customer,
    invoice_number,
    status,
    tax,
    balance,
  } = req.body;

  const queries = {
    type: `SELECT type FROM records WHERE record_id = ?`,
    insert: `INSERT INTO ??(
    record_id, order_number, 
    account, category, 
    payment_type, transaction_date, 
    description, amount, 
    debit, credit,
    currency, vendor_customer, 
    invoice_number, status, 
    tax, balance)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  };

  try {
    const typeData = await dbHandler.query(queries.type, [record_id]);
    const insertType =
      typeData[0].type === "purchases" ? "purchases" : "expenses";

    await dbHandler.query(queries.insert, [
      insertType,
      record_id,
      order_number,
      account,
      category,
      payment_type,
      transaction_date,
      description,
      amount,
      debit,
      credit,
      currency,
      vendor_customer,
      invoice_number,
      status,
      tax,
      balance,
    ]);

    return res.status(200).send(`Successfully Added new ${insertType}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

const newRecords = async (req, res) => {
  const { user_id } = req.session.user;
  const { record_name, created_at, record_type } = req.body;

  const queries = {
    addRecord: `INSERT INTO records (record_name, created_by, created_at, type) VALUES (?, ?, ?, ?)`,
    setPermission: `INSERT INTO permissions (record_id, user_id, access_level) VALUES (?, ?, "Owner")`,
  };

  try {
    const recordResult = await dbHandler.query(queries.addRecord, [
      record_name,
      user_id,
      created_at,
      record_type,
    ]);
    const recordId = recordResult.insertId;

    await dbHandler.query(queries.setPermission, [recordId, user_id]);
    return res
      .status(200)
      .send(`Successfully Added New Records: Owned by User: ${user_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const setPermissions = async (req, res) => {
  const { record_id, access_level, username } = req.body;

  if (!["Owner", "Write", "Read"].includes(access_level)) {
    return res.status(400).send("Invalid access level");
  }

  const queries = {
    getUser: `SELECT user_id 
              FROM users
              WHERE username = ?`,
    setPermission: `INSERT INTO permissions (record_id, user_id, access_level)
                    VALUES
                    (?, ?, ?)`,
  };

  try {
    const userData = await dbHandler.query(queries.getUser, [username]);
    if (userData.length === 0) return res.status(404).send("User Not Found");
    const userId = userData[0].user_id;
    await dbHandler.query(queries.setPermission, [
      record_id,
      userId,
      access_level,
    ]);
    return res
      .status(200)
      .send(
        `Successfully Added User ${userId} as ${access_level} of Record: ${record_id}`
      );
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getRecords,
  getExpenses,
  getPurchases,
  newData,
  newRecords,
  setPermissions,
};
