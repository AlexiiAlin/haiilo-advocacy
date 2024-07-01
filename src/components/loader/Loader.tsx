import React from 'react';
import './Loader.scss';

const Loader = ({loading}: {loading: boolean}) => {
  return loading
    ? <div className="loader" data-testid="loader"><cat-spinner size="xl"></cat-spinner></div>
    : null;
};

export default Loader;
