const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  acc: Number,
  alt: Number,
  batt: Number,
  cog: Number,
  lat: Number,
  lon: Number,
  rad: Number,
  t: String,
  tid: String,
  tst: Number,
  vac: Number,
  vel: Number,
  p: Number,
  conn: String,
  cp: Boolean,
  topic: String,
  inregions: [String]
})

const Location = mongoose.model('Location', locationSchema)

module.exports = { mongoose, Location }
