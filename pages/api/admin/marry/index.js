import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const Prisma = new PrismaClient();

const saveMarry = async (req, res) => {
  const { body } = req;

  const marry = {
    marry_date: dayjs(body.marry_date).toDate(),
    photo_url: body.photo_url
  };
  const { member } = body;
  try {
    const result = await Prisma.marry.create({
      data: {
        ...marry
      }
    });
    console.log({ result });
    member.forEach(async (item) => {
      const data =
        await Prisma.$executeRaw`UPDATE "Member" SET marry_id = ${result.id} WHERE id = ${item.id}`;
      return data;
    });

    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateMarry = async (req, res) => {
  const { body } = req;
  const marry = {
    id: body.id,
    marry_date: dayjs(body.marry_date).toDate(),
    photo_url: body.photo_url
  };
  try {
    const data = await Prisma.marry.update({
      where: { id: marry.id },
      data: { ...marry }
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
          name: true,
          gender: true
        }
      }
    }
  });
  res.status(200).json(result);
};

const resetMarries = async (req, res) => {
  const { query } = req;
  console.log({ query });
  await Prisma.marry.delete({ where: { id: query.id } });
  res.status(200);
};

const handler = nc()
  .get(listMarries)
  .post(saveMarry)
  .put(updateMarry)
  .delete(resetMarries);
export default handler;
