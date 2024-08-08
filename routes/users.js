const { Router } = require("express");
const { User } = require("../models/index");
const express = require("express");
const { check, validationResult } = require("express-validator");

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

router.post("/", [check("name").notEmpty().trim()], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(404).send({ error: errors.array() });
    return;
  }

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
