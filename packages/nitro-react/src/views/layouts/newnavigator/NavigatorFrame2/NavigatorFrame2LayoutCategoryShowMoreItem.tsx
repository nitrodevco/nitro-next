import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `category_show_more` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryShowMoreItemProps {
    layout?: BoxLayout;
    onCategoryShowMore?: () => void;
}

export const NavigatorFrame2LayoutCategoryShowMoreItem = ({ layout, onCategoryShowMore }: NavigatorFrame2LayoutCategoryShowMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_show_more"
            tooltip={t('navigator.tooltip.category.show.more')}
            onPointerTap={onCategoryShowMore}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_category_show_more.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 1, height: 19 }}
            />
        </Region>
    );
};
