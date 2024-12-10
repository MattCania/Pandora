const {
  RecordPermissions,
  TransactionRecords,
  UserProfiles,
  Permissions,
  Expenses,
  Purchases,
  Sequelize,
} = require("../models");
const { Op, where } = require("sequelize");

const getExpenses = async (req, res) => {
  const recordId = req.params.recordId;
  const userId = req.session.userId;

  try {
    const transactions = await Expenses.findAll({
      include: [
        {
          model: TransactionRecords,
          as: "expenseTransaction",
          where: {
            recordId: recordId,
          },
          include: [
            {
              model: RecordPermissions,
              as: "recordPermissions",
              attributes: ["accessLevel"],
              where: {
                permittedUser: userId,
                accessLevel: {
                  [Sequelize.Op.gte]: 1,
                },
              },
            },
          ],
        },
      ],
    });

    if (!transactions)
      res.status(401).json({ message: "Transaction returned empty" });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getPurchases = async (req, res) => {
  const recordId = req.params.recordId;
  const userId = req.session.userId;

  try {
    const transactions = await Purchases.findAll({
      include: [
        {
          model: TransactionRecords,
          as: "purchaseTransaction",
          where: {
            recordId: recordId,
          },
          include: [
            {
              model: RecordPermissions,
              as: "recordPermissions",
              attributes: ["accessLevel"],
              where: {
                permittedUser: userId,
                accessLevel: {
                  [Sequelize.Op.gte]: 1,
                },
              },
            },
          ],
        },
      ],
    });

    if (!transactions)
      res.status(401).json({ message: "Transaction returned empty" });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getExpenseTransaction = async (req, res) => {
  const transactionId = req.params.transactionId

  try {
    const results = await Expenses.findOne({
      where: {transactionId: transactionId}
    })

    if (!results) res.status(404).json({message: 'Transaction Empty or Unfound'})

    res.status(200).json({message: 'Successful Data Fetching', results})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }

}

const getPurchaseTransaction = async (req, res) => {
  const transactionId = req.params.transactionId

  try {
    const results = await Purchases.findOne({
      where: {transactionId: transactionId}
    })

    if (!results) res.status(404).json({message: 'Transaction Empty or Unfound'})
    console.log(results)
    res.status(200).json({message: 'Successful Data Fetching', results})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}



const createExpenses = async (req, res) => {
  const recordId = req.params.recordId;
  const {
    account,
    paymentType,
    transactionDate,
    description,
    amount,
    currency,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;

  try {
    const creation = await Expenses.create({
      expenseId: recordId,
      account: account,
      paymentType: paymentType,
      transactionDate: transactionDate,
      description: description,
      amount: amount,
      currency: currency,
      vendorCustomer: vendorCustomer,
      invoiceNumber: invoiceNumber,
      tax: tax || 0,
      status: status || 'Completed'
    });

    if (!creation) throw new Error("Error Creating Transaction");

    res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const createPurchases = async (req, res) => {
  const recordId = req.params.recordId;
  const {
    account,
    paymentType,
    transactionDate,
    description,
    amount,
    currency,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;

  try {
    const creation = await Purchases.create({
      purchaseId: recordId,
      account: account,
      paymentType: paymentType,
      transactionDate: transactionDate,
      description: description,
      amount: amount,
      currency: currency,
      vendorCustomer: vendorCustomer,
      invoiceNumber: invoiceNumber,
      tax: tax || 0,
      status: status || 'Completed'
    });

    if (!creation) throw new Error("Error Creating Transaction");

    res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateExpenses = async (req, res) => {
  const transactionId = req.params.transactionId;
  const {
    orderNumber,
    account,
    category,
    paymentType,
    transactionDate,
    description,
    amount,
    credit,
    debit,
    currency,
    vendorCustomer,
    invoiceNumber,
    tax,
    balance,
  } = req.body;

  try {
    const [updateCount] = await Expenses.update(
      {
        orderNumber,
        account,
        category,
        paymentType,
        transactionDate,
        description,
        amount,
        credit,
        debit,
        currency,
        vendorCustomer,
        invoiceNumber,
        tax,
        balance,
      },
      { where: { transactionId  : transactionId } }
    );

    if (!updateCount) throw new Error("Error Updating Transaction");

    res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updatePurchases = async (req, res) => {
  const transactionId = req.params.transactionId;
  const {
    orderNumber,
    account,
    category,
    paymentType,
    transactionDate,
    description,
    amount,
    credit,
    debit,
    currency,
    vendorCustomer,
    invoiceNumber,
    tax,
    balance,
  } = req.body;

  try {
    const [updateCount] = await Purchases.update(
      {
        orderNumber,
        account,
        category,
        paymentType,
        transactionDate,
        description,
        amount,
        credit,
        debit,
        currency,
        vendorCustomer,
        invoiceNumber,
        tax,
        balance,
      },
      { where: { transactionId: transactionId } }
    );

    if (!updateCount) throw new Error("Error Updating Transaction");

    res.status(200).json({ message: "Successful Transaction Update" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteExpenses = async (req, res) => {
  const transactionId = req.params.transactionId;

  try {
    const response = await Expenses.destroy({
      where: {
        transactionId: transactionId,
      },
    });

    if (!response) throw new Error("Error Deleting Expense");

    res.status(200).json({ message: "Successfully Deleted Expense" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deletePurchases = async (req, res) => {
  const transactionId = req.params.transactionId;

  try {
    const response = await Purchases.destroy({
      where: {
        transactionId: transactionId,
      },
    });

    if (!response) throw new Error("Error Deleting Purchase");

    res.status(200).json({ message: "Successfully Deleted Purchase" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getExpenses,
  getPurchases,
  getExpenseTransaction,
  getPurchaseTransaction,
  createExpenses,
  createPurchases,
  updateExpenses,
  updatePurchases,
  deleteExpenses,
  deletePurchases,
};
