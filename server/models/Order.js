const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Define the Order schema
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
    // The date of the purchase, defaults to the current date and time
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      // An array of product IDs referencing the 'Product' model
    }
  ]
});

// Create the Order model
const Order = model('Order', orderSchema);

// Export the Order model
module.exports = Order;

