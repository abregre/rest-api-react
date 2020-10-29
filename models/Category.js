const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { schema } = require('./Article');


//Category Schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    trim: true,
    minlength:2
  },
  articles: [{type:mongoose.Schema.Types.ObjectId, ref:'Article'}]
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', CategorySchema);