import { useState } from 'react';

import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Box, BoxLayout, TemplateWindow } from '#base/theme';
import { configReader, getCurrencyIconStyle } from '#base/utils';

export interface ActivityPointsViewProps {
    layout?: BoxLayout;
}

/** `SeasonalCurrencyIndicator.BG_COLOR_LIGHT` / `BG_COLOR_DARK`: the `BGCOLOR` border while the pointer is over it, and after. */
const BG_COLOR_LIGHT = 0xff79756d;
const BG_COLOR_DARK = 0xff55534e;

/**
 * The official hotel's `seasonalcurrencyindicator.enabled` and `.active` (its external variables,
 * September 2026), read while this hotel leaves them unset - it sets the rest of the seasonal
 * currency variables (`seasonalcurrencyindicator.currency` is 101 there too). One it does set wins.
 */
const OFFICIAL_ENABLED = true;
const OFFICIAL_ACTIVE = '101';

/**
 * `HabboToolbar.getSeasonalCurrencyTypes`: the activity point types in `seasonalcurrencyindicator.active`,
 * comma separated, trimmed, the numbers only, each once.
 */
const getSeasonalCurrencyTypes = (active: string): number[] => {
    const types: number[] = [];

    for (const part of active.split(',')) {
        const text = part.replace(/^\s+|\s+$/g, '');

        if (text === '') continue;

        const value = Number(text);

        if (isNaN(value)) continue;

        const type = Math.trunc(value);

        if (types.indexOf(type) === -1) types.push(type);
    }

    return types;
};

/** `#rrggbb` (or bare hex) as `0xFFRRGGBB`, the alpha a border's tint needs; 0 for none (`ColorConverter.hexToUint`). */
const hexColor = (hex: string): number => {
    const value = parseInt(hex.replace(/^#/, ''), 16);

    return Number.isNaN(value) ? 0 : ((0xff000000 | value) >>> 0);
};

/**
 * The seasonal currencies under the purse - `toolbar/extensions/purse/indicators/SeasonalCurrencyIndicator`
 * over `habbo-toolbar-com/purse_indicator_seasonal_xml`, one per type in
 * `seasonalcurrencyindicator.active`, and none unless `seasonalcurrencyindicator.enabled`
 * (`HabboToolbar.initSeasonalCurrencyExtension`).
 *
 * `initializeCurrencyLayouts`: `seasonal_icon` the currency's big icon (`getIconStyleFor(type, true)`),
 * `seasonal_name` its name (`getActivityPointName`) in its `font` colour, and `seasonal_bg` its
 * `border` colour - the presets of `seasonalcurrency.<id>.color`, `id` being
 * `seasonalcurrency.id.<type>`. `setAmount`: the balance in `amount`, or the zero text underlined.
 * The pointer over it lightens the `BGCOLOR` border and leaving darkens it (`CurrencyIndicatorBase`);
 * a click opens the catalogue page `seasonalcurrencyindicator.page` (`onContainerClick`), which this
 * hotel does not set, so the catalogue opens on no page.
 *
 * The `change_overlay` animation (`animateChange`) is not ported.
 */
export const ActivityPointsView = ({ layout }: ActivityPointsViewProps) => {
    const activityPoints = useUserStore(x => x.activityPoints);
    const config = useConfigData();
    const { showWindow } = useSystemActions();
    const t = useTranslation();
    const [ bgColor, setBgColor ] = useState<number | undefined>(undefined);

    const { configString, configBoolean } = configReader(config);
    const enabled = (config['seasonalcurrencyindicator.enabled'] === undefined) ? OFFICIAL_ENABLED : configBoolean('seasonalcurrencyindicator.enabled');
    const active = (config['seasonalcurrencyindicator.active'] === undefined) ? OFFICIAL_ACTIVE : configString('seasonalcurrencyindicator.active');
    const types = enabled ? getSeasonalCurrencyTypes(active) : [];

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', width: '100%', height: '100%', ...layout }}>
            {types.map((type) => {
                const nameKey = configString(`activitypoint.name.${type}`);
                const color = configString(`seasonalcurrency.${configString(`seasonalcurrency.id.${type}`)}.color`);
                const border = configString(`seasonalcurrency.preset.${color}.border`);
                // This hotel sets no `.font` presets; the official one's equal their `.border`s.
                const font = configString(`seasonalcurrency.preset.${color}.font`) || border;
                const amount = activityPoints[type] ?? 0;

                return (
                    <Box
                        key={type}
                        layout={{ flexShrink: 0 }}
                    >
                        <TemplateWindow
                            id="habbo-toolbar-com/purse_indicator_seasonal_xml"
                            bindings={{
                                '': {
                                    onPointerOver: () => setBgColor(BG_COLOR_LIGHT),
                                    onPointerOut: () => setBgColor(BG_COLOR_DARK),
                                    onPointerTap: () => showWindow('catalog', { pageName: configString('seasonalcurrencyindicator.page') }),
                                },
                                ...(bgColor !== undefined ? { '#BGCOLOR': { color: bgColor } } : {}),
                                seasonal_icon: { style: String(getCurrencyIconStyle(type, config, true)) },
                                seasonal_name: { caption: t(nameKey, nameKey), ...(font ? { color: hexColor(font) & 0xffffff } : {}) },
                                seasonal_bg: border ? { color: hexColor(border) } : {},
                                amount: { caption: (amount !== 0) ? String(amount) : t('purse.snowflakes.zero.amount.text', 'Info'), underline: amount === 0 },
                            }}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};
