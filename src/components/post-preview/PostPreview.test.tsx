import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostPreview from './PostPreview';
import { IPost, IAuthor } from '../../types';

describe('PostPreview Component', () => {
  const mockPost: IPost = {
    id: 123,
    title: 'Test Post Title',
    text: 'Test post content goes here.',
    image: 'test-image-url.jpg',
    authorEmail: 'test@example.com'
  };

  const mockAuthor: IAuthor = {
    email: 'test@example.com',
    userName: 'John Doe',
    image: 'author-image-url.jpg'
  };

  it('renders correctly with given post and author', () => {
    render(
      <MemoryRouter>
        <PostPreview post={mockPost} author={mockAuthor} deletePost={() => {}}/>
      </MemoryRouter>
    );

    // Check that the link is correct
    const linkElement = screen.getByRole('link'); // Finds the link element
    expect(linkElement).toHaveAttribute('href', `/posts/${mockPost.id}`);

    // Check for rendered content from PartialPost and the text 'Read entire post'
    expect(screen.getByText('Read entire post')).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument(); // Checking if title renders from PartialPost
  });
});
