import advancedResults from "@/helpers/api/advancedResults";
import Trip from "@/models/Trip";
import User from "@/models/User";

// TODO: stopped here
// create endpoint for retrieving user trips...it should be in users/trip/userID

/**
 * Creates a new trip based on the provided request data.
 *
 * @param {Object} req - Next.js API route request object containing trip details in the request body.
 * @param {Object} res - Next.js API route response object to send the result of the operation.
 * @throws {string} Throws an error if any compulsory field is missing or if the user ID is not provided or if the user with the provided ID is not found.
 * @returns {Object} JSON response with a success message and the created trip data.
 */
export async function createTrip(req, res) {
  // Extracting trip details from the request body
  const { name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes } = req.body;

  // Check if all compulsory fields are not empty
  if (!name || !startingLocation || !destination || !tripType || !accommodationType || !transportMode || !startDate || !endDate || !dateFlexibility) {
    throw 'All fields are required';
  }

  // Check if userID is provided and check if user with that ID exists
  const userID = req.body.userID;
  if (!userID) {
    throw 'User ID is required';
  }

  // Check if user exists
  const user = await User.findById(userID);
  if (!user) {
    throw 'User Not Found';
  }

  // Create a new trip
  const data = await Trip.create({ name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes, userID });

  // Send a success response with the created trip data
  return res.status(201).json({ message: 'Trip created successfully', data });
}

/**
 * Updates an existing trip based on the provided request data.
 *
 * @param {Object} req - Next.js API route request object containing trip ID as a query parameter and updated trip details in the request body.
 * @param {Object} res - Next.js API route response object to send the result of the operation.
 * @throws {string} Throws an error if the trip ID is not provided, the provided trip ID is invalid, or the updated trip details are not valid.
 * @returns {Object} JSON response with a success message and the updated trip data.
 */
export async function updateTrip(req, res) {
  // Retrieve and update the trip based on the provided ID and request body
  const trip = await Trip.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // ensures the trip returned is the updated one
    runValidators: true,
  });

  // If the trip ID is invalid, throw an error
  if (!trip) {
    throw 'Trip Not Found';
  }

  // Send a success response with the updated trip data
  res.status(200).json({ message: 'success', data: trip });
}

/**
 * Retrieves a trip by its ID and sends it as a response.
 *
 * @param {Object} req - Next.js API route request object containing trip ID as a query parameter.
 * @param {Object} res - Next.js API route response object to send the result of the operation.
 * @throws {string} Throws an error if the trip ID is not provided or the provided trip ID is invalid.
 * @returns {Object} JSON response with a success message and the retrieved trip data.
 */
export async function getTripById(req, res) {
  // Retrieve the trip based on the provided ID
  const trip = await Trip.findById(req.query.id);

  // If the trip ID is invalid, throw an error
  if (!trip) {
    throw 'Trip Not Found';
  }

  // Send a success response with the retrieved trip data
  res.status(200).json({ message: 'success', data: trip });
}

/**
 * Retrieves all trips from the database and sends them as a response.
 *
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if there are no trips in the database.
 * @returns {Object} JSON response with a success message and the retrieved trips data.
 */
export async function getTrips(req, res) {
  // Retrieve all trips from the database
  const trips = await Trip.find();

  // If no trips are found, throw an error
  if (!trips) {
    throw 'No trips in db';
  }

  // Call the advancedResults middleware to handle advanced query parameters
  await advancedResults(Trip)(req, res);

  // Send a success response with the retrieved trips data
  return res.status(200).json(res.advancedResults);
}

/**
 * Deletes a trip by its ID from the database.
 *
 * @param {Object} req - Next.js API route request object containing trip ID as a query parameter.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the trip ID is not provided or the provided trip ID is invalid.
 * @returns {Object} JSON response with a success message upon successful deletion.
 */
export async function deleteTrip(req, res) {
  // Delete the trip based on the provided ID
  const trip = await Trip.findByIdAndDelete(req.query.id);

  // If the trip ID is invalid, throw an error
  if (!trip) {
    throw 'Trip Not Found';
  }

  // Send a success response upon successful deletion
  res.status(200).json({ message: 'success' });
}