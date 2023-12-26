import User from "@/models/User"

export default async function getUsers() {
  return await User.find()
}