import bcrypt from "bcryptjs";
import prisma from "../db/prisma";

export function root(req, res) {
  res.status(200).json({ message: "OK" });
}

export async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return res.status(201).json({ username: user.username });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(400).json({ message: "Unable to create a user" });
  }
}

export async function logIn(req, res) {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return res.status(201).json({ username: user.username });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(400).json({ message: "Unable to create a user" });
  }
}
