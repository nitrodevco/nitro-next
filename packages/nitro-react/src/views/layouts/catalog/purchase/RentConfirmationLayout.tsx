import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1553_rent_confirmation_xml` (layout "rent_confirmation", 370x300) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentConfirmationLayoutProps {
    captionPriceAmount?: string;
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onOkButton?: () => void;
    srcImage?: string;
    srcPriceType?: string;
}

export const RentConfirmationLayout = ({ captionPriceAmount, itemsContentList, layout, onCancelButton, onClose, onOkButton, srcImage, srcPriceType }: RentConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('rent.confirmation.title.extend')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 370, height: 300, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    params={16}
                    layout={{ position: 'absolute', left: 20, width: 160, top: 25, height: 180 }}
                >
                    <ThemeImage
                        name="image"
                        params={2192}
                        src={srcImage}
                        layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 180 }}
                    />
                </Border>
                <Button
                    variant="3"
                    name="cancel_button"
                    params={132113}
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', left: 20, width: 99, top: 220, height: 30 }}
                >
                    {t('generic.cancel')}
                </Button>
                <ButtonThick
                    variant="5"
                    name="ok_button"
                    params={394321}
                    tintColor="#00cc00"
                    onPointerTap={onOkButton}
                    layout={{ position: 'absolute', left: 268, width: 82, top: 220, height: 30 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
                <Region
                    name="content_list"
                    params={3293200}
                    layout={{ position: 'absolute', left: 200, width: 150, top: 60, height: 99, flexDirection: 'column', gap: 10 }}
                >
                    {itemsContentList ?? (
                        <>
                            <RentConfirmationLayoutRentalDescriptionItem />
                            <RentConfirmationLayoutFurniNameItem />
                        </>
                    )}
                    <Region
                        params={16}
                        layout={{ width: 150, height: 19, flexShrink: 0, flexDirection: 'row', gap: 3 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('catalog.purchase.confirmation.dialog.cost')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Region
                            name="price_amount"
                            params={16}
                            layout={{ width: 22, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionPriceAmount ?? '000'}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <ThemeImage
                            name="price_type"
                            params={16}
                            src={srcPriceType ?? layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ width: 17, height: 18, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `rental_description` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutRentalDescriptionItemProps {
    captionRentalDescription?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutRentalDescriptionItem = ({ captionRentalDescription, layout }: RentConfirmationLayoutRentalDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rental_description"
            params={16}
            layout={{ width: 150, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentalDescription ?? t('rent.confirmation.rental.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            />
        </Region>
    );
};

/** Row template `furni_name` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutFurniNameItem = ({ captionFurniName, layout }: RentConfirmationLayoutFurniNameItemProps) => {
    return (
        <Region
            name="furni_name"
            params={16}
            layout={{ width: 150, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniName ?? 'The name of the furni in question'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            />
        </Region>
    );
};
