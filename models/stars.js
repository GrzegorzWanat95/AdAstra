const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true,  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  constellations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Constellation' }]
});

module.exports = mongoose.model('Star', starSchema);

