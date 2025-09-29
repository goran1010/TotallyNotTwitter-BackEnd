export default function isLoggedIn(req, res, next) {
  try {
    if (req.user) return next();
    res.status(403).json({ message: "Access denied." });
  } catch (err) {
    next(err);
  }
}
