import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutCategoryControlsItemlist, NavigatorFrame2LayoutCategoryControlsItemlistProps } from './NavigatorFrame2LayoutCategoryControlsItemlist';

/** Named region `category_header` of NavigatorFrame2Layout - configured through the parent's `categoryHeader` prop. */
export interface NavigatorFrame2LayoutCategoryHeaderProps {
    captionCategoryName?: string;
    categoryControlsItemlist?: NavigatorFrame2LayoutCategoryControlsItemlistProps;
    layout?: BoxLayout;
    onCategoryCollapse?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryHeader = ({ captionCategoryName, categoryControlsItemlist, layout, onCategoryCollapse, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_header"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, ...layout }}
        >
            <Region
                name="category_collapse"
                tooltip={t('navigator.tooltip.category.collapse')}
                onPointerTap={onCategoryCollapse}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 11, top: 7, height: 19 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_category_collapse.png')}
                    layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="category_name_region"
                onPointerTap={onCategoryNameRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27 }}
            >
                <Region
                    name="category_name"
                    layout={{ position: 'absolute', left: 20, width: 122, top: 5, height: 19, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCategoryName ?? 'Category Name PH'}
                        textOptions={{ fill: '#0f557b' }}
                    />
                </Region>
            </Region>
            <NavigatorFrame2LayoutCategoryControlsItemlist {...categoryControlsItemlist} />
        </Region>
    );
};
