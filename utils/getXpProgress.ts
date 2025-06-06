import { levelConfig } from '@/utils/levelConfig';

export const getXpProgress = (xp: number) => {
  const currentLevel = levelConfig.findLast((lvl) => xp >= lvl.minXp);

  if (!currentLevel) {
    return { percentage: 0, current: xp, needed: levelConfig[0].minXp };
  }

  const nextLevel = levelConfig.find(
    (lvl) => lvl.level === currentLevel?.level + 1
  );

  if (!currentLevel || !nextLevel) {
    return { percentage: 100, current: xp, needed: xp };
  }

  const range = nextLevel.minXp - currentLevel.minXp;
  const progress = xp - currentLevel.minXp;
  const percentage = (progress / range) * 100;

  return { percentage, current: xp, needed: nextLevel.minXp };
};
