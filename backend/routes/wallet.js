const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const { UserWallets } = require("../models");
const walletController = require("../controllers/walletController");

cron.schedule("0 0 * * *", async () => {
	console.log("Running daily task for all accounts...");
	const now = new Date();
  
	const userWallets = await UserWallets.findAll();
  
	for (const wallet of userWallets) {
	  const lastProcessed = wallet.lastProcessed || new Date(0);
  
	  switch (wallet.recurrance) {
		case "Semi-Monthly":
		  if (
			(now.getDate() === 1 || now.getDate() === 15) &&
			lastProcessed < new Date(now.getFullYear(), now.getMonth(), now.getDate())
		  ) {
			await walletController.recurIncomeCron(wallet.userId);
		  }
		  break;
  
		case "Monthly":
		  if (
			now.getDate() === 1 &&
			lastProcessed < new Date(now.getFullYear(), now.getMonth(), 1)
		  ) {
			await walletController.recurIncomeCron(wallet.userId);
		  }
		  break;
  
		case "Quarterly":
		  if (
			[3, 6, 9, 12].includes(now.getMonth() + 1) &&
			now.getDate() === 1 &&
			lastProcessed < new Date(now.getFullYear(), now.getMonth(), 1)
		  ) {
			await walletController.recurIncomeCron(wallet.userId);
		  }
		  break;
  
		case "Annually":
		  if (
			now.getDate() === 1 &&
			now.getMonth() === 0 &&
			lastProcessed < new Date(now.getFullYear(), 0, 1)
		  ) {
			await walletController.recurIncomeCron(wallet.userId);
		  }
		  break;
  
		default:
		  console.log(`Unknown recurrence type for walletId: ${wallet.walletId}`);
	  }
	}
  });


router.get("/user-wallet", walletController.getWallet);
router.post("/recur-income", walletController.recurIncome);
router.post("/update-wallet", walletController.updateWallet);

module.exports = router;
