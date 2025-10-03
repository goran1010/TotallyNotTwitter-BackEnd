import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";
import passport from "../auth/passport.js";

export function root(req, res) {
  res.status(200).json({ message: "OK" });
}

export async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(400).json({ message: "Unable to create a user" });
  }
}

export function logIn(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      console.log(err);
      if (err) return next(err);
      return res.json({
        message: "Logged in successfully",
        username: user.username,
      });
    });
  })(req, res, next);
}
