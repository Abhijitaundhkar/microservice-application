const mongoose = require("mongoose");
const config = require("../config/config");

module.exports = {
  databaseConnection: async () => {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log("Db Connected");
    } catch (error) {
      console.log("Error ============");
      console.log(error);
      process.exit(1);
    }
  },
};
