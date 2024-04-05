const { Preference } = require('../models');

/**
 * Create a user
 * @param {Object} prefBody
 * @param {ObjectId} user
 * @returns {Promise<Preference>}
 */
const savePreference = async (prefBody, user) => {
    return await Preference.findOneAndUpdate({ user: user.user }, {preference: prefBody}, {
        new: true,
        upsert: true, // Make this update into an upsert
    })
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const getUserPreference = async (user) => {
    return (await Preference.findOne({ user }));
  };


module.exports = {
    savePreference,
    getUserPreference
};
