import mongoose, { Schema, models } from "mongoose";

// STUB: create expenses schema
const expensesSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Accommodation", "Transport", "Food", "Entertainment", "Other"],
      required: [true, "Please enter category"],
    },
    amount: { type: Number, required: [true, "Please enter amount"] },
    Date: { type: Date, required: [true, "Please enter date"] },
    tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// STUB: connect schema to expenses collection
const Expenses = models.Expenses || mongoose.model("Expenses", expensesSchema);
export default Expenses;