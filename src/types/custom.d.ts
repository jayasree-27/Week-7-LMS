
import { Request } from 'express';
import { IUser } from '../models/userModel';

export interface AuthRequest extends Request {
  user?: IUser; // assuming user is added by auth middleware
}
