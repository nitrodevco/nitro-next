import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutItemTemplateItemProps {
    background?: ReactNode;
    captionItemTitle?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcIcon?: string;
    visibleBackground?: boolean;
    visibleDropButton?: boolean;
    visibleIcon?: boolean;
    visibleIconBackground?: boolean;
    visibleItemTitle?: boolean;
}

export const CatalogVolterLayoutItemTemplateItem = ({ background, captionItemTitle, layout, onItemTemplate, srcIcon, visibleBackground, visibleDropButton, visibleIcon, visibleIconBackground, visibleItemTitle }: CatalogVolterLayoutItemTemplateItemProps) => {
    return (
        <Region
            name="item_template"
            backgroundColor="#000000"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 158, height: 21, flexShrink: 0, ...layout }}
        >
            {(visibleBackground ?? true) && (
                <Region
                    name="background"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    {background}
                </Region>
            )}
            {(visibleIconBackground ?? true) && (
                <Region
                    name="iconBackground"
                    backgroundColor="#eeeeee"
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('catalogue_color_picker_27x22_color.png')}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                />
            )}
            {(visibleItemTitle ?? true) && (
                <ThemeText
                    text={captionItemTitle ?? ''}
                    name="item_title"
                    layout={{ position: 'absolute', left: 26, right: 128, top: 4, height: 4 }}
                />
            )}
            {(visibleDropButton ?? true) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 122, width: 15, top: 5, height: 15 }}
                />
            )}
        </Region>
    );
};
