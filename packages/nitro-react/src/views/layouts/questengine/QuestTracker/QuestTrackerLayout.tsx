import { BoxLayout, Region } from '#base/theme';

import { QuestTrackerLayoutQuestTracker, QuestTrackerLayoutQuestTrackerProps } from './QuestTrackerLayoutQuestTracker';

/** Generated from `111_QuestTracker_xml` (layout "QuestTracker", 192x132) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestTrackerLayoutProps {
    layout?: BoxLayout;
    questTracker?: QuestTrackerLayoutQuestTrackerProps;
}

export const QuestTrackerLayout = ({ layout, questTracker }: QuestTrackerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 132, ...layout }}>
            <QuestTrackerLayoutQuestTracker {...questTracker} />
        </Region>
    );
};
