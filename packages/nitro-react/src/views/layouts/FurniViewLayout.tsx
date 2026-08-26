import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `937_furni_view_xml` (layout "furni_view", 429x97) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniViewLayoutProps {
    layout?: BoxLayout;
    onBcPlaceButton?: () => void;
    onBuyoutButton?: () => void;
    onCatalogButton?: () => void;
    onClose?: () => void;
    onExtendButton?: () => void;
    onMove?: () => void;
    onPickup?: () => void;
    onRentButton?: () => void;
    onRotate?: () => void;
    onSaveBrandingConfiguration?: () => void;
    onSetValues?: () => void;
    onUse?: () => void;
    onWiredInspect?: () => void;
}

export const FurniViewLayout = ({ layout, onBcPlaceButton, onBuyoutButton, onCatalogButton, onClose, onExtendButton, onMove, onPickup, onRentButton, onRotate, onSaveBrandingConfiguration, onSetValues, onUse, onWiredInspect }: FurniViewLayoutProps) => {
    const t = useTranslation();
    const [ valueValue, setValueValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 429, height: 97, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 97, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="2"
                    name="info_border"
                    params={16}
                    layout={{ width: 190, height: 372, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        params={17}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <Region
                        name="infostand_element_list"
                        params={8388624}
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 355, flexDirection: 'column', gap: 5 }}
                    >
                        <Region
                            name="name_text"
                            params={144}
                            layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Furni name"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                            />
                        </Region>
                        <Region
                            name="name_extra_text"
                            params={144}
                            visible={false}
                            layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Chest name"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                            />
                        </Region>
                        <Region
                            name="images_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="wired_chest_elements"
                            params={262224}
                            layout={{ width: 31, height: 15, flexShrink: 0, flexDirection: 'row', gap: 3 }}
                        >
                            <ThemeImage
                                name="locked_icon"
                                params={16}
                                src={layoutImage('forum_forum_locked.png')}
                                layout={{ width: 13, height: 18, flexShrink: 0 }}
                            />
                            <ThemeImage
                                name="wired_icon"
                                params={16}
                                src="${image.library.url}catalogue/icon_80.png"
                                layout={{ width: 15, height: 15, flexShrink: 0 }}
                            />
                        </Region>
                        <Region
                            name="image_container"
                            params={16}
                            layout={{ width: 170, height: 130, flexShrink: 0, minHeight: 45 }}
                        >
                            <Region
                                name="unique_item_background_container"
                                params={2096}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 130, minHeight: 45 }}
                            >
                                <ThemeImage
                                    name="unique_item_background_bottom"
                                    src={layoutImage('unique_item_large_iron.png')}
                                    layout={{ position: 'absolute', left: 8, width: 5, top: -1, height: 9 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_bottom"
                                    src={layoutImage('unique_item_large_iron.png')}
                                    layout={{ position: 'absolute', left: 155, width: 5, top: -1, height: 9 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_mid"
                                    params={2064}
                                    src={layoutImage('unique_item_large_glass_mid.png')}
                                    layout={{ position: 'absolute', left: 0, width: 170, top: 5, height: 120 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_top"
                                    params={16}
                                    src={layoutImage('unique_item_large_glass_top.png')}
                                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 5 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_bottom"
                                    params={1040}
                                    src={layoutImage('unique_item_large_glass_bottom.png')}
                                    layout={{ position: 'absolute', left: 0, width: 170, top: 125, height: 5 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_bottom"
                                    params={1024}
                                    src={layoutImage('unique_item_large_iron.png')}
                                    layout={{ position: 'absolute', left: 8, width: 5, top: 123, height: 9 }}
                                />
                                <ThemeImage
                                    name="unique_item_background_bottom"
                                    params={1024}
                                    src={layoutImage('unique_item_large_iron.png')}
                                    layout={{ position: 'absolute', left: 155, width: 5, top: 123, height: 9 }}
                                />
                            </Region>
                            <ThemeImage
                                name="image"
                                params={8388624}
                                src={undefined}
                                layout={{ position: 'absolute', left: 5, width: 140, top: 5, height: 120, minHeight: 45 }}
                            />
                            <Region
                                name="unique_item_overlay_container"
                                params={2096}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 130, minHeight: 45 }}
                            >
                                <ThemeImage
                                    params={2064}
                                    src={layoutImage('unique_item_large_glass_shine.png')}
                                    layout={{ position: 'absolute', left: 0, width: 170, top: 5, height: 120 }}
                                />
                                <WidgetSlot
                                    widgetType="limited_item_overlay_preview"
                                    name="unique_item_plaque_widget"
                                    params={16}
                                    layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
                                />
                            </Region>
                            <Region
                                name="rarity_item_overlay_container"
                                params={2096}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 130 }}
                            >
                                <WidgetSlot
                                    widgetType="rarity_item_overlay_preview"
                                    name="rarity_item_overlay_widget"
                                    params={16}
                                    layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="nft_indicator"
                            params={16}
                            layout={{ width: 170, height: 18, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="nft_icon"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                            />
                        </Region>
                        <Region
                            name="owner_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="owner_region"
                            params={17}
                            layout={{ width: 170, height: 17, flexShrink: 0 }}
                        >
                            <Icon
                                variant="21"
                                name="owner_link"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
                            />
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    name="bcw_icon"
                                    params={16}
                                    src="${image.library.url}/catalogue/icon_193.png"
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="owner_name"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    name="temp_icon"
                                    params={3932176}
                                    src="${image.library.url}catalogue/icon_80.png"
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="group_details_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="group_details_container"
                            tooltip={t('infostand.group.link.tooltip')}
                            params={17}
                            layout={{ width: 170, height: 40, flexShrink: 0 }}
                        >
                            <WidgetSlot
                                widgetType="badge_image"
                                name="group_badge_image"
                                params={16}
                                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                            />
                            <Region
                                name="group_name"
                                params={16}
                                layout={{ position: 'absolute', left: 45, width: 128, top: 10, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                        </Region>
                        <Region
                            name="expiration_text"
                            params={16}
                            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.rent.expiration')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                        <Region
                            name="purchase_buttons"
                            params={16}
                            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                        >
                            <ContainerButton
                                variant="0"
                                name="bc_place_button"
                                tooltip={t('infostand.button.place_more.tooltip')}
                                params={17}
                                onPointerTap={onBcPlaceButton}
                                layout={{ width: 90, height: 23, flexShrink: 0 }}
                            >
                                <Region
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 5, width: 79, top: 0, height: 22, flexDirection: 'row' }}
                                >
                                    <ThemeImage
                                        name="icon"
                                        params={16}
                                        src={layoutImage('infostand_furni_place.png')}
                                        layout={{ width: 20, height: 18, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 59, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.button.place_more')}
                                            textStyle="text-style-regular"
                                        />
                                    </Region>
                                </Region>
                            </ContainerButton>
                            <ContainerButton
                                variant="0"
                                name="catalog_button"
                                tags={[ 'catalog' ]}
                                params={17}
                                onPointerTap={onCatalogButton}
                                layout={{ width: 72, height: 23, flexShrink: 0 }}
                            >
                                <Region
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 2, width: 64, top: 0, height: 22, flexDirection: 'row' }}
                                >
                                    <ThemeImage
                                        name="icon"
                                        params={16}
                                        src={layoutImage('infostand_furni_shop.png')}
                                        layout={{ width: 20, height: 18, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 44, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.button.buy')}
                                            textStyle="text-style-regular"
                                        />
                                    </Region>
                                </Region>
                            </ContainerButton>
                            <Button
                                variant="0"
                                name="rent_button"
                                params={131089}
                                onPointerTap={onRentButton}
                                layout={{ width: 130, height: 23, flexShrink: 0 }}
                            >
                                {t('infostand.button.rent')}
                            </Button>
                            <Button
                                variant="0"
                                name="extend_button"
                                params={131089}
                                onPointerTap={onExtendButton}
                                layout={{ width: 143, height: 23, flexShrink: 0 }}
                            >
                                {t('infostand.button.extend')}
                            </Button>
                            <Button
                                variant="0"
                                name="buyout_button"
                                params={131089}
                                onPointerTap={onBuyoutButton}
                                layout={{ width: 143, height: 23, flexShrink: 0 }}
                            >
                                {t('infostand.button.buyout')}
                            </Button>
                        </Region>
                        <Region
                            name="furni_details_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="chest_item_count"
                            params={16}
                            visible={false}
                            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Items:"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                        <Region
                            name="furni_details_text"
                            params={16}
                            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Furni details"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="custom_variables"
                    params={17}
                    tintColor="#999999"
                    layout={{ width: 190, height: 62, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        params={8388624}
                        tintColor="#333333"
                        layout={{ position: 'absolute', left: 3, width: 184, top: 3, height: 56 }}
                    >
                        <Button
                            variant="3"
                            name="set_values"
                            params={131281}
                            onPointerTap={onSetValues}
                            layout={{ position: 'absolute', left: 55, width: 75, top: 4, height: 24 }}
                        >
                            Set values
                        </Button>
                        <Region
                            name="variable_list"
                            params={8536080}
                            layout={{ position: 'absolute', left: 0, width: 214, top: 32, height: 26, flexDirection: 'column' }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 183, height: 26, flexShrink: 0 }}
                            >
                                <Region
                                    name="name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 1, width: 41, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Name:"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <TextInput
                                    value={valueValue}
                                    onChange={setValueValue}
                                    layout={{ position: 'absolute', left: 80, width: 100, top: 2, height: 17 }}
                                />
                                <Border
                                    variant="3"
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ position: 'absolute', left: 80, width: 100, top: 0, height: 20 }}
                                />
                            </Region>
                        </Region>
                    </Border>
                </Border>
                <Region
                    name="button_list"
                    params={16}
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    <Button
                        variant="1"
                        name="move"
                        params={131089}
                        onPointerTap={onMove}
                        layout={{ width: 134, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.move')}
                    </Button>
                    <Button
                        variant="1"
                        name="rotate"
                        params={131089}
                        onPointerTap={onRotate}
                        layout={{ width: 141, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.rotate')}
                    </Button>
                    <Button
                        variant="1"
                        name="pickup"
                        params={131089}
                        onPointerTap={onPickup}
                        layout={{ width: 139, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.pickup')}
                    </Button>
                    <Button
                        variant="1"
                        name="save_branding_configuration"
                        params={131089}
                        onPointerTap={onSaveBrandingConfiguration}
                        layout={{ width: 175, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.savebranding')}
                    </Button>
                    <Button
                        variant="1"
                        name="use"
                        params={131089}
                        onPointerTap={onUse}
                        layout={{ width: 126, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.use')}
                    </Button>
                    <Button
                        variant="1"
                        name="wired_inspect"
                        params={131089}
                        onPointerTap={onWiredInspect}
                        layout={{ width: 59, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.wired_inspect')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
