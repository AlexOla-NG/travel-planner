
import { deleteUser, getById, updateUser } from "@/controllers/user";
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
await connectMongoDB()

export default apiHandler({
  get: getUser,
  put: update,
  delete: _delete
});

// get user
async function getUser(req, res) {
  await getById(req, res)
}

// get user
async function update(req, res) {
  await updateUser(req, res)
}

// get user
async function _delete(req, res) {
  await deleteUser(req, res)
}

