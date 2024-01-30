import advancedResults from "@/helpers/api/advancedResults";
import Trip from "@/models/Trip";
import User from "@/models/User";

// TODO: stopped here
// create jsdoc for controllers
// create endpoint for retrieving user trips...it should be in users/trip/userID

export async function createTrip(req, res) {
  const { name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes } = req.body

  // check if all fields are filled out
  if (!name || !startingLocation || !destination || !tripType || !accommodationType || !transportMode || !startDate || !endDate || !dateFlexibility) throw 'All fields are required';

  // check if userID is provided and check if user with that ID exists
  const userID = req.body.userID
  if(!userID) throw 'User ID is required';

  // check if user exists
  const user = await User.findById(userID)
  if (!user) throw 'User Not Found';

  // create new trip
  const data = await Trip.create({ name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes, userID})

  return res.status(201).json({ message: 'Trip created successfully', data })
}

export async function updateTrip(req, res) {
  const trip = await Trip.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // ensures trip returned is the updated one
    runValidators: true,
  });

  // if invalid id, throw error
  if (!trip) throw 'Trip Not Found'

  res.status(200).json({ message: 'success', data: trip });
}

export async function getTripById(req, res) {
  const trip = await Trip.findById(req.query.id);

  // if invalid id, throw error
  if (!trip) throw 'Trip Not Found'

  res.status(200).json({ message: 'success', data: trip });
}

export async function getTrips(req, res) {
  const trips = await Trip.find()

  // if no trips, throw error
  if (!trips) throw 'No trips in db'

  await advancedResults(Trip)(req, res)

  return res.status(200).json(res.advancedResults)
}

export async function deleteTrip(req, res) {
  const trip = await Trip.findByIdAndDelete(req.query.id);

  // if invalid id, throw error
  if (!trip) throw 'Trip Not Found'

  res.status(200).json({ message: 'success' });
}