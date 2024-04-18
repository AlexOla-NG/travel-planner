import Itinerary from "api/models/Itineraries";
import Trip from "api/models/Trip";
import advancedResults from "helpers/api/advancedResults";
import { trim_string, validateRequiredFields } from "helpers/api/utils";

/**
 * Creates a new itinerary.
 * @async
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if any compulsory field is empty or if the trip with the given ID is not found.
 * @returns {Promise<void>} JSON response with a success message and the created itinerary data.
 */
export async function createItinerary(req, res) {
  req.body = trim_string(req.body);

  // Extract itinerary details from the request body
  const { activity, startTime, endTime, tripID, notes } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["activity", "startTime", "endTime", "tripID"];
  validateRequiredFields(compulsoryFields, req.body);

  // Check if trip with the given ID exists
  const trip = await Trip.findById(tripID);
  if (!trip) {
    throw "Trip Not Found";
  }

  // Create a new itinerary
  const data = await Itinerary.create({ activity, startTime, endTime, tripID, notes });

  // Send a success response with the created Itinerary data
  return res.status(201).json({ message: "Itinerary created successfully", data });
}

/**
 * Retrieves all itineraries from the database and sends them as a response.
 * @async
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @returns {Promise<void>} JSON response with a success message and the retrieved itineraries data.
 */
export async function getItineraries(req, res) {
  // Call the advancedResults middleware to handle advanced query parameters
  await advancedResults(Itinerary)(req, res);

  // Send a success response with the retrieved itineraries data
  return res.status(200).json(res.advancedResults);
}

/**
 * Retrieves an itinerary by its ID and sends it as a response.
 * @async
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the itinerary with the provided ID is not found.
 * @returns {Promise<void>} JSON response with a success message and the retrieved itinerary data.
 */
export async function getItineraryById(req, res) {
  // Retrieve the itinerary based on the provided ID
  const itinerary = await Itinerary.findById(req.query.id);

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw "Itinerary Not Found";
  }

  // Send a success response with the retrieved itinerary data
  res.status(200).json({ message: "success", data: itinerary });
}

/**
 * Updates an existing itinerary.
 * @async
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the itinerary with the provided ID is not found.
 * @returns {Promise<void>} JSON response with a success message and the updated itinerary data.
 */
export async function updateItinerary(req, res) {
  req.body = trim_string(req.body);

  // Retrieve and update the itinerary based on the provided ID and request body
  const itinerary = await Itinerary.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // ensures the itinerary returned is the updated one
    runValidators: true,
  });

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw "Itinerary Not Found";
  }

  // Send a success response with the updated itinerary data
  res.status(200).json({ message: "success", data: itinerary });
}

/**
 * Deletes an itinerary by its ID.
 * @async
 * @param {Object} req - Next.js API route request object.
 * @param {Object} res - Next.js API route response object.
 * @throws {string} Throws an error if the itinerary with the provided ID is not found.
 * @returns {Promise<void>} JSON response with a success message upon successful deletion.
 */
export async function deleteItinerary(req, res) {
  // Delete the itinerary based on the provided ID
  const itinerary = await Itinerary.findByIdAndDelete(req.query.id);

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw "Itinerary Not Found";
  }

  // Send a success response upon successful deletion
  res.status(200).json({ message: "success" });
}
