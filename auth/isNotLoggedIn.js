export default function isNotLoggedIn(req, res, next) {
  try {
    if (!req.user) return next();
    res.status(403).json({ message: "Access denied." });
  } catch (err) {
    next(err);
  }
}
