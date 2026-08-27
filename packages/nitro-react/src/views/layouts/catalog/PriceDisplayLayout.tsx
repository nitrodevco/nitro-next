import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1584_price_display_xml` (layout "price_display", 60x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PriceDisplayLayoutProps {
    itemsPriceBox?: ReactNode;
    layout?: BoxLayout;
}

export const PriceDisplayLayout = ({ itemsPriceBox, layout }: PriceDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 21, ...layout }}>
            <Region
                name="price_box"
                params={147472}
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', gap: 1 }}
            >
                {itemsPriceBox ?? (
                    <>
                        <PriceDisplayLayoutSpacingItem />
                        <PriceDisplayLayoutAmount0Item />
                        <PriceDisplayLayoutUnit0Item />
                        <PriceDisplayLayoutAmount1Item />
                        <PriceDisplayLayoutUnit1Item />
                        <PriceDisplayLayoutSpacingItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `spacing` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutSpacingItem = ({ layout }: PriceDisplayLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 1, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `amount_0` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutAmount0ItemProps {
    captionAmount0?: string;
    layout?: BoxLayout;
}

export const PriceDisplayLayoutAmount0Item = ({ captionAmount0, layout }: PriceDisplayLayoutAmount0ItemProps) => {
    return (
        <Region
            name="amount_0"
            params={16}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAmount0 ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `unit_0` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutUnit0ItemProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutUnit0Item = ({ layout }: PriceDisplayLayoutUnit0ItemProps) => {
    return (
        <Icon
            variant="0"
            name="unit_0"
            params={3296272}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `amount_1` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutAmount1ItemProps {
    captionAmount1?: string;
    layout?: BoxLayout;
}

export const PriceDisplayLayoutAmount1Item = ({ captionAmount1, layout }: PriceDisplayLayoutAmount1ItemProps) => {
    return (
        <Region
            name="amount_1"
            params={16}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAmount1 ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `unit_1` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutUnit1ItemProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutUnit1Item = ({ layout }: PriceDisplayLayoutUnit1ItemProps) => {
    return (
        <Icon
            variant="0"
            name="unit_1"
            params={3295248}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutSpacingItem2Props {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutSpacingItem2 = ({ layout }: PriceDisplayLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 2, height: 1, flexShrink: 0, ...layout }}
        />
    );
};
