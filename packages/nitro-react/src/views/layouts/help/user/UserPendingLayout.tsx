import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2902_user_pending_xml` (layout "user_pending", 282x320) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserPendingLayoutProps {
    captionRequestDescription?: string;
    captionRequestType?: string;
    captionWaitingTime?: string;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
}

export const UserPendingLayout = ({ captionRequestDescription, captionRequestType, captionWaitingTime, layout, onCancelButton, onClose }: UserPendingLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_pending"
            name="user_pending"
            caption={t('guide.help.request.user.pending.title')}
            onClose={onClose}
            layout={{ width: 282, height: 320, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, minWidth: 270, top: 0, minHeight: 272, maxWidth: 270, flexDirection: 'column', gap: 5 }}>
                <Border
                    variant="102"
                    layout={{ width: 270, height: 122, flexShrink: 0, minWidth: 270, maxWidth: 270 }}
                >
                    <ThemeImage
                        src={layoutImage('help_user_pending.png')}
                        layout={{ position: 'absolute', left: 10, width: 60, bottom: 0, height: 85 }}
                    />
                    <Region
                        name="request_type"
                        layout={{ position: 'absolute', left: 70, width: 94, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRequestType ?? 'Request type'}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="updating_timestamp"
                        name="request_timestamp"
                        layout={{ position: 'absolute', left: 70, width: 4, top: 25, height: 4 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 70, width: 200, top: 42, height: 80 }}
                    >
                        <Region layout={{ flexDirection: 'column', width: '100%' }}>
                            <Region
                                name="request_description"
                                layout={{ width: 190, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRequestDescription ?? 'Request description'}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                                />
                            </Region>
                        </Region>
                    </ScrollArea>
                </Border>
                <Region layout={{ width: 279, height: 29, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.request.user.pending.info.title')}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
                <Region layout={{ width: 260, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.help.request.user.pending.info.message')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    />
                </Region>
                <Region
                    name="waiting_time"
                    layout={{ width: 260, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWaitingTime ?? t('guide.help.request.user.pending.info.waiting')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    />
                </Region>
                <ThemeImage
                    src={layoutImage('illumina_horizontal_separator.png')}
                    layout={{ width: 270, height: 2, flexShrink: 0 }}
                />
                <ContainerButton
                    variant="101"
                    name="cancel_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelButton}
                    layout={{ width: 200, height: 48, flexShrink: 0, maxWidth: 200, minHeight: 48, maxHeight: 48 }}
                >
                    <Region layout={{ position: 'absolute', left: 20, top: 11, maxWidth: 200, flexDirection: 'row', gap: 5 }}>
                        <ThemeImage
                            src={layoutImage('help_decline_icon.png')}
                            layout={{ width: 11, height: 12, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 231, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('guide.help.request.user.pending.cancel.button')}
                                textStyle="text-style-il-button"
                                textOptions={{ fill: '#000000' }}
                            />
                        </Region>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
            </Region>
        </Frame>
    );
};
