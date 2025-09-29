import { body, validationResult } from "express-validator";
import prisma from "../db/prisma";

const createUser = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Username has to be between 5 and 30 characters long.`)
    .custom(async (value) => {
      const usernameCheck = await prisma.user.findUnique({
        where: { username: value },
      });
      if (usernameCheck) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 30 })
    .withMessage("Password must be between 5 and 30 characters long."),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords need to match");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    next();
  },
];

export { createUser };
