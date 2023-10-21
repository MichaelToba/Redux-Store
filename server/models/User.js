const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order');

const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    // The first name of the user
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    // The last name of the user
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // The email of the user (must be unique)
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    // The user's password (minimum length is 5)
  },
  orders: [Order.schema],
  // An array of orders associated with the user
});

// Set up pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = model('User', userSchema);

// Export the User model
module.exports = User;
