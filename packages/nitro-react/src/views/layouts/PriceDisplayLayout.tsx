import { BoxLayout, Icon, Region } from '#base/theme';

/** Generated from `1584_price_display_xml` (layout "price_display", 60x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PriceDisplayLayoutProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayout = ({ layout }: PriceDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 21, ...layout }}>
            <Region
                name="price_box"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 21, flexDirection: 'row', gap: 1 }}
            >
                <Region
                    name="spacing"
                    params={16}
                    layout={{ width: 1, height: 1, flexShrink: 0 }}
                />
                <Region
                    name="amount_0"
                    params={16}
                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <Icon
                    variant="0"
                    name="unit_0"
                    params={3296272}
                    layout={{ width: 22, height: 22, flexShrink: 0 }}
                />
                <Region
                    name="amount_1"
                    params={16}
                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <Icon
                    variant="0"
                    name="unit_1"
                    params={3295248}
                    layout={{ width: 22, height: 22, flexShrink: 0 }}
                />
                <Region
                    name="spacing"
                    params={16}
                    layout={{ width: 2, height: 1, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
