/**
 * The daily tasks store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { dailyTasksStore } from '../store';

const state = dailyTasksStore.getState();

const actions = {
    setTasks: state.setTasks,
    addTasks: state.addTasks,
    updateTask: state.updateTask,
    setShown: state.setShown,
    setUnclaimedShown: state.setUnclaimedShown,
    setTaskCompleting: state.setTaskCompleting,
};

export const useDailyTasksActions = () => actions;
