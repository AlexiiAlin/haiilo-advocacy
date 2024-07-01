import React from 'react';
import './Comment.scss';
import { getCurrentUserEmail } from "../../utils/getCurrentUserEmail";

type CommentProps = {
  id: number;
  text: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  deleteComment: (id: number) => void;
}

const Comment = ({id, text, authorName, authorEmail, authorImage, deleteComment}: CommentProps) => {
  return (
    <div className="comment-container">
      <div className="comment-content">
        <div className="author-wrapper">
          <img src={authorImage} alt={authorImage} className="author-image"/>
          <div className="author-name"><strong>{authorName}</strong></div>
        </div>
        <div className="comment-text">{text}</div>
      </div>
      {
        authorEmail === getCurrentUserEmail() ? (
          <div className="delete-comment-btn">
            <button onClick={() => deleteComment(id)}>
              <cat-icon icon="16-editor-delete" size="s"/>
            </button>
          </div>
        ) : <div className="delete-btn-placeholder"/>
      }
    </div>
  );
};

export default Comment;