import { Request, Response } from 'express';
import { randomBytes, scryptSync } from 'crypto';
import User from './User';

const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
};

// create
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'password is required' });
    }
    const newUser = new User({ name, email, password: hashPassword(password) });
    await newUser.save();
    const { password: _omit, ...safe } = newUser.toObject();
    return res.status(201).json(safe);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};

// get all
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// get by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user', error });
  }
};

// update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = hashPassword(updateData.password);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // return the updated document
      runValidators: true, // check against schema
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
};

// delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error });
  }
};
