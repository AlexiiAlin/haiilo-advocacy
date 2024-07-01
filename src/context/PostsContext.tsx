import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { IPost, IAuthor, PostsContextType } from '../types';
import { postService, authorService } from '../services';

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

interface PostsProviderProps {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [authors, setAuthors] = useState<{ [key: string]: IAuthor }>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedPosts, fetchedAuthors] = await Promise.all([postService.getPosts(), authorService.getAuthors()]);
      setPosts(fetchedPosts);
      const authorsMap = fetchedAuthors.reduce((acc, author) => {
        acc[author.email] = author;
        return acc;
      }, {} as { [key: string]: IAuthor });
      setAuthors(authorsMap);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PostsContext.Provider value={{ posts, authors, loading, fetchData }}>
      {children}
    </PostsContext.Provider>
  );
};
