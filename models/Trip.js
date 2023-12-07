import mongoose, { Schema, models } from "mongoose";

// STUB: create trip schema
const tripSchema = new Schema(
  {
    destination: {
      type: String,
      required: [true, "Please enter destination"],
    },
    startDate: { type: Date, required: [true, "Please enter start date"] },
    endDate: { type: Date, required: [true, "Please enter end date"] },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// STUB: connect schema to trips collection
const Trip = models.Trip || mongoose.model("Trip", tripSchema);
export default Trip;