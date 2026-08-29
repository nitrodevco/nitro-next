import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SpecialItemsDisplayLayoutPageContainer, SpecialItemsDisplayLayoutPageContainerProps } from './SpecialItemsDisplayLayoutPageContainer';

/** Named region `center` of SpecialItemsDisplayLayout - configured through the parent's `center` prop. */
export interface SpecialItemsDisplayLayoutCenterProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    pageContainer?: SpecialItemsDisplayLayoutPageContainerProps;
    productDisplayTemplate?: ReactNode;
    srcPlatformImg?: string;
    srcSpotlightBaseImg?: string;
    srcSpotlightImg?: string;
}

export const SpecialItemsDisplayLayoutCenter = ({ layout, onNextButton, onPreviousButton, pageContainer, productDisplayTemplate, srcPlatformImg, srcSpotlightBaseImg, srcSpotlightImg }: SpecialItemsDisplayLayoutCenterProps) => {
    return (
        <Region
            name="center"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 168, height: 220, ...layout }}
        >
            <Region
                name="item_viewer"
                layout={{ position: 'absolute', left: 40, width: 340, top: 0, height: 197 }}
            >
                <ThemeImage
                    name="platform_img"
                    src={srcPlatformImg ?? layoutImage('special_items_item_platform.png')}
                    layout={{ position: 'absolute', left: 8, width: 323, top: 41, height: 155 }}
                />
                <ThemeImage
                    name="spotlight_base_img"
                    src={srcSpotlightBaseImg ?? layoutImage('special_items_spotlight2.png')}
                    layout={{ position: 'absolute', left: 124, width: 91, top: 118, height: 51 }}
                />
                <Region
                    name="item_rotation"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 197 }}
                >
                    <WidgetSlot
                        widgetType="product_image"
                        name="product_display_template"
                        options={{ pivot_point: 'bottom center' }}
                        layout={{ position: 'absolute', left: 70, width: 200, top: -36, height: 200 }}
                    >
                        {productDisplayTemplate}
                    </WidgetSlot>
                </Region>
                <ThemeImage
                    name="spotlight_img"
                    src={srcSpotlightImg ?? layoutImage('special_items_spotlight1.png')}
                    blendMode="add"
                    layout={{ position: 'absolute', left: 124, width: 91, top: -100, height: 271 }}
                />
            </Region>
            <Region
                name="previous_button"
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onPreviousButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 8, width: 33, top: 97, height: 38 }}
            >
                <ThemeImage
                    src={layoutImage('icons_back.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                />
            </Region>
            <Region
                name="next_button"
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onNextButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 379, width: 33, top: 97, height: 38 }}
            >
                <ThemeImage
                    src={layoutImage('icons_forward.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                />
            </Region>
            <SpecialItemsDisplayLayoutPageContainer {...pageContainer} />
        </Region>
    );
};
