import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, BoxLayout, Region, ThemeText } from '#base/theme';

export interface ActivityPointsViewProps {
    layout?: BoxLayout;
}

/** `CurrencyIndicatorBase`: the `BGCOLOR` border's colour while the pointer is over the indicator, and after. */
const BG_COLOR_LIGHT = '#79756d';
const BG_COLOR_DARK = '#55534e';
/** The layout's own `BGCOLOR` colour, until the first hover. */
const BG_COLOR = '#686661';

/**
 * The seasonal currency under the purse - `toolbar/extensions/purse/indicators/SeasonalCurrencyIndicator`
 * on the `purse_indicator_seasonal` layout (192 x 29): the style 9 border the pointer lightens and
 * darkens, the currency's name (`il_regular_white`, bold, thickness 200, in the currency's colour)
 * at 5, 6, the amount (`il_regular_white`, bold) ending at x 150 - the zero text underlined in its
 * place - and the style 6 plate at 163 in the currency's colour.
 *
 * The port shows one currency, activity point type 1, with its name and colour fixed here: Flash
 * reads both from `seasonalcurrency.*` external variables this hotel does not set, and the
 * `seasonal_icon` style from `getIconStyleFor`, which has no port - so the plate is drawn empty.
 * The `change_overlay` animation and the click that opens `seasonalcurrencyindicator.page` are not
 * ported.
 */
export const ActivityPointsView = ({ layout }: ActivityPointsViewProps) => {
    const activityPoints = useUserStore(x => x.activityPoints);
    const t = useTranslation();
    const [ bgColor, setBgColor ] = useState(BG_COLOR);

    const kinds = [
        {
            amount: activityPoints[1] ?? 0,
            color: '#feee65',
            name: 'Stars',
        },
    ];

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', width: '100%', height: '100%', ...layout }}>
            {kinds.map(({ amount, color, name }) => (
                <Region
                    key={name}
                    onPointerOver={() => setBgColor(BG_COLOR_LIGHT)}
                    onPointerOut={() => setBgColor(BG_COLOR_DARK)}
                    layout={{ position: 'relative', width: 192, height: 29, flexShrink: 0 }}
                >
                    <Border
                        variant="9"
                        tintColor={bgColor}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 192, height: 29 }}
                    />
                    <Border
                        variant="6"
                        tintColor={color}
                        layout={{ position: 'absolute', left: 163, top: 0, width: 29, height: 29 }}
                    />
                    <ThemeText
                        text={name}
                        textStyle="il_regular_white"
                        textOptions={{ fill: color }}
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
