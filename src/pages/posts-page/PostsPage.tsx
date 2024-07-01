import React, { useState } from 'react';
import './PostsPage.scss';
import Loader from "../../components/loader/Loader";
import PostPreview from "../../components/post-preview/PostPreview";
import CreatePost from "../../components/create-post/CreatePost";
import Modal from "../../components/modal/Modal";
import { usePosts } from "../../context/PostsContext";
import { postService } from "../../services";
import { CreatePostDto } from "../../types";

const PostsPage = () => {
  const { posts, authors, loading, fetchData } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const savePost = async (newPost: CreatePostDto) => {
    await postService.createPost(newPost);
    fetchData();
    handleCloseModal();
  };

  const handleDeletePost = async (id: number) => {
    await postService.deletePost(id);
    fetchData();
  };

  return (
    <div className="posts-wrapper">
      <Loader loading={loading} />
      {!loading && (
        <>
          <div className="create-post-btn">
            <cat-button
              icon="plus-outlined"
              variant="filled"
              color="primary"
              onClick={handleOpenModal}
            >
              Create new post
            </cat-button>
          </div>
          {posts.length
            ? posts.map(post => (
              <PostPreview
                key={post.id}
                post={post}
                author={authors[post.authorEmail]}
                deletePost={handleDeletePost}
              />
            ))
            : <div><i>No posts available...</i></div>
          }
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreatePost savePost={savePost}/>
      </Modal>
    </div>
  );
};

export default PostsPage;
