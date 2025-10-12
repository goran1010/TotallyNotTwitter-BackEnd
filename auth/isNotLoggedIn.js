export default function isNotLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  if (!req.user) return next();
  res.status(403).json({ message: "You are already logged in" });
}
