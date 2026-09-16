import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

export interface FurnitureGuildMenuViewProps {
    guildName: string;
    /** A member is not offered the join; a guild without a readable forum is not offered it. */
    isMember: boolean;
    hasForum: boolean;
    onJoin: () => void;
    onHomeRoom: () => void;
    onForum: () => void;
}

/**
 * The menu over a piece of guild furniture, on the `guild_furni_menu` layout (115x140) - the
 * same little bubble as any other furniture menu, with the guild's name at the top and up to
 * three ways into the guild below it.
 */
export const FurnitureGuildMenuView = ({
    guildName, isMember, hasForum, onJoin, onHomeRoom, onForum,
}: FurnitureGuildMenuViewProps) => {
    const [ collapsed, setCollapsed ] = useState<boolean>(false);
    const t = useTranslation();

    const buttons: { key: string; label: string; onPointerTap: () => void }[] = [];

    if (!isMember) buttons.push({ key: 'join', label: t('widget.furniture.button.join.group'), onPointerTap: onJoin });

    buttons.push({ key: 'home', label: t('widget.furniture.button.go.to.group.home.room'), onPointerTap: onHomeRoom });

    if (hasForum) buttons.push({ key: 'forum', label: t('widget.furniture.button.open_group_forum'), onPointerTap: onForum });

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ width: 115, flexDirection: 'column' }}
        >
            <Region layout={{ width: 107, flexDirection: 'column', alignItems: 'center', paddingTop: 7 }}>
                <ThemeText
                    text={guildName}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    layout={{ height: 16, width: '100%' }}
                />
                <Region
                    backgroundColor="#000000"
                    layout={{ marginLeft: 2, marginRight: 2, height: 1, width: 103 }}
                />
                {!collapsed && buttons.map(button => (
                    <ContainerButton
                        key={button.key}
                        variant="3"
                        tintColor="#2d2a27"
                        onPointerTap={button.onPointerTap}
                        layout={{ width: 101, height: 26, marginTop: 1 }}
                    >
                        <ThemeText
                            text={button.label}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                ))}
                <Region
                    cursor="pointer"
                    onPointerTap={() => setCollapsed(!collapsed)}
                    layout={{ width: 100, height: 18, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Icon
                        variant={collapsed ? '6' : '7'}
                        layout={{ width: 13, height: 10 }}
                    />
                </Region>
            </Region>
        </Bubble>
    );
};
