import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem3Props {
    badgeImageWidget?: ReactNode;
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    petImageWidget?: ReactNode;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
    tintBitmap?: string;
    visibleBadgeImageWidget?: boolean;
    visibleBitmap?: boolean;
    visibleBorderBackground?: boolean;
    visibleBorderOutline?: boolean;
    visibleCheckmarkIcon?: boolean;
    visibleNumber?: boolean;
    visibleNumberContainer?: boolean;
    visiblePetImageWidget?: boolean;
    visibleTextBorder?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem3 = ({ badgeImageWidget, captionNumber, layout, onItemTemplate, petImageWidget, srcBitmap, srcCheckmarkIcon, srcUnknownImage, tintBitmap, visibleBadgeImageWidget, visibleBitmap, visibleBorderBackground, visibleBorderOutline, visibleCheckmarkIcon, visibleNumber, visibleNumberContainer, visiblePetImageWidget, visibleTextBorder, visibleUnknownImage }: CollectibleHubLayoutItemTemplateItem3Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                {(visibleBorderOutline ?? true) && (
                    <Border
                        variant="3"
                        name="border_outline"
                        tintColor="#8f9db1"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {(visibleBorderBackground ?? true) && (
                            <Border
                                variant="3"
                                name="border_background"
                                tintColor="#c8cdd3"
                                layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                            />
                        )}
                    </Border>
                )}
            </Border>
            {(visibleBitmap ?? true) && (
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
                />
            )}
            {(visibleBadgeImageWidget ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                >
                    {badgeImageWidget}
                </WidgetSlot>
            )}
            {(visibleUnknownImage ?? true) && (
                <ThemeImage
                    name="unknown_image"
                    src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 18 }}
                />
            )}
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    options={{ 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                >
                    {petImageWidget}
                </WidgetSlot>
            )}
            {(visibleNumberContainer ?? true) && (
                <Region
                    name="number_container"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50 }}
                >
                    {(visibleTextBorder ?? true) && (
                        <Border
                            variant="3"
                            name="text_border"
                            tintColor="#337c00"
                            layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
                        />
                    )}
                    {(visibleNumber ?? true) && (
                        <ThemeText
                            text={captionNumber ?? 'x10'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            name="number"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15 }}
                        />
                    )}
                </Region>
            )}
            {(visibleCheckmarkIcon ?? true) && (
                <ThemeImage
                    name="checkmark_icon"
                    src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                    layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
                />
            )}
        </Region>
    );
};
