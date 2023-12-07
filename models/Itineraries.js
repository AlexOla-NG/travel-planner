import mongoose, { Schema, models } from "mongoose";

// STUB: create itinerary schema
const itinerarySchema = new Schema(
  {
    activity: {
      type: String,
      required: [true, "Please enter activity"],
    },
    startTime: { type: Date, required: [true, "Please enter start time"] },
    endTime: { type: Date, required: [true, "Please enter end time"] },
    notes: { type: String },
    tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// STUB: connect schema to itinerary collection
const Itinerary = models.Itinerary || mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;