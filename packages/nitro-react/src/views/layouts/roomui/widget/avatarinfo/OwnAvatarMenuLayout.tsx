import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `958_own_avatar_menu_xml` (layout "context_menu_widget", 115x887) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarMenuLayoutProps {
    border?: OwnAvatarMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayout = ({ border, layout }: OwnAvatarMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 887, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 20, width: 115, bottom: 0, height: 887 }}
            >
                <OwnAvatarMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of OwnAvatarMenuLayout - configured through the parent's `profileLink` prop. */
export interface OwnAvatarMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
}

export const OwnAvatarMenuLayoutProfileLink = ({ captionName, layout, onProfileLink }: OwnAvatarMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? 'my_name_here'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `change_name` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutChangeNameItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutChangeNameItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutChangeNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_name"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.avatar.change_name')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `decorate` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDecorateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDecorateItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDecorateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="decorate"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.avatar.decorate')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `change_looks` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutChangeLooksItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutChangeLooksItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutChangeLooksItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_looks"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.myclothes')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `sit` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSitItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutSitItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutSitItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="sit"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.sit')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `stand` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutStandItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutStandItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutStandItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="stand"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.stand')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `wave` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutWaveItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutWaveItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutWaveItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wave"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.wave')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `blow` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutBlowItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutBlowItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutBlowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="blow"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.blow')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="14"
                        name="icon_vip"
                        layout={{ position: 'absolute', right: 6, width: 15, top: 10, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `67` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayout_67ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayout_67Item = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayout_67ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="67"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.expression_67')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="14"
                        name="icon_vip"
                        layout={{ position: 'absolute', right: 6, width: 15, top: 10, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `jump` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutJumpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutJumpItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutJumpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="jump"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.jump')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="14"
                        name="icon_vip"
                        layout={{ position: 'absolute', right: 6, width: 15, top: 10, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `laugh` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutLaughItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutLaughItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutLaughItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="laugh"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.laugh')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="14"
                        name="icon_vip"
                        layout={{ position: 'absolute', right: 6, width: 15, top: 10, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `idle` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutIdleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutIdleItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutIdleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="idle"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.idle')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `expressions` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutExpressionsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutExpressionsItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutExpressionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="expressions"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.link.expressions')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_menu` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDanceMenuItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDanceMenuItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDanceMenuItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_menu"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDanceItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDanceItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDanceItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_stop` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDanceStopItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDanceStopItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDanceStopItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_stop"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance.stop')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_1` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDance1ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDance1Item = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDance1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_1"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance1')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_2` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDance2ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDance2Item = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDance2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_2"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance2')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_3` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDance3ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDance3Item = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDance3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_3"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance3')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance_4` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutDance4ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutDance4Item = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutDance4ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_4"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.dance4')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `sign_1` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign1ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign1Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign1ItemProps) => {
    return (
        <Region
            name="sign_1"
            layout={{ width: 34, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="1"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_2` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign2ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign2Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign2ItemProps) => {
    return (
        <Region
            name="sign_2"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="2"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_3` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign3ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign3Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign3ItemProps) => {
    return (
        <Region
            name="sign_3"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="3"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_4` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign4ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign4Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign4ItemProps) => {
    return (
        <Region
            name="sign_4"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="4"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_5` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign5ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign5Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign5ItemProps) => {
    return (
        <Region
            name="sign_5"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="5"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_6` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign6ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign6Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign6ItemProps) => {
    return (
        <Region
            name="sign_6"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="6"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_7` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign7ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign7Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign7ItemProps) => {
    return (
        <Region
            name="sign_7"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="7"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_8` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign8ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign8Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign8ItemProps) => {
    return (
        <Region
            name="sign_8"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="8"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_9` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign9ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign9Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign9ItemProps) => {
    return (
        <Region
            name="sign_9"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="9"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_10` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign10ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign10Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign10ItemProps) => {
    return (
        <Region
            name="sign_10"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="10"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_11` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign11ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIconHeart?: string;
}

export const OwnAvatarMenuLayoutSign11Item = ({ layout, onButton, srcSignIconHeart }: OwnAvatarMenuLayoutSign11ItemProps) => {
    return (
        <Region
            name="sign_11"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_heart"
                    src={srcSignIconHeart}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_12` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign12ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIconSkull?: string;
}

export const OwnAvatarMenuLayoutSign12Item = ({ layout, onButton, srcSignIconSkull }: OwnAvatarMenuLayoutSign12ItemProps) => {
    return (
        <Region
            name="sign_12"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_skull"
                    src={srcSignIconSkull}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_0` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign0ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarMenuLayoutSign0Item = ({ layout, onButton }: OwnAvatarMenuLayoutSign0ItemProps) => {
    return (
        <Region
            name="sign_0"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text="0"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_13` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign13ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon13?: string;
}

export const OwnAvatarMenuLayoutSign13Item = ({ layout, onButton, srcSignIcon13 }: OwnAvatarMenuLayoutSign13ItemProps) => {
    return (
        <Region
            name="sign_13"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_13"
                    src={srcSignIcon13}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_15` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign15ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon15?: string;
}

export const OwnAvatarMenuLayoutSign15Item = ({ layout, onButton, srcSignIcon15 }: OwnAvatarMenuLayoutSign15ItemProps) => {
    return (
        <Region
            name="sign_15"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_15"
                    src={srcSignIcon15}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_14` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign14ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon14?: string;
}

export const OwnAvatarMenuLayoutSign14Item = ({ layout, onButton, srcSignIcon14 }: OwnAvatarMenuLayoutSign14ItemProps) => {
    return (
        <Region
            name="sign_14"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_14"
                    src={srcSignIcon14}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_17` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign17ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon17?: string;
}

export const OwnAvatarMenuLayoutSign17Item = ({ layout, onButton, srcSignIcon17 }: OwnAvatarMenuLayoutSign17ItemProps) => {
    return (
        <Region
            name="sign_17"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_17"
                    src={srcSignIcon17}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `sign_16` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign16ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon16?: string;
}

export const OwnAvatarMenuLayoutSign16Item = ({ layout, onButton, srcSignIcon16 }: OwnAvatarMenuLayoutSign16ItemProps) => {
    return (
        <Region
            name="sign_16"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
            >
                <ThemeImage
                    name="sign_icon_16"
                    src={srcSignIcon16}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `signs_grid` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSignsGridItemProps {
    itemsSignsGrid?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayoutSignsGridItem = ({ itemsSignsGrid, layout }: OwnAvatarMenuLayoutSignsGridItemProps) => {
    return (
        <Region
            name="signs_grid"
            layout={{ width: 103, height: 152, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1, ...layout }}
        >
            {itemsSignsGrid ?? (
                <>
                    <OwnAvatarMenuLayoutSign1Item />
                    <OwnAvatarMenuLayoutSign2Item />
                    <OwnAvatarMenuLayoutSign3Item />
                    <OwnAvatarMenuLayoutSign4Item />
                    <OwnAvatarMenuLayoutSign5Item />
                    <OwnAvatarMenuLayoutSign6Item />
                    <OwnAvatarMenuLayoutSign7Item />
                    <OwnAvatarMenuLayoutSign8Item />
                    <OwnAvatarMenuLayoutSign9Item />
                    <OwnAvatarMenuLayoutSign10Item />
                    <OwnAvatarMenuLayoutSign11Item />
                    <OwnAvatarMenuLayoutSign12Item />
                    <OwnAvatarMenuLayoutSign0Item />
                    <OwnAvatarMenuLayoutSign13Item />
                    <OwnAvatarMenuLayoutSign15Item />
                    <OwnAvatarMenuLayoutSign14Item />
                    <OwnAvatarMenuLayoutSign17Item />
                    <OwnAvatarMenuLayoutSign16Item />
                </>
            )}
        </Region>
    );
};

/** Row template `signs` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSignsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutSignsItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutSignsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="signs"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.show.signs')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `back` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutBackItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutBackItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutBackItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="back"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('generic.back')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="4"
                        name="icon"
                        layout={{ position: 'absolute', left: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `handitem` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutHanditemItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('avatar.widget.drop_hand_item')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `effects` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutEffectsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutEffectsItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutEffectsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effects"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.memenu.effects')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `more` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutMoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutMoreItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="more"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.link.more')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `wired_inspect` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutWiredInspectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarMenuLayoutWiredInspectItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarMenuLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.wired_inspect')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `buttons` of OwnAvatarMenuLayout - configured through the parent's `buttons` prop. */
export interface OwnAvatarMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayoutButtons = ({ itemsButtons, layout }: OwnAvatarMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 105, top: 28, minHeight: 827, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <OwnAvatarMenuLayoutChangeNameItem />
                    <OwnAvatarMenuLayoutDecorateItem />
                    <OwnAvatarMenuLayoutChangeLooksItem />
                    <OwnAvatarMenuLayoutSitItem />
                    <OwnAvatarMenuLayoutStandItem />
                    <OwnAvatarMenuLayoutWaveItem />
                    <OwnAvatarMenuLayoutBlowItem />
                    <OwnAvatarMenuLayout_67Item />
                    <OwnAvatarMenuLayoutJumpItem />
                    <OwnAvatarMenuLayoutLaughItem />
                    <OwnAvatarMenuLayoutIdleItem />
                    <OwnAvatarMenuLayoutExpressionsItem />
                    <OwnAvatarMenuLayoutDanceMenuItem />
                    <OwnAvatarMenuLayoutDanceItem />
                    <OwnAvatarMenuLayoutDanceStopItem />
                    <OwnAvatarMenuLayoutDance1Item />
                    <OwnAvatarMenuLayoutDance2Item />
                    <OwnAvatarMenuLayoutDance3Item />
                    <OwnAvatarMenuLayoutDance4Item />
                    <OwnAvatarMenuLayoutSignsGridItem />
                    <OwnAvatarMenuLayoutSignsItem />
                    <OwnAvatarMenuLayoutBackItem />
                    <OwnAvatarMenuLayoutHanditemItem />
                    <OwnAvatarMenuLayoutEffectsItem />
                    <OwnAvatarMenuLayoutMoreItem />
                    <OwnAvatarMenuLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of OwnAvatarMenuLayout - configured through the parent's `minimize` prop. */
export interface OwnAvatarMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const OwnAvatarMenuLayoutMinimize = ({ layout, onMinimize }: OwnAvatarMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
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

/** Named region `border` of OwnAvatarMenuLayout - configured through the parent's `border` prop. */
export interface OwnAvatarMenuLayoutBorderProps {
    buttons?: OwnAvatarMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: OwnAvatarMenuLayoutMinimizeProps;
    profileLink?: OwnAvatarMenuLayoutProfileLinkProps;
}

export const OwnAvatarMenuLayoutBorder = ({ buttons, layout, minimize, profileLink }: OwnAvatarMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 877, justifyContent: 'center', ...layout }}
        >
            <OwnAvatarMenuLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <OwnAvatarMenuLayoutButtons {...buttons} />
            <OwnAvatarMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
