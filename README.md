# Kirana Leaderboard

Welcome to the **Kirana Leaderboard** project! This application is designed to encourage Kirana store owners (2 million+ active users) to increase shelf visibility for an oats brand by uploading images of their shelves. The system counts oats packets, assigns scores, and maintains a real-time leaderboard using a scalable architecture with Firebase, MySQL, Redis, and Bull queues.

## Overview
- **Purpose**: Inspired by the Kirana Club case study (https://kirana.club/case-study/increase-in-shelf-visilbility-in-GT-for-oats-brand), this project incentivizes store owners to maximize oats packet visibility on shelves.
- **Tech Stack**:
  - Frontend: React + TypeScript + Vite
  - Backend: Node.js + TypeScript + Express
  - Storage: Firebase Storage
  - Database: Firestore (real-time), MySQL (persistence)
  - Cache/Queue: Redis (leaderboard caching, Bull queue)
  - Image Processing: OpenCV.js (via `opencv4nodejs`)
- **Scalability**: Designed for 2M users with asynchronous processing and distributed workers.

## Installation

### Prerequisites
- Node.js (v20.x)
- npm or yarn
- Python 2.7 or 3.5-3.9
- CMake
- Visual Studio Build Tools (Windows) or `libopencv-dev` (Linux)
- Firebase account and project setup
- MySQL server
- Redis server

### Clone the repository:
   ```bash
   git clone https://github.com/ompathak2004/kirana-leaderboard.git
   cd kirana-leaderboard/backend
