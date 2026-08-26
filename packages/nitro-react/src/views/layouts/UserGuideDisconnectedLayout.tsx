import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2919_user_guide_disconnected_xml` (layout "user_error", 282x294) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserGuideDisconnectedLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGuideNameLink?: () => void;
    onReportGuideLink?: () => void;
    onResubmitButton?: () => void;
}

export const UserGuideDisconnectedLayout = ({ layout, onClose, onGuideNameLink, onReportGuideLink, onResubmitButton }: UserGuideDisconnectedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_guide_disconnected"
            name="user_guide_disconnected"
            params={32769}
            caption={t('guide.help.request.user.guide.disconnected.title')}
            onClose={onClose}
            layout={{ width: 282, height: 294, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
                    name="guide_info"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 65 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 180, top: 10, height: 40, flexDirection: 'row', gap: 5 }}
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
                                layout={{ width: 69, height: 17, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                onPointerTap={onGuideNameLink}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text="Guide name"
                                    textStyle="text-style-il-heading-2"
                                />
                            </Region>
                            <Region
                                name="guide_desc"
                                params={16}
                                layout={{ width: 130, height: 16, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('guide.help.request.user.guide.disconnected.guide.desc')} />
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
                    name="error_list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 260, top: 69, height: 183, flexDirection: 'column' }}
                >
                    <Region
                        params={16}
                        layout={{ width: 260, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.guide.disconnected.error.heading')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 10, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 260, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.guide.disconnected.error.desc')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 10, flexShrink: 0 }}
                    />
                    <WidgetSlot
                        widgetType="separator"
                        params={16}
                        layout={{ width: 260, height: 1, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 260, height: 1, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_error_state.png')}
                            layout={{ position: 'absolute', left: 0, width: 81, top: -6, height: 97 }}
                        />
                    </Region>
                    <Button
                        variant="101"
                        name="resubmit_button"
                        params={131089}
                        tintColor="#bbbbbb"
                        onPointerTap={onResubmitButton}
                        layout={{ width: 346, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('guide.help.request.user.guide.disconnected.resubmit.button')}
                    </Button>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 50, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
