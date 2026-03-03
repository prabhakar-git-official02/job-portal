export const recruiter_Middleware = (req, res, next) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ msg: 'Recruiter only access' });
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
