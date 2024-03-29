import { deleteTrip, getTripById, updateTrip } from "api/controllers/trips";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: getTrip,
  put: update,
  delete: _delete,
});

// get trip
async function getTrip(req, res) {
  await getTripById(req, res);
}

// update trip
async function update(req, res) {
  await updateTrip(req, res);
}

// delete trip
async function _delete(req, res) {
  await deleteTrip(req, res);
}
