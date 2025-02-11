const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello from Products" });
});

app.listen(8002, () => {
  console.log(`started application fro product http://localhost:8002`);
});
