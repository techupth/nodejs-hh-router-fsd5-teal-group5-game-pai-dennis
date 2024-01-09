import express from "express";
import bodyParser from "body-parser";

import assignmentRounter from "./apps/assignments.js";
import accountRounter from "./apps/accounts.js";


const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

app.use("/assignments",assignmentRounter);
app.use("/accounts",accountRounter);


app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
