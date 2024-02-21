import advancedResults from "@/helpers/api/advancedResults";
import { validateRequiredFields } from "@/helpers/api/utils";
import Expenses from "@/models/Expenses";
import Trip from "@/models/Trip";

// setup eslintrc to remove unused imports
// remove nonexistent modules

/**
 * Creates a new expense based on the provided request data.
 *
 * @param {Object} req - Next.js API route request object containing expense details in the request body.
 * @param {Object} res - Next.js API route response object to send the result of the operation.
 * @throws {string} Throws an error if any compulsory field is missing or if the trip with the provided ID is not found.
 * @returns {Object} JSON response with a success message and the created expense data.
 */
export const createExpense = async (req, res) => {
  const { category, amount, date, tripID } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["category", "amount", "date", "tripID"];
  validateRequiredFields(compulsoryFields, req.body)

  // Check if trip with the given ID exists
  const trip = await Trip.findById(tripID);
  if (!trip) {
    throw 'Trip Not Found';
  }

  const data = await Expenses.create({ category, amount, date, tripID });
  res.status(201).json({ message: 'Expense created successfully', data });
}

/**
 * Retrieves all expenses, applying advanced query parameters and pagination.
 *
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @returns {Object} JSON response with a success message, count of retrieved expenses, pagination information, and the retrieved expenses data.
 */
export const getExpenses = async (req, res) => {
  // Call the advancedResults middleware to handle advanced query parameters
  await advancedResults(Expenses)(req, res);

  // Send a success response with the retrieved expenses data
  return res.status(200).json(res.advancedResults);
}

/**
 * Retrieves an expense by its ID.
 *
 * @param {Object} req - Next.js API route request object containing expense ID as a query parameter.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the expense with the provided ID is not found.
 * @returns {Object} JSON response with a success message and the retrieved expense data.
 */
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

/**
 * Updates an expense by its ID based on the provided request data.
 *
 * @param {Object} req - Next.js API route request object containing expense ID as a query parameter and updated expense details in the request body.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the expense ID is not provided, the provided expense ID is invalid, or the updated expense details are not valid.
 * @returns {Object} JSON response with a success message and the updated expense data.
 */
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

/**
 * Deletes an expense by its ID.
 *
 * @param {Object} req - Next.js API route request object containing expense ID as a query parameter.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the expense ID is not provided or the provided expense ID is invalid.
 * @returns {Object} JSON response with a success message upon successful deletion.
 */
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