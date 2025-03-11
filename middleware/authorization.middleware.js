const authorization = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "شما اجازه دسترسی به این ویژگی را ندارید",
      });
    }
    next();
  };
};

export default authorization;
