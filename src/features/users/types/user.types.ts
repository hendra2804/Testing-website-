import { Role } from './role-permission.types';

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type GetMeResponse = {
  data: User;
};
