import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

const saveMarry = async (req, res) => {
  const { body } = req;

  const id = body.marryId;
  const marry = {
    marry_date: new Date(body.marryDate),
    photo_url: body.photoUrl
  };
  const { members } = body;
  try {
    if (!id) {
      const result = await Prisma.marry.create({
        data: {
          ...marry
        }
      });

      members.forEach(async (member) => {
        const data =
          await Prisma.$executeRaw`UPDATE "Member" SET marry_id = ${result.id} WHERE id = ${member.id}`;
        return data;
      });

      res.status(200).json(result);
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateMarry = async (req, res) => {
  const { body } = req;
  const marry = {
    id: body.id,
    marry_date: new Date(body.marryDate),
    photo_url: body.photoUrl
  };

  try {
    const data = await Prisma.marry.update({
      where: { id: marry.id },
      data: marry
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const listMarries = async (req, res) => {
  const result = await Prisma.marry.findMany({
    include: {
      member: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  res.status(200).json(result);
};

const resetMarries = async (req, res) => {
  await Prisma.marry.deleteMany();
  res.status(200);
};

const handler = nc()
  .get(listMarries)
  .post(saveMarry)
  .put(updateMarry)
  .delete(resetMarries);
export default handler;
