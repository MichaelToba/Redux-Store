const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Define the Product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    // The name of the product
  },
  description: {
    type: String,
    // A description of the product
  },
  image: {
    type: String,
    // URL of the product image
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
    // The price of the product (minimum 0.99)
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
    // The quantity of the product (default is 0)
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    // Reference to the 'Category' model
  }
});

// Create the Product model
const Product = model('Product', productSchema);

// Export the Product model
module.exports = Product;

