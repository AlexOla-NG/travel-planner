import mongoose, { Schema, models } from "mongoose";
import { generateEnumValidationMessage } from "./utils";

// TODO: preSave middleware
// add implementation for retrieving weather info
// add implementation that calculates total expenses per trip

const TripEnum = {
  name: 'trip type',
  values: ['vacation', 'business', 'other']
}

const TransportEnum = {
  name: 'transport mode',
  values: ['air', 'road', 'rail', 'water', 'other']
}

const AccommodationEnum = {
  name: 'accommodation type',
  values: ['hotel', 'guesthouse', 'airbnb', 'resort', 'apartment', 'rental', 'other']
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
    tripType: {
      type: String,
      enum: {
        values: TripEnum.values,
        message: generateEnumValidationMessage(TripEnum)
      },
      required: [true, "Please enter trip type"]
    },
    accommodationType: {
      type: String, enum: {
        values: AccommodationEnum.values,
        message: generateEnumValidationMessage(AccommodationEnum)
      },
      required: [true, "Please enter accommodation type"] },
    transportMode: {
      type: String,
      enum: {
        values: TransportEnum.values,
        message: generateEnumValidationMessage(TransportEnum)
      },
      required: [true, "Please enter mode of transport"] },
    startDate: { type: Date, required: [true, "Please enter start date"] },
    endDate: { type: Date, required: [true, "Please enter end date"] },
    dateFlexibility: { type: Boolean, required: [true, "Please enter date flexibility"] },
    notes: { type: String, maxLength: [500, "Notes cannot exceed 500 characters"] },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Please add the userID"] },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// cascade delete expenses and itineraries when a trip is deleted
tripSchema.pre("remove", async function (next) {
  await this.model("Itineraries").deleteMany({ tripID: this._id });
  await this.model("Expenses").deleteMany({ tripID: this._id });
  next();
});

// reverse populate with virtuals
tripSchema.virtual("itineraries", {
  ref: "Itineraries",
  localField: "_id",
  foreignField: "tripID",
});

tripSchema.virtual("expenses", {
  ref: "Expenses",
  localField: "_id",
  foreignField: "tripID",
});

// connect schema to trips collection
const Trip = models.Trip || mongoose.model("Trip", tripSchema);
export default Trip;