const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

//virtual - viz author.js
GenreSchema.virtual("url").get(() => {
  return "/catalog/genre/" + this._id;
});

module.exports = mongoose.model("Genre", GenreSchema);
