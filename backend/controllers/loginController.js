const bcrypt = require('bcrypt');
const { UserAccounts, UserProfiles, sequelize } = require('../models');
const { use } = require('passport');


const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await UserAccounts.findOne({
    where: {
      email: email
    }
  })
  
  
  if (!user){
    return res.status(401).json( { message: "Invalid Credentials"})
  }
  
  const hashedPassword = user.securedPassword

  try{
    const isMatch = await bcrypt.compare(password, hashedPassword)
    if (!isMatch){
      return res.status(401).json({ message: 'Invalid Password' })
    }
    
    return res.status(200).json({message: 'Successful Log In'})
  }
  catch (err){
    return res.status(500).json({error: err.message})
  }




};

module.exports = {
  handleLogin,
};
