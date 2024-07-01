import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './pages/posts-page/PostsPage';
import PostPage from './pages/post-page/PostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
