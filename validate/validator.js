import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

const createUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5, max: 30 })
    .withMessage(`Username has to be between 5 and 30 characters long`)
    .custom(async (value) => {
      const usernameCheck = await prisma.user.findUnique({
        where: { username: value },
      });
      if (usernameCheck) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 30 })
    .withMessage("Password must be between 5 and 30 characters long"),
  body("confirm-password")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords need to match");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0]);
    }
    next();
  },
];

const logInUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5, max: 30 })
    .withMessage(`Username has to be between 5 and 30 characters long`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 30 })
    .withMessage("Password must be between 5 and 30 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0]);
    }
    next();
  },
];

export { createUser, logInUser };
