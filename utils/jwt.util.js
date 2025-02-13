import jwt from "jsonwebtoken";
export default class JWT {
  signature = process.env.TOKEN_SECRET;
  roles = ['user', 'admin', 'superadmin']
  generateAccessToken({ _id, name, email, role, avatar }) {
    const token = jwt.sign(
      {
        _id,
        name,
        email,
        role,
        avatarUrl: avatar?.url
      },
      this.signature
    );
    return token;
  }

  isAccessAllowedNumber(num) {
    let number = num - 1;
    if(num <= 0 || num > 3){
      throw new Error(' دسترسی ها بین 1 تا' + ' ' + this.roles.length + ' ' + 'است');
    }
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return false;
    }
    const jwt = new JWT();
    const decoded = jwt.decodeAccessToken(accessToken);
    const role = decoded.role;
    for (let i = 0; i < this.roles.length; i++) {
      const element = this.roles[i];
      if (role.toUpperCase() == element.toUpperCase() && i < number) {
        return false;
      }
    }
    return true;
  }

  moddlewareNumber(num){
    if(!this.isAccessAllowedNumber(num)){
      window.open("/auth/signin", "_self");
    }
  }

  decodeAccessToken(token) {
    const data = jwt.decode(token, this.signature);
    return data;
  }
}