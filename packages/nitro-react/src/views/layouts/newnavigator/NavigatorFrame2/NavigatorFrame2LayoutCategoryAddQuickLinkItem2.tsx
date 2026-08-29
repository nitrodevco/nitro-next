import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `category_add_quick_link` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryAddQuickLinkItem2Props {
    layout?: BoxLayout;
    onCategoryAddQuickLink?: () => void;
}

export const NavigatorFrame2LayoutCategoryAddQuickLinkItem2 = ({ layout, onCategoryAddQuickLink }: NavigatorFrame2LayoutCategoryAddQuickLinkItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_add_quick_link"
            tooltip={t('navigator.tooltip.add.saved.search')}
            onPointerTap={onCategoryAddQuickLink}
            cursor="pointer"
            layout={{ width: 20, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
            />
        </Region>
    );
};
