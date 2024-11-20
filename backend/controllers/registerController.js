const dbHandler = require("../models/accounts");

const handleRegister = async (req, res) => {
  const { firstname, lastname, middlename, suffix, password, username, email } = req.body;

  const queries = {
    register:
      "INSERT INTO Users(First_Name, Last_Name, Number, Username, Email, Secured_Password) VALUES (?, ?, ?, ?, ?, ?)",
    temporarySave:
      "INSERT INTO Security_Management(Email, Password) VALUES (?, ?)",
  };

  if (!firstname || !lastname || !number || !username || !email || !password)
    return res.status(404).json({message: "Please Input Required Fields"});

  try {
    const hashedPassword = await hashPassword(password);
    await dbHandler.query(queries.register, [
      firstname,
      lastname,
      number,
      username,
      email,
      hashedPassword,
    ]);
    await dbHandler.query(queries.temporarySave, [email, password]);
    return res.status(200).json({message: "Successful Registration"})
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
};

const checkDuplicates = async (req, res) => {
  const { number, username, email } = req.body;

  const queries = {
    number: "SELECT * FROM Users WHERE Number = ?",
    email: "SELECT * FROM Users WHERE Email = ?",
    username: "SELECT * FROM Users WHERE Username = ?",
  };

  try {
    const numberData = await dbHandler.query(queries.number, [number]);
    if (numberData.length > 0)
      return res.status(400).json({ message: "Number already exists" });
    const emailData = await dbHandler.query(queries.email, [email]);
    if (emailData.length > 0)
      return res.status(400).json({ message: "Email already exists" });
    const usernameData = await dbHandler.query(queries.username, [username]);
    if (usernameData.length > 0)
      return res.status(400).json({ message: "Username already exists" });
    
    return res.status(200).json({message: "Successful Duplicants Checking"})
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
};

module.exports = {
  handleRegister,
  checkDuplicates,
};
