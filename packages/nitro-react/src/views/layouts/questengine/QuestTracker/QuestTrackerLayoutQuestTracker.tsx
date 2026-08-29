import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { QuestTrackerLayoutContentCont, QuestTrackerLayoutContentContProps } from './QuestTrackerLayoutContentCont';

/** Named region `quest_tracker` of QuestTrackerLayout - configured through the parent's `questTracker` prop. */
export interface QuestTrackerLayoutQuestTrackerProps {
    contentCont?: QuestTrackerLayoutContentContProps;
    layout?: BoxLayout;
    onQuestTracker?: () => void;
    srcQuestTrackerBg?: string;
}

export const QuestTrackerLayoutQuestTracker = ({ contentCont, layout, onQuestTracker, srcQuestTrackerBg }: QuestTrackerLayoutQuestTrackerProps) => {
    return (
        <Region
            name="quest_tracker"
            onPointerTap={onQuestTracker}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 192, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="quest_tracker_bg"
                src={srcQuestTrackerBg ?? '${image.library.questing.url}quest_tracker_with_bar.png'}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 133 }}
            />
            <QuestTrackerLayoutContentCont {...contentCont} />
        </Region>
    );
};
