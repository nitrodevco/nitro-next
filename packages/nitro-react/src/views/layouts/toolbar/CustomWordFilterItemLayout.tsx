import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1228_custom_word_filter_item_xml` (layout "custom_word_filter_item", 222x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CustomWordFilterItemLayoutProps {
    layout?: BoxLayout;
    wordFilterListItem?: CustomWordFilterItemLayoutWordFilterListItemProps;
}

export const CustomWordFilterItemLayout = ({ layout, wordFilterListItem }: CustomWordFilterItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 222, height: 18, ...layout }}>
            <CustomWordFilterItemLayoutWordFilterListItem {...wordFilterListItem} />
        </Region>
    );
};

/** Named region `bg_region` of CustomWordFilterItemLayout - configured through the parent's `bgRegion` prop. */
export interface CustomWordFilterItemLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const CustomWordFilterItemLayoutBgRegion = ({ layout, onBgRegion }: CustomWordFilterItemLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            params={145}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18, ...layout }}
        />
    );
};

/** Named region `word_filter_list_item` of CustomWordFilterItemLayout - configured through the parent's `wordFilterListItem` prop. */
export interface CustomWordFilterItemLayoutWordFilterListItemProps {
    bgRegion?: CustomWordFilterItemLayoutBgRegionProps;
    captionText?: string;
    layout?: BoxLayout;
}

export const CustomWordFilterItemLayoutWordFilterListItem = ({ bgRegion, captionText, layout }: CustomWordFilterItemLayoutWordFilterListItemProps) => {
    return (
        <Region
            name="word_filter_list_item"
            params={144}
            backgroundColor="#ff00ff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18, ...layout }}
        >
            <CustomWordFilterItemLayoutBgRegion {...bgRegion} />
            <Region
                name="text"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionText ?? 'BadWord'} />
            </Region>
        </Region>
    );
};
