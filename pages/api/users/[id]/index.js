
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";

// TODO: stopped here
// create controllers for creating, updating & deleting user

// connect to db
await connectMongoDB()

export default apiHandler({
  get: getById,
  // put: update,
  // delete: _delete
});

// get user
async function getById(req, res) {
  const user = await User.findById(req.query.id)

  if (!user) throw 'User Not Found';

  return res.status(200).json({ message: 'success', data: user })
}