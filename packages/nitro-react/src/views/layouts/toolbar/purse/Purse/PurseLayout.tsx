import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { PurseLayoutPurseItemlist, PurseLayoutPurseItemlistProps } from './PurseLayoutPurseItemlist';

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
            <Region layout={{ position: 'absolute', left: -38, width: 230, top: 0, bottom: 0 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 76 }}
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
                        <ThemeText
                            text={captionJoin ?? 'join'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00c1c4' }}
                            name="join"
                            layout={{ position: 'absolute', width: 25, top: 4, height: 17 }}
                        />
                    )}
                    <ThemeText
                        text={captionDays ?? '23 d.'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#00c1c4', wordWrap: true, wordWrapWidth: 50 }}
                        name="days"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 25, width: 50, top: 4, height: 28, maxWidth: 50, minHeight: 28, maxHeight: 28 }}
                    />
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
                    <ThemeText
                        text={captionEarnings ?? t('earnings.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#00c1c4' }}
                        name="earnings"
                        layout={{ position: 'absolute', left: 25, width: 79, top: 4, height: 17 }}
                    />
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
