import { useState } from 'react';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useEarningsStore } from '#base/context/earnings';
import { useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, ContainerButton, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { ToolbarSettingsView } from '../toolbar/ToolbarSettingsView';

/**
 * The purse in the top right corner - `toolbar/extensions/PurseAreaExtension` on the `grid_purse`
 * layout (`purse.xml`, 230 x 77): the style 9 border, the `purse_itemlist` of currency counts
 * (diamonds, credits, duckets: the amount in `u_bold`, etched at the bottom, ending where the
 * 15 x 15 icon starts), the club and earnings buttons on their style 2 plates, the 1 px divider and
 * the help, logout and settings `container_button`s, 50 x 19 and 2 apart. The settings button drops
 * the settings list under it (`settings_button` -> `HabboToolbar.toggleSettingVisibility`).
 *
 * `ExtensionView.refreshItemWindow` lifts the whole extension grid 8 pixels (to y -5) while the
 * purse is in it, and the grid's `spacing` is 2 - so the purse takes its 77 pixels 5 higher and
 * leaves 2 under it. The grid's own x (`desktop.width - 192 - 3`, the purse 38 left of that) is
 * `MainView`'s column. The currency counts, club and earnings regions draw their hover
 * (`brightness_and_shadow_under`) and tooltips; what a click on them opens is not ported, nor is
 * `diamonds.enabled` hiding the diamond row - except the earnings button, which opens the vault
 * (`HabboCatalog.openVault`: `habboUI/open/vault`) and carries the vault's "unseen" dot
 * (`earnings_unseen_indicator`, shown while `EarningsController.showingIndicator`).
 */
export const PurseView = () => {
    const credits = useUserStore(x => x.credits);
    const activityPoints = useUserStore(x => x.activityPoints);
    const earningsIndicatorVisible = useEarningsStore(x => x.showingIndicator);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { showWindow } = useWindowActions();
    const [ settingsVisible, setSettingsVisible ] = useState(false);

    // `purse_itemlist`'s three rows, in the layout's order.
    const kinds = [
        {
            name: 'diamond_count_button',
            amount: activityPoints[5] ?? 0,
            color: '#38caeb',
            icon: 'shared/pursearea_diamond_icon.png',
            tooltip: t('achievements.activitypoint.5'),
            height: 19,
        },
        {
            name: 'credit_count_button',
            amount: credits ?? 0,
            color: '#d5af22',
            icon: 'shared/pursearea_credits_icon.png',
            tooltip: t('purse_coins'),
            height: 19,
        },
        {
            name: 'ducket_count_button',
            amount: activityPoints[0] ?? 0,
            color: '#d787d7',
            icon: 'shared/pursearea_duckets_icon.png',
            tooltip: t('achievements.activitypoint.0'),
            height: 17,
        },
    ];

    return (
        <>
            <Region layout={{ position: 'relative', width: 230, height: 77, marginTop: -5, marginBottom: 2, flexShrink: 0 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 230, height: 76 }}
                />
                <Box layout={{ position: 'absolute', left: 7, top: 9, width: 52, maxHeight: 62, flexDirection: 'column' }}>
                    {kinds.map(({ name, amount, color, icon, tooltip, height }) => (
                        <Region
                            key={name}
                            name={name}
                            tooltip={tooltip}
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ width: 52, height, flexShrink: 0, overflow: name === 'ducket_count_button' ? undefined : 'hidden' }}
                        >
                            {/* The count's box is 25..35 at `caption="0"` and keeps its right edge as it grows. */}
                            <Box layout={{ position: 'absolute', left: 0, top: 2, width: 35, height: 17, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <ThemeText
                                    text={String(amount)}
                                    textStyle="u_bold"
                                    textOptions={{ fill: color }}
                                    flashFormat={{ etchingColor: 0x45000000, etchingPosition: 'bottom' }}
                                    dynamicRole="icon"
                                    verticalAlign="top"
                                />
                            </Box>
                            <ThemeImage
                                src={LayoutImage(icon)}
                                bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000 }}
                                dynamicRole="icon"
                                layout={{ position: 'absolute', left: 36, top: 2, width: 15, height: 15 }}
                            />
                        </Region>
                    ))}
                </Box>
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, top: 7, width: 101, height: 28 }}
                />
                <Region
                    name="hc_join_button"
                    tooltip={t('catalog.club.hc')}
                    dynamicStyle="brightness_and_shadow_under"
                    layout={{ position: 'absolute', left: 64, top: 8, width: 101, height: 26, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={t('purse.clubdays.zero.amount.text')}
                        textStyle="u_bold"
                        textOptions={{ fill: '#00c1c4', wordWrap: true, wordWrapWidth: 46 }}
                        dynamicRole="icon"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 25, top: 4, maxWidth: 50, height: 28 }}
                    />
                    <ThemeImage
                        src={LayoutImage('toolbar/pursearea_hc_icon.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                        dynamicRole="icon"
                        layout={{ position: 'absolute', left: 5, top: 4, width: 20, height: 18 }}
                    />
                </Region>
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 64, top: 39, width: 101, height: 28 }}
                />
                <Region
                    name="earnings_button"
                    tooltip={t('earnings.title')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={() => openClientLink(send, 'habboUI/open/vault')}
                    layout={{ position: 'absolute', left: 64, top: 40, width: 101, height: 26, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={t('earnings.title')}
                        textStyle="u_bold"
                        textOptions={{ fill: '#00c1c4' }}
                        dynamicRole="icon"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 25, top: 4, height: 17 }}
                    />
                    <ThemeImage
                        src={LayoutImage('toolbar/pursearea_icon_earnings.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                        dynamicRole="icon"
                        layout={{ position: 'absolute', left: 5, top: 4, width: 20, height: 18 }}
                    />
                    {/* `PurseAreaExtension.refreshIndicators`: `earnings_unseen_indicator.visible = getEarnings().showingIndicator`. */}
                    {earningsIndicatorVisible && (
                        <ThemeImage
                            name="earnings_unseen_indicator"
                            src={LayoutImage('toolbar/pursearea_unseen_indicator.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                            dynamicRole="icon"
                            layout={{ position: 'absolute', left: 1, top: 0 }}
                        />
                    )}
                </Region>
                <Region
                    backgroundColor="#444444"
                    layout={{ position: 'absolute', left: 169, top: 11, width: 1, height: 55 }}
                />
                <Box layout={{ position: 'absolute', left: 174, top: 8, width: 63, height: 62, flexDirection: 'column', gap: 2 }}>
                    <ContainerButton
                        variant="0"
                        tooltip={t('toolbar.help')}
                        tintColor="#217bb5"
                        layout={{ width: 50, height: 19, flexShrink: 0, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('toolbar.help')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        tooltip={t('toolbar.logout')}
                        tintColor="#de5347"
                        layout={{ width: 50, height: 19, flexShrink: 0, overflow: 'hidden' }}
                    >
                        <ThemeImage
                            src={LayoutImage('toolbar/pursearea_logout_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 18, top: 0, width: 15, height: 20 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        tooltip={t('widget.memenu.settings')}
                        tintColor="#726b86"
                        onPointerTap={() => setSettingsVisible(visible => !visible)}
                        layout={{ width: 50, height: 19, flexShrink: 0, overflow: 'hidden' }}
                    >
                        <ThemeImage
                            src={LayoutImage('shared/pursearea_settings_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: -5, top: 1, width: 61, height: 18 }}
                        />
                    </ContainerButton>
                </Box>
            </Region>
            {settingsVisible && (
                <ToolbarSettingsView entries={[
                    {
                        key: 'other',
                        label: t('widget.memenu.settings.other', 'Other settings'),
                        onSelect: () => {
                            showWindow('toolbar_other_settings');
                            setSettingsVisible(false);
                        },
                    },
                ]}
                />
            )}
        </>
    );
};
