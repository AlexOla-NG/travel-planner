import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// TODO: refactor component to use apiHandler

// connect to db
connectMongoDB()

// create new user
export default async function handler (req, res) {
  const {method, body} = req
  try {

    if(method !== 'POST') {
      return res
        .status(400)
        .json({ success: false, message: 'Only POST requests are allowed.' });
    }
    
    const { firstName, lastName, email, password, phoneNumber } = body

    // check if all fields are filled out
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = await User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber })
    return res.status(201).json({ message: 'User created successfully', data })
  } catch (error) {
    return res.status(500).json({ message: 'An error occured while registering the user.' })
  }
}