const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../utils/apiError");

const verifyRole = (allowedRoles) => (req,res,next) => {
  console.log(req.user)
  const user = req.user;
  const roles = user.role;
  const isAllowed = roles.reduce((acc,cur) => allowedRoles.includes(cur),false)
  
  if(isAllowed) return next();
  
  throw new APIError(StatusCodes.FORBIDDEN,`Only ${allowedRoles.join(',')} are allowed to access these resources`)
}

module.exports = { verifyRole }