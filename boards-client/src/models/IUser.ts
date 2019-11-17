'use strict';

import IBoard from './IBoard';
import IComment from './IComment';
import IImage from './IImage';
import IPost from './IPost';

export default interface IUser {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  images?: IImage[];
  boards?: string[] | IBoard[];
  posts?: IPost[];
  liked?: IComment[];
}
