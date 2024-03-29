import { getUserTrips } from "api/controllers/trips";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: getTrips,
});

// get user trips
async function getTrips(req, res) {
  await getUserTrips(req, res);
}
