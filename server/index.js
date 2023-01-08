const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04b717af4989acea040eb8a565b263c5deafdfeb66466ad9b24c643fb4b52f11ff4417afccf7e1a0bc49ac3bf47e90fa0990c9273153f2faca5681a8f9c1908c76": 100,
  "04fb9f404cfbffaef833ee1d763e27ab26aeb29a4b01387b3ae3977df08ce385cfa3660c630366829020f161e0762d4929559f7efe13276277be988bf7bad684f9": 50,
  "04c6ef3de24c7b669efa1fdd90e5334e17217b2360151b1b087de5d37238c5fc58144c6226274ed6ebcf649ab2a4ec3863085a7ee33004935ec0c1ee307421206e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
