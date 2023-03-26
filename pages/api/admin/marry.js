import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

const saveMarry = async (req, res) => {
  const { body } = req;
  const marry = {
    memberId: body.memberId,
    marry_date: body.marryDate,
    photo_url: body.photoUrl
  };

  try {
    const data = await Prisma.marry.create({ data: marry });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const handler = nc().post(saveMarry);
export default handler;
