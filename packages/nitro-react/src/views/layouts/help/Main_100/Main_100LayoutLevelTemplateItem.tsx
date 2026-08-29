import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, Shape, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { Main_100LayoutLevelRewardIconItem } from './Main_100LayoutLevelRewardIconItem';
import { Main_100LayoutLevelRewardTxtItem } from './Main_100LayoutLevelRewardTxtItem';

/** Row template `level_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelTemplateItemProps {
    captionLevelName?: string;
    captionLevelProgressTxt?: string;
    gradient?: ReactNode;
    itemsRewardContainer?: ReactNode;
    layout?: BoxLayout;
    onLevelTemplate?: () => void;
    srcCompletedIcon?: string;
    srcLockedIcon?: string;
    visibleBg?: boolean;
    visibleCompletedIcon?: boolean;
    visibleGradient?: boolean;
    visibleLevelBorder?: boolean;
    visibleLevelName?: boolean;
    visibleLevelProgressTxt?: boolean;
    visibleLoadingBar?: boolean;
    visibleLockedIcon?: boolean;
    visibleProgress?: boolean;
    visibleProgressLoadingBar?: boolean;
    visibleRewardContainer?: boolean;
}

export const Main_100LayoutLevelTemplateItem = ({ captionLevelName, captionLevelProgressTxt, gradient, itemsRewardContainer, layout, onLevelTemplate, srcCompletedIcon, srcLockedIcon, visibleBg, visibleCompletedIcon, visibleGradient, visibleLevelBorder, visibleLevelName, visibleLevelProgressTxt, visibleLoadingBar, visibleLockedIcon, visibleProgress, visibleProgressLoadingBar, visibleRewardContainer }: Main_100LayoutLevelTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_template"
            onPointerTap={onLevelTemplate}
            cursor="pointer"
            layout={{ width: 582, height: 44, flexShrink: 0, ...layout }}
        >
            {(visibleLevelBorder ?? true) && (
                <Border
                    variant="15"
                    name="level_border"
                    tintColor="#e3e3e3"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {(visibleLevelName ?? true) && (
                        <Region
                            name="level_name"
                            layout={{ position: 'absolute', left: 18, width: 85, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionLevelName ?? t('reward_track.levels.level')}
                        </Region>
                    )}
                    {(visibleLoadingBar ?? true) && (
                        <Region
                            name="loading_bar"
                            layout={{ position: 'absolute', left: 94, width: 260, top: 19, height: 7 }}
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
                                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, bottom: 0 }}
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
                    {(visibleLevelProgressTxt ?? true) && (
                        <Region
                            name="level_progress_txt"
                            layout={{ position: 'absolute', left: 377, width: 25, top: 14, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionLevelProgressTxt ?? '3 / 5'}
                        </Region>
                    )}
                    <Region layout={{ position: 'absolute', right: 18, width: 94, top: 7, height: 30, flexDirection: 'row', gap: 10 }}>
                        {(visibleCompletedIcon ?? true) && (
                            <ThemeImage
                                name="completed_icon"
                                src={srcCompletedIcon ?? layoutImage('reward_track_checkmark.png')}
                                layout={{ width: 17, height: 15, flexShrink: 0 }}
                            />
                        )}
                        {(visibleLockedIcon ?? true) && (
                            <ThemeImage
                                name="locked_icon"
                                src={srcLockedIcon ?? layoutImage('reward_track_locked_small.png')}
                                layout={{ width: 13, height: 18, flexShrink: 0 }}
                            />
                        )}
                        {(visibleRewardContainer ?? true) && (
                            <Region
                                name="reward_container"
                                layout={{ width: 44, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                            >
                                {itemsRewardContainer ?? (
                                    <>
                                        <Main_100LayoutLevelRewardTxtItem />
                                        <Main_100LayoutLevelRewardIconItem />
                                    </>
                                )}
                            </Region>
                        )}
                    </Region>
                </Border>
            )}
        </Region>
    );
};
