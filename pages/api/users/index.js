import getUsers from "@/controllers/user/getUsers";
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";

// connect to db
connectMongoDB()

// TODO: implement advanced results function to handle sorting, filtering, pagination, etc

// get all users
export default async function handler(req, res) {
  const { method } = req
  try {

    if (method !== 'GET') {
      return res
        .status(400)
        .json({ success: false, message: 'Only GET requests are allowed.' });
    }

    const data = await User.find()
    // const data = await getUsers()

    return res.status(200).json({ message: 'success', data })
  } catch (error) {
    return res.status(500).json({ message: 'An error occured while fetching users.' })
  }
}