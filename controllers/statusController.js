export function status(req, res) {
  const user = req.user;
  res.status(200).json(user);
}
