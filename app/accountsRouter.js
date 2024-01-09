import { Router } from "express";

const accountsRouter = Router();

accountsRouter.get("/", function (req, res) {
  res.send("View all accounts");
});

accountsRouter.get("/:id", function (req, res) {
  res.send("View an account by id");
});

accountsRouter.post("/", function (req, res) {
  res.send("Create an account");
});

accountsRouter.put("/:id", function (req, res) {
  res.send("Update an account by id");
});

accountsRouter.delete("/:id", function (req, res) {
  res.send("Delete an account by id");
});

export default accountsRouter;
