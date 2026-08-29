import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2900_user_feedback_xml` (layout "user_feedback", 282x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserFeedbackLayoutProps {
    captionGuideDesc?: string;
    captionGuideNameLink?: string;
    captionReportGuideLink?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onGuideNameLink?: () => void;
    onNegativeButton?: () => void;
    onPositiveButton?: () => void;
    onReportGuideLink?: () => void;
    separatorWidget?: ReactNode;
}

export const UserFeedbackLayout = ({ captionGuideDesc, captionGuideNameLink, captionReportGuideLink, layout, onClose, onGuideNameLink, onNegativeButton, onPositiveButton, onReportGuideLink, separatorWidget }: UserFeedbackLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_feedback"
            name="user_feedback"
            caption={t('guide.help.request.user.feedback.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 282, height: 306, minWidth: 282, maxWidth: 282, minHeight: 0, ...layout }}
        >
            <Border
                variant="103"
                layout={{ position: 'absolute', left: 0, right: -10, top: 0, height: 65 }}
            >
                <Region layout={{ position: 'absolute', left: 10, top: 10, flexDirection: 'row', gap: 5 }}>
                    <ThemeImage
                        src={layoutImage('help_guide_icon.png')}
                        layout={{ width: 30, height: 40, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 130, alignSelf: 'stretch', flexShrink: 0, flexDirection: 'column' }}>
                        <Region
                            name="guide_name_link"
                            tooltip={t('guide.help.common.profile.tooltip')}
                            layout={{ width: 70, height: 17, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onGuideNameLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionGuideNameLink ?? 'Guide Name'}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="guide_desc"
                            layout={{ width: 64, height: 16, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionGuideDesc ?? t('guide.help.request.user.feedback.guide.desc')}
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="report_guide_link"
                    tooltip={t('guide.help.common.report.link.tooltip')}
                    layout={{ position: 'absolute', right: 10, width: 100, alignSelf: 'center', marginTop: -1.5, marginBottom: 1.5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    onPointerTap={onReportGuideLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionReportGuideLink ?? t('guide.help.common.report.link')}
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            </Border>
            <Region layout={{ position: 'absolute', left: 10, right: 0, bottom: 7, minWidth: 260, maxWidth: 260, flexDirection: 'column', gap: 5 }}>
                <Region layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.request.user.feedback.closed.title')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region layout={{ alignSelf: 'stretch', height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.request.user.feedback.closed.desc')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    layout={{ width: 220, height: 10, flexShrink: 0 }}
                >
                    {separatorWidget}
                </WidgetSlot>
                <Region layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0 }}>
                    <ThemeImage
                        src={layoutImage('help_user_feedback.png')}
                        layout={{ position: 'absolute', left: 0, width: 60, top: -17, height: 94 }}
                    />
                </Region>
                <Region layout={{ width: 200, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.request.user.feedback.question')}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                    <Button
                        variant="101"
                        name="positive_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onPositiveButton}
                        layout={{ width: 69, alignSelf: 'stretch', flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('guide.help.request.user.feedback.positive.button')}
                    </Button>
                    <Button
                        variant="101"
                        name="negative_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onNegativeButton}
                        layout={{ width: 65, alignSelf: 'stretch', flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('guide.help.request.user.feedback.negative.button')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
