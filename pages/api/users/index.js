import getUsers from "@/controllers/user/getUsers";
import { connectMongoDB } from "@/libs/mongodb";


// TODO: refactor component to use apiHandler

// TODO: implement advanced results function to handle sorting, filtering, pagination, etc

// get all users
export default async function handler(req, res) {
  // connect to db
  await connectMongoDB()
  
  const { method } = req
  try {
    if (method !== 'GET') {
      return res
        .status(405)
        .json({ success: false, message: 'Only GET requests are allowed.' });
    }

    await getUsers(res)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'An error occured while fetching users.' })
  }
}