import Expenses from "@/models/Expenses";
import Trip from "@/models/Trip";

// TODO: stopped here
// test endpoints
// add jsdoc

// create expense
export const createExpense = async (req, res) => {
  const { category, amount, date, tripID } = req.body;

  // Check if all compulsory fields are not empty
  if (!category || !amount || !date || !tripID) {
    throw 'All fields are required';
  }

  // Check if trip with the given ID exists
  const trip = await Trip.findById(tripID);
  if (!trip) {
    throw 'Trip Not Found';
  }

  const data = await Expenses.create({ category, amount, date, tripID });
  res.status(201).json({ message: 'Expense created successfully', data });
}

// get all expenses
export const getExpenses = async (req, res) => {
  // Call the advancedResults middleware to handle advanced query parameters
  await advancedResults(Expenses)(req, res);

  // Send a success response with the retrieved expenses data
  return res.status(200).json(res.advancedResults);

}

// get expense by id
export const getExpenseById = async (req, res) => {
  // Retrieve the expense based on the provided ID
  const expense = await Expenses.findById(req.query.id);

  // If the expense ID is invalid, throw an error
  if (!expense) {
    throw 'Expense Not Found';
  }

  // Send a success response with the retrieved expense data
  return res.status(200).json({ message: 'success', data: expense });
}

// update expense by id
export const updateExpenseById = async (req, res) => {
  // Retrieve and update the expense based on the provided ID and request body
  const expense = await Expenses.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });

  // If the expense ID is invalid, throw an error
  if (!expense) {
    throw 'Expense Not Found';
  }

  // Send a success response with the updated expense data
  return res.status(200).json({ message: 'success', data: expense });
}

// delete expense by id
export const deleteExpenseById = async (req, res) => {
  // Retrieve and delete the expense based on the provided ID
  const expense = await Expenses.findByIdAndDelete(req.query.id);

  // If the expense ID is invalid, throw an error
  if (!expense) {
    throw 'Expense Not Found';
  }

  // Send a success response with a success message
  return res.status(200).json({ message: 'success' });
}
