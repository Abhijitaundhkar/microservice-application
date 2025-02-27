const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002")); //default call to product if service is not mentioned

app.listen(8000, () => {
  console.log(` Gateway started application http://localhost:8000`);
});
