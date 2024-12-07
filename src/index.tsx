import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import App from './App';
import store from './app/redux/store';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}> {/* Ajoutez le Provider avec le store */}
        <App />
      </Provider>
    </React.StrictMode>
  );
}
