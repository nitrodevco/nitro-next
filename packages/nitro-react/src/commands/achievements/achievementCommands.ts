/** AS3 AchievementController.show, ensureAchievementsInitialized and the category/achievement selection log. */
import { EventLogComposer, GetAchievementsComposer } from '@nitrodevco/nitro-packets';

import { achievementsStore } from '#base/context/achievements';
import { Send } from '#base/context/communication';
import { systemStore } from '#base/context/system';

/** `ensureAchievementsInitialized`: the list is asked for once, until it arrives. */
export const requestAchievements = (send: Send) => {
    if (!achievementsStore.getState().request()) return;

    send(new GetAchievementsComposer({}));
};

/** `HabboQuestEngine.linkReceived` `achievements[/category]`: `show`, then `selectCategoryInternalLink`. */
export const openAchievements = (send: Send, category?: string) => {
    achievementsStore.getState().show();
    requestAchievements(send);
    systemStore.getState().showWindow('achievements');

    if (category) achievementsStore.getState().selectCategoryLink(category);
};

/** `onSelectCategory` / `pickCategory`: logs `Category selected`. */
export const pickAchievementCategory = (send: Send, code: string) => {
    achievementsStore.getState().pickCategory(code);
    send(new EventLogComposer({ event: 'Achievements', data: code, action: 'Category selected', extraString: '', extraInt: 0 }));
};

/** `onSelectAchievement`: logs `Achievement selected`. */
export const pickAchievement = (send: Send, id: number) => {
    achievementsStore.getState().selectAchievement(id);
    send(new EventLogComposer({ event: 'Achievements', data: String(id), action: 'Achievement selected', extraString: '', extraInt: 0 }));
};
