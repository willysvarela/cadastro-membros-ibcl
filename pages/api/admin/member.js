import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import dateToString from '../../../utils/date';

const Prisma = new PrismaClient();
const Joi = require('joi');

const schemaMember = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  birth: Joi.date().required(),
  civil_state: Joi.string().required(),
  father_name: Joi.string().allow(''),
  mother_name: Joi.string().allow(''),
  address: Joi.string().required(),
  district: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string(),
  social_network: Joi.string(),
  department: Joi.string().required(),
  go_leader: Joi.string().allow(''),
  gender: Joi.string().valid('M', 'F').required(),
  how_join: Joi.string().required(),
  ministries: Joi.string().allow(''),
  intended_ministries: Joi.string().allow(''),
  favorite_reunion: Joi.string().required(),
  other_skills: Joi.string().allow(''),
  has_ministery: Joi.bool(),
  ministery: Joi.string().allow('').allow(null),
  intended_ministeries: Joi.string().allow('').allow(null),
  ministery_leader: Joi.string().allow('').allow(null),
  has_go: Joi.bool(),
  // courses: Joi.array().items(Joi.string().allow('')),
  //   health_skills: Joi.array().items(Joi.string()),
  //   teach_skills: Joi.array().items(Joi.string()),
  //   social_skills: Joi.array().items(Joi.string()),
  //   maintenance_skills: Joi.array().items(Joi.string()),
  courses: Joi.string().allow(''),
  health_skills: Joi.string().allow(''),
  teach_skills: Joi.string().allow(''),
  social_skills: Joi.string().allow(''),
  maintenance_skills: Joi.string().allow(''),
  photo_url: Joi.string()
}).required();

const listMembers = async (req, res) => {
  const allUsers = await Prisma.member.findMany();
  const users = allUsers.map((user) => ({
    ...user,
    birth: dateToString(user.birth)
  }));
  res.status(200).json(users);
};

const saveMember = async (req, res) => {
  try {
    const { body } = req;
    const { memberData } = body;
    const validation = schemaMember.validate(memberData);
    if (validation.error) {
      res.status(406).json(validation.error.details);
    } else {
      const updatedMember = {};
      updatedMember.id = parseInt(memberData.id, 10);
      updatedMember.name = memberData.name;
      updatedMember.birth = new Date(memberData.birth);
      updatedMember.gender = memberData.gender;
      updatedMember.father_name = memberData.father_name
        ? memberData.father_name
        : '';
      updatedMember.mother_name = memberData.mother_name
        ? memberData.mother_name
        : '';
      updatedMember.civil_state = memberData.civil_state;
      updatedMember.department = memberData.department;
      updatedMember.address = `${memberData.address}`;
      updatedMember.district = memberData.district;
      updatedMember.phone = memberData.phone;
      updatedMember.email = memberData.email;
      updatedMember.social_network = memberData.social_network;
      updatedMember.how_join = memberData.how_join;
      updatedMember.favorite_reunion = memberData.favorite_reunion;
      updatedMember.has_ministery = memberData.has_ministery;
      updatedMember.ministery = memberData.ministery;
      updatedMember.intended_ministeries = memberData.intended_ministeries;
      updatedMember.has_go = memberData.has_go;
      updatedMember.go_leader = memberData.go_leader;
      updatedMember.health_skills = memberData.health_skills;
      updatedMember.teach_skills = memberData.teach_skills;
      updatedMember.social_skills = memberData.social_skills;
      updatedMember.maintenance_skills = memberData.maintenance_skills;
      updatedMember.other_skills = memberData.other_skills;
      updatedMember.courses = memberData.courses;

      updatedMember.photo_url = memberData.photo_url;
      // res.status(200).json(updatedMember);

      try {
        const user = await Prisma.member.update({
          where: { id: parseInt(updatedMember.id, 10) },
          data: updatedMember
        });

        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const handler = nc().get(listMembers).post(saveMember);
export default handler;
