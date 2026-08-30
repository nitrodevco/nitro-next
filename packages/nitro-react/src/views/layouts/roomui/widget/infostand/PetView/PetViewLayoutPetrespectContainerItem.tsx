import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `petrespect_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutPetrespectContainerItemProps {
    captionPetrespectText?: string;
    layout?: BoxLayout;
    srcPetrespectIcon?: string;
    tintPetrespectIcon?: string;
    visiblePetrespectIcon?: boolean;
    visiblePetrespectText?: boolean;
}

export const PetViewLayoutPetrespectContainerItem = ({ captionPetrespectText, layout, srcPetrespectIcon, tintPetrespectIcon, visiblePetrespectIcon, visiblePetrespectText }: PetViewLayoutPetrespectContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="petrespect_container"
            layout={{ width: 164, height: 21, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visiblePetrespectText ?? true) && (
                <ThemeText
                    text={captionPetrespectText ?? t('infostand.text.petrespect')}
                    textOptions={{ fill: '#ffffff' }}
                    name="petrespect_text"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 137, top: 5, height: 13 }}
                />
            )}
            {(visiblePetrespectIcon ?? true) && (
                <ThemeImage
                    name="petrespect_icon"
                    src={srcPetrespectIcon}
                    tint={tintPetrespectIcon}
                    layout={{ position: 'absolute', left: 0, width: 13, top: 3, height: 21 }}
                />
            )}
        </Region>
    );
};
