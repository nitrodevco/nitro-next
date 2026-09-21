import { useState } from 'react';

import { useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, Button, LayoutImage, NitroCurrencyIcon, ThemeImage, ThemeText } from '#base/theme';

import { ToolbarSettingsView } from '../toolbar/ToolbarSettingsView';

/**
 * The purse in the top right corner - currencies, club and earnings, and the help, disconnect and
 * settings buttons. The settings button drops the settings list under it
 * (`PurseAreaExtension` `settings_button` -> `HabboToolbar.toggleSettingVisibility`).
 *
 * The four button faces are the `grid_purse` layout's own `<static_bitmap>` assets -
 * `pursearea_hc_icon`, `pursearea_icon_earnings`, `pursearea_logout_icon` and
 * `pursearea_settings_icon`. The purse has no `<icon>` element at all, so none of them is an
 * icon-set style.
 */
export const PurseView = () => {
    const credits = useUserStore(x => x.credits);
    const activityPoints = useUserStore(x => x.activityPoints);
    const t = useTranslation();
    const { showWindow } = useWindowActions();
    const [ settingsVisible, setSettingsVisible ] = useState(false);

    const kinds = [
        {
            type: '5',
            amount: activityPoints[5] ?? 0,
            color: '#38caeb',
            name: 'Diamonds',
            icon: 'diamonds',
        },
        {
            type: '-1',
            amount: credits ?? 0,
            color: '#d5af22',
            name: 'Credits',
            icon: 'credits',
        },
        {
            type: '0',
            amount: activityPoints[0] ?? 0,
            color: '#d787d7',
            name: 'Duckets',
            icon: 'duckets',
        },
    ];

    return (
        <>
            <Border
                variant="9"
                layout={{ top: -6, width: '100%', height: 77, flexDirection: 'row', padding: 6, gap: 6 }}
            >
                <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 52 }}>
                    {kinds.map(({ type, amount, color, name }) => (
                        <Box
                            key={name}
                            layout={{ height: 19, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}
                        >
                            <ThemeText
                                text={String(amount)}
                                textStyle="u_bold"
                                textOptions={{ fill: color }}
                            />
                            <NitroCurrencyIcon
                                type={type}
                                small
                            />
                        </Box>
                    ))}
                </Box>
                <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 101, gap: 4 }}>
                    <Border
                        variant="1"
                        tintColor="#FFE1CC"
                        layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}
                    >
                        <ThemeImage src={LayoutImage('toolbar/pursearea_hc_icon.png')} />
                        <ThemeText
                            text={t('purse.clubdays.zero.amount.text')}
                            textStyle="u_bold"
                            textOptions={{ fill: '#00C1C4' }}
                        />
                    </Border>
                    <Border
                        variant="1"
                        tintColor="#FFE1CC"
                        layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}
                    >
                        <ThemeImage src={LayoutImage('toolbar/pursearea_icon_earnings.png')} />
                        <ThemeText
                            text={t('earnings.title')}
                            textStyle="u_bold"
                            textOptions={{ fill: '#00C1C4' }}
                        />
                    </Border>
                </Box>
                <Box layout={{ flexDirection: 'column', justifyContent: 'center', gap: 2, width: 63 }}>
                    <Button
                        variant="0"
                        tintColor="#217bb5"
                        textColor="#ffffff"
                        layout={{ width: '100%', height: 19 }}
                    >
                        {t('toolbar.help')}
                    </Button>
                    <Button
                        variant="0"
                        tintColor="#de5347"
                        layout={{ width: '100%', height: 19 }}
                    >
                        <ThemeImage src={LayoutImage('toolbar/pursearea_logout_icon.png')} />
                    </Button>
                    <Button
                        variant="0"
                        tintColor="#726b86"
                        onPointerTap={() => setSettingsVisible(visible => !visible)}
                        layout={{ width: '100%', height: 19 }}
                    >
                        <ThemeImage src={LayoutImage('shared/pursearea_settings_icon.png')} />
                    </Button>
                </Box>
            </Border>
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
