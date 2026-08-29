import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RentConfirmationLayoutFurniNameItem } from './RentConfirmationLayoutFurniNameItem';
import { RentConfirmationLayoutRentalDescriptionItem } from './RentConfirmationLayoutRentalDescriptionItem';

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
    tintImage?: string;
}

export const RentConfirmationLayout = ({ captionPriceAmount, itemsContentList, layout, onCancelButton, onClose, onOkButton, srcImage, srcPriceType, tintImage }: RentConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('rent.confirmation.title.extend')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 370, height: 300, minWidth: 370, minHeight: 300, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 20, width: 160, top: 25, height: 180 }}
            >
                <ThemeImage
                    name="image"
                    src={srcImage}
                    tint={tintImage}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Border>
            <Button
                variant="3"
                name="cancel_button"
                onPointerTap={onCancelButton}
                layout={{ position: 'absolute', left: 20, width: 99, bottom: 9, height: 30 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="5"
                name="ok_button"
                tintColor="#00cc00"
                onPointerTap={onOkButton}
                layout={{ position: 'absolute', right: 8, width: 82, bottom: 9, height: 30 }}
            >
                {t('generic.ok')}
            </ButtonThick>
            <Region
                name="content_list"
                layout={{ position: 'absolute', left: 200, alignSelf: 'center', marginTop: -20, marginBottom: 20, flexDirection: 'column', gap: 10 }}
            >
                {itemsContentList ?? (
                    <>
                        <RentConfirmationLayoutRentalDescriptionItem />
                        <RentConfirmationLayoutFurniNameItem />
                    </>
                )}
                <Region layout={{ width: 150, height: 19, flexShrink: 0, flexDirection: 'row', gap: 3 }}>
                    <Region layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="price_amount"
                        layout={{ width: 22, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPriceAmount ?? '000'}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <ThemeImage
                        name="price_type"
                        src={srcPriceType ?? layoutImage('toolbar_duckat_icon_0.png')}
                        layout={{ width: 17, height: 18, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
