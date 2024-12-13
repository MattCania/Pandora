const { where } = require("sequelize");
const {
  UserAccounts,
  UserProfiles,
  Admins,
  UserWallets,
} = require("../models");

// Thing got zero validations, more on models fix tho
const handleRegister = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
    username,
    contact,
    secondaryemail,
    organization,
    currency,
    income,
    recurrance,
  } = req.body;

  if (password !== confirmpassword)
    return res
      .status(401)
      .json({ message: "Password & Confirm Password Mismatch" });

  try {
    await UserAccounts.create({
      firstName: firstname,
      lastName: lastname,
      middleName: null,
      suffix: null,
      email: email,
      securedPassword: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newAccount = await UserAccounts.findOne({
      where: {
        email: email,
      },
    });

    if (!newAccount) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve newly created user." });
    }

    const newAccountId = newAccount.userId;

    await UserProfiles.create({
      profileId: newAccountId,
      userName: username,
      contactNumber: contact,
      currency: currency,
      secondaryEmail: secondaryemail || null,
      organization: organization || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Admins.create({
      accountId: newAccountId,
      email: email,
      password: password,
    });

	await UserWallets.create({
		userId: newAccountId,
		income: income,
		recurrance: recurrance,
		wallet: income
	})

    return res.status(200).json({ message: "Successful Registration" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  handleRegister,
};
