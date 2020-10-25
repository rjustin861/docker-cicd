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
            PointType: Joi.number().integer(),
            TagName: Joi.string().required(),
            SrcTime: Joi.string().required(),
            InputStatus: Joi.number().integer().required(),
            CardReaderId: Joi.number().integer().required(),
            Status: Joi.number().integer().required(),
            Message: Joi.string(),
            CardId: Joi.string(),
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
