// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();
const Joi = require('joi');

const schemaMember = Joi.object({
  name: Joi.string().required(),
  birthDate: Joi.date().required(),
  civilState: Joi.string().required(),
  fatherName: Joi.string(),
  motherName: Joi.string(),
  address: Joi.string().required(),
  addressNumber: Joi.string().required(),
  district: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string(),
  socialNetwork: Joi.string(),
  department: Joi.string().required(),
  goLeader: Joi.string().allow(''),
  gender: Joi.string().valid('M', 'F').required(),
  howJoin: Joi.string().required(),
  ministries: Joi.string().allow(''),
  intendedMinistries: Joi.string().allow(''),
  favoriteReunion: Joi.string().required(),
  otherSkills: Joi.string().allow(''),
  courses: Joi.array().items(Joi.string().allow('')),
  healthSkills: Joi.array().items(Joi.string()),
  teachSkills: Joi.array().items(Joi.string()),
  socialSkills: Joi.array().items(Joi.string()),
  maintenanceSkills: Joi.array().items(Joi.string()),
  photoUrl: Joi.string()
}).required();

const handler = nc().post(async (req, res) => {
  try {
    const { body } = req;
    const { memberData } = body;
    console.log({ memberData });
    const validation = schemaMember.validate(memberData);
    if (validation.error) {
      console.log(validation.error);
      res.status(406).json(validation.error.details);
    } else {
      const newMember = {};
      newMember.name = memberData.name;
      newMember.birth = new Date(memberData.birthDate);
      newMember.gender = memberData.gender;
      newMember.father_name = memberData.fatherName
        ? memberData.fatherName
        : '';
      newMember.mother_name = memberData.motherName
        ? memberData.motherName
        : '';
      newMember.civil_state = memberData.civilState;
      newMember.department = memberData.department;
      newMember.address = `${memberData.address}, ${memberData.addressNumber}`;
      newMember.district = memberData.district;
      newMember.phone = memberData.phone;
      newMember.email = memberData.email;
      newMember.social_network = memberData.socialNetwork;
      newMember.how_join = memberData.howJoin;
      newMember.favorite_reunion = memberData.favoriteReunion;
      if (memberData.ministries) {
        newMember.has_ministery = true;
        newMember.ministery = memberData.ministries;
        newMember.intended_ministeries = memberData.intendedMinistries;
      } else {
        newMember.has_ministery = false;
      }
      if (memberData.goLeader) {
        newMember.has_go = true;
        newMember.go_leader = memberData.goLeader;
      } else {
        newMember.has_go = false;
      }
      if (memberData.healthSkills) {
        newMember.health_skills = memberData.healthSkills.toString();
      }
      if (memberData.teachSkills) {
        newMember.teach_skills = memberData.teachSkills.toString();
      }
      if (memberData.socialSkills) {
        newMember.social_skills = memberData.socialSkills.toString();
      }
      if (memberData.maintenanceSkills) {
        newMember.maintenance_skills = memberData.maintenanceSkills.toString();
      }
      newMember.other_skills = memberData.otherSkills;
      if (memberData.courses) {
        newMember.courses = memberData.courses.toString();
      }
      newMember.photo_url = memberData.photoUrl;
      try {
        const user = await Prisma.member.create({
          data: newMember
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
});
export default handler;
