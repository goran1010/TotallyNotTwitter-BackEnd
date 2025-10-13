export function status(req, res) {
  const user = req.user;
  res.status(200).json({ id: user.id, username: user.username });
}
