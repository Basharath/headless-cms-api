import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { User, validateUser, validatePassword } from '../models/user';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = user.generateToken();
    res.cookie('token', token, { httpOnly: true, sameSite: 'none' });

    return res.send('Successfully logged in.');
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');

    user = new User({ name, email, password });
    user.password = await bcrypt.hash(password, 12);

    await user.save();

    const token = user.generateToken();
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    // return res.status(201).send({ id: user._id, email, token });
    return res.status(201).send('Successfully signed up.');
  } catch (err) {
    return next(err);
  }
};

const userData = async (req: Request, res: Response) => {
  const data = req.user;
  if (data) return res.send(data);
  return res.status(401).send('Not logged in');
};

const signOut = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.redirect('/');
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userId = req.user.id;

  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User doesn't exists");

    if (user.password) {
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) return res.status(400).send('Incorrect old password');
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    return res.send('Successfully changed password!');
  } catch (err) {
    return next(err);
  }
};

export { signIn, signUp, changePassword, userData, signOut };
