export function status(req, res) {
  const user = req.user;
  res.status(200).json({ id: user.id, username: user.username });
}

export function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Successfully logged out." });
  });
}

export function updateProfile() {
  //code here
}
