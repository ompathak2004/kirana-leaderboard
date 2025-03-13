import cv from 'opencv4nodejs';
import path from 'path';

export const processImage = async (imageUrl: string): Promise<{ packetCount: number; score: number }> => {
  const img = await cv.imreadAsync(imageUrl);
  const templatePath = path.join(__dirname, '../../assets/templates/oats-template.jpg');
  const template = await cv.imreadAsync(templatePath); 
  const result = img.matchTemplate(template, cv.TM_CCOEFF_NORMED);
  const matches = result.getTopNLocations(0.8, 10); 
  const packetCount = matches.length;
  const score = packetCount * 10; 
  return { packetCount, score };
};