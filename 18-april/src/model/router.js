module.exports = (function () {
  const express = require("express");
  const User = require("./user");
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  const router = express.Router();

  //create new user
  router.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, password, age, number } = req.body;
    try {
      const user = new User({
        username,
        password,
        age,
        number
      });
      await user.save();
      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  router.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });

  router.get("/register", (req, res) => {
    res.sendFile("./register.html", { root: "./src/model" });
  });

  router.get("/login", (req, res) => {
    res.sendFile("./login.html", { root: "./src/model" });
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: password });
    console.log(user);
    if (user) {
      res.render("home", { user });
    } else res.send("<h1>User not found</h1>");
  });

  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  //for update    //user/1
  router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, firstName, lastName, age } = req.body;

    try {
      const user = await User.findByIdAndUpdate(id, {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
      });
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  //delete users
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  return router;
})();
