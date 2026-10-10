/**
 * One campaign chain's quest tracker: AS3 `quest/QuestTracker` over the
 * `habbo-quest-engine-com/QuestTracker` template, docked in the toolbar's extension column
 * (`attachExtension("quest_tracker_N")`), filled as `refreshTrackerDetails` fills it: the quest's
 * name in `quests.tracker.caption`, its description, the Details link while in a room (`onMoreInfo`
 * -> `QuestDetails.showDetails`), the quest picture (`setupQuestImage`) and a `ProgressBar` added
 * to `content_cont` at (10, 87), 162 wide, frameless, with `quests.tracker.progress` over it
 * (the shared `QuestProgressBar`, growing towards the progress as `updateView` does). A completed quest plays the `success_pic_N` tick frames over the
 * picture (`_SafeStr_N17`, one a frame). The slide in and out, the idle nudge and the prompt
 * frames (`prompt_pic_*`) are not ported.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';
import { ReactNode, useEffect, useState } from 'react';

import { toggleQuestDetails, TRACKER_FRAME_MS, TRACKER_SUCCESS_FRAMES } from '#base/commands';
import { QuestTrackerState } from '#base/context/quests';
import { useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { Box, TemplateItem, TemplateWindow, useTemplateLibrary } from '#base/theme';
import { QuestProgressBar } from '#base/views/shared/QuestProgressBar';

import { QUEST_LIBRARY, questKey, QUESTS_WITH_PROMPTS } from './questEntries';

/** `QuestTracker.PROGRESS_BAR_WIDTH` and `PROGRESS_BAR_LOC`. */
const PROGRESS_BAR_WIDTH = 162;
const PROGRESS_BAR_X = 10;
const PROGRESS_BAR_Y = 87;

/** The layout's size: the `quest_tracker` container. */
const WIDTH = 192;
const HEIGHT = 132;

/** `HabboQuestEngine.setupQuestImage`: the quest's picture, the `_a` one for a quest with prompts. */
const questPicture = (quest: IQuestMessageData) => `\${image.library.questing.url}${`${quest.campaignCode}_${quest.localizationCode}${quest.imageVersion}${QUESTS_WITH_PROMPTS.includes(quest.localizationCode) ? '_a' : ''}`.toLowerCase()}.png`;

export const QuestTrackerView = ({ tracker }: { tracker: QuestTrackerState }) => {
    const { quest, phase, completedAt } = tracker;
    const t = useTranslation();
    const templates = useTemplateLibrary(QUEST_LIBRARY);
    const inRoom = useRoomStore(x => !!x.room);
    const [ frame, setFrame ] = useState(0);

    // `COMPLETED_ANIMATION`: the next `_SafeStr_N17` frame each update until the last.
    useEffect(() => {
        if (phase !== 'completed') return;

        const tick = () => setFrame(Math.min(TRACKER_SUCCESS_FRAMES.length - 1, Math.floor((Date.now() - completedAt) / TRACKER_FRAME_MS)));

        tick();

        const interval = setInterval(tick, TRACKER_FRAME_MS);

        return () => clearInterval(interval);
    }, [ phase, completedAt ]);

    if (!templates) return null;

    const name = t(`${questKey(quest)}.name`, `${questKey(quest)}.name`);
    // `refreshTrackerDetails`: `ceil(100 * completedSteps / totalSteps)` of 100.
    const progress = quest.totalSteps > 0 ? Math.ceil((100 * quest.completedSteps) / quest.totalSteps) : 0;
    const successFrame = (phase === 'completed') ? TRACKER_SUCCESS_FRAMES[frame] : 0;

    const bindings: Record<string, { visible?: boolean; caption?: string; asset?: string; onPointerTap?: () => void; added?: TemplateItem[]; children?: ReactNode }> = {
        quest_header_txt: { caption: t('quests.tracker.caption', 'quests.tracker.caption', { quest_name: name }) },
        desc_txt: { caption: t(`${questKey(quest)}.desc`, `${questKey(quest)}.desc`) },
        // `more_info_region` is the hit (`onMoreInfo`); the text over it takes the tap too, as Flash's mouse-disabled text lets it through.
        more_info_txt: { visible: inRoom, onPointerTap: () => toggleQuestDetails(quest) },
        more_info_region: { visible: inRoom, onPointerTap: () => toggleQuestDetails(quest) },
        quest_pic_bitmap: { asset: questPicture(quest) },
        // `new ProgressBar(_questEngine, content_cont, 162, "quests.tracker.progress", false, PROGRESS_BAR_LOC)` - no frame.
        content_cont: {
            children: (
                <QuestProgressBar
                    x={PROGRESS_BAR_X}
                    y={PROGRESS_BAR_Y}
                    width={PROGRESS_BAR_WIDTH}
                    current={progress}
                    max={100}
                    levelKey={quest.id}
                    scoreAtStartOfLevel={0}
                    hasFrame={false}
                    // `registerParameter(progressKey, "progress", current)`, `"limit"` the max.
                    caption={(current, limit) => t('quests.tracker.progress', 'quests.tracker.progress', { progress: String(current), limit: String(limit) })}
                />
            ),
        },
    };

    for (let n = 1; n <= 6; n++) bindings[`success_pic_${n}`] = { visible: successFrame === n };
    for (const letter of [ 'a', 'b', 'c', 'd' ]) bindings[`prompt_pic_${letter}`] = { visible: false };

    return (
        // 2 below what is over it, `extension_grid`'s spacing.
        <Box layout={{ position: 'relative', width: WIDTH, height: HEIGHT, marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id={`${QUEST_LIBRARY}/QuestTracker`}
                bindings={bindings}
            />
        </Box>
    );
};
