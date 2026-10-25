/**
 * The window manager's `countdown` widget - `com.sulake.habbo.window.widgets.CountdownWidget`,
 * drawn from its `clock_base` layout: `digits` counters (27x37: the clock face bitmap, a 13px
 * bold white value and a 9px unit under it) with a 9px wide `:` between each two.
 *
 * `updateTime` shows the largest unit the remaining time reaches (`getMaxUnitIndex`), limited so
 * that `digits` units still fit before seconds, and each counter the value of the unit after the
 * previous one (`seconds / UNIT_SECONDS[i] % UNIT_MAX_VALUES[i]`), zero-padded to two digits.
 * The caller supplies the remaining seconds, running or not; Flash counts them down itself from
 * `getTimer()`, which a render cannot read.
 *
 * `colorStyle` is left at its default, as every layout of the client leaves it: the unit keeps
 * `clock_base`'s own format. The unit and the separator are `COLORABLE`, so a landing view
 * widget's `CommonWidgetSettings` reach them - `colorableFormat`.
 */
import { Box, BoxLayout, FlashTextFieldOverrides, LayoutImage, ThemeImage, ThemeText } from '@nitrodevco/nitro-theme';

import { useTranslation } from '#base/context/system';
import { clamp } from '#base/utils';
import { twoDigits } from '#base/utils/twoDigits';

const UNIT_NAMES = [ 'weeks', 'days', 'hours', 'minutes', 'seconds' ] as const;
const UNIT_SECONDS = [ 604800, 86400, 3600, 60, 1 ] as const;
const UNIT_MAX_VALUES = [ 100, 7, 24, 60, 60 ] as const;

const COUNTER_WIDTH = 27;
const SEPARATOR_WIDTH = 9;

/** `getMaxUnitIndex`: the first unit the time reaches, among those that leave `digits` units to show. */
const getMaxUnitIndex = (digits: number, seconds: number) => {
    let index = 0;

    for (; index < (UNIT_SECONDS.length - digits); index++) {
        if (seconds >= UNIT_SECONDS[index]) return index;
    }

    return index;
};

/** A `COLORABLE` text's colours, as `WidgetContainerLayout.applyCommonWidgetSettings` sets them. */
export interface ColorableTextFormat {
    fill?: string;
    flashFormat?: FlashTextFieldOverrides;
}

export interface CountdownWidgetProps {
    seconds: number;
    /** `countdown:digits`: 2 to 4 counters, 3 by default. */
    digits?: number;
    colorableFormat?: ColorableTextFormat;
    layout?: BoxLayout;
    visible?: boolean;
}

export const CountdownWidget = ({ seconds, digits = 3, colorableFormat, layout, visible }: CountdownWidgetProps) => {
    const t = useTranslation();
    const count = clamp(digits, 2, 4);
    const time = Math.max(0, Math.floor(seconds));
    const first = getMaxUnitIndex(count, time);

    return (
        <Box
            visible={visible}
            layout={{ flexDirection: 'row', width: (count * COUNTER_WIDTH) + ((count - 1) * SEPARATOR_WIDTH), height: 37, ...layout }}
        >
            {Array.from({ length: count }, (_, index) => {
                const unit = first + index;
                const value = Math.floor(time / UNIT_SECONDS[unit]) % UNIT_MAX_VALUES[unit];

                return [
                    (index > 0) && (
                        <ThemeText
                            key={`separator-${index}`}
                            text=":"
                            textStyle="il_regular"
                            textOptions={{ fontSize: 15, ...(colorableFormat?.fill ? { fill: colorableFormat.fill } : {}) }}
                            flashFormat={{ bold: true, ...colorableFormat?.flashFormat }}
                            layout={{ width: SEPARATOR_WIDTH, height: 20 }}
                        />
                    ),
                    <Box
                        key={`counter-${index}`}
                        layout={{ width: COUNTER_WIDTH, height: 37 }}
                    >
                        <ThemeImage
                            src={LayoutImage('habbo-window-manager-com/illumina_light_clock_background.png')}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        <ThemeText
                            text={twoDigits(value)}
                            textStyle="il_regular"
                            textOptions={{ fontSize: 13, fill: '#ffffff', align: 'center' }}
                            flashFormat={{ bold: true }}
                            layout={{ position: 'absolute', left: 0, top: 2, width: COUNTER_WIDTH, height: 18 }}
                        />
                        <ThemeText
                            text={t(`countdown_clock_unit_${UNIT_NAMES[unit]}`)}
                            textStyle="il_regular"
                            textOptions={{ fontSize: 9, align: 'center', ...(colorableFormat?.fill ? { fill: colorableFormat.fill } : {}) }}
                            flashFormat={colorableFormat?.flashFormat}
                            layout={{ position: 'absolute', left: 0, top: 23, width: COUNTER_WIDTH, height: 14 }}
                        />
                    </Box>,
                ];
            })}
        </Box>
    );
};
