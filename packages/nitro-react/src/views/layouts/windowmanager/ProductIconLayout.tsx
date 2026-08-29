import { BoxLayout, Icon, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1980_product_icon_xml` (layout "avatar_image", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductIconLayoutProps {
    layout?: BoxLayout;
    srcBitmap?: string;
    srcUnknownImage?: string;
    visibleIcon?: boolean;
}

export const ProductIconLayout = ({ layout, srcBitmap, srcUnknownImage, visibleIcon }: ProductIconLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ThemeImage
                    name="bitmap"
                    tags={[ 'BITMAP' ]}
                    src={srcBitmap}
                    layout={{ position: 'absolute', width: 46, alignSelf: 'center', height: 40, minWidth: 46, maxWidth: 46 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', width: 18, alignSelf: 'center', height: 18 }}
                >
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                        layout={{ position: 'absolute', width: 18, alignSelf: 'center', height: 18 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    visible={false}
                    options={{ 'pet_image:direction': 'south', 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 44, minWidth: 48, maxWidth: 48, minHeight: 48, maxHeight: 48, overflow: 'hidden' }}
                />
                <Region
                    visible={visibleIcon ?? false}
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40 }}
                >
                    <Icon
                        variant="41"
                        name="icon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
