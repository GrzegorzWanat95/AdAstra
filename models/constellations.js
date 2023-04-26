const mongoose = require('mongoose');

const constellationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  stars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Star' }]
});

module.exports = mongoose.model('Constellation', constellationSchema);
