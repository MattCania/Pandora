const bcrypt = require('bcrypt');
const { UserAccounts } = require('../models');

// Default Login mechanism, validates email, then compare password
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const user = await UserAccounts.findOne({
      where: email
    })
    if (!user){
      req.session.destroy()
      return res.status(401).json( { message: "Invalid Credentials"})
    }
  }
  catch (err){
    req.session.destroy()
    console.log(err)
    return res.status(401).json( { message: "Invalid Credentials"})
  }
  
  
  const hashedPassword = user.securedPassword

  try{
    const isMatch = await bcrypt.compare(password, hashedPassword)
    if (!isMatch){
      return res.status(401).json({ message: 'Invalid Password' })
    }
    
    req.session.userId = user.userId
    req.session.email = user.email
    return res.status(200).json({message: 'Successful Log In'})
  }
  catch (err){
    return res.status(500).json({error: err.message})
  }




};

module.exports = {
  handleLogin,
};
