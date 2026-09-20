import { ISimpleRoomObjectData, PetType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { PetInfoMessageType } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { useChatPetFace } from '#base/hooks';
import { Border, Box, CloseButton, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { petTypeFromFigure } from '#base/utils';

export interface InfostandPetViewProps {
    objectData: ISimpleRoomObjectData;
    /** What the server has said about this pet, once it has been asked. */
    info: PetInfoMessageType | undefined;
    /** The pet's own figure string, so the panel can draw it while the info is still coming. */
    figure: string;
    posture: string;
    /** The pet's name, which the room knows before the info arrives. */
    name: string;
    /** Whether the viewer may still give this pet respect today. */
    canRespect: boolean;
    onRespect: () => void;
    onClose: () => void;
}

/** `pet_view` - the panel is 190 wide with a 163-wide column inside it. */
const PANEL_WIDTH = 190;
const BAR_WIDTH = 162;

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

/** `infostand.pet.text.wellbeing` counts down in days and hours rather than raw seconds. */
const formatDuration = (seconds: number) => {
    const total = Math.max(0, seconds);
    const days = Math.floor(total / (SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY));
    const hours = Math.floor((total / (SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) % HOURS_PER_DAY);

    return days ? `${days}d ${hours}h` : `${hours}h`;
};

/** One of the pet's bars: a label, the fill, and the numbers beside it. */
const StatusBar = ({ label, icon, value, max }: { label: string; icon: string; value: number; max: number }) => {
    const filled = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;

    return (
        <Region layout={{ width: 169, height: 34, flexShrink: 0 }}>
            <ThemeText
                text={label}
                textOptions={{ fill: '#ffffff' }}
                layout={{ position: 'absolute', left: 0, width: 135, top: 1, height: 13 }}
            />
            <ThemeImage
                src={icon}
                layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
            />
            <Region
                backgroundColor="#1e1e1e"
                layout={{ position: 'absolute', left: 20, width: BAR_WIDTH - 20, top: 19, height: 12 }}
            >
                <Region
                    backgroundColor="#00a800"
                    layout={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${filled * 100}%` }}
                />
            </Region>
            <ThemeText
                text={`${value}/${max}`}
                textOptions={{ fill: '#ffffff' }}
                layout={{ position: 'absolute', left: 24, top: 19, height: 12 }}
            />
        </Region>
    );
};

/**
 * The pet panel, on the `pet_view` layout (190 wide): the pet itself, its level and skill, the
 * three bars it lives by, and who owns it.
 *
 * A monsterplant is the odd one out - `status_item_list_monsterplant` swaps the happiness and
 * energy bars for its wellbeing and how long it has left to grow.
 *
 * The texts are the layout's own: `level_text` is `${pet.level}` (`%level%`, `%maxlevel%`),
 * `petrespect_text` `${infostand.text.petrespect}` (`%count%`), `age_text` `${pet.age}` (`%age%`)
 * and `growth_status_text` the fixed `${infostand.pet.text.growth}` label above
 * `growth_status_widget`, Flash's countdown; both are hidden once the plant has grown
 * (`InfoStandPetView.updateStateWidget`). The port draws the countdown as `formatDuration` text.
 */
export const InfostandPetView = ({ info, figure, posture, name, canRespect, onRespect, onClose }: InfostandPetViewProps) => {
    const t = useTranslation();
    const { texture: petTexture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction: 2 });
    // `InfoStandPetView.update`: `type == 16`, the type from the pet's figure (`getPetType`) - not its breed.
    // A monsterplant shows its wellbeing and growth rather than the usual three bars.
    const isMonsterplant = !!info && (petTypeFromFigure(figure) === PetType.MONSTERPLANT);

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border
                variant="1"
                name="info_border"
                layout={{ flexDirection: 'column', width: PANEL_WIDTH, gap: 4, padding: 10 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <ThemeText
                        text={info?.name.length ? info.name : name}
                        textStyle="text-style-button-bold"
                        name="name_text"
                        layout={{ flex: 1 }}
                    />
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ flexShrink: 0 }}
                    />
                </Box>
                {!!info && (
                    <ThemeText
                        text={t(`pet.breed.${info.breedId}`, '')}
                        textOptions={{ fill: '#a4a4a4' }}
                        name="breed_text"
                    />
                )}
                <Region layout={{ width: 163, height: 83, flexShrink: 0 }}>
                    {petTexture && (
                        <pixiSprite
                            texture={petTexture}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    )}
                    {!!info && (
                        <Region
                            name="level_container"
                            layout={{ position: 'absolute', left: 76, width: 95, top: 0, height: 78 }}
                        >
                            <ThemeText
                                text={t('pet.level', '', { level: String(info.level), maxlevel: String(info.maxLevel) })}
                                textOptions={{ fill: '#ffffff' }}
                                name="level_text"
                                layout={{ position: 'absolute', left: 0, top: 10, height: 13 }}
                            />
                            <ThemeText
                                text={t('infostand.pet.text.skill')}
                                textOptions={{ fill: '#a4a4a4' }}
                                name="status_skill_text"
                                layout={{ position: 'absolute', left: 0, top: 31, height: 13 }}
                            />
                        </Region>
                    )}
                </Region>
                {!info && (
                    <ThemeText
                        text={t('generic.loading', '...')}
                        textOptions={{ fill: '#a4a4a4' }}
                    />
                )}
                {!!info && !isMonsterplant && (
                    <>
                        <StatusBar
                            label={t('infostand.pet.text.happiness')}
                            icon={LayoutImage('room-ui/icon_pet_happiness.png')}
                            value={info.nutrition}
                            max={info.maxNutrition}
                        />
                        <StatusBar
                            label={t('infostand.pet.text.experience')}
                            icon={LayoutImage('room-ui/icon_pet_experience.png')}
                            value={info.experience}
                            max={info.experienceRequiredToLevel}
                        />
                        <StatusBar
                            label={t('infostand.pet.text.energy')}
                            icon={LayoutImage('room-ui/icon_pet_energy.png')}
                            value={info.energy}
                            max={info.maxEnergy}
                        />
                    </>
                )}
                {!!info && isMonsterplant && (
                    <>
                        <StatusBar
                            label={t('infostand.pet.text.wellbeing')}
                            icon={LayoutImage('room-ui/icon_pet_wellbeing.png')}
                            value={info.remainingWellBeingSeconds}
                            max={info.maxWellBeingSeconds}
                        />
                        {(info.remainingGrowingSeconds > 0) && (
                            <>
                                <ThemeText
                                    text={t('infostand.pet.text.growth')}
                                    textOptions={{ fill: '#ffffff' }}
                                    name="growth_status_text"
                                />
                                <ThemeText
                                    text={formatDuration(info.remainingGrowingSeconds)}
                                    textOptions={{ fill: '#ffffff' }}
                                    name="growth_status_widget"
                                />
                            </>
                        )}
                    </>
                )}
                {!!info && (
                    <>
                        <Region
                            name="petrespect_container"
                            onPointerTap={canRespect ? onRespect : undefined}
                            cursor={canRespect ? 'pointer' : undefined}
                            layout={{ width: 164, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 4 }}
                        >
                            <ThemeText
                                text={t('infostand.text.petrespect', '', { count: String(info.respect) })}
                                textOptions={{ fill: canRespect ? '#ffffff' : '#a4a4a4' }}
                                name="petrespect_text"
                            />
                        </Region>
                        <ThemeText
                            text={t('pet.age', '', { age: String(info.age) })}
                            textOptions={{ fill: '#a4a4a4' }}
                            name="age_text"
                        />
                        <ThemeText
                            text={t('infostand.text.petowner', 'Owner: %name%', { name: info.ownerName })}
                            textOptions={{ fill: '#a4a4a4' }}
                            name="owner_text"
                        />
                    </>
                )}
            </Border>
        </Box>
    );
};
