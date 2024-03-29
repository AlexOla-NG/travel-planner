import { createItinerary, getItineraries } from "api/controllers/itinerary";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: getAllItineraries,
  post: createNewItinerary,
});

// get all itineraries
async function getAllItineraries(req, res) {
  await getItineraries(req, res);
}

// create Itinerary
async function createNewItinerary(req, res) {
  await createItinerary(req, res);
}
