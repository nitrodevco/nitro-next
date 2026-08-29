import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1062_avatar_menu_widget_xml` (layout "avatar_menu_widget", 151x1462) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarMenuWidgetLayoutProps {
    border?: AvatarMenuWidgetLayoutBorderProps;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayout = ({ border, layout }: AvatarMenuWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 151, height: 1462, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 151, bottom: 530, height: 1462 }}
            >
                <AvatarMenuWidgetLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of AvatarMenuWidgetLayout - configured through the parent's `profileLink` prop. */
export interface AvatarMenuWidgetLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    srcRelationshipStatus?: string;
}

export const AvatarMenuWidgetLayoutProfileLink = ({ captionName, layout, onProfileLink, srcRelationshipStatus }: AvatarMenuWidgetLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 7, height: 16, justifyContent: 'center', ...layout }}
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
            <ThemeImage
                name="relationship_status"
                src={srcRelationshipStatus}
                layout={{ position: 'absolute', left: 5, width: 16, top: 1, height: 14 }}
            />
        </Region>
    );
};

/** Row template `open_profile` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutOpenProfileItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutOpenProfileItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutOpenProfileItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="open_profile"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.open_profile')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `friend` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutFriendItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutFriendItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutFriendItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friend"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.friend')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `trade` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutTradeItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutTradeItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutTradeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trade"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.trade')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `whisper` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutWhisperItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutWhisperItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutWhisperItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="whisper"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.whisper')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `respect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutRespectItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="respect"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.respect')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `replenish_respect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutReplenishRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutReplenishRespectItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutReplenishRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="replenish_respect"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.button.replenish_respect')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('pursearea_duckets_icon.png')}
                        layout={{ position: 'absolute', left: 110, width: 15, top: 10, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `blow` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBlowItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutBlowItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutBlowItemProps) => {
    return (
        <Region
            name="blow"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? 'infostand.button.blow'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `perform` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPerformItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutPerformItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutPerformItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="perform"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.link.perform')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `relationship` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutRelationshipItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutRelationshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.link.relationship')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `kick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutKickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutKickItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutKickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="kick"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.kick')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `mute` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMuteItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutMuteItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutMuteItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `mute_2min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute2minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutMute2minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutMute2minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_2min"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_2min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `mute_5min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute5minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutMute5minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutMute5minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_5min"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_5min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `mute_10min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute10minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutMute10minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutMute10minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_10min"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_10min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ban_with_duration` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanWithDurationItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutBanWithDurationItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutBanWithDurationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_with_duration"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.ban')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ban_hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanHourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutBanHourItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutBanHourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_hour"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.ban_hour')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ban_day` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanDayItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutBanDayItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutBanDayItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_day"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.ban_day')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `perm_ban` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPermBanItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutPermBanItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutPermBanItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="perm_ban"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.perm_ban')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `give_rights` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutGiveRightsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutGiveRightsItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutGiveRightsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_rights"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.giverights')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `remove_rights` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRemoveRightsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutRemoveRightsItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutRemoveRightsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="remove_rights"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.removerights')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `unignore` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutUnignoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutUnignoreItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutUnignoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="unignore"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.unignore')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ignore` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutIgnoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutIgnoreItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutIgnoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ignore"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.ignore')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `report` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutReportItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutReportItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutReportItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="report"
            visible={visibleGroups?.moderate ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.moderate ?? true}
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
                            text={captionLabel ?? t('infostand.button.report')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `moderate` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutModerateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutModerateItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutModerateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moderate"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.link.moderate')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `relationship_heart` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipHeartItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRelationshipHeartItem = ({ layout, onButton }: AvatarMenuWidgetLayoutRelationshipHeartItemProps) => {
    return (
        <Region
            name="relationship_heart"
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    src={layoutImage('relationship_status_heart.png')}
                    layout={{ position: 'absolute', left: 0, width: 49, top: 7, height: 17 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `relationship_smile` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipSmileItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRelationshipSmileItem = ({ layout, onButton }: AvatarMenuWidgetLayoutRelationshipSmileItemProps) => {
    return (
        <Region
            name="relationship_smile"
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    src={layoutImage('relationship_status_smile.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `relationship_bobba` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipBobbaItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRelationshipBobbaItem = ({ layout, onButton }: AvatarMenuWidgetLayoutRelationshipBobbaItemProps) => {
    return (
        <Region
            name="relationship_bobba"
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    src={layoutImage('relationship_status_bobba.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 7, bottom: 5 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `relationship_grid` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipGridItemProps {
    itemsRelationshipGrid?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayoutRelationshipGridItem = ({ itemsRelationshipGrid, layout }: AvatarMenuWidgetLayoutRelationshipGridItemProps) => {
    return (
        <Region
            name="relationship_grid"
            layout={{ width: 137, height: 25, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1, ...layout }}
        >
            {itemsRelationshipGrid ?? (
                <>
                    <AvatarMenuWidgetLayoutRelationshipHeartItem />
                    <AvatarMenuWidgetLayoutRelationshipSmileItem />
                    <AvatarMenuWidgetLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};

/** Row template `no_relationship` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNoRelationshipItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutNoRelationshipItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutNoRelationshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_relationship"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.clear_relationship')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `actions` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutActionsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutActionsItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutActionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="actions"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.link.actions')}
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

/** Row template `pass_handitem` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutPassHanditemItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pass_handitem"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.pass_hand_item')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `change_bot_name` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutChangeBotNameItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutChangeBotNameItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutChangeBotNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_bot_name"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.change_bot_name')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dress_up` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDressUpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutDressUpItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutDressUpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dress_up"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.dress_up')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `setup_chat` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutSetupChatItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutSetupChatItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutSetupChatItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="setup_chat"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.setup_chat')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `random_walk` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRandomWalkItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutRandomWalkItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutRandomWalkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="random_walk"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.random_walk')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `dance` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDanceItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutDanceItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutDanceItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.dance')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `pick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutPickItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutPickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.pick_up')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `nux_proceed_1` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxProceed1ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleNuxProceed1?: boolean;
}

export const AvatarMenuWidgetLayoutNuxProceed1Item = ({ captionLabel, layout, onButton, visibleGroups, visibleNuxProceed1 }: AvatarMenuWidgetLayoutNuxProceed1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_proceed_1"
            visible={(visibleGroups?.action ?? true) && (visibleNuxProceed1 ?? false)}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.nux.proceed')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `nux_take_tour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxTakeTourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutNuxTakeTourItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutNuxTakeTourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_take_tour"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.nux.take.tour')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `nux_again` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxAgainItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutNuxAgainItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutNuxAgainItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_again"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.nux.again')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `nux_restart` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxRestartItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutNuxRestartItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutNuxRestartItemProps) => {
    return (
        <Region
            name="nux_restart"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? 'NUX RESTART'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `nux_next_day` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxNextDayItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutNuxNextDayItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutNuxNextDayItemProps) => {
    return (
        <Region
            name="nux_next_day"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? 'NUX NEXT DAY'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `link_template` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutLinkTemplateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleLinkTemplate?: boolean;
}

export const AvatarMenuWidgetLayoutLinkTemplateItem = ({ captionLabel, layout, onButton, visibleGroups, visibleLinkTemplate }: AvatarMenuWidgetLayoutLinkTemplateItemProps) => {
    return (
        <Region
            name="link_template"
            visible={(visibleGroups?.action ?? true) && (visibleLinkTemplate ?? false)}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? 'PH'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('infostand.link.ambassador')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="5"
                        name="icon"
                        layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_alert` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorAlertItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorAlertItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorAlertItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_alert"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.ambassador.alert')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_kick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorKickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorKickItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorKickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_kick"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.kick')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_2min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute2minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute2minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute2minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_2min"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_2min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_10min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute10minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute10minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute10minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_10min"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_10min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_15min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute15minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute15minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute15minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_15min"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_15min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_60min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute60minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute60minItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute60minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_60min"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_60min')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_18hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute18hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute18hourItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute18hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_18hour"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_18hour')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_36hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute36hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute36hourItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute36hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_36hour"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_36hour')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_mute_72hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute72hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorMute72hourItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorMute72hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_72hour"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.mute_72hour')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `ambassador_unmute` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorUnmuteItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorUnmuteItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorUnmuteItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_unmute"
            visible={visibleGroups?.ambassador ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.ambassador ?? true}
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
                            text={captionLabel ?? t('infostand.button.unmute')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `donate_to_all` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDonateToAllItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutDonateToAllItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutDonateToAllItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donate_to_all"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.dta')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `donate_to_user` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDonateToUserItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutDonateToUserItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutDonateToUserItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donate_to_user"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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
                            text={captionLabel ?? t('avatar.widget.dtu')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `wired_inspect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutWiredInspectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutWiredInspectItem = ({ captionLabel, layout, onButton, visibleGroups }: AvatarMenuWidgetLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
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

/** Named region `buttons` of AvatarMenuWidgetLayout - configured through the parent's `buttons` prop. */
export interface AvatarMenuWidgetLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayoutButtons = ({ itemsButtons, layout }: AvatarMenuWidgetLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', left: 2, right: 2, top: 28, minHeight: 1402, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <AvatarMenuWidgetLayoutOpenProfileItem />
                    <AvatarMenuWidgetLayoutFriendItem />
                    <AvatarMenuWidgetLayoutTradeItem />
                    <AvatarMenuWidgetLayoutWhisperItem />
                    <AvatarMenuWidgetLayoutRespectItem />
                    <AvatarMenuWidgetLayoutReplenishRespectItem />
                    <AvatarMenuWidgetLayoutBlowItem />
                    <AvatarMenuWidgetLayoutPerformItem />
                    <AvatarMenuWidgetLayoutRelationshipItem />
                    <AvatarMenuWidgetLayoutKickItem />
                    <AvatarMenuWidgetLayoutMuteItem />
                    <AvatarMenuWidgetLayoutMute2minItem />
                    <AvatarMenuWidgetLayoutMute5minItem />
                    <AvatarMenuWidgetLayoutMute10minItem />
                    <AvatarMenuWidgetLayoutBanWithDurationItem />
                    <AvatarMenuWidgetLayoutBanHourItem />
                    <AvatarMenuWidgetLayoutBanDayItem />
                    <AvatarMenuWidgetLayoutPermBanItem />
                    <AvatarMenuWidgetLayoutGiveRightsItem />
                    <AvatarMenuWidgetLayoutRemoveRightsItem />
                    <AvatarMenuWidgetLayoutUnignoreItem />
                    <AvatarMenuWidgetLayoutIgnoreItem />
                    <AvatarMenuWidgetLayoutReportItem />
                    <AvatarMenuWidgetLayoutModerateItem />
                    <AvatarMenuWidgetLayoutRelationshipGridItem />
                    <AvatarMenuWidgetLayoutNoRelationshipItem />
                    <AvatarMenuWidgetLayoutActionsItem />
                    <AvatarMenuWidgetLayoutPassHanditemItem />
                    <AvatarMenuWidgetLayoutChangeBotNameItem />
                    <AvatarMenuWidgetLayoutDressUpItem />
                    <AvatarMenuWidgetLayoutSetupChatItem />
                    <AvatarMenuWidgetLayoutRandomWalkItem />
                    <AvatarMenuWidgetLayoutDanceItem />
                    <AvatarMenuWidgetLayoutPickItem />
                    <AvatarMenuWidgetLayoutNuxProceed1Item />
                    <AvatarMenuWidgetLayoutNuxTakeTourItem />
                    <AvatarMenuWidgetLayoutNuxAgainItem />
                    <AvatarMenuWidgetLayoutNuxRestartItem />
                    <AvatarMenuWidgetLayoutNuxNextDayItem />
                    <AvatarMenuWidgetLayoutLinkTemplateItem />
                    <AvatarMenuWidgetLayoutAmbassadorItem />
                    <AvatarMenuWidgetLayoutAmbassadorAlertItem />
                    <AvatarMenuWidgetLayoutAmbassadorKickItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute2minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute10minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute15minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute60minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute18hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute36hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute72hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorUnmuteItem />
                    <AvatarMenuWidgetLayoutDonateToAllItem />
                    <AvatarMenuWidgetLayoutDonateToUserItem />
                    <AvatarMenuWidgetLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of AvatarMenuWidgetLayout - configured through the parent's `minimize` prop. */
export interface AvatarMenuWidgetLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const AvatarMenuWidgetLayoutMinimize = ({ layout, onMinimize }: AvatarMenuWidgetLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 3, right: 4, bottom: 11, height: 18, justifyContent: 'center', ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', width: 12, top: 7, height: 11 }}
            />
        </Region>
    );
};

/** Named region `border` of AvatarMenuWidgetLayout - configured through the parent's `border` prop. */
export interface AvatarMenuWidgetLayoutBorderProps {
    buttons?: AvatarMenuWidgetLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: AvatarMenuWidgetLayoutMinimizeProps;
    profileLink?: AvatarMenuWidgetLayoutProfileLinkProps;
}

export const AvatarMenuWidgetLayoutBorder = ({ buttons, layout, minimize, profileLink }: AvatarMenuWidgetLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, right: 8, top: 0, height: 1458, ...layout }}
        >
            <AvatarMenuWidgetLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <AvatarMenuWidgetLayoutButtons {...buttons} />
            <AvatarMenuWidgetLayoutMinimize {...minimize} />
        </Region>
    );
};
