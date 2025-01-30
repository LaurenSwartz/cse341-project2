const validator = require('../helpers/userValidate');

const saveUser = (req, res, next) => {
  const validationRule = {
    make: 'required|string',
    model: 'required|string',
    mileage: 'required|string',
    colour: 'required|string',
    transmission:'required|string',
    registrationYear:'required|string',
    bodyType:'string'

  
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser
};