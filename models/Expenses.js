import mongoose, { Schema, models } from "mongoose";

const categoryTypes = {
    ACCOMMODATION: "accommodation",
    TRANSPORT: "transport",
    FOOD: "food",
    ENTERTAINMENT: "entertainment",
    OTHER: "other",
}

// create expenses schema
const expensesSchema = new Schema(
  {
    category: {
      type: String,
      enum: Object.values(categoryTypes),
      required: [true, "Please enter category"],
    },
    amount: { type: Number, required: [true, "Please enter amount"] },
    date: { type: Date, required: [true, "Please enter date"] },
    tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: [true, "Please enter the tripID"] },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// connect schema to expenses collection
const Expenses = models.Expenses || mongoose.model("Expenses", expensesSchema);
export default Expenses;