import { MAX_PHOTOS } from "./constants";

export const mergePhotos = (prev: File[], incoming: File[], maxPhotos:number = MAX_PHOTOS): File[] => {
  const existing = new Set(prev.map((f) => `${f.name}-${f.size}`));
  const uniqueNew = incoming.filter((f) => !existing.has(`${f.name}-${f.size}`));
  return [...prev, ...uniqueNew].slice(0, maxPhotos);
};