import React, { useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import IPost from '../models/IPost';
import BoundDataService from '../services/BoundDataService';
import { apiURL } from '../services/data.service';

interface IProps {
  postDataService: BoundDataService<IPost>;
  onSubmit: (post: IPost) => void;
}

const PostForm: React.FC<IProps & RouteComponentProps> = ({
  postDataService,
  onSubmit,
  match,
  location,
}) => {
  const post = location.state as IPost;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [files, setFiles] = useState([] as File[]);
  const [filesDataURIs, setFilesDataURIs] = useState([] as any[]);
  const [isUpdateDone, setIsUpdateDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    if (post) {
      await postDataService.update(post._id, formData);
      setIsUpdateDone(true);
    } else {
      const newPost = await postDataService.insert(formData);
      formElement.reset();
      setTitle('');
      setContent('');
      setFilesDataURIs([]);
      onSubmit(newPost);
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setTitle(element.value);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    setContent(element.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      // convert to data URI for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e && e.target && e.target.result) {
          setFilesDataURIs([...filesDataURIs, e.target.result]);
        }
        setFiles([...(files || []), ...(element.files as FileList)]);
      };
      Object.values(element.files).forEach(file => {
        reader.readAsDataURL(file);
      });
    }
  };

  if (isUpdateDone) {
    return <Redirect push={true} to={`/`} />;
  }

  return (
    <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
      {/* {post ? <header>Edit Post</header> : <header>Create Post</header>} */}
      <input name="title" value={title} placeholder="What's on your mind?" onChange={onTitleChange} />
      <TextareaAutosize
        name="content"
        minRows={5}
        maxRows={10}
        autoFocus={true}
        spellCheck={true}
        useCacheForDOMMeasurements={true}
        placeholder="Can you elaborate?"
        value={content}
        onChange={onContentChange}
      />
      {filesDataURIs.length > 0 &&
        filesDataURIs.map((dataURI, index) => (
          <img key={index} src={dataURI} alt={`${index}`} />
        ))}
      {filesDataURIs.length === 0 &&
        post &&
        post.images &&
        post.images.map(image => (
          <img
            key={image._id}
            src={`${apiURL}${match.url}/posts/${post._id}/images/${image._id}/image`}
            alt={`${image.description}`}
          />
        ))}
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={onFileChange}
      />
      <button
        type="submit"
        disabled={!title || (post && post.title === title && !files)}
      >
        Submit
      </button>
    </form>
  );
};

export default withRouter(PostForm);
