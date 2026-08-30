import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2904_guide_closed_xml` (layout "guide_closed", 282x204) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideClosedLayoutProps {
    captionCloseReason?: string;
    captionReportLink?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    onReportLink?: () => void;
    requesterAvatar?: ReactNode;
}

export const GuideClosedLayout = ({ captionCloseReason, captionReportLink, layout, onClose, onCloseButton, onReportLink, requesterAvatar }: GuideClosedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_closed"
            name="guide_closed"
            caption={t('guide.help.request.guide.closed.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 282, height: 204, minWidth: 282, maxWidth: 282, minHeight: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 10, width: 60, top: 0, height: 48 }}>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="requester_avatar"
                    options={{ 'avatar_image:cropped': 'true' }}
                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 84 }}
                >
                    {requesterAvatar}
                </WidgetSlot>
            </Region>
            <Region layout={{ position: 'absolute', right: 0, top: 0, minWidth: 200, maxWidth: 200, flexDirection: 'column', gap: 5 }}>
                <ThemeText
                    text={t('guide.help.request.guide.closed.heading')}
                    textStyle="text-style-il-heading-1"
                    layout={{ alignSelf: 'stretch', height: 19, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionCloseReason ?? 'Lilyflower closed the case.'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    name="close_reason"
                    verticalAlign="top"
                    layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('guide.help.request.guide.closed.thanks')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    verticalAlign="top"
                    layout={{ alignSelf: 'stretch', height: 28, flexShrink: 0 }}
                />
                <Button
                    variant="101"
                    name="close_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCloseButton}
                    layout={{ alignSelf: 'stretch', height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.user.thanks.close.button')}
                </Button>
                <Region
                    name="report_link"
                    tooltip={t('guide.help.common.report.link.tooltip')}
                    layout={{ width: 91, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onReportLink}
                    cursor="pointer"
                >
                    {captionReportLink ?? 'Report Lilyflower'}
                </Region>
            </Region>
        </Frame>
    );
};
