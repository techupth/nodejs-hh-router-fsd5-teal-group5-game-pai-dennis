import { Router } from "express";

const accountRounter = Router();

accountRounter.get("/", function (req, res) {
  res.send("View all accounts");
});

accountRounter.get("/:id", function (req, res) {
  res.send("View an account by id");
});

accountRounter.post("", function (req, res) {
  res.send("Create an account");
});

accountRounter.put("/:id", function (req, res) {
  res.send("Update an account by id");
});

accountRounter.delete("/:id", function (req, res) {
  res.send("Delete an account by id");
});

export default accountRounter;
