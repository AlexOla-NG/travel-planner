import { getUsers, createNewUser } from "@/controllers/user";
import { connectMongoDB } from "@/libs/mongodb";
import { apiHandler } from "@/helpers/api/apiHandler";

// TODO: implement advanced results function to handle sorting, filtering, pagination, etc

await connectMongoDB()

export default apiHandler({
  get: getAllUsers,
  post: createUser,
});

// get all users
async function getAllUsers(req, res) {
  await getUsers(res)
}

// create user
async function createUser(req, res) {
  await createNewUser(req, res)
}