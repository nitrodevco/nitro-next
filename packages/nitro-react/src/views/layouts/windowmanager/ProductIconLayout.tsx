import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1980_product_icon_xml` (layout "avatar_image", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductIconLayoutProps {
    badgeImageWidget?: ReactNode;
    layout?: BoxLayout;
    petImageWidget?: ReactNode;
    srcBitmap?: string;
    srcUnknownImage?: string;
    tintBitmap?: string;
    visibleBadgeImageWidget?: boolean;
    visibleIcon?: boolean;
    visiblePetImageWidget?: boolean;
    visibleUnknownImage?: boolean;
}

export const ProductIconLayout = ({ badgeImageWidget, layout, petImageWidget, srcBitmap, srcUnknownImage, tintBitmap, visibleBadgeImageWidget, visibleIcon, visiblePetImageWidget, visibleUnknownImage }: ProductIconLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', width: 46, alignSelf: 'center', height: 40, minWidth: 46, maxWidth: 46 }}
                />
                {(visibleBadgeImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge_image_widget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                    >
                        {badgeImageWidget}
                    </WidgetSlot>
                )}
                {(visibleUnknownImage ?? false) && (
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                        layout={{ position: 'absolute', width: 18, alignSelf: 'center', height: 18 }}
                    />
                )}
                {(visiblePetImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_image_widget"
                        options={{ 'pet_image:direction': 'south', 'pet_image:shrink_on_overflow': 'true' }}
                        layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 44, minWidth: 48, maxWidth: 48, minHeight: 48, maxHeight: 48, overflow: 'hidden' }}
                    >
                        {petImageWidget}
                    </WidgetSlot>
                )}
                {(visibleIcon ?? false) && (
                    <Icon
                        variant="41"
                        name="icon"
                        layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40 }}
                    />
                )}
            </Region>
        </Region>
    );
};
