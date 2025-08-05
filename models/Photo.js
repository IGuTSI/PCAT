const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PhotoSchema = new Schema({
  title: String, //değerleri string gireceğimiz için belirttik.
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);


module.exports = Photo;