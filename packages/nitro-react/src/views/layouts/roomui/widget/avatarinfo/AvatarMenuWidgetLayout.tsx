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
                params={1048865}
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
            params={145}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 7, height: 16, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                params={208}
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
                params={16}
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
}

export const AvatarMenuWidgetLayoutOpenProfileItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutOpenProfileItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="open_profile"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `friend` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutFriendItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutFriendItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutFriendItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friend"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `trade` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutTradeItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutTradeItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutTradeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trade"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `whisper` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutWhisperItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutWhisperItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutWhisperItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="whisper"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `respect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRespectItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="respect"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `replenish_respect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutReplenishRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutReplenishRespectItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutReplenishRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="replenish_respect"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('infostand.button.replenish_respect')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('pursearea_duckets_icon.png')}
                    layout={{ position: 'absolute', left: 110, width: 15, top: 10, height: 15 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `blow` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBlowItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutBlowItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutBlowItemProps) => {
    return (
        <Region
            name="blow"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `perform` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPerformItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutPerformItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutPerformItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="perform"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `relationship` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRelationshipItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutRelationshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `kick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutKickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutKickItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutKickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="kick"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `mute` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMuteItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutMuteItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutMuteItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `mute_2min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute2minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutMute2minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutMute2minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_2min"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `mute_5min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute5minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutMute5minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutMute5minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_5min"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `mute_10min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutMute10minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutMute10minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutMute10minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mute_10min"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ban_with_duration` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanWithDurationItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutBanWithDurationItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutBanWithDurationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_with_duration"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `ban_hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanHourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutBanHourItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutBanHourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_hour"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ban_day` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutBanDayItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutBanDayItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutBanDayItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ban_day"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `perm_ban` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPermBanItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutPermBanItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutPermBanItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="perm_ban"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `give_rights` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutGiveRightsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutGiveRightsItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutGiveRightsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_rights"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `remove_rights` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRemoveRightsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRemoveRightsItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutRemoveRightsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="remove_rights"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `unignore` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutUnignoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutUnignoreItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutUnignoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="unignore"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ignore` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutIgnoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutIgnoreItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutIgnoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ignore"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `report` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutReportItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutReportItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutReportItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="report"
            tags={[ 'moderate' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'moderate' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `moderate` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutModerateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutModerateItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutModerateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moderate"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
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
            params={16}
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                params={17}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    params={16}
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
            params={16}
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                params={17}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    params={2192}
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
            params={16}
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button"
                params={17}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
            >
                <ThemeImage
                    params={2192}
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
            tags={[ 'grid' ]}
            params={144}
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
}

export const AvatarMenuWidgetLayoutNoRelationshipItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutNoRelationshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_relationship"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `actions` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutActionsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutActionsItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutActionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="actions"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_left' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `pass_handitem` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutPassHanditemItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pass_handitem"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `change_bot_name` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutChangeBotNameItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutChangeBotNameItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutChangeBotNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_bot_name"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `dress_up` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDressUpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutDressUpItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutDressUpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dress_up"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `setup_chat` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutSetupChatItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutSetupChatItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutSetupChatItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="setup_chat"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `random_walk` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRandomWalkItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutRandomWalkItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutRandomWalkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="random_walk"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `dance` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDanceItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutDanceItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutDanceItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `pick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutPickItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutPickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `nux_proceed_1` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxProceed1ItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleNuxProceed1?: boolean;
}

export const AvatarMenuWidgetLayoutNuxProceed1Item = ({ captionLabel, layout, onButton, visibleNuxProceed1 }: AvatarMenuWidgetLayoutNuxProceed1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_proceed_1"
            tags={[ 'action' ]}
            params={144}
            visible={visibleNuxProceed1 ?? false}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `nux_take_tour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxTakeTourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutNuxTakeTourItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutNuxTakeTourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_take_tour"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `nux_again` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxAgainItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutNuxAgainItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutNuxAgainItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_again"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `nux_restart` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxRestartItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutNuxRestartItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutNuxRestartItemProps) => {
    return (
        <Region
            name="nux_restart"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `nux_next_day` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutNuxNextDayItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutNuxNextDayItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutNuxNextDayItemProps) => {
    return (
        <Region
            name="nux_next_day"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `link_template` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutLinkTemplateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleLinkTemplate?: boolean;
}

export const AvatarMenuWidgetLayoutLinkTemplateItem = ({ captionLabel, layout, onButton, visibleLinkTemplate }: AvatarMenuWidgetLayoutLinkTemplateItemProps) => {
    return (
        <Region
            name="link_template"
            tags={[ 'action' ]}
            params={144}
            visible={visibleLinkTemplate ?? false}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
                    tags={[ 'arrow_right' ]}
                    params={80}
                    layout={{ position: 'absolute', right: 10, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `ambassador_alert` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorAlertItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorAlertItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorAlertItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_alert"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_kick` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorKickItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorKickItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorKickItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_kick"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_2min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute2minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute2minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute2minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_2min"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_10min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute10minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute10minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute10minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_10min"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_15min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute15minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute15minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute15minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_15min"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_60min` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute60minItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute60minItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute60minItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_60min"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_18hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute18hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute18hourItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute18hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_18hour"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_36hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute36hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute36hourItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute36hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_36hour"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_mute_72hour` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorMute72hourItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorMute72hourItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorMute72hourItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_mute_72hour"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `ambassador_unmute` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorUnmuteItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutAmbassadorUnmuteItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutAmbassadorUnmuteItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ambassador_unmute"
            tags={[ 'ambassador' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'ambassador' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `donate_to_all` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDonateToAllItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutDonateToAllItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutDonateToAllItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donate_to_all"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `donate_to_user` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDonateToUserItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutDonateToUserItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutDonateToUserItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donate_to_user"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
    );
};

/** Row template `wired_inspect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutWiredInspectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AvatarMenuWidgetLayoutWiredInspectItem = ({ captionLabel, layout, onButton }: AvatarMenuWidgetLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
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
            params={8519824}
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
            params={1169}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 3, right: 4, bottom: 11, height: 18, justifyContent: 'center', ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                params={208}
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
            params={12583056}
            layout={{ position: 'absolute', left: 0, right: 8, top: 0, height: 1458, ...layout }}
        >
            <AvatarMenuWidgetLayoutProfileLink {...profileLink} />
            <Region
                params={144}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <AvatarMenuWidgetLayoutButtons {...buttons} />
            <AvatarMenuWidgetLayoutMinimize {...minimize} />
        </Region>
    );
};
