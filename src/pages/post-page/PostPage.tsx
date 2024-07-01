import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService, commentService, authorService } from '../../services';
import Post from "../../components/post/Post";
import './PostPage.scss';
import Loader from "../../components/loader/Loader";
import { getCurrentUserEmail } from "../../utils/getCurrentUserEmail";
import { IAuthor, IComment, IPost } from "../../types";
import { usePosts } from "../../context/PostsContext";
import { isNumeric } from "../../utils/isNumeric";

const PostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const { authors, loading: authorsLoading, fetchData } = usePosts();

  const loadData = useCallback(() => {
    if (postId) {
      if (!isNumeric(postId)) {
        navigate('/');
        return;
      }
      setLoading(true);
      Promise.all([
        postService.getPostById(parseInt(postId)).then(post => {
          if (post) {
            setPost(post);
            if (post.authorEmail) {
              return authorService.getAuthorByEmail(post.authorEmail);
            }
          }
          navigate('/');
          return undefined;
        }),
        commentService.getCommentsByPostId(parseInt(postId)).then(setComments)
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [postId]);

  const postAuthor: IAuthor | undefined = !authorsLoading && authors && post
    ? authors[post.authorEmail]
    : undefined;

  useEffect(() => {
    loadData();
  }, [postId]);

  const saveComment = async (textValue: string) => {
    if (post && postAuthor) {
      commentService.createComment({
        postId: post.id,
        text: textValue,
        authorEmail: getCurrentUserEmail(),
      }).then(() => {
        loadData();
      })
    }
  };

  const handleDeleteComment = async (id: number) => {
    await commentService.deleteComment(id);
    loadData();
  };

  const handleDeletePost = async (id: number) => {
    setLoading(true);
    await postService.deletePost(id);
    await fetchData();
    navigate('/');
  };

  return (
    <div className="post-wrapper">
      <Loader loading={loading}/>
      {
        !loading && (
          <>
            <div>
              <cat-button icon="arrow-left-outlined" onClick={() => navigate('/')}>Back</cat-button>
            </div>
            <Post
              post={post}
              comments={comments}
              author={postAuthor}
              saveComment={saveComment}
              deleteComment={handleDeleteComment}
              deletePost={handleDeletePost}
            />
          </>
        )
      }
    </div>
  );
};

export default PostPage;
