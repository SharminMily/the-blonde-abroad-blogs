import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found');
  }

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new Error('This user is blocked ! !');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password! Please Try again.');
  }

  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '1d',
  });

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
