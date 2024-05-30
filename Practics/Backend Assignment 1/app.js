const express = require("express");
const calculator = require("./calculator");

const app = express();

app.get("/", (req, res) => {
  res.send("Calculator API is running!");
});

// Route for addition
app.get("/add/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const result = calculator.add(parseFloat(a), parseFloat(b));
  res.send(`Result of ${a} + ${b} is = ${result}`);
});

// Route for subtraction
app.get("/subtract/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const result = calculator.subtract(parseFloat(a), parseFloat(b));
  res.send(`Result of ${a} - ${b} is = ${result}`);
});

// Route for multiplication
app.get("/multiply/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const result = calculator.multiply(parseFloat(a), parseFloat(b));
  res.send(`Result of ${a} * ${b} is ${result}`);
});

// Route for division
app.get("/divide/:a/:b", (req, res) => {
  const { a, b } = req.params;
  try {
    const result = calculator.divide(parseFloat(a), parseFloat(b));
    res.send(`Result of ${a} / ${b} is ${result}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
