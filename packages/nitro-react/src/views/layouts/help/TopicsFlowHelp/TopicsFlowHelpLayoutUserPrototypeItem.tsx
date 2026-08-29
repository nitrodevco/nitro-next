import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `user_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutUserPrototypeItemProps {
    captionRoomName?: string;
    captionUserName?: string;
    layout?: BoxLayout;
    onUserPrototype?: () => void;
    userAvatar?: ReactNode;
    visibleRoomName?: boolean;
    visibleUserAvatar?: boolean;
    visibleUserBg?: boolean;
    visibleUserName?: boolean;
}

export const TopicsFlowHelpLayoutUserPrototypeItem = ({ captionRoomName, captionUserName, layout, onUserPrototype, userAvatar, visibleRoomName, visibleUserAvatar, visibleUserBg, visibleUserName }: TopicsFlowHelpLayoutUserPrototypeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_prototype"
            onPointerTap={onUserPrototype}
            cursor="pointer"
            layout={{ width: 367, height: 57, flexShrink: 0, ...layout }}
        >
            {(visibleUserBg ?? true) && (
                <Border
                    variant="2"
                    name="user_bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 52 }}
                />
            )}
            {(visibleUserName ?? true) && (
                <Region
                    name="user_name"
                    layout={{ position: 'absolute', left: 61, width: 42, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    layout={{ position: 'absolute', left: 61, width: 218, top: 24, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    options={{ 'avatar_image:only_head': 'true' }}
                    layout={{ position: 'absolute', left: -11, width: 90, top: -29, height: 130 }}
                >
                    {userAvatar}
                </WidgetSlot>
            )}
        </Region>
    );
};
