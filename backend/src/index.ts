import nodeHttp = require("node:http");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: any, res: any) => {
  res.json({ status: "ok" });
});

const transactions: {id: string; type: string; amount: number; date: string}[] = [];
app.post("/transactions", (req: any, res: any) => {
  const { id, type, amount, date } = req.body;
  transactions.push({ id, type, amount, date });
  res.status(201).json({ message: "Transaction added" });
});

app.get("/transactions", (req: any, res: any) => {
  res.json(transactions);
});

app.delete("/transactions/:id", (req: any, res: any) => {
  const { id } = req.params;
  const index = transactions.findIndex((tx) => tx.id === id);
  if (index > -1) {
    transactions.splice(index, 1);
    res.json({ message: "Transaction deleted" });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
