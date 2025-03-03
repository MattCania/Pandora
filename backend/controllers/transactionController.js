const {
  RecordPermissions,
  TransactionRecords,
  UserProfiles,
  Permissions,
  UserWallets,
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
  const userId = req.session.userId
  const recordId = req.params.recordId;
  const {
    account,
    paymentType,
    reccuring,
    transactionDate,
    description,
    amount,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;

  try {
    const currency = UserProfiles.findOne({where: userId, attributes: ['currency']})

    const creation = await Expenses.create({
      expenseId: recordId,
      account: account,
      paymentType: paymentType,
      transactionDate: transactionDate,
      description: description,
      reccuring: reccuring || null,
      amount: amount,
      currency: currency.currency,
      vendorCustomer: vendorCustomer,
      invoiceNumber: invoiceNumber,
      tax: tax || 0,
      status: status || 'Completed'
    });

    if (!creation) throw new Error("Error Creating Transaction");
    console.log("Wallet Setup")
    if (status === 'Completed'){
      const wallet = await UserWallets.findOne({ where: {userId: userId}})
      // const newAmount = wallet.wallet - ( Number(amount) + Number(tax) )
      const newAmount = wallet.wallet - Number(amount) 
      const subtractWallet = await UserWallets.update(
        {
          wallet: newAmount
        },
        {
          where: {userId: userId}
        }
      )

      if (!subtractWallet) throw new Error('Error Wallet Subtract')
    }

    return res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: err.message });
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
    reccuring,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;

  try {
    const currency = UserProfiles.findOne({where: userId, attributes: ['currency']})
    const creation = await Purchases.create({
      purchaseId: recordId,
      account: account,
      paymentType: paymentType,
      transactionDate: transactionDate,
      description: description,
      amount: amount,
      reccuring: reccuring || null,
      currency: currency.currency,
      vendorCustomer: vendorCustomer,
      invoiceNumber: invoiceNumber,
      tax: tax || 0,
      status: status || 'Completed'
    });

    if (!creation) throw new Error("Error Creating Transaction");``

    if (status === 'Completed'){
      const wallet = await UserWallets.findOne({ where: {userId: userId}})
      // const newAmount = wallet.wallet - ( Number(amount) + Number(tax) )
      const newAmount = wallet.wallet - Number(amount) 
      const subtractWallet = await UserWallets.update(
        {
          wallet: newAmount
        },
        {
          where: {userId: userId}
        }
      )

      if (!subtractWallet) throw new Error('Error Wallet Subtract')
    }

    return res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateExpenses = async (req, res) => {
  const userId = req.session.userId
  const transactionId = req.params.transactionId;
  const {
    account,
    paymentType,
    transactionDate,
    description,
    amount,
    reccuring,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;
  try {
    // const currency = await UserProfiles.findOne({where: userId, attributes: ['currency']})
    const prevValues = await Expenses.findAll({where: {transactionId: transactionId}, attributes: ['tax', 'amount', 'status']})
    const [updateCount] = await Expenses.update(
      {
        account,
        paymentType,
        transactionDate,
        description,
        amount,
        reccuring,
        vendorCustomer,
        invoiceNumber,
        tax,
        status
      },
      { where: { transactionId  : transactionId } }
    );
    console.log("Previous Status", prevValues[0].status)
    console.log("Current Stauts", status)
    if (status === 'Completed' && prevValues[0].status !== 'Completed' ){
      console.log(`Previous Tax: ${prevValues[0].tax} and Current Tax: ${tax}`)
      console.log(`Previous Amount: ${prevValues[0].amount} and Current Amount: ${amount}`)
      const wallet = await UserWallets.findOne({ where: {userId: userId}})
      // const newAmount = wallet.wallet - ( Number(amount) + Number(tax) )
      const newAmount = wallet.wallet - Number(amount) 
      const subtractWallet = await UserWallets.update(
        {
          wallet: newAmount
        },
        {
          where: {userId: userId}
        }
      )

      if (!subtractWallet) throw new Error('Error Wallet Subtract')
    }

    if (!updateCount) throw new Error("Error Updating Transaction");

    res.status(200).json({ message: "Successful Transaction Creation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updatePurchases = async (req, res) => {
  const userId = req.session.userId
  const transactionId = req.params.transactionId;
  const {
    account,
    paymentType,
    transactionDate,
    description,
    amount,
    reccuring,
    vendorCustomer,
    invoiceNumber,
    tax,
    status
  } = req.body;
  try {
    // const currency = await UserProfiles.findOne({where: userId, attributes: ['currency']})
    const prevValues = await Purchases.findAll({where: {transactionId: transactionId}, attributes: ['tax', 'amount', status]})

    const [updateCount] = await Expenses.update(
      {
        account,
        paymentType,
        transactionDate,
        description,
        amount,
        reccuring,
        vendorCustomer,
        invoiceNumber,
        tax,
        status
      },
      { where: { transactionId  : transactionId } }
    );

    const isComplete = status === 'Completed' && prevValues.status !== status

    if (status === 'Completed' && prevValues[0].status !== 'Completed' ){
      console.log(`Previous Tax: ${prevValues[0].tax} and Current Tax: ${tax}`)
      console.log(`Previous Amount: ${prevValues[0].amount} and Current Amount: ${amount}`)
      const wallet = await UserWallets.findOne({ where: {userId: userId}})
      // const newAmount = wallet.wallet - ( Number(amount) + Number(tax) )
      const newAmount = wallet.wallet - Number(amount) 
      const subtractWallet = await UserWallets.update(
        {
          wallet: newAmount
        },
        {
          where: {userId: userId}
        }
      )

      if (!subtractWallet) throw new Error('Error Wallet Subtract')
    }

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

const userBasedExpense = async(req, res) => {
  const userId = req.params.userId;
  console.log(req.params.userId)
  try {
    // Gets all records that the user is permitted to use
    const records = await TransactionRecords.findAll({
      attributes: ['recordId'],
      include: [
        {
          model: RecordPermissions,
          as: "recordPermissions",
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

    if (!records) return res.status(404).json({ message: "No records found" });
    console.log('Records', records)

    const expenses = []

    for (const record of records) {
      const expenseDetails = await Expenses.findAll({
        where: { expenseId: record.recordId },
        attributes: ['amount', 'transactionDate']
      });
  
      expenses.push(...expenseDetails);
    }
    
    if (!expenses) throw new Error('expenses err')

    return res.status(200).json(expenses)
  
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error", error: error.message });
}
}

const userBasedPurchase = async(req, res) => {
  const userId = req.params.userId;
  console.log(req.params.userId)
  try {
    // Gets all records that the user is permitted to use
    const records = await TransactionRecords.findAll({
      attributes: ['recordId'],
      include: [
        {
          model: RecordPermissions,
          as: "recordPermissions",
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

    if (!records) return res.status(404).json({ message: "No records found" });
    console.log('Records', records)

    const purchases = []

    for (const record of records) {
      const purchaseDetails = await Purchases.findAll({
        where: { purchaseId: record.recordId },
        attributes: ['amount', 'transactionDate']
      });
  
      purchases.push(...purchaseDetails);
    }
    
    if (!purchases) throw new Error('expenses err')

    return res.status(200).json(purchases)
  
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error", error: error.message });
}
}


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
  userBasedExpense,
  userBasedPurchase
};
