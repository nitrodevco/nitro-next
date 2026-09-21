import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { ButtonThick, Frame, Region, ThemeText } from '#base/theme';

export interface FurnitureBannerDialogViewProps {
    captionKey: string;
    titleKey: string;
    descriptionKey: string;
    /** Between the banner and the buttons: an inscription field, or nothing at all. */
    children?: ReactNode;
    /** The whole dialog's height; the banner and the buttons are fixed, the middle is not. */
    height: number;
    confirmKey?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * The teal-bannered dialog the effect box and the mystery trophy share (475 wide): a headline
 * and a line of explanation on the banner, whatever the furni needs asked below it, then cancel
 * and a green confirm.
 *
 * Flash put a picture at the left of the banner, loaded from the external image host rather
 * than from the client's own assets, so there is nothing here to draw it with - the text simply
 * takes the room.
 */
export const FurnitureBannerDialogView = ({
    captionKey, titleKey, descriptionKey, children, height, confirmKey = 'generic.ok', onConfirm, onCancel,
}: FurnitureBannerDialogViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="furniture-banner-dialog"
            caption={t(captionKey)}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            defaultPosition={{ x: 60, y: 60 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 475, height }}
        >
            <Region
                backgroundColor="#376275"
                layout={{ position: 'absolute', left: 1, right: -11, top: 0, height: 100 }}
            >
                <Region
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 95 }}
                />
                <ThemeText
                    text={t(titleKey)}
                    textStyle="u_headline_big"
                    textOptions={{ fill: '#ffffff' }}
                    layout={{ position: 'absolute', left: 16, width: 396, top: 11, height: 30 }}
                />
                <ThemeText
                    text={t(descriptionKey)}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 433 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 433, top: 41, height: 50 }}
                />
            </Region>
            {children && (
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 100, bottom: 51 }}>
                    {children}
                </Region>
            )}
            <Region layout={{ position: 'absolute', left: -1, right: 0, bottom: 0, height: 51 }}>
                <Region
                    cursor="pointer"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 177, width: 101, bottom: 8, height: 32, justifyContent: 'center', alignItems: 'center' }}
                >
                    <ThemeText
                        text={t('generic.cancel')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <ButtonThick
                    variant="5"
                    tintColor="#00aa00"
                    onPointerTap={onConfirm}
                    layout={{ position: 'absolute', left: 319, width: 130, bottom: 8, height: 33 }}
                >
                    {t(confirmKey)}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
