import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `normal_topitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightInner?: ReactNode;
    layout?: BoxLayout;
    onNormalTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
    visibleIcon?: boolean;
    visibleItemHilightInner?: boolean;
    visibleItemHilightOuter?: boolean;
    visibleItemTitle?: boolean;
}

export const CatalogUbuntuLayoutNormalTopitemTemplateItem = ({ captionItemTitle, itemHilightInner, layout, onNormalTopitemTemplate, srcIcon, visibleDropButton, visibleIcon, visibleItemHilightInner, visibleItemHilightOuter, visibleItemTitle }: CatalogUbuntuLayoutNormalTopitemTemplateItemProps) => {
    return (
        <Region
            name="normal_topitem_template"
            onPointerTap={onNormalTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                {(visibleItemHilightOuter ?? true) && (
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
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
            )}
            {(visibleItemTitle ?? true) && (
                <Region
                    name="item_title"
                    layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? 'item'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            )}
            {(visibleDropButton ?? false) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#999999"
                    layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
                />
            )}
        </Region>
    );
};
