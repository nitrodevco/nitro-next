import { BoxLayout, Region } from '#base/theme';

import { NextQuestTimerLayoutNextQuestTimer, NextQuestTimerLayoutNextQuestTimerProps } from './NextQuestTimerLayoutNextQuestTimer';

/** Generated from `123_NextQuestTimer_xml` (layout "QuestTracker", 195x116) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NextQuestTimerLayoutProps {
    layout?: BoxLayout;
    nextQuestTimer?: NextQuestTimerLayoutNextQuestTimerProps;
}

export const NextQuestTimerLayout = ({ layout, nextQuestTimer }: NextQuestTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 116, ...layout }}>
            <NextQuestTimerLayoutNextQuestTimer {...nextQuestTimer} />
        </Region>
    );
};
