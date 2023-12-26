import User from "@/models/User"

export default async function getUser(id) {
  // return await User.findById(id)
  const user = await User.findById(id)

  if (!user)
    return res.status(404).json({ message: `User not found with id of ${params.id}` });

  return res.status(200).json({ message: 'success', data: user })
}