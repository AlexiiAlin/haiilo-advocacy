import React from 'react';
import { IPost, IAuthor } from '../../types';
import './PostPreview.scss';
import { Link } from "react-router-dom";
import PartialPost from "../shared/partial-post/PartialPost";

type PostPreviewProps = {
  post: IPost;
  author: IAuthor;
  deletePost: (postId: number) => void;
}

const PostPreview = ({post, author, deletePost}: PostPreviewProps) => {
  return (
    <PartialPost author={author} post={post} deletePost={deletePost}>
      <Link key={post.id} to={`/posts/${post.id}`}>
        <div className="read-more">
          Read entire post
        </div>
      </Link>
    </PartialPost>
  );
};

export default PostPreview;