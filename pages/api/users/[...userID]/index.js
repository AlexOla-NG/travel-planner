
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";

// connect to db
connectMongoDB()

// TODO: setup route to retrieve, update & delete individual user

// get user
export default async function handler(req, res) {
  const { method } = req
  try {

    if (method !== 'GET') {
      return res
        .status(400)
        .json({ success: false, message: 'Only GET requests are allowed.' });
    }

    const data = await User.find()

    return res.status(200).json({ message: 'success', data })
    // return res.status(200).json(res.advancedResults)
  } catch (error) {
    return res.status(500).json({ message: 'An error occured while fetching users.' })
  }
}