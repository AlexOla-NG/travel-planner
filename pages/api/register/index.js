import { connectMongoDB } from "@/src/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {

  try {

    if (req.method === 'POST') {
      const { firstname, lastname, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
  
      await connectMongoDB()
      await User.create({ firstname, lastname, email, password: hashedPassword})
  
      return res.json({ message: 'User created successfully' }, {status: 201})
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    return res.json({ message: 'An error occured while registering the user.' }, {status: 500})
  }
}