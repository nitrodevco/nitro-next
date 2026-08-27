import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1258_purse_xml` (layout "grid_purse", 230x77) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurseLayoutProps {
    captionDays?: string;
    captionEarnings?: string;
    captionJoin?: string;
    itemsPurseItemlist?: ReactNode;
    layout?: BoxLayout;
    onEarningsButton?: () => void;
    onHcJoinButton?: () => void;
    onHelpButton?: () => void;
    onLogoutButton?: () => void;
    onSettingsButton?: () => void;
    srcBetaSign?: string;
    srcEarningsUnseenIndicator?: string;
}

export const PurseLayout = ({ captionDays, captionEarnings, captionJoin, itemsPurseItemlist, layout, onEarningsButton, onHcJoinButton, onHelpButton, onLogoutButton, onSettingsButton, srcBetaSign, srcEarningsUnseenIndicator }: PurseLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 230, height: 77, ...layout }}>
            <Region layout={{ position: 'absolute', left: -38, width: 230, top: 0, height: 77 }}>
                <Border
                    variant="9"
                    params={16}
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 76 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 114, top: 3, height: 69 }}
                >
                    <Border
                        variant="3"
                        params={16}
                        tintColor="#201e19"
                        blend={0.8}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="purse_itemlist"
                    layout={{ position: 'absolute', left: 7, width: 52, top: 9, height: 55, maxHeight: 62, flexDirection: 'column' }}
                >
                    {itemsPurseItemlist ?? (
                        <>
                            <PurseLayoutDiamondCountButtonItem />
                            <PurseLayoutCreditCountButtonItem />
                            <PurseLayoutDucketCountButtonItem />
                        </>
                    )}
                </Region>
                <Border
                    variant="2"
                    params={16}
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, width: 101, top: 7, height: 28 }}
                />
                <Region
                    name="hc_join_button"
                    tooltip={t('catalog.club.hc')}
                    params={1}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onHcJoinButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 64, width: 101, top: 8, height: 26, justifyContent: 'center' }}
                >
                    <Region
                        name="join"
                        tags={[ '#icon' ]}
                        params={786640}
                        visible={false}
                        layout={{ position: 'absolute', width: 25, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionJoin ?? 'join'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4' }}
                        />
                    </Region>
                    <Region
                        name="days"
                        tags={[ '#icon' ]}
                        params={16400}
                        layout={{ position: 'absolute', left: 25, width: 50, top: 4, height: 28, maxWidth: 50, minHeight: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDays ?? '23 d.'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4', wordWrap: true, wordWrapWidth: 50 }}
                        />
                    </Region>
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('pursearea_hc_icon.png')}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 18 }}
                    />
                </Region>
                <Border
                    variant="2"
                    params={16}
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, width: 101, top: 39, height: 28 }}
                />
                <Region
                    name="earnings_button"
                    tooltip={t('earnings.title')}
                    params={1}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onEarningsButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 64, width: 101, top: 40, height: 26 }}
                >
                    <Region
                        name="earnings"
                        tags={[ '#icon' ]}
                        params={16400}
                        layout={{ position: 'absolute', left: 25, width: 79, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEarnings ?? t('earnings.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4' }}
                        />
                    </Region>
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('pursearea_icon_earnings.png')}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 18 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 1, width: 10, top: 0, height: 11 }}
                    >
                        <ThemeImage
                            name="earnings_unseen_indicator"
                            tags={[ '#icon' ]}
                            params={16}
                            src={srcEarningsUnseenIndicator ?? layoutImage('pursearea_unseen_indicator.png')}
                            layout={{ position: 'absolute', left: 1, width: 10, top: 0, height: 11 }}
                        />
                    </Region>
                </Region>
                <Region
                    params={16}
                    backgroundColor="#444444"
                    layout={{ position: 'absolute', left: 169, width: 1, top: 11, height: 55, minHeight: 23 }}
                />
                <Region
                    tags={[ 'relative(1)' ]}
                    layout={{ position: 'absolute', left: 174, width: 63, top: 8, height: 62, flexDirection: 'column', gap: 2 }}
                >
                    <ContainerButton
                        variant="0"
                        name="help_button"
                        tooltip={t('toolbar.help')}
                        params={129}
                        tintColor="#217bb5"
                        onPointerTap={onHelpButton}
                        layout={{ width: 50, height: 19, flexShrink: 0, minWidth: 50, maxWidth: 50, justifyContent: 'center' }}
                    >
                        {t('toolbar.help')}
                        <Region
                            params={1838288}
                            layout={{ position: 'absolute', marginLeft: 10.5, marginRight: -10.5, width: 71, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('toolbar.help')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="logout_button"
                        tooltip={t('toolbar.logout')}
                        params={1}
                        tintColor="#de5347"
                        onPointerTap={onLogoutButton}
                        layout={{ width: 50, height: 19, flexShrink: 0 }}
                    >
                        x
                        <ThemeImage
                            params={16}
                            src={layoutImage('pursearea_logout_icon.png')}
                            layout={{ position: 'absolute', left: 18, width: 15, top: 0, height: 20 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="settings_button"
                        tooltip={t('widget.memenu.settings')}
                        params={1}
                        tintColor="#726b86"
                        onPointerTap={onSettingsButton}
                        layout={{ width: 50, height: 19, flexShrink: 0 }}
                    >
                        s
                        <ThemeImage
                            params={16}
                            src={layoutImage('pursearea_settings_icon.png')}
                            layout={{ position: 'absolute', left: -5, width: 61, top: 1, height: 18 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 55, height: 16 }}
                >
                    <ThemeImage
                        name="beta_sign"
                        src={srcBetaSign ?? layoutImage('common_beta_sign.png')}
                        layout={{ position: 'absolute', left: 0, width: 35, top: 55, height: 16 }}
                    />
                </Region>
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
            params={1}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDiamondCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                name="diamond_count"
                tags={[ '#icon' ]}
                params={262160}
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDiamondCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#38caeb' }}
                />
            </Region>
            <ThemeImage
                tags={[ '#icon' ]}
                params={18}
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
            params={1}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCreditCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                name="credit_count"
                tags={[ '#icon' ]}
                params={262160}
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCreditCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#d5af22' }}
                />
            </Region>
            <ThemeImage
                tags={[ '#icon' ]}
                params={18}
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
            params={1}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDucketCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="ducket_count"
                tags={[ '#icon' ]}
                params={262160}
                layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDucketCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#d787d7' }}
                />
            </Region>
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('pursearea_duckets_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};
