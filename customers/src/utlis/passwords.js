const bcrypt = require("bcrypt");

const generateSalt = async () => {
  return await bcrypt.genSalt();
};
const generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};
const validatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await generatePassword(enteredPassword, salt)) == savedPassword;
};
module.exports = { generateSalt, generatePassword, validatePassword };
