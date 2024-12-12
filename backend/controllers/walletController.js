const { UserAccounts, UserProfiles, UserWallets } = require('../models')

const fetchWalletInfo = async (userId) => {
    const walletInfo = await UserWallets.findOne({
      where: { userId: userId },
      attributes: ['recurrance', 'income', 'wallet']
    });
    if (walletInfo.length === 0) throw new Error({ status: 401, message: 'Wallet Information Unfound' });
	return (walletInfo);
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

const recurIncome = async (req, res) => {
	const userId = req.session.userId;

	try {
		const walletInfo = fetchWalletInfo(userId)
		const recurResponse = UserWallets.update({
			where: { userId: userId },
			wallet: walletInfo.income
		})

		if (!recurResponse) throw new Error({status: 400, message: 'Error Resetting Income'})

	} catch (error) {
		return res.status(error.status).json({error: error.message})
	}

}

const walletAdd = async (req, res) => {
	const userId = req.session.userId

	try {
		const walletInfo = fetchWalletInfo(userId)
		
		if (!walletInfo || walletInfo.length === 0) throw new Error({status: 400, message: 'Error fetching wallet information'})
		
		

	} catch (error) {
		
		return res.status(error.status).json({error: error.message})
	}

}

const walletSubtract = async (req, res) => {
	const userId = req.session.userId

	try {
		
	} catch (error) {
		
		return res.status(error.status).json({error: error.message})
	}

}



module.exports = {
	getWallet,
	recurIncome,
	updateWallet
}