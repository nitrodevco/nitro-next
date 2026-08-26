import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2900_user_feedback_xml` (layout "user_feedback", 282x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserFeedbackLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGuideNameLink?: () => void;
    onNegativeButton?: () => void;
    onPositiveButton?: () => void;
    onReportGuideLink?: () => void;
}

export const UserFeedbackLayout = ({ layout, onClose, onGuideNameLink, onNegativeButton, onPositiveButton, onReportGuideLink }: UserFeedbackLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_feedback"
            name="user_feedback"
            params={32769}
            caption={t('guide.help.request.user.feedback.title')}
            onClose={onClose}
            layout={{ width: 282, height: 306, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 65 }}
                >
                    <Region
                        params={147472}
                        layout={{ position: 'absolute', left: 10, width: 165, top: 10, height: 40, flexDirection: 'row', gap: 5 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('help_guide_icon.png')}
                            layout={{ width: 30, height: 40, flexShrink: 0 }}
                        />
                        <Region
                            params={16}
                            layout={{ width: 130, height: 35, flexShrink: 0, flexDirection: 'column' }}
                        >
                            <Region
                                name="guide_name_link"
                                tooltip={t('guide.help.common.profile.tooltip')}
                                params={1}
                                layout={{ width: 70, height: 17, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                onPointerTap={onGuideNameLink}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text="Guide Name"
                                    textStyle="text-style-il-heading-2"
                                />
                            </Region>
                            <Region
                                name="guide_desc"
                                params={16}
                                layout={{ width: 64, height: 16, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('guide.help.request.user.feedback.guide.desc')} />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="report_guide_link"
                        tooltip={t('guide.help.common.report.link.tooltip')}
                        params={1}
                        layout={{ position: 'absolute', left: 170, width: 100, top: 23, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        onPointerTap={onReportGuideLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={t('guide.help.common.report.link')}
                            textOptions={{ align: 'right' }}
                        />
                    </Region>
                </Border>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 260, top: 75, height: 183, minWidth: 260, maxWidth: 260, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.feedback.closed.title')}
                            textStyle="text-style-il-heading-2"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.feedback.closed.desc')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        params={16}
                        layout={{ width: 220, height: 10, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 260, height: 1, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_user_feedback.png')}
                            layout={{ position: 'absolute', left: 0, width: 60, top: -17, height: 94 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 200, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.feedback.question')}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                        />
                    </Region>
                    <Region
                        params={933904}
                        layout={{ width: 134, height: 50, flexShrink: 0, flexDirection: 'row' }}
                    >
                        <Button
                            variant="101"
                            name="positive_button"
                            params={131089}
                            tintColor="#bbbbbb"
                            onPointerTap={onPositiveButton}
                            layout={{ width: 69, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('guide.help.request.user.feedback.positive.button')}
                        </Button>
                        <Button
                            variant="101"
                            name="negative_button"
                            params={131089}
                            tintColor="#bbbbbb"
                            onPointerTap={onNegativeButton}
                            layout={{ width: 65, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('guide.help.request.user.feedback.negative.button')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
