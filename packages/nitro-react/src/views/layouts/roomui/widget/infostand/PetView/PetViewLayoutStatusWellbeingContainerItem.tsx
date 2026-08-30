import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `status_wellbeing_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusWellbeingContainerItemProps {
    captionStatusWellbeingText?: string;
    captionStatusWellbeingValueText?: string;
    layout?: BoxLayout;
    srcStatusWellbeingBitmap?: string;
    srcStatusWellbeingIcon?: string;
    tintStatusWellbeingBitmap?: string;
    tintStatusWellbeingIcon?: string;
    visibleStatusWellbeingBitmap?: boolean;
    visibleStatusWellbeingIcon?: boolean;
    visibleStatusWellbeingText?: boolean;
    visibleStatusWellbeingValueText?: boolean;
}

export const PetViewLayoutStatusWellbeingContainerItem = ({ captionStatusWellbeingText, captionStatusWellbeingValueText, layout, srcStatusWellbeingBitmap, srcStatusWellbeingIcon, tintStatusWellbeingBitmap, tintStatusWellbeingIcon, visibleStatusWellbeingBitmap, visibleStatusWellbeingIcon, visibleStatusWellbeingText, visibleStatusWellbeingValueText }: PetViewLayoutStatusWellbeingContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_wellbeing_container"
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleStatusWellbeingText ?? true) && (
                <ThemeText
                    text={captionStatusWellbeingText ?? t('infostand.pet.text.wellbeing')}
                    textOptions={{ fill: '#ffffff' }}
                    name="status_wellbeing_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 144, top: 1, height: 13 }}
                />
            )}
            {(visibleStatusWellbeingBitmap ?? true) && (
                <ThemeImage
                    name="status_wellbeing_bitmap"
                    src={srcStatusWellbeingBitmap}
                    tint={tintStatusWellbeingBitmap}
                    layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                />
            )}
            {(visibleStatusWellbeingValueText ?? true) && (
                <ThemeText
                    text={captionStatusWellbeingValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                    name="status_wellbeing_value_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4 }}
                />
            )}
            {(visibleStatusWellbeingIcon ?? true) && (
                <ThemeImage
                    name="status_wellbeing_icon"
                    src={srcStatusWellbeingIcon ?? layoutImage('icon_pet_wellbeing.png')}
                    tint={tintStatusWellbeingIcon}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                />
            )}
        </Region>
    );
};
