import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2918_user_ongoing_xml` (layout "user_ongoing", 282x345) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserOngoingLayoutProps {
    captionCloseLink?: string;
    captionGuideDesc?: string;
    captionGuideNameLink?: string;
    captionReportGuideLink?: string;
    chatList?: UserOngoingLayoutChatListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseLink?: () => void;
    onGuideNameLink?: () => void;
    onReportGuideLink?: () => void;
}

export const UserOngoingLayout = ({ captionCloseLink, captionGuideDesc, captionGuideNameLink, captionReportGuideLink, chatList, layout, onClose, onCloseLink, onGuideNameLink, onReportGuideLink }: UserOngoingLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_ongoing"
            name="user_ongoing"
            caption="Getting helped by"
            onClose={onClose}
            layout={{ width: 282, height: 345, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
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
                                <ThemeText text={captionGuideDesc ?? t('guide.help.request.user.ongoing.guide.desc')} />
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
                <UserOngoingLayoutChatList {...chatList} />
                <Region layout={{ position: 'absolute', left: 0, width: 280, bottom: 46, height: 79 }}>
                    <ThemeImage
                        src={layoutImage('illumina_horizontal_separator.png')}
                        layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 2, minWidth: 280, maxWidth: 280 }}
                    />
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="input_widget"
                        layout={{ position: 'absolute', left: 10, width: 260, top: 15, height: 30, maxWidth: 260 }}
                    />
                    <Region
                        name="close_link"
                        layout={{ position: 'absolute', left: 5, width: 272, top: 50, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        onPointerTap={onCloseLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionCloseLink ?? t('guide.help.request.user.ongoing.close.link')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 272, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `chat_list` of UserOngoingLayout - configured through the parent's `chatList` prop. */
export interface UserOngoingLayoutChatListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UserOngoingLayoutChatList = ({ layout, tags }: UserOngoingLayoutChatListProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, width: 270, top: 65, bottom: 125, ...layout }}
        >
            <Region
                name="chat_list"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Region layout={{ width: 140, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.common.typing')}
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
            </Region>
        </ScrollArea>
    );
};
