import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `category_back` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryBackItemProps {
    layout?: BoxLayout;
    onCategoryBack?: () => void;
}

export const NavigatorFrame2LayoutCategoryBackItem = ({ layout, onCategoryBack }: NavigatorFrame2LayoutCategoryBackItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_back"
            tooltip={t('navigator.back')}
            onPointerTap={onCategoryBack}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_nav_view_mini.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};
