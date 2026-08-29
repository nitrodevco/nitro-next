import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `user_list` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutUserListItemProps {
    captionRoomName?: string;
    captionUserName?: string;
    layout?: BoxLayout;
    userAvatar?: ReactNode;
    visibleRoomName?: boolean;
    visibleUserAvatar?: boolean;
    visibleUserName?: boolean;
}

export const EmergencyHelpRequestLayoutUserListItem = ({ captionRoomName, captionUserName, layout, userAvatar, visibleRoomName, visibleUserAvatar, visibleUserName }: EmergencyHelpRequestLayoutUserListItemProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 282, height: 307, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Border
                    variant="102"
                    layout={{ width: 262, height: 43, flexShrink: 0 }}
                >
                    {(visibleUserName ?? true) && (
                        <Region
                            name="user_name"
                            layout={{ position: 'absolute', left: 37, width: 42, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionUserName ?? 'user123'}
                                textStyle="text-style-il-border"
                            />
                        </Region>
                    )}
                    {(visibleRoomName ?? true) && (
                        <Region
                            name="room_name"
                            layout={{ position: 'absolute', left: 37, width: 218, top: 21, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRoomName ?? t('help.emergency.main.step.two.room.name')}
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                    )}
                    {(visibleUserAvatar ?? true) && (
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="user_avatar"
                            options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true' }}
                            layout={{ position: 'absolute', left: 3, width: 45, top: -11, height: 72 }}
                        >
                            {userAvatar}
                        </WidgetSlot>
                    )}
                </Border>
            </Region>
        </ScrollArea>
    );
};
