import Joi from 'joi';
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';

import { UserType, PassType } from '../types';

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 255,
    trim: true,
    lowercase: true,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, minlength: 8, maxlength: 1024 },
});

userSchema.methods.generateToken = function genToken() {
  const secret: string = process.env.jwtPrivateKey as string;
  const token = jwt.sign(
    {
      id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
    },
    secret,
    {
      expiresIn: '1hr',
    }
  );
  return token;
};

const User = model('User', userSchema);

const validateUser = (user: UserType) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).label('Name'),
    email: Joi.string().email().min(4).max(255).required().label('Email'),
    password: Joi.string().min(8).max(15).required().label('Password'),
  });

  return schema.validate(user);
};

const validatePassword = (password: PassType) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).max(15).label('Old password'),
    newPassword: Joi.string().min(8).max(15).required().label('New password'),
  });

  return schema.validate(password);
};

export { User, validatePassword, validateUser };
