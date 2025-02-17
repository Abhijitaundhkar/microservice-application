const express = require("express");
const expressApp = require("./express.app");
const { PORT } = require("./src/config/config");
const { databaseConnection } = require("./src/database/db");
const router = require("./src/routes/apiRouter");
const ErrorHandler = require("./src/utlis/error-handler");
const startServer = async () => {
  const app = express();
  await expressApp(app);
  app.use("/customers", router);
  app.get("*", (req, res) => {
    return res.status(200).json({ msg: "Hello from customer" });
  });
  app.use(ErrorHandler);

  app
    .listen(PORT, async () => {
      console.log(
        `started application for customer http://localhost:${process.env.PORT}`
      );
      await databaseConnection();
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(0);
    });
};
startServer();
