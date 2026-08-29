import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `status_energy_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusEnergyContainerItemProps {
    captionStatusEnergyText?: string;
    captionStatusEnergyValueText?: string;
    layout?: BoxLayout;
    srcStatusEnergyBitmap?: string;
    srcStatusEnergyIcon?: string;
    tintStatusEnergyBitmap?: string;
    tintStatusEnergyIcon?: string;
    visibleStatusEnergyBitmap?: boolean;
    visibleStatusEnergyIcon?: boolean;
    visibleStatusEnergyText?: boolean;
    visibleStatusEnergyValueText?: boolean;
}

export const PetViewLayoutStatusEnergyContainerItem = ({ captionStatusEnergyText, captionStatusEnergyValueText, layout, srcStatusEnergyBitmap, srcStatusEnergyIcon, tintStatusEnergyBitmap, tintStatusEnergyIcon, visibleStatusEnergyBitmap, visibleStatusEnergyIcon, visibleStatusEnergyText, visibleStatusEnergyValueText }: PetViewLayoutStatusEnergyContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_energy_container"
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleStatusEnergyText ?? true) && (
                <Region
                    name="status_energy_text"
                    layout={{ position: 'absolute', width: 135, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusEnergyText ?? t('infostand.pet.text.energy')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleStatusEnergyBitmap ?? true) && (
                <ThemeImage
                    name="status_energy_bitmap"
                    src={srcStatusEnergyBitmap}
                    tint={tintStatusEnergyBitmap}
                    layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                />
            )}
            {(visibleStatusEnergyValueText ?? true) && (
                <Region
                    name="status_energy_value_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusEnergyValueText ?? ''}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleStatusEnergyIcon ?? true) && (
                <ThemeImage
                    name="status_energy_icon"
                    src={srcStatusEnergyIcon ?? layoutImage('icon_pet_energy.png')}
                    tint={tintStatusEnergyIcon}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                />
            )}
        </Region>
    );
};
