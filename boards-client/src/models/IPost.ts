import ICategory from './ICategory';
import IComment from './IComment';

export default interface IPost extends IComment {
  title: string;
  category: ICategory;
}
