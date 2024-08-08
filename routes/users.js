const { Router } = require("express");
const { User } = require("../models/index");
const express = require("express");

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).send(allUsers);
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const currentUser = await User.findByPk(userId);
  res.status(200).send(currentUser);
});

router.post("/", async (req, res) => {
  const newUserObject = req.body;
  const createdNewUser = await User.create(newUserObject);
  res.status(201).json(createdNewUser);
});

router.put("/:id", async (req, res) => {
  const currentUserId = req.params.id;
  const newUserObject = req.body;

  const createdNewUser = await User.update(newUserObject, {
    where: { id: currentUserId },
  });
  res.json(createdNewUser);
});

router.delete("/:id", async (req, res) => {
  const currentUserId = req.params.id;

  const currentUser = await User.findByPk(currentUserId);

  await currentUser.destroy();

  res.status(204).send();
});

module.exports = router;
