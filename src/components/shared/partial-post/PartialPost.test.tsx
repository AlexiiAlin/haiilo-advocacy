import React from 'react';
import { render, screen } from '@testing-library/react';
import PartialPost from './PartialPost';
import { IPost, IAuthor } from '../../../types';

describe('PartialPost Component', () => {
  const mockPost: IPost = {
    id: 1,
    title: 'Test Post',
    text: 'This is some test post content',
    image: 'test-image-url.jpg',
    authorEmail: 'author@example.com'
  };

  const mockAuthor: IAuthor = {
    email: 'author@example.com',
    userName: 'John Doe',
    image: 'author-image-url.jpg'
  };

  it('renders correctly with post and author data', () => {
    render(
      <PartialPost post={mockPost} author={mockAuthor} deletePost={() => {}}>
        <div>Child content</div>
      </PartialPost>
    );

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is some test post content')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('test-image-url.jpg')).toBeInTheDocument();
    expect(screen.getByAltText('author-image-url.jpg')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders no content when no post is provided', () => {
    render(
      <PartialPost author={mockAuthor} deletePost={() => {}}>
        <div>Child content</div>
      </PartialPost>
    );
    expect(screen.queryByText('Test Post')).not.toBeInTheDocument();
    expect(screen.queryByText('This is some test post content')).not.toBeInTheDocument();
  });

  it('does not render author details when no author is provided', () => {
    render(
      <PartialPost post={mockPost} deletePost={() => {}}>
        <div>Child content</div>
      </PartialPost>
    );
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByAltText('test-image-url.jpg')).toBeInTheDocument();
  });
});
