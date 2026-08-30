import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `status_happiness_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusHappinessContainerItemProps {
    captionStatusHappinessText?: string;
    captionStatusHappinessValueText?: string;
    layout?: BoxLayout;
    srcStatusHappinessBitmap?: string;
    srcStatusHappinessIcon?: string;
    tintStatusHappinessBitmap?: string;
    tintStatusHappinessIcon?: string;
    visibleStatusHappinessBitmap?: boolean;
    visibleStatusHappinessIcon?: boolean;
    visibleStatusHappinessText?: boolean;
    visibleStatusHappinessValueText?: boolean;
}

export const PetViewLayoutStatusHappinessContainerItem = ({ captionStatusHappinessText, captionStatusHappinessValueText, layout, srcStatusHappinessBitmap, srcStatusHappinessIcon, tintStatusHappinessBitmap, tintStatusHappinessIcon, visibleStatusHappinessBitmap, visibleStatusHappinessIcon, visibleStatusHappinessText, visibleStatusHappinessValueText }: PetViewLayoutStatusHappinessContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_happiness_container"
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleStatusHappinessText ?? true) && (
                <ThemeText
                    text={captionStatusHappinessText ?? t('infostand.pet.text.happiness')}
                    textOptions={{ fill: '#ffffff' }}
                    name="status_happiness_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 150, top: 1, height: 13 }}
                />
            )}
            {(visibleStatusHappinessBitmap ?? true) && (
                <ThemeImage
                    name="status_happiness_bitmap"
                    src={srcStatusHappinessBitmap}
                    tint={tintStatusHappinessBitmap}
                    layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                />
            )}
            {(visibleStatusHappinessValueText ?? true) && (
                <ThemeText
                    text={captionStatusHappinessValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                    name="status_happiness_value_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4 }}
                />
            )}
            {(visibleStatusHappinessIcon ?? true) && (
                <ThemeImage
                    name="status_happiness_icon"
                    src={srcStatusHappinessIcon ?? layoutImage('icon_pet_happiness.png')}
                    tint={tintStatusHappinessIcon}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                />
            )}
        </Region>
    );
};
