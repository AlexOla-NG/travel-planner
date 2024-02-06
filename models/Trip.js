import mongoose, { Schema, models } from "mongoose";

// TODO: add accomodation type to help validate user input

// TODO: add implementation for retrieving weather info on preSave middleware

// TODO: add custom validator library for better validation

const TripType = {
  VACATION: 'vacation',
  BUSINESS: 'business',
  OTHER: 'other'
}

const TransportMode = {
  AIR: 'air',
  ROAD: 'road',
  RAIL: 'rail',
  WATER: 'water',
  OTHER: 'other'
}

// create trip schema
const tripSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter trip name"],
    },
    startingLocation: {
      type: String,
      required: [true, "Please enter starting location"],
    },
    destination: {
      type: ['String'],
      required: [true, "Please enter destination(s)"],
    },
    tripType: { type: String, enum: Object.values(TripType), required: [true, "Please enter trip type"] },
    accommodationType: { type: String, required: [true, "Please enter accommodation type"] },
    transportMode: { type: String, enum: Object.values(TransportMode), required: [true, "Please enter mode of transport"] },
    startDate: { type: Date, required: [true, "Please enter start date"] },
    endDate: { type: Date, required: [true, "Please enter end date"] },
    dateFlexibility: { type: Boolean, required: [true, "Please enter date flexibility"] },
    notes: { type: String, maxLength: [500, "Notes cannot exceed 500 characters"] },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Please add the userID"] },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// connect schema to trips collection
const Trip = models.Trip || mongoose.model("Trip", tripSchema);
export default Trip;