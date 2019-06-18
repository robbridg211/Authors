
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');// Use native promises
mongoose.Promise = global.Promise;

const AuthorSchema = new mongoose.Schema({
  name: {type: String, required: [true, "*Name is required"] }
},
  { timestamps: true});


const Author = mongoose.model('Author', AuthorSchema);

  
module.exports = {
  Author: Author
}