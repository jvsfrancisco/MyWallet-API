import joi from "joi";

export const userSc = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const loginSc = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const registerSc = joi.object({
    description: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().required()
});