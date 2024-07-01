import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Post from './Post';
import { PostsContext } from '../../context/PostsContext';
import { IPost, IComment, IAuthor, PostsContextType } from '../../types';

const mockPost: IPost = {
  id: 1,
  title: 'Test Post',
  text: 'This is a test post',
  image: 'test-image.jpg',
  authorEmail: 'test@test.com'
};

const mockComments: IComment[] = [
  { id: 1, postId: 1, text: 'Test comment', authorEmail: 'test@test.com' }
];

const mockAuthor: IAuthor = {
  email: 'test@test.com',
  userName: 'Test User',
  image: 'test-image.jpg'
};

const setup = (comments: IComment[] = []) => {
  const saveComment = jest.fn();
  const deleteComment = jest.fn();
  const contextValue: PostsContextType = {
    posts: [mockPost],
    authors: { 'test@test.com': mockAuthor },
    loading: false,
    fetchData: () => {}
  };
  const utils = render(
    <PostsContext.Provider value={contextValue}>
      <Post
        post={mockPost}
        comments={comments}
        author={mockAuthor}
        saveComment={saveComment}
        deleteComment={deleteComment}
        deletePost={() => {}}
      />
    </PostsContext.Provider>
  );
  return {
    saveComment,
    deleteComment,
    ...utils
  };
};

describe('Post Component', () => {
  it('renders the post correctly', () => {
    setup();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders comments correctly', () => {
    setup(mockComments);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  it('allows the user to type a comment', () => {
    const { getByTitle } = setup();
    const textarea = getByTitle('Comment');
    fireEvent.change(textarea, { target: { value: 'New comment' } });
    expect(textarea).toHaveValue('New comment');
  });

  it('does not save comment when send button is clicked and the textField is empty', () => {
    const { getByText, saveComment } = setup();

    fireEvent.click(getByText('Send'));
    expect(saveComment).toHaveBeenCalledTimes(0);
  });

  it('saves comment when send button is clicked', () => {
    const { getByTitle, getByText, saveComment } = setup();

    // Simulate typing into the textarea
    const commentInput = getByTitle('Comment');
    fireEvent.change(commentInput, { target: { value: 'New comment' } });

    fireEvent.click(getByText('Send'));
    expect(saveComment).toHaveBeenCalledWith('New comment');
    expect(saveComment).toHaveBeenCalledTimes(1);
  });

  it('does not display delete button if author emails do not match', () => {
    const { queryByText } = setup(mockComments.map(comment => ({
      ...comment,
      authorEmail: 'different@test.com'
    })));
    expect(queryByText('Delete')).not.toBeInTheDocument();
  });
});
