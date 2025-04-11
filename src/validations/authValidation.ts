import Joi from 'joi';

export const registerSchema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string()
    .pattern(
        new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}")
    )
    .required()
    .messages({
        "string.pattern.base":"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    }),
    role:Joi.string().valid("admin", "instructor", "student").default("student"),
});

export const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
});



