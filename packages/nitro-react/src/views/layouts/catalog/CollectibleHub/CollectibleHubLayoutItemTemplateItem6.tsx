import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem6Props {
    badgeImageWidget?: ReactNode;
    captionAmountText?: string;
    captionCollectionText?: string;
    captionExpiresText?: string;
    captionItemName?: string;
    captionWalletText?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    petImageWidget?: ReactNode;
    srcBitmap?: string;
    srcUnknownImage?: string;
    tintBitmap?: string;
    visibleAmountContainer?: boolean;
    visibleAmountText?: boolean;
    visibleBadgeImageWidget?: boolean;
    visibleBitmap?: boolean;
    visibleBorderBackground?: boolean;
    visibleBorderOutline?: boolean;
    visibleCollectionText?: boolean;
    visibleExpiresText?: boolean;
    visibleItemBorder?: boolean;
    visibleItemName?: boolean;
    visibleNameBorder?: boolean;
    visiblePetImageWidget?: boolean;
    visibleUnknownImage?: boolean;
    visibleWalletText?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem6 = ({ badgeImageWidget, captionAmountText, captionCollectionText, captionExpiresText, captionItemName, captionWalletText, layout, onItemTemplate, petImageWidget, srcBitmap, srcUnknownImage, tintBitmap, visibleAmountContainer, visibleAmountText, visibleBadgeImageWidget, visibleBitmap, visibleBorderBackground, visibleBorderOutline, visibleCollectionText, visibleExpiresText, visibleItemBorder, visibleItemName, visibleNameBorder, visiblePetImageWidget, visibleUnknownImage, visibleWalletText }: CollectibleHubLayoutItemTemplateItem6Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 466, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
            >
                {(visibleBorderOutline ?? true) && (
                    <Border
                        variant="3"
                        name="border_outline"
                        tintColor="#8f9db1"
                        layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
                    >
                        {(visibleBorderBackground ?? true) && (
                            <Border
                                variant="3"
                                name="border_background"
                                tintColor="#c8cdd3"
                                layout={{ position: 'absolute', left: 1, width: 464, top: 1, height: 48 }}
                            />
                        )}
                    </Border>
                )}
            </Border>
            {(visibleItemBorder ?? true) && (
                <Border
                    variant="3"
                    name="item_border"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                >
                    <Border
                        variant="3"
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                    />
                </Border>
            )}
            {(visibleNameBorder ?? true) && (
                <Border
                    variant="3"
                    name="name_border"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 54, width: 408, top: 4, height: 16 }}
                >
                    {(visibleItemName ?? true) && (
                        <Region
                            name="item_name"
                            layout={{ position: 'absolute', left: 1, width: 405, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemName ?? 'Item name'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleBitmap ?? true) && (
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
                />
            )}
            {(visibleBadgeImageWidget ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
                >
                    {badgeImageWidget}
                </WidgetSlot>
            )}
            {(visibleUnknownImage ?? true) && (
                <ThemeImage
                    name="unknown_image"
                    src={srcUnknownImage ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
                />
            )}
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="pet_image_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
                >
                    {petImageWidget}
                </WidgetSlot>
            )}
            {(visibleWalletText ?? true) && (
                <Region
                    name="wallet_text"
                    layout={{ position: 'absolute', left: 204, width: 260, top: 34, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionWalletText ?? '0x123123123123123'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#8f9db1', align: 'right' }}
                    />
                </Region>
            )}
            {(visibleCollectionText ?? true) && (
                <Region
                    name="collection_text"
                    layout={{ position: 'absolute', left: 52, width: 340, top: 20, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionCollectionText ?? '<b>Collection:</b> test'}
                </Region>
            )}
            {(visibleExpiresText ?? true) && (
                <Region
                    name="expires_text"
                    layout={{ position: 'absolute', left: 52, width: 340, top: 33, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionExpiresText ?? '<b>Expires:</b> test'}
                </Region>
            )}
            {(visibleAmountContainer ?? true) && (
                <Region
                    name="amount_container"
                    layout={{ position: 'absolute', left: 27, width: 20, top: 34, height: 16 }}
                >
                    <Border
                        variant="3"
                        tintColor="#8f9db1"
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 14 }}
                    />
                    {(visibleAmountText ?? true) && (
                        <Region
                            name="amount_text"
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionAmountText ?? 'x0'}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    )}
                </Region>
            )}
        </Region>
    );
};
