import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `builders_club_subitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightInner?: ReactNode;
    layout?: BoxLayout;
    onBuildersClubSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
    visibleIcon?: boolean;
    visibleItemHilightInner?: boolean;
    visibleItemHilightOuter?: boolean;
    visibleItemTitle?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem = ({ captionItemTitle, itemHilightInner, layout, onBuildersClubSubitemTemplate, srcIcon, visibleDropButton, visibleIcon, visibleItemHilightInner, visibleItemHilightOuter, visibleItemTitle }: CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_subitem_template"
            onPointerTap={onBuildersClubSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                {(visibleItemHilightOuter ?? true) && (
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#ffb53c"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19 }}
                    >
                        {(visibleItemHilightInner ?? true) && (
                            <Region
                                name="item_hilight_inner"
                                backgroundColor="#ff8d00"
                                layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15 }}
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
                    src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                    layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
                />
            )}
            {(visibleItemTitle ?? true) && (
                <Region
                    name="item_title"
                    layout={{ position: 'absolute', left: 42, right: 82, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? 'sub-item'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#b77734' }}
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
