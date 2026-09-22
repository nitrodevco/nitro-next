import { ReactNode } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Where a layout puts its cancel / confirm row (a 475x51 container) and the two controls in it. */
export interface FurnitureBannerDialogButtonRow {
    left: number;
    top: number;
    /** The `cancel` region's x (101x32 at y 11). */
    cancelLeft: number;
    /** The confirm `button_thick`'s x (33 high at y 10). */
    confirmLeft: number;
}

export interface FurnitureBannerDialogViewProps {
    captionKey: string;
    titleKey: string;
    descriptionKey: string;
    /** The banner picture's `asset_uri`, under `${image.library.url}`. */
    iconPath: string;
    /** The whole dialog's height, as its layout gives it. */
    height: number;
    buttonRow: FurnitureBannerDialogButtonRow;
    /** Between the banner and the buttons: an inscription field, or nothing at all. Placed in the frame's content, in the layout's coordinates. */
    children?: ReactNode;
    confirmKey?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * The teal-bannered dialog of `effectbox`, `mysterytrophy` and `petpackage_new` (475 wide, frame
 * style 3, margins 0, 33, 0, 3), each built and centred by its own widget
 * (`EffectBoxOpenDialogView`, `MysteryTrophyOpenDialogView`, `PetPackageFurniWidget`): the banner -
 * a 0xFF376275 background around a 0xFF0E3F52 body, the layout's picture from the image library at
 * its left, the `u_headline_big` title (24px) and the word-wrapped description beside it - then
 * whatever the furni asks, then the button row: the underlined cancel text centred in its region
 * and the green confirm, which fits its caption from its 130px `width_min`.
 */
export const FurnitureBannerDialogView = ({
    captionKey, titleKey, descriptionKey, iconPath, height, buttonRow, children, confirmKey = 'generic.ok', onConfirm, onCancel,
}: FurnitureBannerDialogViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Frame
            variant="3"
            caption={t(captionKey)}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 0, 33, 0, 3 ]}
            layout={{ width: 475, height }}
        >
            <Region
                backgroundColor="#376275"
                layout={{ position: 'absolute', left: 1, top: 0, width: 473, height: 100 }}
            >
                <Region
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 2, top: 2, width: 469, height: 95 }}
                />
                <ThemeImage
                    src={`${imageLibraryUrl}${iconPath}`}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 3, top: 5, width: 85, height: 93 }}
                />
                <ThemeText
                    text={t(titleKey)}
                    textStyle="u_headline_big"
                    textOptions={{ fill: '#ffffff', fontSize: 24 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 95, top: 11 }}
                />
                <ThemeText
                    text={t(descriptionKey)}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 350 }}
                    flashFormat={{ leading: 2 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 95, top: 41, width: 354 }}
                />
            </Region>
            {children}
            <Region layout={{ position: 'absolute', left: buttonRow.left, top: buttonRow.top, width: 475, height: 51 }}>
                <Region
                    cursor="pointer"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: buttonRow.cancelLeft, top: 11, width: 101, height: 32, alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('generic.cancel')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#333333' }}
                        flashFormat={{ underline: true }}
                        verticalAlign="top"
                    />
                </Region>
                <ButtonThick
                    variant="5"
                    tintColor="#00aa00"
                    onPointerTap={onConfirm}
                    layout={{ position: 'absolute', left: buttonRow.confirmLeft, top: 10, height: 33, minWidth: 130 }}
                >
                    {t(confirmKey)}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
