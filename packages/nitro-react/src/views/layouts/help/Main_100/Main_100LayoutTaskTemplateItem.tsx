import { ReactNode } from 'react';

import { Border, BoxLayout, Region, Shape, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `task_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTaskTemplateItemProps {
    captionTaskDescription?: string;
    captionTaskName?: string;
    captionTaskProgressTxt?: string;
    captionTrackRewardTxt?: string;
    gradient?: ReactNode;
    layout?: BoxLayout;
    onTaskTemplate?: () => void;
    srcTaskImage?: string;
    srcTrackRewardIcon?: string;
    visibleBg?: boolean;
    visibleGradient?: boolean;
    visibleLoadingBar?: boolean;
    visibleProgress?: boolean;
    visibleProgressLoadingBar?: boolean;
    visibleTaskBorder?: boolean;
    visibleTaskDescription?: boolean;
    visibleTaskImage?: boolean;
    visibleTaskName?: boolean;
    visibleTaskProgressTxt?: boolean;
    visibleTrackRewardIcon?: boolean;
    visibleTrackRewardTxt?: boolean;
}

export const Main_100LayoutTaskTemplateItem = ({ captionTaskDescription, captionTaskName, captionTaskProgressTxt, captionTrackRewardTxt, gradient, layout, onTaskTemplate, srcTaskImage, srcTrackRewardIcon, visibleBg, visibleGradient, visibleLoadingBar, visibleProgress, visibleProgressLoadingBar, visibleTaskBorder, visibleTaskDescription, visibleTaskImage, visibleTaskName, visibleTaskProgressTxt, visibleTrackRewardIcon, visibleTrackRewardTxt }: Main_100LayoutTaskTemplateItemProps) => {
    return (
        <Region
            name="task_template"
            onPointerTap={onTaskTemplate}
            cursor="pointer"
            layout={{ width: 406, height: 61, flexShrink: 0, ...layout }}
        >
            {(visibleTaskBorder ?? true) && (
                <Border
                    variant="15"
                    name="task_border"
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {(visibleTaskName ?? true) && (
                        <Region
                            name="task_name"
                            layout={{ position: 'absolute', left: 67, width: 202, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTaskName ?? 'Visit Rooms'}
                        </Region>
                    )}
                    {(visibleTaskDescription ?? true) && (
                        <Region
                            name="task_description"
                            layout={{ position: 'absolute', left: 67, width: 202, top: 23, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTaskDescription ?? 'Explore rooms made by other players'}
                        </Region>
                    )}
                    {(visibleLoadingBar ?? true) && (
                        <Region
                            name="loading_bar"
                            layout={{ position: 'absolute', left: 68, width: 200, top: 44, height: 7 }}
                        >
                            {(visibleBg ?? true) && (
                                <Shape
                                    name="bg"
                                    shape="round_rectangle"
                                    color="#cccccc"
                                    strokeColor="#777777"
                                    strokeThickness={1}
                                    radius={5}
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
                                />
                            )}
                            {(visibleProgress ?? true) && (
                                <Region
                                    name="progress"
                                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7 }}
                                >
                                    {(visibleProgressLoadingBar ?? true) && (
                                        <Shape
                                            name="loading_bar"
                                            shape="round_rectangle"
                                            color="#eba60c"
                                            strokeThickness={1}
                                            radius={5}
                                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
                                        />
                                    )}
                                    {(visibleGradient ?? true) && (
                                        <Region
                                            name="gradient"
                                            blendMode="add"
                                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, height: 5 }}
                                        >
                                            {gradient}
                                        </Region>
                                    )}
                                </Region>
                            )}
                        </Region>
                    )}
                    {(visibleTaskProgressTxt ?? true) && (
                        <Region
                            name="task_progress_txt"
                            layout={{ position: 'absolute', left: 280, width: 25, top: 38, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTaskProgressTxt ?? '3 / 5'}
                        </Region>
                    )}
                    <Border
                        variant="15"
                        tintColor="#f0f0f0"
                        layout={{ position: 'absolute', right: 13, width: 62, top: 15, height: 31 }}
                    >
                        <Region layout={{ position: 'absolute', left: 8, width: 44, top: 4, height: 23, flexDirection: 'row', gap: 5 }}>
                            {(visibleTrackRewardTxt ?? true) && (
                                <Region
                                    name="track_reward_txt"
                                    layout={{ width: 20, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {captionTrackRewardTxt ?? '30'}
                                </Region>
                            )}
                            {(visibleTrackRewardIcon ?? true) && (
                                <ThemeImage
                                    name="track_reward_icon"
                                    src={srcTrackRewardIcon ?? layoutImage('reward_track_point_small.png')}
                                    layout={{ width: 19, height: 14, flexShrink: 0 }}
                                />
                            )}
                        </Region>
                    </Border>
                    {(visibleTaskImage ?? true) && (
                        <ThemeImage
                            name="task_image"
                            src={srcTaskImage ?? layoutImage('reward_track_tasks_dance.png')}
                            layout={{ position: 'absolute', left: 9, width: 52, top: 6, height: 50 }}
                        />
                    )}
                </Border>
            )}
        </Region>
    );
};
