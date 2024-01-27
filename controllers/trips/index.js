// create trip
// update trip
// get single trip by id
// get all trips
// delete trip

import Trip from "@/models/Trip";
import User from "@/models/User";

// TODO: stopped here
// test createTrip endpoint

export async function createTrip(req, res) {
  const { name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes } = req.body

  // check if all fields are filled out
  if (!name || !startingLocation || !destination || !tripType || !accommodationType || !transportMode || !startDate || !endDate || !dateFlexibility) throw 'All fields are required';

  // check if userID is provided and check if user with that ID exists
  const userID = req.query.id
  if(!userID) throw 'User ID is required';

  // check if user exists
  const user = await User.findById(userID)
  if (!user) throw 'User Not Found';

  // create new trip
  const data = await Trip.create({ name, startingLocation, destination, tripType, accommodationType, transportMode, startDate, endDate, dateFlexibility, notes, userID})

  return res.status(201).json({ message: 'Trip created successfully', data })
}