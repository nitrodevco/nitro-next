import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutCategoryAddQuickLinkItem2 } from './NavigatorFrame2LayoutCategoryAddQuickLinkItem2';
import { NavigatorFrame2LayoutCategoryShowMoreItem2 } from './NavigatorFrame2LayoutCategoryShowMoreItem2';

/** Named region `category_header` of NavigatorFrame2Layout - configured through the parent's `categoryHeader` prop. */
export interface NavigatorFrame2LayoutCategoryHeader2Props {
    captionCategoryName?: string;
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    onCategoryExpand?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryHeader2 = ({ captionCategoryName, itemsCategoryControlsItemlist, layout, onCategoryExpand, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryHeader2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_header"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="category_name_region"
                onPointerTap={onCategoryNameRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27 }}
            >
                <Region
                    name="category_expand"
                    tooltip={t('navigator.tooltip.category.expand')}
                    onPointerTap={onCategoryExpand}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_button_category_expand.png')}
                        layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                    />
                </Region>
                <ThemeText
                    text={captionCategoryName ?? 'Collapsed Category Name PH'}
                    textOptions={{ fill: '#0f557b' }}
                    name="category_name"
                    layout={{ position: 'absolute', left: 20, width: 189, top: 5, height: 19 }}
                />
            </Region>
            <Region
                name="category_controls_itemlist"
                layout={{ position: 'absolute', right: 4, width: 36, top: 1, height: 24, flexDirection: 'row', gap: 5 }}
            >
                {itemsCategoryControlsItemlist ?? (
                    <>
                        <NavigatorFrame2LayoutCategoryShowMoreItem2 />
                        <NavigatorFrame2LayoutCategoryAddQuickLinkItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};
