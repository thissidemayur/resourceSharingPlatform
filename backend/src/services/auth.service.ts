import bcrypt from 'bcrypt';
import { ApiError } from '../utils/apiError.js';
import { generateToken } from '../utils/jwt.js';
import { prisma } from '../utils/prismaClient.js';

// interface
interface iRegisterUser {
  email: string;
  password: string;
}

interface iLoginUser {
  email: string;
  password: string;
}

interface iVerifyOtp {
  otp: string;
  email: string;
}

const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;
const MAX_OTP_RESEND = Number(process.env.MAX_OTP_RESEND) || 3;
const RESEND_WINDOW =
  Number(process.env.RESEND_WINDOW_MINUTES) || 10 * 60 * 1000; // 10 minutes

// genereate OTP
const generateOtp = () => {
  const OTP_LENGTH = Number(process.env.OTP_LENGTH) || 6;
  const DIGITS = process.env.OTP_DIGITS || '0123456789';
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    let randomIndex = Math.floor(Math.random() * DIGITS.length);
    otp += DIGITS[randomIndex];
  }
  return otp;
};

// register user bussiness logic
const registerUser = async ({ email, password }: iRegisterUser) => {
  // check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError({ status: 409, message: 'User already exists' });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  // generate otp
  // const otp = generateOtp();
  // console.log('Generated OTP:', otp);
  // const otpExpiry = new Date(Date.now() + 60 * 10 * 1000); //10 min expiry
  // save user in db
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      // otp,
      // otpExpiry,
      // isVerified: false,
    },
  });

  // ! TODO: send otp via nodemailer

  // return user
  return {
    id: user.id,
    email: user.email,
  };
};

// login bussiness logic
const loginUser = async ({ email, password }: iLoginUser) => {
  // find user in db
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError({ message: 'User not found', status: 404 });
  }
  // if present then verify the password
  const valid = await bcrypt.compare(password, user.password);

  // return error or success
  if (!valid)
    throw new ApiError({ message: 'Invalid credentials', status: 401 });

  return {
    id: user.id,
    // name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

// get user profile
const userProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      // name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new ApiError({ status: 404, message: 'User not found' });
  }
  return user;
};

export default { registerUser, loginUser, userProfile };
