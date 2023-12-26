
import getUser from "@/controllers/user/getUser";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
connectMongoDB()

// get user
export default async function handler(req, res) {
  const { method, params } = req
  try {

    if (method !== 'GET') {
      return res
        .status(400)
        .json({ success: false, message: 'Only GET requests are allowed.' });
    }

    const user = await getUser(params.id)

    // if (!user)
    //   return res.status(404).json({ message: `User not found with id of ${params.id}` });

    // return res.status(200).json({ message: 'success', data: user })
  } catch (error) {
    return res.status(500).json({ message: 'An error occured while fetching user.' })
  }
}