const mongoose = require("mongoose"); // Import Mongoose to work with MongoDB
const bcrypt = require("bcrypt"); // Import bcrypt to hash passwords

// Create a schema for the User collection
const userSchema = mongoose.Schema(
  {
    // User email
    email: {
      type: String, // Email must be a string
      required: [true, "Email is required for creating a user"], // Email is mandatory
      trim: true, // Remove extra spaces before and after the email
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid Email address", // Check if the email format is correct
      ],
      unique: [true, "Email already exists."], // Do not allow duplicate emails
    },

    // User name
    name: {
      type: String, // Name must be a string
      required: [true, "Name is required for creating an account"], // Name is mandatory
    },

    // User password
    password: {
      type: String, // Password must be a string
      required: [true, "Password is required for creating an account"], // Password is mandatory
      minlength: [6, "Password should contain at least 6 characters"], // Minimum password length is 6
      select: false, // Do not return the password in queries by default
    },
  },

  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// This function runs before saving a user
userSchema.pre("save", async function (next) {
  // If the password has not changed, skip hashing
  if (!this.isModified("password")) {
    return next();
  }

  // Convert the plain password into a hashed password
  const hash = await bcrypt.hash(this.password, 10);

  // Save the hashed password instead of the original password
  this.password = hash;

  // Continue saving the user
  next();
});

// Create a custom method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  // Compare the entered password with the hashed password in the database
  return await bcrypt.compare(password, this.password);
};

// Create the User model using the schema
const userModel = mongoose.model("user", userSchema);

// Export the model so it can be used in other files
module.exports = userModel;