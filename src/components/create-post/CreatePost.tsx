import React, { useState } from 'react';
import { CreatePostDto } from '../../types';
import './CreatePost.scss';
import { getCurrentUserEmail } from "../../utils/getCurrentUserEmail";

type CreatePostProps = {
  savePost: (newPost: CreatePostDto) => void;
}

const CreatePost = ({savePost}: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = async () => {
    if (!title || !description || !imageUrl) {
      alert('Please fill in all fields.');
      return;
    }

    const newPost: CreatePostDto = {
      title,
      text: description,
      image: imageUrl,
      authorEmail: getCurrentUserEmail(),
    };

    savePost(newPost);
  };

  return (
    <div className="create-post-container">
      <h3>Create a New Post</h3>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image-url">Image URL:</label>
        <input
          type="text"
          id="image-url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <cat-button variant="filled" color="primary" onClick={handleSave}>Save</cat-button>
      </div>
    </div>
  );
};

export default CreatePost;
