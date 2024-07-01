import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import { catIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';
import { resetDatabase } from "./utils/resetDB";
import { PostsProvider } from "./context/PostsContext";
import './styles/index.scss';

defineCustomElements();
catIconRegistry.addIcons(ci);
// resetDatabase(); // Uncomment this to reset the DB

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PostsProvider>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <App />
      </div>
    </PostsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
