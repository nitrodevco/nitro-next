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
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                >
                    <ThemeImage
                        name="placeholder_image"
                        params={2192}
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    params={2192}
                    visible={false}
                    layout={{ position: 'absolute', left: 55, width: 90, top: 35, height: 130, minWidth: 90, maxWidth: 90, minHeight: 130, maxHeight: 130 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    params={2192}
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                >
                    <ThemeImage
                        name="unknown_image"
                        params={2192}
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    params={2192}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                />
                <WidgetSlot
                    widgetType="room_previewer"
                    name="effect_image_widget"
                    params={2192}
                    visible={false}
                    options={{ 'room_previewer:offsetx': '2' }}
                    layout={{ position: 'absolute', left: 50, width: 100, top: -30, height: 260, minWidth: 100, maxWidth: 100, minHeight: 260, maxHeight: 260 }}
                />
                <ThemeImage
                    name="product_preview"
                    params={2192}
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
                />
            </Region>
        </Region>
    );
};
