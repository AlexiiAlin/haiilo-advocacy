import React, { useState } from 'react';
import { IPost, IComment, IAuthor } from '../../types';
import './Post.scss';
import Comment from "../comment/Comment";
import { usePosts } from "../../context/PostsContext";
import PartialPost from "../shared/partial-post/PartialPost";

type PostProps = {
  post?: IPost;
  comments?: IComment[];
  author?: IAuthor;
  saveComment?: (textValue: string) => void;
  deleteComment?: (id: number) => void;
  deletePost: (postId: number) => void;
}

const Post = ({post, comments, author, saveComment, deleteComment, deletePost}: PostProps) => {
  const [textValue, setTextValue] = useState('');
  const { authors, loading: authorsLoading } = usePosts();

  const saveCommentHandler = async () => {
    if (post && author && textValue) {
      await saveComment?.(textValue);
      setTextValue('');
    }
  };

  const handleCommentChange = (ev: any) => {
    setTextValue(ev.target.value);
  }

  return (
    <PartialPost author={author} post={post} deletePost={deletePost}>
      <div className="write-your-comment"><b>Write your comment:</b></div>
      <div className="write-comment">
        <div className="comment-textarea-wrapper">
          <textarea
            className="fullsize-textarea"
            rows={5}
            title="Comment"
            value={textValue}
            onChange={handleCommentChange}
          />
        </div>
        <div className="save-comment-btn">
          <cat-button onClick={saveCommentHandler}>Send</cat-button>
        </div>
      </div>

      {comments && author && deleteComment && !authorsLoading && (
        <div className="comments-wrapper">
          <div className="divider"/>
          {comments.length
            ? comments.map(comment => (
              <div key={comment.id} className="comment-wrapper">
                <Comment
                  id={comment.id}
                  text={comment.text}
                  authorEmail={comment.authorEmail}
                  authorName={authors[comment.authorEmail]?.userName}
                  authorImage={authors[comment.authorEmail]?.image}
                  deleteComment={deleteComment}
                />
                <div className="divider"/>
              </div>
            ))
            : <div><i>No comments yet on this post...</i></div>
          }
        </div>
      )}
    </PartialPost>
  );
};

export default Post;