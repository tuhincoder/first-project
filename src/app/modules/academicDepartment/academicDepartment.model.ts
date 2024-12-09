import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculties: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

//if same data in to the db so return the error validation
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('this department is already exists');
  }
  next();
});

//update does not exists
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new Error('this department is does not exists');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
