import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `2950_motd_notification_xml` (layout "achievement_notification", 436x227) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MotdNotificationLayoutProps {
    itemsMessageList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onClose2?: () => void;
}

export const MotdNotificationLayout = ({ itemsMessageList, layout, onClose, onClose2 }: MotdNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            caption={t('notifications.motd.title')}
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 436, height: 227, ...layout }}
        >
            <Border
                variant="0"
                name="notifications_border"
                layout={{ position: 'absolute', left: 1, width: 420, top: 0, height: 160 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 410, top: 6, height: 149 }}
                >
                    <Region
                        name="message_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsMessageList}
                    </Region>
                </ScrollArea>
            </Border>
            <Button
                variant="0"
                name="close"
                onPointerTap={onClose2}
                layout={{ position: 'absolute', left: 200, width: 30, top: 168, height: 26 }}
            >
                {t('generic.ok')}
            </Button>
        </Frame>
    );
};
