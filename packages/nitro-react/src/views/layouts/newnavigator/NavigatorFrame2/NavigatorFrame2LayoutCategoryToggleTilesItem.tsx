import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `category_toggle_tiles` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryToggleTilesItemProps {
    layout?: BoxLayout;
    onCategoryToggleTiles?: () => void;
}

export const NavigatorFrame2LayoutCategoryToggleTilesItem = ({ layout, onCategoryToggleTiles }: NavigatorFrame2LayoutCategoryToggleTilesItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_toggle_tiles"
            tooltip={t('navigator.tooltip.tiles')}
            onPointerTap={onCategoryToggleTiles}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_nav_view_thumbs.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};
