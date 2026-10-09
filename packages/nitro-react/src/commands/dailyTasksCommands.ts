/**
 * `DailyTasksController` - the daily tasks (`dailytasks/open`, Progression > Daily tasks), only
 * while the hotel has `dailytasks.enabled`.
 *
 * - `DailyTasksActiveList` replaces the tasks, regular ones first and the bonus ones after;
 *   `DailyTasksTasksAdded` adds tasks not held yet, with the "bonus available" bubble when the
 *   first one added is a bonus; `DailyTasksTaskUpdate` sets a held task's repeats and status - a
 *   bubble when it is now completed or claimed - and asks for the list when the task is not held.
 * - The progression menu's count (`UnseenDailyTasksCountUpdateEvent`) is the tasks completed and
 *   not claimed yet.
 * - `requestTasks` (`GetDailyTasks`) is sent at most every 10 seconds: by the window while it holds
 *   no tasks or its tasks ran out more than 5 seconds ago (`DailyTasksView.update`).
 * - A task whose time ran out and that is not active (`isExpired`) is listed in the unclaimed tasks
 *   window rather than the main one.
 */
import { ClaimDailyTaskComposer, DAILY_TASK_STATUS_ACTIVE, DAILY_TASK_STATUS_CLAIMED, DAILY_TASK_STATUS_COMPLETED, GetDailyTasksComposer, IDailyTaskInfo } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { dailyTasksStore } from '#base/context/daily-tasks';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** `REQUEST_TASKS_TIMEOUT_MS`. */
const REQUEST_TASKS_TIMEOUT_MS = 10000;

/** The bubbles' icon and link. */
const NOTIFICATION_ICON = 'icon_daily_tasks_png';
const NOTIFICATION_LINK = 'dailytasks/open';

let lastRequestTime = -REQUEST_TASKS_TIMEOUT_MS;

const tasks = () => dailyTasksStore.getState();
const localize = (key: string) => systemStore.getState().getLocalizationValue(key);

/** `isEnabled`. */
export const isDailyTasksEnabled = () => systemStore.getState().config['dailytasks.enabled'] === true;

/** `DailyTaskInfo.secondsLeft`: 0 for a task sent with none, else counted down from when it came. */
export const getDailyTaskSecondsLeft = (task: IDailyTaskInfo, now: number = Date.now()): number => {
    if (task.secondsLeft <= 0) return 0;

    return task.secondsLeft - Math.trunc((now - task.receivedAt) / 1000);
};

/** `DailyTaskInfo.isExpired`. */
export const isDailyTaskExpired = (task: IDailyTaskInfo, now: number = Date.now()) => (getDailyTaskSecondsLeft(task, now) < 0) && (task.status !== DAILY_TASK_STATUS_ACTIVE);

/** `requestTasks`. */
export const requestDailyTasks = (send: Send) => {
    const now = performance.now();

    if (now <= (lastRequestTime + REQUEST_TASKS_TIMEOUT_MS)) return;

    lastRequestTime = now;
    send(new GetDailyTasksComposer({}));
};

/** `claimTask`. */
export const claimDailyTask = (send: Send, taskId: number) => send(new ClaimDailyTaskComposer({ taskId }));

/** `linkReceived`: `dailytasks/open`. */
export const openDailyTasksLink = (parts: string[]) => {
    if (!isDailyTasksEnabled() || (parts.length < 2)) return;

    if (parts[1] === 'open') tasks().setShown(true);
};

/** `DailyTaskView.update`: the bar has filled, the task is drawn complete. */
export const finishDailyTaskCompletion = (taskId: number) => tasks().setTaskCompleting(taskId, false);

/** `hideView`. */
export const hideDailyTasks = () => tasks().setShown(false);

export const showUnclaimedDailyTasks = (shown: boolean) => tasks().setUnclaimedShown(shown);

const notify = (key: string) => notificationStore.getState().addNotification(localize(key), 'info', NOTIFICATION_ICON, NOTIFICATION_LINK);

/** `onActiveDailyTasks`. */
export const onDailyTasksActiveList = (list: IDailyTaskInfo[]) => tasks().setTasks(list);

/** `onTasksAdded`. */
export const onDailyTasksAdded = (list: IDailyTaskInfo[]) => {
    tasks().addTasks(list);

    if ((list.length > 0) && list[0].isBonus) notify('dailytasks.bonus_available');
};

/** `onTaskUpdated`. */
export const onDailyTaskUpdated = (send: Send, taskId: number, repeats: number, status: number) => {
    const task = tasks().tasks.find(held => held.taskId === taskId);

    if (!task) {
        requestDailyTasks(send);

        return;
    }

    // `updateStatusAndRepeatsUI`: a task completed while its bar shows fills the bar first.
    if ((task.status === DAILY_TASK_STATUS_ACTIVE) && (status === DAILY_TASK_STATUS_COMPLETED) && tasks().shown) tasks().setTaskCompleting(taskId, true);

    tasks().updateTask(taskId, repeats, status);

    if (task.status === status) return;

    if (status === DAILY_TASK_STATUS_COMPLETED) notify('dailytasks.completed.caption');
    else if (status === DAILY_TASK_STATUS_CLAIMED) notify('dailytasks.claimed.caption');
};
