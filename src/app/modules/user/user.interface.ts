export type TUser = {
  id: string;
  password: string;
  needsPasswordChang: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
