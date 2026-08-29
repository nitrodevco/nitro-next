import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem4Props {
    captionItemTitle?: string;
    itemHilightInner?: ReactNode;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    visibleItemHilightInner?: boolean;
    visibleItemHilightOuter?: boolean;
    visibleItemTitle?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem4 = ({ captionItemTitle, itemHilightInner, layout, onItemTemplate, visibleItemHilightInner, visibleItemHilightOuter, visibleItemTitle }: CollectibleHubLayoutItemTemplateItem4Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                {(visibleItemHilightOuter ?? false) && (
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#82d1ed"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                    >
                        {(visibleItemHilightInner ?? true) && (
                            <Region
                                name="item_hilight_inner"
                                backgroundColor="#63c5e9"
                                layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                            >
                                {itemHilightInner}
                            </Region>
                        )}
                    </Region>
                )}
            </Region>
            {(visibleItemTitle ?? true) && (
                <Region
                    name="item_title"
                    layout={{ position: 'absolute', left: 7, right: 146, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? 'item'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            )}
        </Region>
    );
};
