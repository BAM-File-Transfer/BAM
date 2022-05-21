const mongoose = require('mongoose');

const SenderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    name: {
        type: String,
        required: true
    },

    magnetLink: {
        type: String,
        required: true
    },

    coordinates: {
      type: [Number],
      required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sender', SenderSchema);