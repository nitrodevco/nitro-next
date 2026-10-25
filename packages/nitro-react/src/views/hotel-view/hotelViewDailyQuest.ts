/**
 * What `DailyQuestWidget` and `DailyQuestElementHandler` share - two copies of the same code over
 * two layouts (`daily_quest`, `element_dailyquest`) with the same named windows: `refreshContent`'s
 * texts, visibility and clicks, the task's parameter, and the difficulty row `refreshContent` lays
 * out. Nothing changes before the first `QuestDailyMessageEvent`: until then the layout shows as built.
 */
import type { QuestDailyMessageType } from '@nitrodevco/nitro-packets';

import { dailyQuestChainText, dailyQuestHasNext, dailyQuestName } from '#base/context/system';
import type { TemplateBindings, TemplateWindows } from '#base/theme';

/** The clicks: `onAcceptButton`, `onNextQuest`, `onCancelQuest`, `onGoButton`, `onEasyRegion` / `onHardRegion`. */
export interface DailyQuestActions {
    accept: (questId: number) => void;
    next: (easy: boolean) => void;
    cancel: () => void;
    go: () => void;
    difficulty: (easy: boolean) => void;
}

/** The texts the element's layout tags `COLORABLE` (the widget's tags none). */
export const DAILY_QUEST_COLORABLE = [ 'next_quest_txt', 'cancel_quest_txt', 'current_quest_txt', 'easy_region/label_txt', 'hard_region/label_txt' ] as const;

/** `getText`. */
const text = (key: string) => `\${${key}}`;

/** `initialize`'s procedures and `refreshContent`'s windows, shared by both layouts. */
export const dailyQuestBindings = (daily: QuestDailyMessageType | undefined, actions: DailyQuestActions): TemplateBindings => {
    const quest = daily?.quest ?? null;
    const bindings: TemplateBindings = {
        accept_button: { onPointerTap: () => quest && actions.accept(quest.id) },
        go_button: { onPointerTap: actions.go },
        next_quest_region: { onPointerTap: () => quest && actions.next(quest.easy) },
        cancel_quest_region: { onPointerTap: actions.cancel },
        easy_region: { onPointerTap: () => actions.difficulty(true) },
        hard_region: { onPointerTap: () => actions.difficulty(false) },
    };

    if (!daily) return bindings;

    const offered = !!quest && !quest.accepted;
    const accepted = !!quest && quest.accepted;

    return {
        ...bindings,
        caption_txt: { caption: quest ? dailyQuestChainText(quest, 'chaincaption') : text('landing.view.quest.currenttask.alldone.caption') },
        accept_button: { ...bindings.accept_button, visible: offered },
        next_quest_region: { ...bindings.next_quest_region, visible: offered && dailyQuestHasNext(quest, daily.easyQuestCount, daily.hardQuestCount) },
        next_quest_txt: { caption: text(`landing.view.quest.nextquest.${quest?.easy ? 'easy' : 'hard'}`) },
        cancel_quest_region: { ...bindings.cancel_quest_region, visible: accepted },
        current_quest_border: { visible: accepted },
        difficulty_container: { visible: dailyQuestDifficultyVisible(daily) },
        // `setupDifficultyText`: the difficulty not offered is the underlined link.
        'easy_region/label_txt': { underline: !!quest && !quest.easy },
        'hard_region/label_txt': { underline: !!quest && quest.easy },
    };
};

/** `registerParameter("landing.view.quest.currenttask", "task", getQuestName())`, once there is a quest. */
export const dailyQuestParameters = (daily: QuestDailyMessageType | undefined): Record<string, Record<string, string>> | undefined => (daily?.quest ? { 'landing.view.quest.currenttask': { task: dailyQuestName(daily.quest) } } : undefined);

/** `moveChildrenToRow`'s gap, and the gap `DailyQuestWidget` leaves before the row. */
const ROW_GAP = 5;

/**
 * `refreshContent`'s difficulty row: each link as wide as its text (`setupDifficultyText`), the
 * row's children side by side `ROW_GAP` apart (`moveChildrenToRow`), and the row as wide as they
 * are, keeping its right edge. Returns the row.
 */
export const arrangeDailyQuestDifficulty = ({ find }: TemplateWindows) => {
    const row = find('difficulty_container');

    if (!row) return undefined;

    const right = row.x + row.width;

    for (const name of [ 'easy_region', 'hard_region' ]) {
        const region = find(name);
        const label = find(`${name}/label_txt`);

        if (!region || !label) continue;

        label.setWidth(label.textWidth);
        region.setWidth(label.width);
    }

    let x = 0;

    for (const child of row.children) {
        child.setX(x);
        x += child.width + ROW_GAP;
    }

    const hard = find('hard_region');

    if (hard) row.setWidth(hard.x + hard.width);

    row.setX(right - row.width);

    return row;
};

/**
 * `DailyQuestWidget.refreshContent`: the header line runs from the title to the row when the row
 * shows, else to where it ended in the layout.
 */
export const arrangeDailyQuestHeader = ({ find }: TemplateWindows, row: ReturnType<typeof arrangeDailyQuestDifficulty>, rowVisible: boolean, lineEnd: number) => {
    const line = find('hdr_line');

    if (!line) return;

    line.setWidth(((row && rowVisible) ? (row.x - ROW_GAP) : lineEnd) - line.x);
};

/** Whether `refreshContent` shows the difficulty row: a quest offered, and quests of both difficulties. */
export const dailyQuestDifficultyVisible = (daily: QuestDailyMessageType | undefined) => !!daily?.quest && !daily.quest.accepted && (daily.easyQuestCount > 0) && (daily.hardQuestCount > 0);
