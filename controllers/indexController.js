import bcrypt from "bcryptjs";

export function root(req, res) {
  res.status(200).json({ message: "OK" });
}

export async function signUp(req, res) {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return res.status(201).json({ message: "OK" });
  }
  res.status(400).json({ message: "Invalid input" });
}
