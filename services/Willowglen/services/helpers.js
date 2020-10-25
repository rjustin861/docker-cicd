const validateRequest = (req, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    let errorMsg = error.details.map((err) => err.message).join(", ");
    next(`Validation error: ${errorMsg}`);
    // return res.json({
    //   success: false,
    //   message: errorMsg,
    // });
  } else {
    req.body = value;
    next();
  }
};

module.exports = { validateRequest };
