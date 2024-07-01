import React from 'react';
import { render, screen } from '@testing-library/react';
import PostsPage from './PostsPage';
import { PostsContext } from '../../context/PostsContext';
import { IPost, IAuthor, PostsContextType } from '../../types';

jest.mock('../../components/loader/Loader', () => (props: { loading: boolean }) => (
  props.loading ? <div data-testid="loader">Loading...</div> : null
));

jest.mock('../../components/post-preview/PostPreview', () => (props: { post: IPost, author: IAuthor }) => (
  <div data-testid="post-preview">
    <h2>{props.post.title}</h2>
    <p>{props.author.userName}</p>
  </div>
));

const mockPosts: IPost[] = [
  { id: 1, title: 'Post 1', text: 'Text 1', image: 'image1.png', authorEmail: 'author1@test.com' },
  { id: 2, title: 'Post 2', text: 'Text 2', image: 'image2.png', authorEmail: 'author2@test.com' },
];

const mockAuthors: { [key: string]: IAuthor } = {
  'author1@test.com': { email: 'author1@test.com', userName: 'Author 1', image: 'author1.png' },
  'author2@test.com': { email: 'author2@test.com', userName: 'Author 2', image: 'author2.png' },
};

describe('PostsPage Component', () => {
  it('renders loader while loading', () => {
    const contextValue: PostsContextType = {
      posts: [],
      authors: {},
      loading: true,
      fetchData: () => {}
    };

    render(
      <PostsContext.Provider value={contextValue}>
        <PostsPage />
      </PostsContext.Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders posts when loading is complete', () => {
    const contextValue: PostsContextType = {
      posts: mockPosts,
      authors: mockAuthors,
      loading: false,
      fetchData: () => {}
    };

    render(
      <PostsContext.Provider value={contextValue}>
        <PostsPage />
      </PostsContext.Provider>
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    const postPreviews = screen.getAllByTestId('post-preview');
    expect(postPreviews).toHaveLength(mockPosts.length);
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(mockAuthors[post.authorEmail].userName)).toBeInTheDocument();
    });
  });

  it('renders no posts message when there are no posts', () => {
    const contextValue: PostsContextType = {
      posts: [],
      authors: mockAuthors,
      loading: false,
      fetchData: () => {}
    };

    render(
      <PostsContext.Provider value={contextValue}>
        <PostsPage />
      </PostsContext.Provider>
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('post-preview')).toHaveLength(0);
    expect(screen.getByText('No posts available...')).toBeInTheDocument();
  });
});
