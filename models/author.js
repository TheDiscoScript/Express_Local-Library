const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//the Schema
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//In Mongoose, a virtual is a property that is not stored in MongoDB.
// Virtuals are typically used for computed properties on documents.

//Virtual for author's full name
AuthorSchema.virtual("name").get(() => {
  return this.family_name + ", " + this.first_name;
});

//Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(() => {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string = DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifetime_string;
});

//Virtual for author's URL
AuthorSchema.virtual("url").get(() => {
  return "/catalog/author/" + this._id;
});

//exporting Author model
module.exports = mongoose.model("Author", AuthorSchema);
