import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `76_tour_task_progress_dialog_xml` (layout "task_progress_dialog", 378x289) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TourTaskProgressDialogLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onTakeTourButton?: () => void;
}

export const TourTaskProgressDialogLayout = ({ layout, onClose, onTakeTourButton }: TourTaskProgressDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={131073}
            caption={t('talent.track.task.progress.dialog.title')}
            onClose={onClose}
            layout={{ width: 378, height: 289, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="104"
                    params={16400}
                    tintColor="#e2e2e2"
                    layout={{ position: 'absolute', left: 15, width: 347, top: 0, height: 211 }}
                >
                    <Region
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 215, top: 99, height: 110 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('help_frank_greeting.png')}
                            layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 160 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 60, width: 285, top: 10, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('talent.track.progress.tour.header.caption')}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 60, width: 285, top: 27, height: 30, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('talent.track.progress.tour.header.body')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        name="action_separator"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 325, top: 57, height: 30 }}
                    />
                    <Region
                        name="top_list"
                        params={147472}
                        layout={{ position: 'absolute', left: 118, width: 220, top: 79, height: 102, minHeight: 70, flexDirection: 'column' }}
                    >
                        <Region
                            name="action_title"
                            params={16}
                            layout={{ width: 210, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('talent.track.progress.tour.info.caption')}
                                textStyle="text-style-il-heading-2"
                                textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                            />
                        </Region>
                        <Region
                            name="action_description"
                            params={16}
                            layout={{ width: 210, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('talent.track.progress.tour.info.body')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                            />
                        </Region>
                        <Button
                            variant="101"
                            name="take_tour_button"
                            params={131089}
                            tintColor="#bbbbbb"
                            onPointerTap={onTakeTourButton}
                            layout={{ width: 153, height: 55, flexShrink: 0 }}
                        >
                            {t('talent.track.progress.tour.accept')}
                        </Button>
                    </Region>
                </Border>
                <Region
                    name="decline_tour_region"
                    params={17}
                    layout={{ position: 'absolute', left: 16, width: 347, top: 211, height: 33 }}
                >
                    <Region
                        params={786448}
                        layout={{ position: 'absolute', left: 103, width: 144, top: 7, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('talent.track.progress.tour.decline')} />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
