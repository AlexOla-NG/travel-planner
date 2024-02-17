import mongoose, { Schema, models } from "mongoose";
import { generateEnumValidationMessage } from "./utils";

const CategoryEnum = {
  name: 'category',
  values: ["accommodation", "transport", "food", "entertainment", "other"]
}

// create expenses schema
const expensesSchema = new Schema(
  {
    category: {
      type: String,
      enum: {
        values: CategoryEnum.values,
        message: generateEnumValidationMessage(CategoryEnum)
      },
      required: [true, "Please enter category"],
    },
    amount: { type: Number, required: [true, "Please enter amount"], min: [0, 'Amount can not be less than 0, got {VALUE}']},
    date: { type: Date, required: [true, "Please enter date"] },
    tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: [true, "Please enter the tripID"] },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// connect schema to expenses collection
const Expenses = models.Expenses || mongoose.model("Expenses", expensesSchema);
export default Expenses;