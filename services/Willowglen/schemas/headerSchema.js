const Joi = require("joi");

const HeaderSchema = Joi.object()
  .keys({
    Type: Joi.string().required(),
    Name: Joi.string().required(),
    StationTag: Joi.string().required(),
    Station: Joi.string().required(),
    MsgTime: Joi.string().required(),
  })
  .required();

module.exports = HeaderSchema;
