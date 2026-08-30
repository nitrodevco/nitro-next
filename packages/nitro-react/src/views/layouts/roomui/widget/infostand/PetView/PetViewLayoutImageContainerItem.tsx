import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `image_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutImageContainerItemProps {
    captionLevelText?: string;
    captionStatusSkillText?: string;
    layout?: BoxLayout;
    srcAvatarImage?: string;
    srcSkillLevelIndicator?: string;
    tintAvatarImage?: string;
    tintSkillLevelIndicator?: string;
    visibleAvatarImage?: boolean;
    visibleLevelContainer?: boolean;
    visibleLevelText?: boolean;
    visibleSkillLevelIndicator?: boolean;
    visibleStatusSkillText?: boolean;
}

export const PetViewLayoutImageContainerItem = ({ captionLevelText, captionStatusSkillText, layout, srcAvatarImage, srcSkillLevelIndicator, tintAvatarImage, tintSkillLevelIndicator, visibleAvatarImage, visibleLevelContainer, visibleLevelText, visibleSkillLevelIndicator, visibleStatusSkillText }: PetViewLayoutImageContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="image_container"
            layout={{ width: 163, height: 83, flexShrink: 0, maxWidth: 163, ...layout }}
        >
            {(visibleAvatarImage ?? true) && (
                <ThemeImage
                    name="avatar_image"
                    src={srcAvatarImage}
                    tint={tintAvatarImage}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 83, maxWidth: 80 }}
                />
            )}
            {(visibleLevelContainer ?? true) && (
                <Region
                    name="level_container"
                    layout={{ position: 'absolute', left: 76, width: 95, top: 0, height: 78, justifyContent: 'center' }}
                >
                    {(visibleLevelText ?? true) && (
                        <ThemeText
                            text={captionLevelText ?? t('pet.level')}
                            textOptions={{ fill: '#ffffff' }}
                            name="level_text"
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 46, top: 10, height: 13 }}
                        />
                    )}
                    {(visibleStatusSkillText ?? true) && (
                        <ThemeText
                            text={captionStatusSkillText ?? t('infostand.pet.text.skill')}
                            textOptions={{ fill: '#a4a4a4' }}
                            name="status_skill_text"
                            layout={{ position: 'absolute', marginLeft: 11, marginRight: -11, width: 117, top: 31, height: 13 }}
                        />
                    )}
                    {(visibleSkillLevelIndicator ?? true) && (
                        <ThemeImage
                            name="skill_level_indicator"
                            src={srcSkillLevelIndicator}
                            tint={tintSkillLevelIndicator}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 78, top: 47, height: 18 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
