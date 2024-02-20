
import { deleteUser, getUserById, updateUser } from "@/controllers/user";
import { apiHandler } from "@/helpers/api/apiHandler";

export default apiHandler({
  get: getUser,
  put: update,
  delete: _delete
});

// get user
async function getUser(req, res) {
  await getUserById(req, res)
}

// update user
async function update(req, res) {
  await updateUser(req, res)
}

// delete user
async function _delete(req, res) {
  await deleteUser(req, res)
}

