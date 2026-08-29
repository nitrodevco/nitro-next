import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `status_experience_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusExperienceContainerItemProps {
    captionStatusExperienceText?: string;
    captionStatusExperienceValueText?: string;
    layout?: BoxLayout;
    srcStatusExperienceBitmap?: string;
    srcStatusExperienceIcon?: string;
    tintStatusExperienceBitmap?: string;
    tintStatusExperienceIcon?: string;
    visibleStatusExperienceBitmap?: boolean;
    visibleStatusExperienceIcon?: boolean;
    visibleStatusExperienceText?: boolean;
    visibleStatusExperienceValueText?: boolean;
}

export const PetViewLayoutStatusExperienceContainerItem = ({ captionStatusExperienceText, captionStatusExperienceValueText, layout, srcStatusExperienceBitmap, srcStatusExperienceIcon, tintStatusExperienceBitmap, tintStatusExperienceIcon, visibleStatusExperienceBitmap, visibleStatusExperienceIcon, visibleStatusExperienceText, visibleStatusExperienceValueText }: PetViewLayoutStatusExperienceContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_experience_container"
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleStatusExperienceText ?? true) && (
                <Region
                    name="status_experience_text"
                    layout={{ position: 'absolute', width: 155, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusExperienceText ?? t('infostand.pet.text.experience')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleStatusExperienceBitmap ?? true) && (
                <ThemeImage
                    name="status_experience_bitmap"
                    src={srcStatusExperienceBitmap}
                    tint={tintStatusExperienceBitmap}
                    layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                />
            )}
            {(visibleStatusExperienceValueText ?? true) && (
                <Region
                    name="status_experience_value_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusExperienceValueText ?? ''}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleStatusExperienceIcon ?? true) && (
                <ThemeImage
                    name="status_experience_icon"
                    src={srcStatusExperienceIcon ?? layoutImage('icon_pet_experience.png')}
                    tint={tintStatusExperienceIcon}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                />
            )}
        </Region>
    );
};
