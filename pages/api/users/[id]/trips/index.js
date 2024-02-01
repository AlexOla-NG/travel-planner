
import { getUserTrips } from "@/controllers/trips";
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
await connectMongoDB()

export default apiHandler({
  get: getTrips,
});

// get user trips
async function getTrips(req, res) {
  await getUserTrips(req, res)
}

