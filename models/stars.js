const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Star', starSchema);
