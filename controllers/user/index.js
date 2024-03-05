import advancedResults from "@/helpers/api/advancedResults";
import { validateRequiredFields } from "@/helpers/api/utils";
import User from "@/models/User";
import bcrypt from "bcrypt";

/**
 * Retrieves all users from the database.
 *
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response containing the list of users.
 */
export async function getUsers(req, res) {
  await advancedResults(User)(req, res);

  return res.status(200).json(res.advancedResults);
}

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response containing the user information.
 * @throws {string} Throws an error if the user with the specified ID is not found.
 */
export async function getUserById(req, res) {
  const user = await User.findById(req.query.id);

  if (!user) throw "User Not Found";

  return res.status(200).json({ message: "success", data: user });
}

/**
 * Creates a new user and stores it in the database.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response confirming the successful user creation.
 * @throws {string} Throws an error if any required fields are missing or if the provided email is already in use.
 */
export async function createNewUser(req, res) {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["firstName", "lastName", "email", "password", "phoneNumber"];
  validateRequiredFields(compulsoryFields, req.body);

  // check if email already exists
  const user = await User.findOne({ email });
  if (user) throw "Email is already in use";

  // create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber });

  return res.status(201).json({ message: "User created successfully", data });
}

/**
 * Updates a user's information in the database.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response containing the updated user information.
 * @throws {string} Throws an error if the user with the specified ID is not found.
 */
export async function updateUser(req, res) {
  const user = await User.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // ensures user returned is the updated one
    runValidators: true,
  });

  // if invalid id, throw error
  if (!user) throw "User Not Found";

  res.status(200).json({ message: "success", data: user });
}

/**
 * Deletes a user from the database by their ID.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response confirming the successful user deletion.
 * @throws {string} Throws an error if the user with the specified ID is not found.
 */
export async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.query.id);

  // if invalid id, throw error
  if (!user) throw "User Not Found";

  res.status(200).json({ message: "success", data: {} });
}
