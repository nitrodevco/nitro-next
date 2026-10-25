/** Stable actions for the achievement browser. */
import { achievementsStore } from '../store/AchievementsStore';

const { back, close, reset } = achievementsStore.getState();

export const useAchievementsActions = () => ({ back, close, reset });
