import User from "@/models/User"

export default async function getUsers(res) {
  const users = await User.find()

  if (!users)
    return res.status(404).json({ message: 'No users in db' });

  return res.status(200).json({ message: 'success', data: users })
}