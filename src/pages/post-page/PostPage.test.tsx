import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostPage from './PostPage';
import { PostsContext } from '../../context/PostsContext';
import { IPost, IComment, IAuthor, PostsContextType } from '../../types';

// Mock services
import { postService } from '../../services/post-service';
import { commentService } from '../../services/comment-service';
import { authorService } from '../../services/author-service';

jest.mock('../../services/post-service');
jest.mock('../../services/comment-service');
jest.mock('../../services/author-service');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ postId: '1' }),
  useNavigate: () => mockNavigate,
}));

describe('PostPage Component', () => {
  const mockPost: IPost = {
    id: 1,
    title: 'Test Post',
    text: 'Here is a test post.',
    image: 'test-image.png',
    authorEmail: 'author@test.com'
  };

  const mockComments: IComment[] = [
    { id: 1, postId: 1, text: 'Test comment', authorEmail: 'author@test.com' }
  ];

  const mockAuthor: IAuthor = {
    email: 'author@test.com',
    userName: 'Test Author',
    image: 'author-image.png'
  };

  const contextValue: PostsContextType = {
    posts: [mockPost],
    authors: { 'author@test.com': mockAuthor },
    loading: false,
    fetchData: () => {}
  };

  beforeEach(() => {
    (postService.getPostById as jest.Mock).mockResolvedValue(mockPost);
    (commentService.getCommentsByPostId as jest.Mock).mockResolvedValue(mockComments);
    (authorService.getAuthorByEmail as jest.Mock).mockResolvedValue(mockAuthor);
  });

  it('renders loader initially and fetches data', async () => {
    render(
      <MemoryRouter>
        <PostsContext.Provider value={contextValue}>
          <PostPage />
        </PostsContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Here is a test post.')).toBeInTheDocument();
      expect(screen.getByText('Test comment')).toBeInTheDocument();
    });
  });
});
