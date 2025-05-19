const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Schema is the blueprint for database model
//first create the schema then instantiate it and export
const blogSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//instantiate
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
