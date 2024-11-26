import Joi from "joi";

// Joi schema for Name
const nameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .messages({
      "string.max": "First name cannot exceed 20 characters",
      "any.required": "First name is required",
    }),
  middleName: Joi.string()
    .trim()
    .min(5)
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "{#value} is not valid (only alphabetic characters are allowed)",
      "string.min": "Middle name must be at least 5 characters",
      "any.required": "Middle name is required",
    }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
  }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "Father's occupation is required",
  }),
  fatherContact: Joi.string().required().messages({
    "any.required": "Father's contact is required",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "any.required": "Mother's occupation is required",
  }),
  motherContact: Joi.string().required().messages({
    "any.required": "Mother's contact is required",
  }),
});

// Joi schema for Local Guardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Local guardian's address is required",
  }),
});


// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Student ID is required",
  }),
  name: nameSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .messages({
      "any.only": "{#value} is not a valid gender",
      "any.required": "Gender is required",
    }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "{#value} is not a valid email",
      "any.required": "Email is required",
    }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number is required",
  }),
  emergencyContactNO: Joi.string().required().messages({
    "any.required": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional()
    .messages({
      "any.only": "Blood group must be a valid type",
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid("active", "block")
    .default("active")
    .messages({
      "any.only": "Status must be 'active' or 'block'",
    }),
});

export default studentValidationSchema;
