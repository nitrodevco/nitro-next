import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `progress_main_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutProgressMainContainerItemProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    progressSeparator?: ReactNode;
    srcAchievedLeft?: string;
    srcAchievedMid?: string;
    srcAchievedRight?: string;
    srcUnachievedLeft?: string;
    srcUnachievedMid?: string;
    srcUnachievedRight?: string;
    visibleAchievedLeft?: boolean;
    visibleAchievedMid?: boolean;
    visibleAchievedRight?: boolean;
    visibleProgressContainer?: boolean;
    visibleProgressSeparator?: boolean;
    visibleProgressText?: boolean;
    visibleUnachievedLeft?: boolean;
    visibleUnachievedMid?: boolean;
    visibleUnachievedRight?: boolean;
}

export const TaskProgressDialogLayoutProgressMainContainerItem = ({ captionProgressText, layout, progressSeparator, srcAchievedLeft, srcAchievedMid, srcAchievedRight, srcUnachievedLeft, srcUnachievedMid, srcUnachievedRight, visibleAchievedLeft, visibleAchievedMid, visibleAchievedRight, visibleProgressContainer, visibleProgressSeparator, visibleProgressText, visibleUnachievedLeft, visibleUnachievedMid, visibleUnachievedRight }: TaskProgressDialogLayoutProgressMainContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_main_container"
            layout={{ width: 350, height: 47, flexShrink: 0, ...layout }}
        >
            {(visibleProgressContainer ?? true) && (
                <Region
                    name="progress_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16 }}
                >
                    {(visibleUnachievedLeft ?? true) && (
                        <ThemeImage
                            name="unachieved_left"
                            src={srcUnachievedLeft ?? layoutImage('talent_unachieved_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleUnachievedMid ?? true) && (
                        <ThemeImage
                            name="unachieved_mid"
                            src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                            layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleUnachievedRight ?? true) && (
                        <ThemeImage
                            name="unachieved_right"
                            src={srcUnachievedRight ?? layoutImage('talent_unachieved_right.png')}
                            layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedLeft ?? true) && (
                        <ThemeImage
                            name="achieved_left"
                            src={srcAchievedLeft ?? layoutImage('talent_achieved_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedMid ?? true) && (
                        <ThemeImage
                            name="achieved_mid"
                            src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                            layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedRight ?? true) && (
                        <ThemeImage
                            name="achieved_right"
                            src={srcAchievedRight ?? layoutImage('talent_achieved_right.png')}
                            layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
                        />
                    )}
                </Region>
            )}
            {(visibleProgressText ?? true) && (
                <ThemeText
                    text={captionProgressText ?? t('talent.track.task.progress.dialog.progress')}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ align: 'center' }}
                    name="progress_text"
                    layout={{ position: 'absolute', left: 0, width: 349, top: 15, height: 17 }}
                />
            )}
            {(visibleProgressSeparator ?? true) && (
                <WidgetSlot
                    widgetType="separator"
                    name="progress_separator"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 46, height: 2 }}
                >
                    {progressSeparator}
                </WidgetSlot>
            )}
        </Region>
    );
};
