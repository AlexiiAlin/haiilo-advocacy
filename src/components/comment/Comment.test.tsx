import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';
import * as getUserEmail from "../../utils/getCurrentUserEmail";

jest.mock("../../utils/getCurrentUserEmail", () => ({
  getCurrentUserEmail: jest.fn(),
}));

const mockedGetCurrentUserEmail = getUserEmail.getCurrentUserEmail as jest.MockedFunction<typeof getUserEmail.getCurrentUserEmail>;

describe('Comment Component', () => {
  const mockDelete = jest.fn();
  const commentProps = {
    id: 1,
    text: 'Example comment text',
    authorName: 'John Doe',
    authorEmail: 'john@example.com',
    authorImage: 'path/to/image.jpg',
    deleteComment: mockDelete,
  };

  it('renders the comment text, author name, and image', () => {
    render(<Comment {...commentProps} />);
    expect(screen.getByText('Example comment text')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('path/to/image.jpg')).toBeInTheDocument();
  });

  it('shows delete button if the author email matches the current user email', () => {
    mockedGetCurrentUserEmail.mockReturnValue('john@example.com');
    render(<Comment {...commentProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not show delete button if the author email does not match the current user email', () => {
    mockedGetCurrentUserEmail.mockReturnValue('jane@example.com');
    render(<Comment {...commentProps} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls deleteComment when delete button is clicked', () => {
    mockedGetCurrentUserEmail.mockReturnValue('john@example.com');
    render(<Comment {...commentProps} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
