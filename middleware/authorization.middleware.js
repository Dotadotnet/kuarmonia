

const authorization = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      return res.send({
        success: false,
        message: "شما اجازه دسترسی به این ویژگی را ندارید"
      });
    }
    next();
  };
};

export default authorization;
