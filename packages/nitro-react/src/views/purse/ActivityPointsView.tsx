import { useState } from 'react';

import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, BoxLayout, Icon, Region, ThemeText } from '#base/theme';
import { configReader, getCurrencyIconStyle } from '#base/utils';

export interface ActivityPointsViewProps {
    layout?: BoxLayout;
}

/** `CurrencyIndicatorBase`: the `BGCOLOR` border's colour while the pointer is over the indicator, and after. */
const BG_COLOR_LIGHT = '#79756d';
const BG_COLOR_DARK = '#55534e';
/** The layout's own `BGCOLOR` colour, until the first hover. */
const BG_COLOR = '#686661';

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

/**
 * The seasonal currencies under the purse - `toolbar/extensions/purse/indicators/SeasonalCurrencyIndicator`
 * on the `purse_indicator_seasonal` layout (192 x 29), one per type in `seasonalcurrencyindicator.active`,
 * and none unless `seasonalcurrencyindicator.enabled` (`HabboToolbar.initSeasonalCurrencyExtension`):
 * the style 9 border the pointer lightens and darkens, the currency's name (`getActivityPointName`;
 * `il_regular_white`, bold, thickness 200, in the currency's `font` colour) at 5, 6, the amount
 * (`il_regular_white`, bold) ending at x 150 - the zero text underlined in its place - and the
 * style 6 plate (`seasonal_bg`) at 163 in the currency's `border` colour with the currency's big
 * icon (`seasonal_icon`, `getIconStyleFor(type, true)`) at 3, 3. The colours are the presets of
 * `seasonalcurrency.<id>.color`, `id` being `seasonalcurrency.id.<type>`. A click opens the
 * catalogue page `seasonalcurrencyindicator.page` (`onContainerClick`), which this hotel does not set,
 * so the catalogue opens on no page.
 *
 * The `change_overlay` animation is not ported.
 */
export const ActivityPointsView = ({ layout }: ActivityPointsViewProps) => {
    const activityPoints = useUserStore(x => x.activityPoints);
    const config = useConfigData();
    const { showWindow } = useSystemActions();
    const t = useTranslation();
    const [ bgColor, setBgColor ] = useState(BG_COLOR);

    const { configString, configBoolean } = configReader(config);
    const enabled = (config['seasonalcurrencyindicator.enabled'] === undefined) ? OFFICIAL_ENABLED : configBoolean('seasonalcurrencyindicator.enabled');
    const active = (config['seasonalcurrencyindicator.active'] === undefined) ? OFFICIAL_ACTIVE : configString('seasonalcurrencyindicator.active');
    const types = enabled ? getSeasonalCurrencyTypes(active) : [];

    const kinds = types.map((type) => {
        const nameKey = configString(`activitypoint.name.${type}`);
        const color = configString(`seasonalcurrency.${configString(`seasonalcurrency.id.${type}`)}.color`);
        const backgroundColor = configString(`seasonalcurrency.preset.${color}.border`);

        return {
            type,
            amount: activityPoints[type] ?? 0,
            name: t(nameKey, nameKey),
            // This hotel sets no `.font` presets; the official one's equal their `.border`s.
            textColor: configString(`seasonalcurrency.preset.${color}.font`) || backgroundColor,
            backgroundColor,
        };
    });

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', width: '100%', height: '100%', ...layout }}>
            {kinds.map(({ type, amount, name, textColor, backgroundColor }) => (
                <Region
                    key={type}
                    onPointerOver={() => setBgColor(BG_COLOR_LIGHT)}
                    onPointerOut={() => setBgColor(BG_COLOR_DARK)}
                    onPointerTap={() => showWindow('catalog', { pageName: configString('seasonalcurrencyindicator.page') })}
                    layout={{ position: 'relative', width: 192, height: 29, flexShrink: 0 }}
                >
                    <Border
                        variant="9"
                        tintColor={bgColor}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 192, height: 29 }}
                    />
                    <Border
                        variant="6"
                        tintColor={backgroundColor || undefined}
                        layout={{ position: 'absolute', left: 163, top: 0, width: 29, height: 29 }}
                    />
                    {/* `seasonal_icon`, 3, 3 in the plate; beside it here so the plate's tint stays off it. */}
                    <Icon
                        variant={getCurrencyIconStyle(type, config, true)}
                        layout={{ position: 'absolute', left: 166, top: 3 }}
                    />
                    <ThemeText
                        text={name}
                        textStyle="il_regular_white"
                        textOptions={textColor ? { fill: textColor } : undefined}
                        flashFormat={{ bold: true, thickness: 200 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 5, top: 6, width: 105, height: 16 }}
                    />
                    <Box layout={{ position: 'absolute', left: 0, top: 6, width: 150, height: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <ThemeText
                            text={amount !== 0 ? String(amount) : t('purse.snowflakes.zero.amount.text', 'Info')}
                            textStyle="il_regular_white"
                            flashFormat={{ bold: true, underline: amount === 0 }}
                            verticalAlign="top"
                        />
                    </Box>
                </Region>
            ))}
        </Box>
    );
};
