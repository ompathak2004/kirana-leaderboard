import { db } from '../config/firebase';

export interface Image {
  userId: string;
  imageUrl: string;
  packetCount: number;
  score: number;
  timestamp: string;
}

export const saveImage = async (image: Image) => {
  await db.collection('images').doc(`${image.userId}-${Date.now()}`).set(image);
};