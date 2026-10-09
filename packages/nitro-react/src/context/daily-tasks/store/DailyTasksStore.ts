/**
 * The daily tasks store - Flash `quest/dailytasks/DailyTasksController`'s tasks (`§_-L1l§`) and its
 * two windows: `DailyTasksView` (`shown`) and the `UnclaimedTasksView` it opens (`unclaimedShown`).
 * A task is kept as the packet gave it; its status and repeats follow `DailyTasksTaskUpdate`.
 */
import { DAILY_TASK_STATUS_COMPLETED, IDailyTaskInfo } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

type State = {
    tasks: IDailyTaskInfo[];
    shown: boolean;
    unclaimedShown: boolean;
    /**
     * `DailyTaskView.§_-a1p§`: tasks completed while their progress bar showed, still drawn active
     * while the bar fills to the end (`updateStatusAndRepeatsUI` then `update`).
     */
    completingTaskIds: number[];
};

type Actions = {
    /** `clearTasks` then `addTask` for each: the regular tasks first, the bonus ones after. */
    setTasks: (tasks: IDailyTaskInfo[]) => void;
    /** `addTask`: a task whose id is held already is left as it is. */
    addTasks: (tasks: IDailyTaskInfo[]) => void;
    /** `onTaskUpdated`: its repeats and status. */
    updateTask: (taskId: number, repeats: number, status: number) => void;
    setShown: (shown: boolean) => void;
    setUnclaimedShown: (unclaimedShown: boolean) => void;
    setTaskCompleting: (taskId: number, completing: boolean) => void;
};

export type DailyTasksStore = State & Actions;

export const createDailyTasksStore = () => createStore<DailyTasksStore>()(set => ({
    tasks: [],
    shown: false,
    unclaimedShown: false,
    completingTaskIds: [],
    setTasks: tasks => set({ tasks: [ ...tasks.filter(task => !task.isBonus), ...tasks.filter(task => task.isBonus) ].filter((task, index, all) => all.findIndex(other => other.taskId === task.taskId) === index) }),
    addTasks: tasks => set(x => ({ tasks: [ ...x.tasks, ...tasks.filter((task, index) => !x.tasks.some(held => held.taskId === task.taskId) && (tasks.findIndex(other => other.taskId === task.taskId) === index)) ] })),
    updateTask: (taskId, repeats, status) => set(x => ({ tasks: x.tasks.map(task => ((task.taskId === taskId) ? { ...task, repeats, status } : task)) })),
    // A hidden window has no bars to wait for.
    setShown: shown => set(shown ? { shown } : { shown, completingTaskIds: [] }),
    setTaskCompleting: (taskId, completing) => set(x => ({ completingTaskIds: completing ? [ ...x.completingTaskIds.filter(id => id !== taskId), taskId ] : x.completingTaskIds.filter(id => id !== taskId) })),
    setUnclaimedShown: unclaimedShown => set({ unclaimedShown }),
}));

export const dailyTasksStore = createDailyTasksStore();

/** `updateUnseenTasks`: the tasks done and not claimed - the progression menu's count. */
export const getUnseenDailyTasksCount = (list: readonly IDailyTaskInfo[]) => list.filter(task => task.status === DAILY_TASK_STATUS_COMPLETED).length;
