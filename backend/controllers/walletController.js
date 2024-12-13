const { UserAccounts, UserProfiles, UserWallets } = require('../models')

const fetchWalletInfo = async (userId) => {
    const walletInfo = await UserWallets.findOne({
      where: { userId: userId },
      attributes: ['recurrance', 'income', 'wallet']
    });
    if (walletInfo.length === 0) throw new Error({ status: 401, message: 'Wallet Information Unfound' });
	return (walletInfo);
};

const processRecurringIncome = async (userId) => {
	const walletInfo = await fetchWalletInfo(userId);
	return UserWallets.update(
	  { wallet: walletInfo.income },
	  { where: { userId } }
	);
  };

const getWallet = async (req ,res) => {
	const userId = req.session.userId;

	try {
		const walletInfo = await fetchWalletInfo(userId)
		
		if (!walletInfo || walletInfo.length === 0) throw new Error({status: 400, message: 'Error fetching wallet information'})

		return res.status(200).json({ result: walletInfo})
	} catch (error) {
		return res.status(error.status).json({error: error.message})
	}

}

const updateWallet = async (req, res) => {
	const userId = req.session.userId;
	const { recurrance, income, wallet } = req.body;

	try{
		const walletInfo = await fetchWalletInfo(userId)

		let newWallet
		if (wallet === walletInfo.income) {
			newWallet = income
		}
		else{
			newWallet = wallet
		}
		const result = await UserWallets.update(
    	  {
    	    recurrance: recurrance || "Monthly",
    	    income: Number(income) || 0,
    	    wallet: Number(newWallet) || 0,
    	  },
    	  {
    	    where: { userId: userId },
    	  }
    	);
		if (!result) throw new Error({status: 400, message: `Error Updating User ${userId} Wallet`})
		
		res.status(200).json({message: 'Successfully Updated Wallet'})
		
	} catch (error) {
		return res.status(error.status || 500).json({error: error.message})
	}

}

//Cron based
const recurIncomeCron = async (userId) => {
	try {
	  const result = await processRecurringIncome(userId);
	  console.log(`Cron job updated wallet for userId: ${userId}`, result);
	} catch (error) {
	  console.error(`Cron job failed for userId: ${userId}`, error);
	}
  };

// HTTP Request based recurrance
const recurIncome = async (req, res) => {
	const userId = req.session.userId;
  
	try {
	  const result = await processRecurringIncome(userId);
	  if (!result) throw new AppError(400, 'Error Resetting Income');
	  res.status(200).json({ message: 'Successfully Recurred Wallet' });
	} catch (error) {
	  res.status(error.status || 500).json({ error: error.message });
	}
  };

const walletAdd = async (req, res) => {
	const userId = req.session.userId

	try {
		const walletInfo = await fetchWalletInfo(userId)
		
		if (!walletInfo || walletInfo.length === 0) throw new Error({status: 400, message: 'Error fetching wallet information'})
		
		

	} catch (error) {
		
		return res.status(error.status).json({error: error.message})
	}

}

const walletSubtract = async (req, res) => {
	const userId = req.session.userId;
	const { amount, tax, status } = req.body;

	// console.log({
	// 	tax: tax,
	// 	amount: amount,
	// 	status:status
	// })
	try {
	  if (status !== 'Completed') {
		return res.status(200).json({ message: 'Successfully checked if status is complete' });
	  }
  
	  const walletInfo = await fetchWalletInfo(userId);
  
	  if (!walletInfo) {
		throw new Error({ status: 400, message: 'Error subtracting value' });
	  }
  
	  const newWalletAmount = walletInfo.wallet - (amount + tax);
  
	  const [updateResult] = await UserWallets.update(
		{ wallet: newWalletAmount },
		{ where: { userId: userId } }
	  );
  
	  if (updateResult === 0) {
		throw new Error({ status: 400, message: 'No wallet found for the user or update failed' });
	  }
  
	  return res.status(200).json({ message: 'Successfully Subtracted Values' });
  
	} catch (error) {
	  return res.status(error.status || 500).json({ error: error.message });
	}
  };

module.exports = {
	getWallet,
	recurIncome,
	recurIncomeCron,
	updateWallet,
	walletSubtract
}