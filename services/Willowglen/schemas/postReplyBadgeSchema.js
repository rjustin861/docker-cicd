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
            TagName: Joi.string(),
            SrcTime: Joi.string().required(),
            OrigId: Joi.string().required(),
            Result: Joi.string().required(),
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
