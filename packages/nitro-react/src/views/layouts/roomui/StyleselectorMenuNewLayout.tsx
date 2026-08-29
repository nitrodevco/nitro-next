import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1050_styleselector_menu_new_xml` (layout "styleselector_menu_new", 67x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StyleselectorMenuNewLayoutProps {
    captionFontSizeTitle?: string;
    divider?: ReactNode;
    itemsFontSizeList?: ReactNode;
    itemsItemgrid?: ReactNode;
    layout?: BoxLayout;
    visibleDivider?: boolean;
}

export const StyleselectorMenuNewLayout = ({ captionFontSizeTitle, divider, itemsFontSizeList, itemsItemgrid, layout, visibleDivider }: StyleselectorMenuNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 67, height: 70, ...layout }}>
            <Border
                variant="2"
                tintColor="#24231e"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="itemgrid"
                    layout={{ position: 'absolute', left: 6, width: 55, top: 5, height: 33, flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                >
                    {itemsItemgrid}
                </Region>
                {(visibleDivider ?? false) && (
                    <Region
                        name="divider"
                        backgroundColor="#c7c7c7"
                        layout={{ position: 'absolute', right: 6, width: 55, bottom: 21, height: 1 }}
                    >
                        {divider}
                    </Region>
                )}
                <Border
                    variant="2"
                    tintColor="#000000"
                    blend={0.3}
                    layout={{ position: 'absolute', left: 6, right: 5, bottom: 0, height: 26 }}
                />
                <Region
                    name="font_size_title"
                    layout={{ position: 'absolute', left: 15, width: 51, bottom: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFontSizeTitle ?? t('widgets.chatinput.text_size')}
                        textOptions={{ fill: '#999999' }}
                    />
                </Region>
                <Region
                    name="font_size_list"
                    layout={{ position: 'absolute', right: 31, width: 85, bottom: 4, height: 18, flexDirection: 'row', gap: 2 }}
                >
                    {itemsFontSizeList}
                </Region>
            </Border>
        </Region>
    );
};
