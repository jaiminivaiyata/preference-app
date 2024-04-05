const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../general-components/constants');

const preferenceSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        preference: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
preferenceSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
