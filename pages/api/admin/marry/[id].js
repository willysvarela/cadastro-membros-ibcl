import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

const deleteMarry = async (req, res) => {
  const { query } = req;
  try {
    const result = await Prisma.marry.delete({
      where: { id: parseInt(query.id, 10) }
    });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

const handler = nc().delete(deleteMarry);
export default handler;
