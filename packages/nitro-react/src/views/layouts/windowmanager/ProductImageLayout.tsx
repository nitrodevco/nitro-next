import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2523_product_image_xml` (layout "avatar_image", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductImageLayoutProps {
    layout?: BoxLayout;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
}

export const ProductImageLayout = ({ layout, srcPlaceholderImage, srcProductPreview, srcUnknownImage }: ProductImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="placeholder_image"
                    src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    visible={false}
                />
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    visible={false}
                    layout={{ position: 'absolute', left: 55, right: 55, top: 35, bottom: 35, minWidth: 90, maxWidth: 90, minHeight: 130, maxHeight: 130 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="unknown_image"
                    src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    visible={false}
                />
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <WidgetSlot
                    widgetType="room_previewer"
                    name="effect_image_widget"
                    visible={false}
                    options={{ 'room_previewer:offsetx': '2' }}
                    layout={{ position: 'absolute', left: 50, right: 50, top: -30, bottom: -30, minWidth: 100, maxWidth: 100, minHeight: 260, maxHeight: 260 }}
                />
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
