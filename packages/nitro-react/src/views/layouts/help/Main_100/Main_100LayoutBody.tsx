import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { Main_100LayoutHeader2, Main_100LayoutHeader2Props } from './Main_100LayoutHeader2';
import { Main_100LayoutTaskLevels, Main_100LayoutTaskLevelsProps } from './Main_100LayoutTaskLevels';
import { Main_100LayoutTasks, Main_100LayoutTasksProps } from './Main_100LayoutTasks';

/** Named region `body` of Main_100Layout - configured through the parent's `body` prop. */
export interface Main_100LayoutBodyProps {
    captionTaskHintText?: string;
    captionTaskInfoDescription?: string;
    captionTaskInfoName?: string;
    header?: Main_100LayoutHeader2Props;
    layout?: BoxLayout;
    onGetPremiumBtn?: () => void;
    onHintRedirectBtn?: () => void;
    onTaskInfoNameRegion?: () => void;
    srcTaskInfoImg?: string;
    taskLevels?: Main_100LayoutTaskLevelsProps;
    tasks?: Main_100LayoutTasksProps;
}

export const Main_100LayoutBody = ({ captionTaskHintText, captionTaskInfoDescription, captionTaskInfoName, header, layout, onGetPremiumBtn, onHintRedirectBtn, onTaskInfoNameRegion, srcTaskInfoImg, taskLevels, tasks }: Main_100LayoutBodyProps) => {
    const t = useTranslation();

    return (
        <Region
            name="body"
            layout={{ position: 'absolute', left: 0, right: 12, top: 249, bottom: 14, ...layout }}
        >
            <Border
                variant="15"
                name="task_list"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 0, width: 444, top: 0, bottom: 0 }}
            >
                <Main_100LayoutHeader2 {...header} />
                <Main_100LayoutTasks {...tasks} />
                <Border
                    variant="15"
                    name="reward_info"
                    tintColor="#f5e1b9"
                    layout={{ position: 'absolute', left: 9, right: 9, bottom: 9, height: 48 }}
                >
                    <ThemeImage
                        src={layoutImage('reward_track_reward_gift.png')}
                        layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                    />
                    <Region layout={{ position: 'absolute', left: 57, width: 265, alignSelf: 'center', height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.tasks.tip')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 265 }}
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('reward_track_frank_and_piccolo.png')}
                        layout={{ position: 'absolute', left: 329, width: 88, top: 7, height: 39 }}
                    />
                </Border>
                <Border
                    variant="15"
                    name="reward_info_not_premium"
                    tintColor="#f1def7"
                    layout={{ position: 'absolute', left: 9, right: 9, bottom: 9, height: 48 }}
                >
                    <ThemeImage
                        src={layoutImage('reward_track_reward_gift_premium.png')}
                        layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                    />
                    <Region layout={{ position: 'absolute', left: 57, width: 227, alignSelf: 'center', height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.tasks.tip_upgrade')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 227 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="get_premium_btn"
                        tintColor="#b265ce"
                        onPointerTap={onGetPremiumBtn}
                        textStyle="text-style-button-shiny-bold"
                        layout={{ position: 'absolute', right: 12, width: 91, top: 9, height: 30 }}
                    >
                        {t('reward_track.tasks.tip_upgrade.button')}
                    </Button>
                </Border>
            </Border>
            <Border
                variant="15"
                name="task_info"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 451, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="task_info_header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 128 }}
                >
                    <ThemeImage
                        name="task_info_img"
                        src={srcTaskInfoImg ?? layoutImage('reward_track_tasks_dance.png')}
                        layout={{ position: 'absolute', left: 23, width: 104, top: 23, height: 100 }}
                    />
                    <Region
                        name="task_info_name_region"
                        layout={{ position: 'absolute', left: 137, width: 100, top: 35, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        onPointerTap={onTaskInfoNameRegion}
                        cursor="pointer"
                    >
                        {captionTaskInfoName ?? 'Visit Rooms'}
                    </Region>
                    <Region
                        name="task_info_description"
                        layout={{ position: 'absolute', left: 137, right: 22, top: 59, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTaskInfoDescription ?? 'Explore the hotel and visit rooms created by other players!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 469 }}
                        />
                    </Region>
                </Region>
                <Main_100LayoutTaskLevels {...taskLevels} />
                <Border
                    variant="14"
                    name="task_hint_border"
                    tintColor="#e9e9e9"
                    layout={{ position: 'absolute', left: 16, width: 596, bottom: 13, height: 74 }}
                >
                    <Region layout={{ position: 'absolute', left: 76, width: 27, top: 10, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.levels.tip')}
                            textOptions={{ fill: '#124b8b' }}
                        />
                    </Region>
                    <Region
                        name="task_hint_text"
                        layout={{ position: 'absolute', left: 76, width: 333, top: 29, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTaskHintText ?? 'Use the navigator to find cool rooms!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 333 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="hint_redirect_btn"
                        onPointerTap={onHintRedirectBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', right: 16, width: 109, top: 16, height: 30 }}
                    >
                        Open Navigator
                    </Button>
                    <ThemeImage
                        src={layoutImage('reward_track_frank_tips.png')}
                        layout={{ position: 'absolute', left: 15, width: 52, top: 7, height: 66 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};
