import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TalentTrackLayoutStatusList, TalentTrackLayoutStatusListProps } from './TalentTrackLayoutStatusList';

/** Row template `level_pane` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelPaneItemProps {
    captionLevelDescription?: string;
    captionLevelTitle?: string;
    layout?: BoxLayout;
    levelSeparator?: ReactNode;
    srcLevelIllustration?: string;
    statusList?: TalentTrackLayoutStatusListProps;
    visibleActionOverlay?: boolean;
    visibleLevelDescription?: boolean;
    visibleLevelIllustration?: boolean;
    visibleLevelSeparator?: boolean;
    visibleLevelTitle?: boolean;
    visibleStatusList?: boolean;
}

export const TalentTrackLayoutLevelPaneItem = ({ captionLevelDescription, captionLevelTitle, layout, levelSeparator, srcLevelIllustration, statusList, visibleActionOverlay, visibleLevelDescription, visibleLevelIllustration, visibleLevelSeparator, visibleLevelTitle, visibleStatusList }: TalentTrackLayoutLevelPaneItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_pane"
            layout={{ width: 1000, height: 280, flexShrink: 0, minWidth: 320, ...layout }}
        >
            {(visibleLevelSeparator ?? true) && (
                <WidgetSlot
                    widgetType="separator"
                    name="level_separator"
                    options={{ 'separator:vertical': 'true' }}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 30, height: 250 }}
                >
                    {levelSeparator}
                </WidgetSlot>
            )}
            {(visibleLevelIllustration ?? true) && (
                <ThemeImage
                    name="level_illustration"
                    src={srcLevelIllustration}
                    layout={{ position: 'absolute', left: 700, width: 170, top: 0, height: 120 }}
                />
            )}
            {(visibleLevelTitle ?? true) && (
                <ThemeText
                    text={captionLevelTitle ?? 'Level title'}
                    textStyle="text-style-il-heading-1"
                    name="level_title"
                    layout={{ position: 'absolute', left: 50, width: 71, top: 30, height: 19 }}
                />
            )}
            {(visibleLevelDescription ?? true) && (
                <ThemeText
                    text={captionLevelDescription ?? 'Level description'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                    name="level_description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 50, width: 320, top: 55, height: 16 }}
                />
            )}
            {(visibleStatusList ?? true) && (
                <TalentTrackLayoutStatusList {...statusList} />
            )}
            {(visibleActionOverlay ?? false) && (
                <Region
                    name="action_overlay"
                    layout={{ position: 'absolute', left: -2, width: 214, top: -1, height: 84, justifyContent: 'center' }}
                >
                    <ThemeImage
                        src={layoutImage('talent_action_overlay.png')}
                        layout={{ position: 'absolute', left: 0, width: 214, top: 0, height: 84 }}
                    />
                    <ThemeText
                        text={t('talent.track.action.overlay')}
                        textStyle="text-style-il-regular-white"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 133, top: 4, height: 15 }}
                    />
                </Region>
            )}
        </Region>
    );
};
