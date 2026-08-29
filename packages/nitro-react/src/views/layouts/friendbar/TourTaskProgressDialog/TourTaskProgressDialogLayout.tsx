import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TourTaskProgressDialogLayoutActionDescriptionItem } from './TourTaskProgressDialogLayoutActionDescriptionItem';
import { TourTaskProgressDialogLayoutActionTitleItem } from './TourTaskProgressDialogLayoutActionTitleItem';
import { TourTaskProgressDialogLayoutTakeTourButtonItem } from './TourTaskProgressDialogLayoutTakeTourButtonItem';

/** Generated from `76_tour_task_progress_dialog_xml` (layout "task_progress_dialog", 378x289) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TourTaskProgressDialogLayoutProps {
    actionSeparator?: ReactNode;
    itemsTopList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onDeclineTourRegion?: () => void;
}

export const TourTaskProgressDialogLayout = ({ actionSeparator, itemsTopList, layout, onClose, onDeclineTourRegion }: TourTaskProgressDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('talent.track.task.progress.dialog.title')}
            onClose={onClose}
            layout={{ width: 378, height: 289, ...layout }}
        >
            <Border
                variant="104"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 15, width: 347, top: 0, height: 211 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 215, bottom: 2, height: 110 }}>
                    <ThemeImage
                        src={layoutImage('help_frank_greeting.png')}
                        layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 160 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 60, width: 285, top: 10, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('talent.track.progress.tour.header.caption')}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 60, width: 285, top: 27, height: 30, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('talent.track.progress.tour.header.body')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    name="action_separator"
                    layout={{ position: 'absolute', left: 10, width: 325, top: 57, height: 30 }}
                >
                    {actionSeparator}
                </WidgetSlot>
                <Region
                    name="top_list"
                    layout={{ position: 'absolute', left: 118, top: 79, minHeight: 70, flexDirection: 'column' }}
                >
                    {itemsTopList ?? (
                        <>
                            <TourTaskProgressDialogLayoutActionTitleItem />
                            <TourTaskProgressDialogLayoutActionDescriptionItem />
                            <TourTaskProgressDialogLayoutTakeTourButtonItem />
                        </>
                    )}
                </Region>
            </Border>
            <Region
                name="decline_tour_region"
                onPointerTap={onDeclineTourRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 16, width: 347, top: 211, height: 33, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 144, top: 7, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('talent.track.progress.tour.decline')}
                </Region>
            </Region>
        </Frame>
    );
};
