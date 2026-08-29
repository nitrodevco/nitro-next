import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2919_user_guide_disconnected_xml` (layout "user_error", 282x294) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserGuideDisconnectedLayoutProps {
    captionGuideDesc?: string;
    captionGuideNameLink?: string;
    captionReportGuideLink?: string;
    errorList?: UserGuideDisconnectedLayoutErrorListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onGuideNameLink?: () => void;
    onReportGuideLink?: () => void;
}

export const UserGuideDisconnectedLayout = ({ captionGuideDesc, captionGuideNameLink, captionReportGuideLink, errorList, layout, onClose, onGuideNameLink, onReportGuideLink }: UserGuideDisconnectedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_guide_disconnected"
            name="user_guide_disconnected"
            caption={t('guide.help.request.user.guide.disconnected.title')}
            onClose={onClose}
            layout={{ width: 282, height: 294, ...layout }}
        >
            <Border
                variant="103"
                name="guide_info"
                layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 65 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 180, top: 10, height: 40, flexDirection: 'row', gap: 5 }}>
                    <ThemeImage
                        src={layoutImage('help_guide_icon.png')}
                        layout={{ width: 30, height: 40, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 130, height: 35, flexShrink: 0, flexDirection: 'column' }}>
                        <Region
                            name="guide_name_link"
                            tooltip={t('guide.help.common.profile.tooltip')}
                            layout={{ width: 69, height: 17, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onGuideNameLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionGuideNameLink ?? 'Guide name'}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="guide_desc"
                            layout={{ width: 130, height: 16, flexShrink: 0, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionGuideDesc ?? t('guide.help.request.user.guide.disconnected.guide.desc')} />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="report_guide_link"
                    tooltip={t('guide.help.common.report.link.tooltip')}
                    layout={{ position: 'absolute', left: 170, width: 100, top: 23, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    onPointerTap={onReportGuideLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionReportGuideLink ?? t('guide.help.common.report.link')}
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            </Border>
            <UserGuideDisconnectedLayoutErrorList {...errorList} />
        </Frame>
    );
};

/** Row template `resubmit_button` of UserGuideDisconnectedLayout - pass real rows through its `items…` slot. */
export interface UserGuideDisconnectedLayoutResubmitButtonItemProps {
    layout?: BoxLayout;
    onResubmitButton?: () => void;
}

export const UserGuideDisconnectedLayoutResubmitButtonItem = ({ layout, onResubmitButton }: UserGuideDisconnectedLayoutResubmitButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="101"
            name="resubmit_button"
            tintColor="#bbbbbb"
            onPointerTap={onResubmitButton}
            layout={{ width: 346, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('guide.help.request.user.guide.disconnected.resubmit.button')}
        </Button>
    );
};

/** Named region `error_list` of UserGuideDisconnectedLayout - configured through the parent's `errorList` prop. */
export interface UserGuideDisconnectedLayoutErrorListProps {
    itemsErrorList?: ReactNode;
    layout?: BoxLayout;
}

export const UserGuideDisconnectedLayoutErrorList = ({ itemsErrorList, layout }: UserGuideDisconnectedLayoutErrorListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="error_list"
            layout={{ position: 'absolute', left: 10, top: 69, flexDirection: 'column', ...layout }}
        >
            {itemsErrorList ?? (
                <UserGuideDisconnectedLayoutResubmitButtonItem />
            )}
            <Region layout={{ width: 260, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.user.guide.disconnected.error.heading')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <Region layout={{ width: 260, height: 10, flexShrink: 0 }} />
            <Region layout={{ width: 260, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.user.guide.disconnected.error.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <Region layout={{ width: 260, height: 10, flexShrink: 0 }} />
            <WidgetSlot
                widgetType="separator"
                layout={{ width: 260, height: 1, flexShrink: 0 }}
            />
            <Region layout={{ width: 260, height: 1, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('help_error_state.png')}
                    layout={{ position: 'absolute', left: 0, width: 81, top: -6, height: 97 }}
                />
            </Region>
            <Region layout={{ width: 260, height: 50, flexShrink: 0 }} />
        </Region>
    );
};
