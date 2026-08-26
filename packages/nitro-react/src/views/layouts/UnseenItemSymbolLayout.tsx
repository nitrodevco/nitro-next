import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1299_unseen_item_symbol_xml` (layout "unseen_item_symbol", 108x14) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UnseenItemSymbolLayoutProps {
    layout?: BoxLayout;
}

export const UnseenItemSymbolLayout = ({ layout }: UnseenItemSymbolLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 108, height: 14, ...layout }}>
            <Border
                variant="0"
                params={16}
                tintColor="#52a900"
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 14 }}
            >
                <Region
                    name="text"
                    params={4194320}
                    layout={{ position: 'absolute', left: 4, width: 100, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="inventory.furni.tab.new"
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
