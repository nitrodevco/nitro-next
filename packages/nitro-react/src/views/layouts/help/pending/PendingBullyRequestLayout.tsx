import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2883_pending_bully_request_xml` (layout "pending_bully_request", 369x228) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingBullyRequestLayoutProps {
    captionRoomName?: string;
    captionUserName?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    timestamp?: ReactNode;
    userAvatar?: ReactNode;
}

export const PendingBullyRequestLayout = ({ captionRoomName, captionUserName, layout, onClose, onCloseButton, timestamp, userAvatar }: PendingBullyRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            caption={t('guide.pending.bully.title')}
            onClose={onClose}
            layout={{ width: 369, height: 228, minWidth: 369, minHeight: 228, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, top: 2, flexDirection: 'column', gap: 3 }}>
                <ThemeText
                    text={t('guide.pending.bully.subtitle')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#c30000' }}
                    layout={{ width: 188, height: 19, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('guide.pending.bully.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                    verticalAlign="top"
                    layout={{ width: 295, height: 24, flexShrink: 0, minWidth: 295, maxWidth: 295 }}
                />
                <Border
                    variant="102"
                    layout={{ width: 295, height: 88, flexShrink: 0, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('guide.pending.bully.report')}
                        textStyle="text-style-il-border"
                        textOptions={{ fill: '#444444' }}
                        layout={{ position: 'absolute', left: 13, width: 133, top: 12, height: 15 }}
                    />
                    <ThemeText
                        text={captionUserName ?? 'user123'}
                        textStyle="text-style-il-border"
                        name="user_name"
                        layout={{ position: 'absolute', left: 37, width: 42, top: 29, height: 15 }}
                    />
                    <ThemeText
                        text={captionRoomName ?? t('guide.pending.bully.room')}
                        textOptions={{ fill: '#444444' }}
                        name="room_name"
                        layout={{ position: 'absolute', left: 37, width: 135, top: 42, height: 27 }}
                    />
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -125.5, marginRight: 125.5, width: 18, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 19 }}
                    >
                        {userAvatar}
                    </WidgetSlot>
                    <WidgetSlot
                        widgetType="updating_timestamp"
                        name="timestamp"
                        layout={{ position: 'absolute', left: 13, width: 4, top: 62, height: 4 }}
                    >
                        {timestamp}
                    </WidgetSlot>
                </Border>
                <Region layout={{ width: 370, height: 52, flexShrink: 0, justifyContent: 'center' }}>
                    <Button
                        variant="101"
                        name="close_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', width: 140, top: 0, height: 48 }}
                    >
                        {t('alert.close.button')}
                    </Button>
                </Region>
            </Region>
            <ThemeImage
                src={layoutImage('help_illustrations_bully.png')}
                layout={{ position: 'absolute', left: 320, width: 35, bottom: 28, height: 120 }}
            />
        </Frame>
    );
};
