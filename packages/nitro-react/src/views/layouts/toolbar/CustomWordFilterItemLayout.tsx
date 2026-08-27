import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1228_custom_word_filter_item_xml` (layout "custom_word_filter_item", 222x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CustomWordFilterItemLayoutProps {
    captionText?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const CustomWordFilterItemLayout = ({ captionText, layout, onBgRegion }: CustomWordFilterItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 222, height: 18, ...layout }}>
            <Region
                name="word_filter_list_item"
                params={144}
                backgroundColor="#ff00ff"
                layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 18 }}
            >
                <Region
                    name="bg_region"
                    params={145}
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 18 }}
                />
                <Region
                    name="text"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionText ?? 'BadWord'} />
                </Region>
            </Region>
        </Region>
    );
};
