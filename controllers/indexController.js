export function root(req, res) {
  res.status(200).json({ message: "OK" });
}

export function signUp(req, res) {
  const { username, email, password } = req.body;
  if (username && email && password) {
    return res.status(201).json({ message: "OK" });
  }
  res.status(400).json({ error: "Invalid input" });
}
