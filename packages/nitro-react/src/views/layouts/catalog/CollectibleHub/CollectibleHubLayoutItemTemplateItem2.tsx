import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem2Props {
    captionItemTitle?: string;
    captionProgressText?: string;
    itemHilightInner?: ReactNode;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    progressColorHint?: ReactNode;
    visibleItemHilightInner?: boolean;
    visibleItemHilightOuter?: boolean;
    visibleItemTitle?: boolean;
    visibleProgressColor?: boolean;
    visibleProgressColorHint?: boolean;
    visibleProgressContainer?: boolean;
    visibleProgressText?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem2 = ({ captionItemTitle, captionProgressText, itemHilightInner, layout, onItemTemplate, progressColorHint, visibleItemHilightInner, visibleItemHilightOuter, visibleItemTitle, visibleProgressColor, visibleProgressColorHint, visibleProgressContainer, visibleProgressText }: CollectibleHubLayoutItemTemplateItem2Props) => {
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
                {(visibleItemHilightOuter ?? true) && (
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#82d1ed"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                    >
                        {(visibleItemHilightInner ?? true) && (
                            <Region
                                name="item_hilight_inner"
                                backgroundColor="#63c5e9"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 16 }}
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
            {(visibleProgressContainer ?? true) && (
                <Region
                    name="progress_container"
                    layout={{ position: 'absolute', left: 120, width: 36, top: 3, height: 15, minWidth: 36, maxWidth: 36 }}
                >
                    {(visibleProgressColor ?? true) && (
                        <Border
                            variant="3"
                            name="progress_color"
                            tintColor="#00910a"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 14 }}
                        />
                    )}
                    {(visibleProgressText ?? true) && (
                        <Region
                            name="progress_text"
                            layout={{ position: 'absolute', left: 2, width: 32, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionProgressText ?? '100%'}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    )}
                </Region>
            )}
            {(visibleProgressColorHint ?? true) && (
                <Region
                    name="progress_color_hint"
                    backgroundColor="#00910a"
                    layout={{ position: 'absolute', left: 0, width: 4, top: 1, height: 19, minWidth: 4, maxWidth: 4, minHeight: 19, maxHeight: 19 }}
                >
                    {progressColorHint}
                </Region>
            )}
        </Region>
    );
};
