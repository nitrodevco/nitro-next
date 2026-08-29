import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `product_info_entry_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutProductInfoEntryTemplateItemProps {
    captionProductInfoKey?: string;
    captionProductInfoValue?: string;
    layout?: BoxLayout;
    visibleProductInfoKey?: boolean;
    visibleProductInfoValue?: boolean;
}

export const CollectibleHubLayoutProductInfoEntryTemplateItem = ({ captionProductInfoKey, captionProductInfoValue, layout, visibleProductInfoKey, visibleProductInfoValue }: CollectibleHubLayoutProductInfoEntryTemplateItemProps) => {
    return (
        <Region
            name="product_info_entry_template"
            backgroundColor="#110b14"
            layout={{ width: 242, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleProductInfoKey ?? true) && (
                <Region
                    name="product_info_key"
                    layout={{ position: 'absolute', left: 0, width: 136, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionProductInfoKey ?? 'Type'}
                        textOptions={{ fill: '#eb8f01', align: 'right' }}
                    />
                </Region>
            )}
            {(visibleProductInfoValue ?? true) && (
                <Region
                    name="product_info_value"
                    layout={{ position: 'absolute', left: 140, width: 102, top: 1, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionProductInfoValue ?? 'Floor item'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
        </Region>
    );
};
