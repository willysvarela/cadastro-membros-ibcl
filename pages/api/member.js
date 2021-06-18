// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
  const allUsers = await new PrismaClient().member.findMany()
  console.log(allUsers)
  res.status(200).json(allUsers)
}
