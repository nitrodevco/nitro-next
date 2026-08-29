import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { Main_100LayoutLevels, Main_100LayoutLevelsProps } from './Main_100LayoutLevels';

/** Named region `task_levels` of Main_100Layout - configured through the parent's `taskLevels` prop. */
export interface Main_100LayoutTaskLevelsProps {
    layout?: BoxLayout;
    levels?: Main_100LayoutLevelsProps;
    spacer?: ReactNode;
}

export const Main_100LayoutTaskLevels = ({ layout, levels, spacer }: Main_100LayoutTaskLevelsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="task_levels"
            layout={{ position: 'absolute', left: 0, right: 0, top: 127, height: 200, ...layout }}
        >
            <Region
                name="spacer"
                backgroundColor="#d6d5d3"
                layout={{ position: 'absolute', left: 22, width: 582, top: 20, height: 2 }}
            >
                {spacer}
            </Region>
            <Region
                name="levels_title_bg"
                backgroundColor="#f0f0f0"
                layout={{ position: 'absolute', left: 37, width: 53, top: 7, height: 18 }}
            >
                <Region layout={{ position: 'absolute', left: 3, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('reward_track.levels.title')}
                        textOptions={{ fill: '#124b8b' }}
                    />
                </Region>
            </Region>
            <Main_100LayoutLevels {...levels} />
        </Region>
    );
};
