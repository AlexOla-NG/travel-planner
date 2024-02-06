import mongoose, { Schema, models } from "mongoose";

const Relationship = {
  PARENT: 'parent',
  CHILD: 'child',
  SIBLING: 'sibling',
  COUSIN: 'cousin',
  FAMILY: 'family',
  FRIEND: 'friend',
  NEIGHBOUR: 'neighbour',
  COLLEAGUE: 'colleague',
  OTHER: 'other',
}

// create contact schema
const contactSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastname: { type: String, required: [true, "Please add a last name"] },
  fullname: String,
  phoneNumber: { type: String, required: [true, "Please add a phone number"] },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  relationship: { type: String, enum: Object.values(Relationship), default: Relationship.FRIEND, required: [true, "Please enter relationship"] },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "Please add the userID"] },
  createdAt: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

// create fullname field from the first & last name
contactSchema.pre("save", function (next) {
  this.fullname = `${this.firstname} ${this.lastname}`;
  next();
});

// connect schema to contacts collection
const Contact = models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;