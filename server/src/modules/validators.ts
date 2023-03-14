import { body, validationResult } from "express-validator";

export const settingValidators = [
  body("brewfatherUserId").optional().isString(),
  body("brewfatherApiKey").optional().isString(),
  body("kegs").optional(),
  body("hasConnectedDisplay").optional().isBoolean(),
  body("numberOfKegs").optional().isNumeric(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
