const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  description: String,
  date: String,
  url: String
})

module.exports = mongoose.model('Teacher', teacherSchema)