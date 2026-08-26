import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1053_songdisk_view_xml` (layout "furni_view", 429x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SongdiskViewLayoutProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
    onCatalogButton?: () => void;
    onClose?: () => void;
    onExtendButton?: () => void;
    onMove?: () => void;
    onPickup?: () => void;
    onRentButton?: () => void;
    onRotate?: () => void;
}

export const SongdiskViewLayout = ({ layout, onBuyoutButton, onCatalogButton, onClose, onExtendButton, onMove, onPickup, onRentButton, onRotate }: SongdiskViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 429, height: 25, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 25, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="2"
                    name="info_border"
                    params={16}
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 290, flexShrink: 0 }}
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
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 271, flexDirection: 'column', gap: 5 }}
                    >
                        <Region
                            name="name_text"
                            params={144}
                            layout={{ width: 154, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Furni name"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
                            />
                        </Region>
                        <Region
                            name="images_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <ThemeImage
                            name="image"
                            params={16}
                            src={undefined}
                            layout={{ width: 140, height: 120, flexShrink: 0 }}
                        />
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
                                name="owner_name"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                        </Region>
                        <Region
                            name="description_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="trackname_container"
                            params={16}
                            layout={{ width: 170, height: 14, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon_disc"
                                params={16}
                                src={layoutImage('jb_icon_disc.png')}
                                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
                            />
                            <Region
                                name="track_name_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                        </Region>
                        <Region
                            name="creatorname_container"
                            params={16}
                            layout={{ width: 170, height: 15, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon_composer"
                                params={16}
                                src={layoutImage('jb_icon_composer.png')}
                                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
                            />
                            <Region
                                name="track_creator_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                        >
                            <Button
                                variant="0"
                                name="catalog_button"
                                tags={[ 'catalog' ]}
                                params={131089}
                                onPointerTap={onCatalogButton}
                                textStyle="text-style-button-regular"
                                layout={{ width: 60, height: 22, flexShrink: 0 }}
                            >
                                {t('infostand.button.buy')}
                            </Button>
                            <Button
                                variant="0"
                                name="rent_button"
                                params={131089}
                                onPointerTap={onRentButton}
                                textStyle="text-style-button-regular"
                                layout={{ width: 130, height: 22, flexShrink: 0 }}
                            >
                                {t('infostand.button.rent')}
                            </Button>
                            <Button
                                variant="0"
                                name="extend_button"
                                params={131089}
                                onPointerTap={onExtendButton}
                                textStyle="text-style-button-regular"
                                layout={{ width: 143, height: 22, flexShrink: 0 }}
                            >
                                {t('infostand.button.extend')}
                            </Button>
                            <Button
                                variant="0"
                                name="buyout_button"
                                params={131089}
                                onPointerTap={onBuyoutButton}
                                textStyle="text-style-button-regular"
                                layout={{ width: 143, height: 22, flexShrink: 0 }}
                            >
                                {t('infostand.button.buyout')}
                            </Button>
                        </Region>
                    </Region>
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
                        textStyle="text-style-button-regular"
                        layout={{ width: 134, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.move')}
                    </Button>
                    <Button
                        variant="1"
                        name="rotate"
                        params={131089}
                        onPointerTap={onRotate}
                        textStyle="text-style-button-regular"
                        layout={{ width: 141, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.rotate')}
                    </Button>
                    <Button
                        variant="1"
                        name="pickup"
                        params={131089}
                        onPointerTap={onPickup}
                        textStyle="text-style-button-regular"
                        layout={{ width: 139, height: 25, flexShrink: 0 }}
                    >
                        {t('infostand.button.pickup')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
