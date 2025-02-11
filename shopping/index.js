const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello from shooping" });
});

app.listen(8003, () => {
  console.log(`started application for shopping http://localhost:8003`);
});
