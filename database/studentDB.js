
require("dotenv").config();
const mongoose = require("mongoose");

module.exports = function studentDB() {
  const mongoURI =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/userDB";

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) =>
      console.error("MongoDB connection error:", err)
    );

  mongoose.set("useFindAndModify", false);
};
