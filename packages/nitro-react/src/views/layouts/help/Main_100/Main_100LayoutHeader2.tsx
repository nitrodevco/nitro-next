import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { Main_100LayoutTabSelection, Main_100LayoutTabSelectionProps } from './Main_100LayoutTabSelection';

/** Named region `header` of Main_100Layout - configured through the parent's `header` prop. */
export interface Main_100LayoutHeader2Props {
    captionTasksCompletionTxt?: string;
    layout?: BoxLayout;
    tabSelection?: Main_100LayoutTabSelectionProps;
}

export const Main_100LayoutHeader2 = ({ captionTasksCompletionTxt, layout, tabSelection }: Main_100LayoutHeader2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 95, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_task_list.png')}
                layout={{ position: 'absolute', left: 19, width: 19, top: 17, height: 25 }}
            />
            <Region layout={{ position: 'absolute', left: 46, width: 83, top: 11, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('reward_track.tasks')}
            </Region>
            <Region
                name="tasks_completion_txt"
                layout={{ position: 'absolute', left: 46, width: 186, top: 31, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTasksCompletionTxt ?? t('reward_track.tasks.progress')}
                    textOptions={{ fill: '#3c3c3c' }}
                />
            </Region>
            <Main_100LayoutTabSelection {...tabSelection} />
        </Region>
    );
};
