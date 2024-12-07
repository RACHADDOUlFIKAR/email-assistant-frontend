import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import MessageViewer from './components/MessageViewer';

const App: React.FC = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/assistant" element={<MessageViewer />} />
        </Routes>
      
    </Router>
  );
};

export default App;
