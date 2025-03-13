import React from 'react';
import Upload from './components/upload';
import Leaderboard from './components/leaderboard';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <Upload />
      </div>
      <div style={{ flex: 1, backgroundColor: '#e0e0e0' }}>
        <Leaderboard />
      </div>
    </div>
  );
};

export default App;