import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { HabboWayLayoutFinalPage, HabboWayLayoutFinalPageProps } from './HabboWayLayoutFinalPage';
import { HabboWayLayoutPageContainer, HabboWayLayoutPageContainerProps } from './HabboWayLayoutPageContainer';

/** Generated from `2908_habbo_way_xml` (layout "habbo_way", 500x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayLayoutProps {
    finalPage?: HabboWayLayoutFinalPageProps;
    layout?: BoxLayout;
    onFrameClose?: () => void;
    pageContainer?: HabboWayLayoutPageContainerProps;
    pageWidget?: ReactNode;
    srcDoveImage?: string;
    visibleFinalPage?: boolean;
    visiblePageContainer?: boolean;
}

export const HabboWayLayout = ({ finalPage, layout, onFrameClose, pageContainer, pageWidget, srcDoveImage, visibleFinalPage, visiblePageContainer }: HabboWayLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 500, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 50 }}>
                <Frame
                    variant="101"
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 10, height: 470 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, top: 0, flexDirection: 'row', gap: 2 }}>
                            <WidgetSlot
                                widgetType="progress_indicator"
                                name="page_widget"
                                options={{ 'progress_indicator:style': 'etched', 'progress_indicator:size': '6' }}
                                layout={{ width: 75, height: 11, flexShrink: 0 }}
                            >
                                {pageWidget}
                            </WidgetSlot>
                            <ThemeImage
                                name="dove_image"
                                src={srcDoveImage ?? layoutImage('help_habboway_dove_off.png')}
                                layout={{ width: 25, height: 25, flexShrink: 0 }}
                            />
                        </Region>
                        {(visiblePageContainer ?? false) && (
                            <HabboWayLayoutPageContainer {...pageContainer} />
                        )}
                        {(visibleFinalPage ?? false) && (
                            <HabboWayLayoutFinalPage {...finalPage} />
                        )}
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}>
                    <ThemeText
                        text={t('habbo.way.frame.subtitle')}
                        textStyle="text-style-il-frame-modal-title"
                        layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 17 }}
                    />
                    <ThemeText
                        text={t('habbo.way.frame.title')}
                        textStyle="text-style-il-frame-modal-title"
                        layout={{ position: 'absolute', left: 0, width: 258, top: 16, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
