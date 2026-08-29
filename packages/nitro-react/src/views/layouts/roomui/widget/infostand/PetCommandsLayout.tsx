import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `907_pet_commands_xml` (layout "pet_commands", 195x462) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetCommandsLayoutProps {
    captionPetName?: string;
    captionStatusSkillText?: string;
    captionStatusSkillValueText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onImageContainer?: () => void;
    onPetCommandTemplate?: () => void;
    onStatusSkillContainer?: () => void;
    srcAvatarImage?: string;
    srcStatusSkillBitmap?: string;
    srcStatusSkillIcon?: string;
    tintAvatarImage?: string;
    tintStatusSkillBitmap?: string;
    tintStatusSkillIcon?: string;
    visibleStatusSkillText?: boolean;
}

export const PetCommandsLayout = ({ captionPetName, captionStatusSkillText, captionStatusSkillValueText, layout, onClose, onImageContainer, onPetCommandTemplate, onStatusSkillContainer, srcAvatarImage, srcStatusSkillBitmap, srcStatusSkillIcon, tintAvatarImage, tintStatusSkillBitmap, tintStatusSkillIcon, visibleStatusSkillText }: PetCommandsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widgets.pet.commands.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 195, height: 462, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="image_container"
                    onPointerTap={onImageContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 71, top: 7, height: 90 }}
                >
                    <ThemeImage
                        name="avatar_image"
                        src={srcAvatarImage}
                        tint={tintAvatarImage}
                        layout={{ position: 'absolute', left: 0, width: 71, top: 0, height: 90 }}
                    />
                </Region>
                <Region
                    name="pet_name"
                    layout={{ position: 'absolute', left: 76, width: 159, top: 43, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPetName ?? t('widgets.pet.commands.title')}
                </Region>
                <Region
                    name="commands_container"
                    layout={{ position: 'absolute', left: 6, width: 170, top: 103, height: 279 }}
                >
                    <Button
                        variant="3"
                        name="pet_command_template"
                        onPointerTap={onPetCommandTemplate}
                        layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 22, minWidth: 84, maxWidth: 84 }}
                    />
                </Region>
                <Region
                    name="status_skill_container"
                    onPointerTap={onStatusSkillContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -8, marginRight: 8, width: 169, bottom: 42, height: 20, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="status_skill_bitmap"
                        src={srcStatusSkillBitmap}
                        tint={tintStatusSkillBitmap}
                        layout={{ position: 'absolute', left: 6, width: 162, top: 1, height: 17 }}
                    />
                    <Region
                        name="status_skill_value_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 2, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionStatusSkillValueText ?? ''}
                    </Region>
                    <ThemeImage
                        name="status_skill_icon"
                        src={srcStatusSkillIcon ?? layoutImage('icon_pet_experience.png')}
                        tint={tintStatusSkillIcon}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                    {(visibleStatusSkillText ?? false) && (
                        <Region
                            name="status_skill_text"
                            layout={{ position: 'absolute', width: 155, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionStatusSkillText ?? t('infostand.pet.text.skill.next')}
                        </Region>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
