export function root(req, res) {
  res.status(200).json({ message: "OK" });
}

export function signUp(req, res) {
  res.status(400).json({ error: "Invalid input" });
}
