const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!users.length) {
    return res.status(400).json({
      msg: "Malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Barcha malumotlar",
    variant: "success",
    payload: users,
    total: users.length,
  });
});

router.post("/", (req, res) => {
  let existUser = users.find((user) => user.username === req.body.username);
  if (existUser) {
    return res.status(400).json({
      msg: "Username mavjud",
      variant: "warning",
      payload: null,
    });
  }
  let newUser = {
    id: new Date().getTime(),
    fname: req.body.fname,
    username: req.body.username,
    password: req.body.password,
  };
  users.push(newUser);
  res.status(201).json({
    msg: "Qoshildi",
    variant: "success",
    payload: newUser,
  });
});

router.delete("/:id", (req, res) => {
  let userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex < 0) {
    return res.status(400).json({
      msg: "User topilmadi",
      variant: "error",
      payload: null,
    });
  }
  users.splice(userIndex, 1);
  res.status(200).json({
    msg: "O'chirildi",
    variant: "success",
    payload: null,
  });
});

router.put("/:id", (req, res) => {
  let id = +req.params.id;
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return res.status(400).json({
      msg: "User topilmadi",
      variant: "error",
      payload: null,
    });
  }
  let updateUser = {
    id,
    ...req.body,
  };
  users.splice(userIndex, 1, updateUser);
  res.status(200).json({
    msg: "O'zgartirildi",
    variant: "success",
    payload: updateUser,
  });
});

module.exports = router;
