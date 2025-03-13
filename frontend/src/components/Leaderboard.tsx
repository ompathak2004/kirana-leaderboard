import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<{ userId: string; score: number }[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'leaderboard'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as { userId: string; score: number });
      setLeaderboard(data.sort((a, b) => b.score - a.score).slice(0, 10));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map(entry => (
          <li key={entry.userId}>{entry.userId} - {entry.score} points</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;