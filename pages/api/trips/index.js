import { createTrip, getTrips } from "@/controllers/trips";
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
await connectMongoDB()

export default apiHandler({
  get: getAllTrips,
  post: createNewTrip
});

// get all trips
async function getAllTrips(req, res) {
  await getTrips(req, res)
}

// create trip
async function createNewTrip(req, res) {
  await createTrip(req, res)
}

