const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello from customer" });
});

app.listen(8001, () => {
  console.log(`started application for customer http://localhost:8001`);
});
