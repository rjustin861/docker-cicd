const Joi = require("joi");
const HeaderSchema = require("./headerSchema");
const { validateRequest } = require("../services/helpers");

module.exports = (req, res, next) => {
  const schema = Joi.object({
    Message: Joi.object()
      .keys({
        Header: HeaderSchema,
        Body: Joi.object()
          .keys({
            PointType: Joi.number().integer().required(),
            TagName: Joi.string().required(),
            SrcTime: Joi.string().required(),
            InputStatus: Joi.string().required(),
            StatusValue: Joi.number().integer().required(),
            AckTime: Joi.string(),
            Operator: Joi.string(),
          })
          .required(),
      })
      .required(),
  });

  // email: Joi.string().email().required(),
  // password: Joi.string().min(6).required(),
  // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  // role: Joi.string().valid("Admin", "User").required(),
  validateRequest(req, res, next, schema);
};
