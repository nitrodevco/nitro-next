import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1258_purse_xml` (layout "grid_purse", 230x77) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurseLayoutProps {
    captionDays?: string;
    captionEarnings?: string;
    captionJoin?: string;
    layout?: BoxLayout;
    onEarningsButton?: () => void;
    onHcJoinButton?: () => void;
    onHelpButton?: () => void;
    onLogoutButton?: () => void;
    onSettingsButton?: () => void;
    purseItemlist?: PurseLayoutPurseItemlistProps;
    srcBetaSign?: string;
    srcEarningsUnseenIndicator?: string;
    visibleBetaSign?: boolean;
    visibleEarningsUnseenIndicator?: boolean;
    visibleJoin?: boolean;
}

export const PurseLayout = ({ captionDays, captionEarnings, captionJoin, layout, onEarningsButton, onHcJoinButton, onHelpButton, onLogoutButton, onSettingsButton, purseItemlist, srcBetaSign, srcEarningsUnseenIndicator, visibleBetaSign, visibleEarningsUnseenIndicator, visibleJoin }: PurseLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 230, height: 77, ...layout }}>
            <Region layout={{ position: 'absolute', left: -38, width: 230, top: 0, height: 77 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 76 }}
                />
                {/* `border` is hidden and has no name to show it by */}
                <PurseLayoutPurseItemlist {...purseItemlist} />
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, width: 101, top: 7, height: 28 }}
                />
                <Region
                    name="hc_join_button"
                    tooltip={t('catalog.club.hc')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onHcJoinButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 64, width: 101, top: 8, height: 26, justifyContent: 'center' }}
                >
                    {(visibleJoin ?? false) && (
                        <Region
                            name="join"
                            layout={{ position: 'absolute', width: 25, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionJoin ?? 'join'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#00c1c4' }}
                            />
                        </Region>
                    )}
                    <Region
                        name="days"
                        layout={{ position: 'absolute', left: 25, width: 50, top: 4, height: 28, maxWidth: 50, minHeight: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDays ?? '23 d.'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4', wordWrap: true, wordWrapWidth: 50 }}
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('pursearea_hc_icon.png')}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 18 }}
                    />
                </Region>
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, width: 101, top: 39, height: 28 }}
                />
                <Region
                    name="earnings_button"
                    tooltip={t('earnings.title')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onEarningsButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 64, width: 101, top: 40, height: 26 }}
                >
                    <Region
                        name="earnings"
                        layout={{ position: 'absolute', left: 25, width: 79, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEarnings ?? t('earnings.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4' }}
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('pursearea_icon_earnings.png')}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 18 }}
                    />
                    {(visibleEarningsUnseenIndicator ?? false) && (
                        <ThemeImage
                            name="earnings_unseen_indicator"
                            src={srcEarningsUnseenIndicator ?? layoutImage('pursearea_unseen_indicator.png')}
                            layout={{ position: 'absolute', left: 1, width: 10, top: 0, height: 11 }}
                        />
                    )}
                </Region>
                <Region
                    backgroundColor="#444444"
                    layout={{ position: 'absolute', left: 169, width: 1, top: 11, height: 55, minHeight: 23 }}
                />
                <Region layout={{ position: 'absolute', left: 174, width: 63, top: 8, height: 62, flexDirection: 'column', gap: 2 }}>
                    <ContainerButton
                        variant="0"
                        name="help_button"
                        tooltip={t('toolbar.help')}
                        tintColor="#217bb5"
                        onPointerTap={onHelpButton}
                        layout={{ width: 50, height: 19, flexShrink: 0, minWidth: 50, maxWidth: 50, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('toolbar.help')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="logout_button"
                        tooltip={t('toolbar.logout')}
                        tintColor="#de5347"
                        onPointerTap={onLogoutButton}
                        layout={{ width: 50, height: 19, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('pursearea_logout_icon.png')}
                            layout={{ position: 'absolute', left: 18, width: 15, top: 0, height: 20 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="settings_button"
                        tooltip={t('widget.memenu.settings')}
                        tintColor="#726b86"
                        onPointerTap={onSettingsButton}
                        layout={{ width: 50, height: 19, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('pursearea_settings_icon.png')}
                            layout={{ position: 'absolute', left: -5, width: 61, top: 1, height: 18 }}
                        />
                    </ContainerButton>
                </Region>
                {(visibleBetaSign ?? false) && (
                    <ThemeImage
                        name="beta_sign"
                        src={srcBetaSign ?? layoutImage('common_beta_sign.png')}
                        layout={{ position: 'absolute', left: 0, width: 35, top: 55, height: 16 }}
                    />
                )}
            </Region>
        </Region>
    );
};

/** Row template `diamond_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutDiamondCountButtonItemProps {
    captionDiamondCount?: string;
    layout?: BoxLayout;
    onDiamondCountButton?: () => void;
}

export const PurseLayoutDiamondCountButtonItem = ({ captionDiamondCount, layout, onDiamondCountButton }: PurseLayoutDiamondCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="diamond_count_button"
            tooltip={t('achievements.activitypoint.5')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDiamondCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                name="diamond_count"
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDiamondCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#38caeb' }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('pursearea_diamond_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};

/** Row template `credit_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutCreditCountButtonItemProps {
    captionCreditCount?: string;
    layout?: BoxLayout;
    onCreditCountButton?: () => void;
}

export const PurseLayoutCreditCountButtonItem = ({ captionCreditCount, layout, onCreditCountButton }: PurseLayoutCreditCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="credit_count_button"
            tooltip={t('purse_coins')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCreditCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                name="credit_count"
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCreditCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#d5af22' }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('pursearea_credits_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};

/** Row template `ducket_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutDucketCountButtonItemProps {
    captionDucketCount?: string;
    layout?: BoxLayout;
    onDucketCountButton?: () => void;
}

export const PurseLayoutDucketCountButtonItem = ({ captionDucketCount, layout, onDucketCountButton }: PurseLayoutDucketCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ducket_count_button"
            tooltip={t('achievements.activitypoint.0')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDucketCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="ducket_count"
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDucketCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#d787d7' }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('pursearea_duckets_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};

/** Named region `purse_itemlist` of PurseLayout - configured through the parent's `purseItemlist` prop. */
export interface PurseLayoutPurseItemlistProps {
    itemsPurseItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PurseLayoutPurseItemlist = ({ itemsPurseItemlist, layout }: PurseLayoutPurseItemlistProps) => {
    return (
        <Region
            name="purse_itemlist"
            layout={{ position: 'absolute', left: 7, width: 52, top: 9, height: 55, maxHeight: 62, flexDirection: 'column', ...layout }}
        >
            {itemsPurseItemlist ?? (
                <>
                    <PurseLayoutDiamondCountButtonItem />
                    <PurseLayoutCreditCountButtonItem />
                    <PurseLayoutDucketCountButtonItem />
                </>
            )}
        </Region>
    );
};
