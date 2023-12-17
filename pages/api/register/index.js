import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";
import asyncHandler from "@/utils/async";
import bcrypt from "bcrypt";

export default asyncHandler(async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      const { firstname, lastname, email, password } = req.body

      // STUB: check if all fields are filled out
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await connectMongoDB()
      // STUB: check if email already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // STUB: if email does not exist, create new user
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ firstname, lastname, email, password: hashedPassword })
      return res.json({ message: 'User created successfully' }, { status: 201 })
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    return res.json({ message: 'An error occured while registering the user.' }, { status: 500 })
  }
})