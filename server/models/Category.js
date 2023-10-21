const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Define the Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the Category model
const Category = model('Category', categorySchema);

// Export the Category model
module.exports = Category;

