const bcrypt = require("bcrypt");
const { UserAccounts, UserProfiles } = require("../models");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Loggin In");
    if (!email) throw new Error("Insert a proper Email");
    if (!password) throw new Error("Insert a proper Password");

    console.log("Account Checking");
    const account = await UserAccounts.findOne({
      where: { email: email },
    });

    // If Account returns empty or null, return an Unauthorized Error
    if (!account)
      return res.status(401).json({ message: "Account does not exist" });

    console.log("Account Checking Done");

    // If account exist, get the user ID then has the password
    const userId = account.userId;
    const hashedPassword = account.securedPassword;

    // Checks if bcrypt (encrypted password) is matching with the input
    const isMatch = await bcrypt.compare(password, hashedPassword);

    console.log("Account Password Checking");
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Email and Password does not match" });
    console.log("Account Password Checking Done");

    console.log("Profile Id Checking");
    const profile = await UserProfiles.findOne({
      where: { profileId: userId },
    });
    console.log("Profile Id Checking Done");

    if (!profile) throw new Error("Database Profile Error");

    req.session.userId = account.userId;
    req.session.email = account.email;
    req.session.username = profile.userName;

    return res
      .status(200)
      .json({
        message: "Successful Log In",
        profile: profile,
        account: account,
        password: isMatch,
      });
  } catch (err) {
    req.session.destroy();
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleLogin,
};
