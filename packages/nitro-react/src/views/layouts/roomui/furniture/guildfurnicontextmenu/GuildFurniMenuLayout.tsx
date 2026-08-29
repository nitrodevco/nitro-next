import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `837_guild_furni_menu_xml` (layout "context_menu_widget", 115x140) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildFurniMenuLayoutProps {
    border?: GuildFurniMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const GuildFurniMenuLayout = ({ border, layout }: GuildFurniMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 140, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: 0, height: 140 }}
            >
                <GuildFurniMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of GuildFurniMenuLayout - configured through the parent's `profileLink` prop. */
export interface GuildFurniMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    tags?: string[];
}

export const GuildFurniMenuLayoutProfileLink = ({ captionName, layout, onProfileLink, tags }: GuildFurniMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            tags={tags}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 62, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? 'group_title'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `join` of GuildFurniMenuLayout - pass real rows through its `items…` slot. */
export interface GuildFurniMenuLayoutJoinItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const GuildFurniMenuLayoutJoinItem = ({ captionLabel, layout, onButton, tags }: GuildFurniMenuLayoutJoinItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="join"
            tags={tags}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('widget.furniture.button.join.group')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `home_room` of GuildFurniMenuLayout - pass real rows through its `items…` slot. */
export interface GuildFurniMenuLayoutHomeRoomItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const GuildFurniMenuLayoutHomeRoomItem = ({ captionLabel, layout, onButton, tags }: GuildFurniMenuLayoutHomeRoomItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="home_room"
            tags={tags}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('widget.furniture.button.go.to.group.home.room')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `open_forum` of GuildFurniMenuLayout - pass real rows through its `items…` slot. */
export interface GuildFurniMenuLayoutOpenForumItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const GuildFurniMenuLayoutOpenForumItem = ({ captionLabel, layout, onButton, tags }: GuildFurniMenuLayoutOpenForumItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="open_forum"
            tags={tags}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('widget.furniture.button.open_group_forum')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of GuildFurniMenuLayout - configured through the parent's `buttons` prop. */
export interface GuildFurniMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const GuildFurniMenuLayoutButtons = ({ itemsButtons, layout, tags }: GuildFurniMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 80, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <GuildFurniMenuLayoutJoinItem tags={[ 'action' ]} />
                    <GuildFurniMenuLayoutHomeRoomItem tags={[ 'action' ]} />
                    <GuildFurniMenuLayoutOpenForumItem tags={[ 'action' ]} />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of GuildFurniMenuLayout - configured through the parent's `minimize` prop. */
export interface GuildFurniMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
    tags?: string[];
}

export const GuildFurniMenuLayoutMinimize = ({ layout, onMinimize, tags }: GuildFurniMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            tags={tags}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 4, height: 18, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of GuildFurniMenuLayout - configured through the parent's `border` prop. */
export interface GuildFurniMenuLayoutBorderProps {
    buttons?: GuildFurniMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: GuildFurniMenuLayoutMinimizeProps;
    profileLink?: GuildFurniMenuLayoutProfileLinkProps;
    tags?: string[];
}

export const GuildFurniMenuLayoutBorder = ({ buttons, layout, minimize, profileLink, tags }: GuildFurniMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 130, justifyContent: 'center', ...layout }}
        >
            <GuildFurniMenuLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <GuildFurniMenuLayoutButtons {...buttons} />
            <GuildFurniMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
