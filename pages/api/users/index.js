import { getUsers, createNewUser } from "@/controllers/user";
import { apiHandler } from "@/helpers/api/apiHandler";

export default apiHandler({
  get: getAllUsers,
  post: createUser,
});

// get all users
async function getAllUsers(req, res) {
  await getUsers(req, res)
}

// create user
async function createUser(req, res) {
  await createNewUser(req, res)
}