import Itinerary from "@/models/Itineraries";
import Trip from "@/models/Trip";

// TODO: stopped here
// test api endpoints with postman
// add jsdoc

// create itinerary
export async function createItinerary(req, res) {
  // Extract itinerary details from the request body
  const { activity, startTime, endTime, tripID, notes } = req.body;

  // Check if all compulsory fields are not empty
  if (!activity || !startTime || !endTime || !tripID) {
    throw 'All fields are required';
  }

  // Check if trip with the given ID exists
  const trip = await Trip.findById(tripID);
  if (!trip) {
    throw 'Trip Not Found';
  }

  // Create a new itinerary
  const data = await Itinerary.create({ activity, startTime, endTime, tripID, notes });

  // Send a success response with the created Itinerary data
  return res.status(201).json({ message: 'Itinerary created successfully', data });
}

// get all itineraries
export async function getItineraries(req, res) {
  // Retrieve all itineraries from the database
  const itineraries = await Itinerary.find();

  // If no itineraries are found, throw an error
  if (!itineraries) {
    throw 'No itineraries in db';
  }

  // Call the advancedResults middleware to handle advanced query parameters
  await advancedResults(Itinerary)(req, res);

  // Send a success response with the retrieved itineraries data
  return res.status(200).json(res.advancedResults);
}

// get itinerary by id
export async function getItineraryById(req, res) {
  // Retrieve the itinerary based on the provided ID
  const itinerary = await Itinerary.findById(req.query.id);

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw 'Itinerary Not Found';
  }

  // Send a success response with the retrieved itinerary data
  res.status(200).json({ message: 'success', data: itinerary });
}

// update itinerary
export async function updateItinerary(req, res) {
  // Retrieve and update the itinerary based on the provided ID and request body
  const itinerary = await Itinerary.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // ensures the itinerary returned is the updated one
    runValidators: true,
  });

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw 'Itinerary Not Found';
  }

  // Send a success response with the updated itinerary data
  res.status(200).json({ message: 'success', data: itinerary });
}

// delete itinerary
export async function deleteItinerary(req, res) {
  // Delete the itinerary based on the provided ID
  const itinerary = await Itinerary.findByIdAndDelete(req.query.id);

  // If the itinerary ID is invalid, throw an error
  if (!itinerary) {
    throw 'Itinerary Not Found';
  }

  // Send a success response upon successful deletion
  res.status(200).json({ message: 'success' });
}