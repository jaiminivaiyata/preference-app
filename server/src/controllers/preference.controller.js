const httpStatus = require('http-status');
const { preferenceService } = require('../services');
const {sendCommonResponse} = require("../general-components/response");


const savePreference = async (request, response) => {
  const preference = await preferenceService.savePreference(request.body, {user: request.user._id});
  const responseObject = {
    code: httpStatus.CREATED,
    data: { preference: preference || {} },
    message: "Preference has been saved successfully!"
  }
  sendCommonResponse(response, httpStatus.CREATED, responseObject)
};

module.exports = {
  savePreference
};
