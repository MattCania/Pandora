const express = require('express')
const cron = require('node-cron')
const router = express.Router()

const walletController = require('../controllers/walletController')

cron.schedule('0 0 * * *', async () => {
	console.log('Running daily task for all accounts...');
	const now = new Date();
  
	const users = await User.findAll();
	users.forEach(async (user) => {
	  const lastProcessed = user.lastProcessed || new Date(0);
	  const oneMonthAgo = new Date(now);
	  oneMonthAgo.setMonth(now.getMonth() - 1);
  
	  if (lastProcessed < oneMonthAgo) {
		console.log(`Processing monthly task for user: ${user.id}`);
		await performMonthlyTask(user.id);
		// Update the last processed timestamp
		await user.update({ lastProcessed: now });
	  }
	});
  });
  

router.get('/user-wallet', walletController.getWallet)
router.post('/recur-income', walletController.recurIncome)
router.post('/update-wallet', walletController.updateWallet)

module.exports = router