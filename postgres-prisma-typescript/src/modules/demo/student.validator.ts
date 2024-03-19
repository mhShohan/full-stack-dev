import { z } from 'zod';

const educationalQualificationSchema = z.object({
  name: z.string(),
  passingYear: z.string(),
  institute: z.string(),
  board: z.string(),
  roll: z.string(),
  GPA: z.number(),
});

const updateEducationalQualificationSchema = z.object({
  name: z.string(),
  passingYear: z.string(),
  institute: z.string(),
  board: z.string(),
  roll: z.string(),
  GPA: z.number(),
});

const addressSchema = z.object({
  village: z.string(),
  subDistrict: z.string(),
  postOffice: z.string(),
  district: z.string(),
  zipCode: z.string(),
});

const updateAddressSchema = z.object({
  village: z.string().optional(),
  subDistrict: z.string().optional(),
  postOffice: z.string().optional(),
  district: z.string().optional(),
  zipCode: z.string().optional(),
});

const registerSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be contain atleast 6 characters!' })
    .max(20, { message: 'Password must be less than 20 characters!' }),
});

const createSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be contain atleast 6 characters!' })
    .max(20, { message: 'Password must be less than 20 characters!' }),
  dateOfBirth: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  avatar: z.string(),
  session: z.string(),
  phone: z.string(),
  hallId: z.string(),
  facultyId: z.string(),
  departmentId: z.string(),
  educationalQualifications: z.array(educationalQualificationSchema),
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  nationality: z.string(),
  religion: z.string(),
});

const updateSchema = z.object({
  studentId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be contain atleast 6 characters!' })
    .max(20, { message: 'Password must be less than 20 characters!' })
    .optional(),
  dateOfBirth: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  avatar: z.string().optional(),
  session: z.string().optional(),
  phone: z.string().optional(),
  hallId: z.string().optional(),
  facultyId: z.string().optional(),
  departmentId: z.string().optional(),
  educationalQualifications: z.array(updateEducationalQualificationSchema).optional(),
  presentAddress: updateAddressSchema.optional(),
  permanentAddress: updateAddressSchema.optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
});

const loginSchema = z.object({
  emailOrStudentId: z.string(),
  password: z.string(),
});

const studentValidator = { createSchema, updateSchema, loginSchema, registerSchema };

export default studentValidator;
