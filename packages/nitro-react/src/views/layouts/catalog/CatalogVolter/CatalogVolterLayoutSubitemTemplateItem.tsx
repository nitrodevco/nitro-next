import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `subitem_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutSubitemTemplateItemProps {
    background?: ReactNode;
    captionItemTitle?: string;
    layout?: BoxLayout;
    onSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleBackground?: boolean;
    visibleIcon?: boolean;
    visibleItemTitle?: boolean;
}

export const CatalogVolterLayoutSubitemTemplateItem = ({ background, captionItemTitle, layout, onSubitemTemplate, srcIcon, visibleBackground, visibleIcon, visibleItemTitle }: CatalogVolterLayoutSubitemTemplateItemProps) => {
    return (
        <Region
            name="subitem_template"
            backgroundColor="#000000"
            onPointerTap={onSubitemTemplate}
            cursor="pointer"
            layout={{ width: 158, height: 21, flexShrink: 0, ...layout }}
        >
            {(visibleBackground ?? true) && (
                <Region
                    name="background"
                    backgroundColor="#d2f0f3"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    {background}
                </Region>
            )}
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                    layout={{ position: 'absolute', left: 5, width: 20, top: 0, height: 20 }}
                />
            )}
            {(visibleItemTitle ?? true) && (
                <ThemeText
                    text={captionItemTitle ?? ''}
                    name="item_title"
                    layout={{ position: 'absolute', left: 32, right: 122, top: 4, height: 4 }}
                />
            )}
        </Region>
    );
};
