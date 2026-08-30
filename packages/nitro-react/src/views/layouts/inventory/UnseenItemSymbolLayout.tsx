import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1299_unseen_item_symbol_xml` (layout "unseen_item_symbol", 108x14) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UnseenItemSymbolLayoutProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const UnseenItemSymbolLayout = ({ captionText, layout }: UnseenItemSymbolLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 108, height: 14, ...layout }}>
            <Border
                variant="0"
                tintColor="#52a900"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionText ?? 'inventory.furni.tab.new'}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                    name="text"
                    layout={{ position: 'absolute', left: 4, top: 0, bottom: 0 }}
                />
            </Border>
        </Region>
    );
};
