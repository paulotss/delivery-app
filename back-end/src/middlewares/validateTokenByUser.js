const { authTokenValidation } = require('../auth/JWT');

const {User} = require("../database/models");
const CustomError = require('../error/CustomError');

const validateToken = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

		// console.log(authorization);


    const { id: userId } = authTokenValidation(authorization);
		const {dataValues:{role}} = await User.findOne({where:{id:userId}});
		
		if(role!=="administrator"){
			throw new CustomError("É preciso ser administrador",401)
		}
    req.userId = userId;
		// console.log(role);
    next();
  } catch (error) {
		console.log(error);

    next(error);
}
};

module.exports = validateToken;