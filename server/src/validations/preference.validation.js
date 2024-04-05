const Joi = require('joi');

const savePreference = {
    body: Joi.object().required(),
};

module.exports = {
    savePreference
};
