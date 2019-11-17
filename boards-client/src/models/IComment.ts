import IImage from './IImage';
import IUser from './IUser';

export default interface IComment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images?: IImage[];
  comments?: IComment[];
  likes?: string[] | IUser[];
}
