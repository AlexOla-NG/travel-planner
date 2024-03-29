import mongoose, { Schema, models } from "mongoose";

// create itinerary schema
const itinerarySchema = new Schema(
  {
    activity: {
      type: String,
      required: [true, "Please enter activity"],
      maxLength: [500, "Activity cannot exceed 500 characters"],
    },
    startTime: { type: Date, required: [true, "Please enter start time"] },
    endTime: { type: Date, required: [true, "Please enter end time"] },
    notes: { type: String, maxLength: [500, "Notes cannot exceed 500 characters"] },
    tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: [true, "Please add the tripID"] },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// connect schema to itinerary collection
const Itinerary = models.Itinerary || mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;
