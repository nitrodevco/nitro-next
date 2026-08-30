import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `builders_club_topitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightInner?: ReactNode;
    layout?: BoxLayout;
    onBuildersClubTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
    visibleIcon?: boolean;
    visibleItemHilightInner?: boolean;
    visibleItemHilightOuter?: boolean;
    visibleItemTitle?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem = ({ captionItemTitle, itemHilightInner, layout, onBuildersClubTopitemTemplate, srcIcon, visibleDropButton, visibleIcon, visibleItemHilightInner, visibleItemHilightOuter, visibleItemTitle }: CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_topitem_template"
            onPointerTap={onBuildersClubTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, bottom: 0 }}
            >
                {(visibleItemHilightOuter ?? true) && (
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#ffb53c"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                    >
                        {(visibleItemHilightInner ?? true) && (
                            <Region
                                name="item_hilight_inner"
                                backgroundColor="#ff8d00"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 16 }}
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
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                    name="item_title"
                    layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17 }}
                />
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
