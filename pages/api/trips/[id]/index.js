
import { createTrip } from "@/controllers/trips";
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
await connectMongoDB()

export default apiHandler({
  post: createNewTrip,
});

// create trip
async function createNewTrip(req, res) {
  await createTrip(req, res)
}
