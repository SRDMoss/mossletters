// DBsetup.js: Sets up and exports the Mongoose connections and models for both main and logins databases

const mongoose = require('mongoose');
const config = require('./DBconfig.js');

// Establish URLs for both main and logins databases
const mainUrl = `mongodb://${config.main.username}:${config.main.password}@${config.main.host}/${config.main.database}?authSource=admin`;
const loginsUrl = `mongodb://${config.logins.username}:${config.logins.password}@${config.logins.host}/${config.logins.database}?authSource=admin`;

// Define connections and models for later use
let userMainConnection = null;
let userLoginsConnection = null;
let userMainModel = null;
let userLoginsModel = null;
let Schema = mongoose.Schema;

// Main DB Schema: defines the structure for user main details
let userMainSchema = new Schema({
  created: Date,
  firstName: String,
  lastName: String,
  email: String,
  frequency: String,
  projects: [String],
  loginID: { type: mongoose.Schema.Types.ObjectId, ref: 'logins.users'}
}, {
  collection: 'users'
});

// Logins DB Schema: defines the structure for user login credentials
let userLoginsSchema = new Schema({
  email: String,
  password: String
}, {
  collection: 'users'
});

// Export functions to handle connections and models
module.exports = {  
  getUserMainModel: () => {
    if (userMainConnection == null) {
      console.log("Creating Main connection and model...");
      userMainConnection = mongoose.createConnection(mainUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      userMainModel = userMainConnection.model("UserMainModel", userMainSchema);
    };
    return userMainModel;
  },
  getUserLoginsModel: () => {
    if (userLoginsConnection == null) {
      console.log("Creating Login connection and model...");
      try {
        userLoginsConnection = mongoose.createConnection(loginsUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      } catch (e) {
        console.log(e); // Log any connection errors
      };
      userLoginsModel = userLoginsConnection.model("UserLoginsModel", userLoginsSchema);
    };
    return userLoginsModel;
  }
};
