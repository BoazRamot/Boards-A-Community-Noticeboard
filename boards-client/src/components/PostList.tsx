import React from 'react';
import PostCard from './PostCard';

interface IProps {
  posts: any;
  boardId: any;
  deleteBoardPost: Function;
  handlePostEdit: Function;
  handleCommentsDialogOpen: Function;
}

const PostList: React.FC<IProps> = ({ 
                                      posts, 
                                      boardId, 
                                      deleteBoardPost, 
                                      handlePostEdit, 
                                      handleCommentsDialogOpen 
}) => {

  return (
    <div>
      {Object.values(posts)
        .reverse()
        .map((post: any) => (
          <PostCard 
            key={post._id} 
            post={post} 
            boardId={boardId} 
            deleteBoardPost={deleteBoardPost}
            handlePostEdit={handlePostEdit}
            handleCommentsDialogOpen={handleCommentsDialogOpen}
          />
        ))}
    </div>
  )
};

export default PostList;
