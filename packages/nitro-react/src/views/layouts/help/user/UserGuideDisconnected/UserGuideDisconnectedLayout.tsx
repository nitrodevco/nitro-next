import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserGuideDisconnectedLayoutErrorList, UserGuideDisconnectedLayoutErrorListProps } from './UserGuideDisconnectedLayoutErrorList';

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
                            {captionGuideDesc ?? t('guide.help.request.user.guide.disconnected.guide.desc')}
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
