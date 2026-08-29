import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `907_pet_commands_xml` (layout "pet_commands", 195x462) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetCommandsLayoutProps {
    captionPetName?: string;
    commandsContainer?: PetCommandsLayoutCommandsContainerProps;
    imageContainer?: PetCommandsLayoutImageContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    statusSkillContainer?: PetCommandsLayoutStatusSkillContainerProps;
}

export const PetCommandsLayout = ({ captionPetName, commandsContainer, imageContainer, layout, onClose, statusSkillContainer }: PetCommandsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tags={[ 'pet_commands' ]}
            params={32801}
            caption={t('widgets.pet.commands.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 195, height: 462, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <PetCommandsLayoutImageContainer {...imageContainer} />
                <Region
                    name="pet_name"
                    params={16}
                    layout={{ position: 'absolute', left: 76, width: 159, top: 43, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPetName ?? t('widgets.pet.commands.title')} />
                </Region>
                <PetCommandsLayoutCommandsContainer {...commandsContainer} />
                <PetCommandsLayoutStatusSkillContainer {...statusSkillContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `image_container` of PetCommandsLayout - configured through the parent's `imageContainer` prop. */
export interface PetCommandsLayoutImageContainerProps {
    layout?: BoxLayout;
    onImageContainer?: () => void;
    srcAvatarImage?: string;
}

export const PetCommandsLayoutImageContainer = ({ layout, onImageContainer, srcAvatarImage }: PetCommandsLayoutImageContainerProps) => {
    return (
        <Region
            name="image_container"
            params={17}
            onPointerTap={onImageContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 71, top: 7, height: 90, ...layout }}
        >
            <ThemeImage
                name="avatar_image"
                params={17}
                src={srcAvatarImage}
                layout={{ position: 'absolute', left: 0, width: 71, top: 0, height: 90 }}
            />
        </Region>
    );
};

/** Named region `commands_container` of PetCommandsLayout - configured through the parent's `commandsContainer` prop. */
export interface PetCommandsLayoutCommandsContainerProps {
    layout?: BoxLayout;
    onPetCommandTemplate?: () => void;
}

export const PetCommandsLayoutCommandsContainer = ({ layout, onPetCommandTemplate }: PetCommandsLayoutCommandsContainerProps) => {
    return (
        <Region
            name="commands_container"
            params={16}
            layout={{ position: 'absolute', left: 6, width: 170, top: 103, height: 279, ...layout }}
        >
            <Button
                variant="3"
                name="pet_command_template"
                params={131089}
                onPointerTap={onPetCommandTemplate}
                layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 22, minWidth: 84, maxWidth: 84 }}
            />
        </Region>
    );
};

/** Named region `status_skill_container` of PetCommandsLayout - configured through the parent's `statusSkillContainer` prop. */
export interface PetCommandsLayoutStatusSkillContainerProps {
    captionStatusSkillText?: string;
    captionStatusSkillValueText?: string;
    layout?: BoxLayout;
    onStatusSkillContainer?: () => void;
    srcStatusSkillBitmap?: string;
    srcStatusSkillIcon?: string;
}

export const PetCommandsLayoutStatusSkillContainer = ({ captionStatusSkillText, captionStatusSkillValueText, layout, onStatusSkillContainer, srcStatusSkillBitmap, srcStatusSkillIcon }: PetCommandsLayoutStatusSkillContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_skill_container"
            params={787473}
            onPointerTap={onStatusSkillContainer}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -8, marginRight: 8, width: 169, bottom: 42, height: 20, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="status_skill_bitmap"
                params={16}
                src={srcStatusSkillBitmap}
                layout={{ position: 'absolute', left: 6, width: 162, top: 1, height: 17 }}
            />
            <Region
                name="status_skill_value_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 2, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionStatusSkillValueText ?? ''} />
            </Region>
            <ThemeImage
                name="status_skill_icon"
                params={16}
                src={srcStatusSkillIcon ?? layoutImage('icon_pet_experience.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
            <Region
                name="status_skill_text"
                params={208}
                visible={false}
                layout={{ position: 'absolute', width: 155, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionStatusSkillText ?? t('infostand.pet.text.skill.next')} />
            </Region>
        </Region>
    );
};
