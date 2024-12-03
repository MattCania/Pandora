const {
  RecordPermissions,
  TransactionRecords,
  UserProfiles,
  Permissions,
  Expenses,
  Purchases,
  Sequelize,
} = require("../models");
const { Op } = require("sequelize");

// get all expenses on chosen record
const getExpenses = async (req, res) => {
  const recordId = req.params.recordId;
  const userId = req.session.userId;
  console.log("GETTING EXPENSES")

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

    if (!transactions) res.status(401).json({ message: "Transaction returned empty" });

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

    if (!transactions) res.status(401).json({ message: "Transaction returned empty" });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const createTransaction = async (req, res) => {
  const userId = req.session.userId;
};

const updateTransaction = async (req, res) => {
  const userId = req.session.userId;
};

const deleteTransaction = async (req, res) => {
  const { transaction } = req.params.transaction;
  const { transactionId } = req.params.transactionId;
};

module.exports = {
  getExpenses,
  getPurchases,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
