import { deleteItinerary, getItineraryById, updateItinerary } from "api/controllers/itinerary";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: getItinerary,
  put: update,
  delete: _delete,
});

// get itinerary
async function getItinerary(req, res) {
  await getItineraryById(req, res);
}

// update itinerary
async function update(req, res) {
  await updateItinerary(req, res);
}

// delete itinerary
async function _delete(req, res) {
  await deleteItinerary(req, res);
}
