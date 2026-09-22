import { ISimpleRoomObjectData, PetType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { PetInfoMessageType } from '@nitrodevco/nitro-packets';

import { useConfigValue, useTranslation } from '#base/context/system';
import { useChatPetFace } from '#base/hooks';
import { Border, Box, Button, CloseButton, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
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
    /** How many pet respects the viewer has left today. */
    respectLeft: number;
    onRespect: () => void;
    onClose: () => void;
}

/** `InfoStandPetView.STATUS_BAR_WIDTH` / `STATUS_BAR_HEIGTH` / `STATUS_BAR_HIGHLIGHT_HEIGHT`. */
const STATUS_BAR_WIDTH = 162;
const STATUS_BAR_HEIGHT = 16;
const STATUS_BAR_HIGHLIGHT_HEIGHT = 4;
/** `STATUS_BAR_BORDER_COLOR` / `STATUS_BAR_BG_COLOR`. */
const STATUS_BAR_BORDER_COLOR = '#dadada';
const STATUS_BAR_BG_COLOR = '#3a3a3a';

/** The content and highlight colours `update` hands `updateStateElement` for each bar. */
const HAPPINESS_COLORS = { content: '#009ac0', highlight: '#1fd1f2' };
const EXPERIENCE_COLORS = { content: '#8547be', highlight: '#a06ad2' };
const ENERGY_COLORS = { content: '#5e9d00', highlight: '#8ac51e' };
const WELLBEING_COLORS = { content: '#5e9d00', highlight: '#8ac51e' };

/** `setRarityLevel`: the pet types whose rarity line shows. */
const RARITY_PET_TYPES = [ 16, 26 ];

/** `setSpecialSkillLevel`: only this pet type has a special skill. */
const SKILL_PET_TYPE = 15;

/** `InfoStandPetView.BUTTONS_MAX_WIDTH` / `BUTTON_HEIGHT` / `BUTTON_MARGIN`. */
const BUTTONS_MAX_WIDTH = 250;
const BUTTON_HEIGHT = 25;
const BUTTON_MARGIN = 5;

/** `infostand_element_list` is 173 wide; its rows are centred on it (`params` 208). */
const LIST_WIDTH = 173;

/**
 * `InfoStandPetView.getSkillLevelIndex`: how many of the pet's positive skill thresholds its
 * level has reached - the `n` of `pet_skill_level_<n>`, 0 to 4.
 */
const getSkillLevelIndex = (level: number, thresholds: number[]) => thresholds.filter(threshold => (threshold > 0) && (level >= threshold)).length;

/** `formatSeconds` (`InfoStandPetView`'s helper): `h:mm:ss`. */
const formatSeconds = (value: number) => {
    const total = Math.max(0, Math.floor(value));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - (hours * 3600)) / 60);
    const seconds = total - (hours * 3600) - (minutes * 60);

    return `${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
};

/** A centred, auto-sized white text - the list's `params="208"` texts. */
const CentredText = ({ text, fill = '#ffffff', name, layout }: { text: string; fill?: string; name?: string; layout?: { marginTop?: number; marginBottom?: number; height?: number } }) => (
    <ThemeText
        text={text}
        textOptions={{ fill }}
        flashFormat={{ antiAliasType: 'advanced' }}
        name={name}
        verticalAlign="top"
        layout={{ alignSelf: 'center', flexShrink: 0, ...layout }}
    />
);

/**
 * `createPercentageBar`: a 162x16 bitmap - a one-pixel `STATUS_BAR_BORDER_COLOR` frame round the
 * `STATUS_BAR_BG_COLOR` well, the content colour filled from four pixels down and the highlight
 * over the top four, both `value / max` of the inner width.
 */
const PercentageBar = ({ value, max, colors }: { value: number; max: number; colors: { content: string; highlight: string } }) => {
    const total = Math.max(max, 1);
    const ratio = Math.min(Math.max(value, 0), total) / total;
    const innerWidth = STATUS_BAR_WIDTH - 2;
    // `fillRect` takes the rectangle's width as an integer, dropping the fraction.
    const filled = Math.trunc(ratio * innerWidth);

    return (
        <Region
            backgroundColor={STATUS_BAR_BORDER_COLOR}
            layout={{ position: 'absolute', left: 6, top: 17, width: STATUS_BAR_WIDTH, height: STATUS_BAR_HEIGHT }}
        >
            <Region
                backgroundColor={STATUS_BAR_BG_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: innerWidth, height: STATUS_BAR_HEIGHT - 2 }}
            />
            {(filled > 0) && (
                <>
                    <Region
                        backgroundColor={colors.content}
                        layout={{ position: 'absolute', left: 1, top: 1 + STATUS_BAR_HIGHLIGHT_HEIGHT, width: filled, height: STATUS_BAR_HEIGHT - 2 - STATUS_BAR_HIGHLIGHT_HEIGHT }}
                    />
                    <Region
                        backgroundColor={colors.highlight}
                        layout={{ position: 'absolute', left: 1, top: 1, width: filled, height: STATUS_BAR_HIGHLIGHT_HEIGHT }}
                    />
                </>
            )}
        </Region>
    );
};

/** One `status_<state>_container` (169x34): the label, the bar, its value over it and the icon. */
const StatusBar = ({ label, icon, value, max, colors, valueText }: { label: string; icon: string; value: number; max: number; colors: { content: string; highlight: string }; valueText?: string }) => (
    <Box layout={{ width: 169, height: 34, flexShrink: 0 }}>
        <Box layout={{ position: 'absolute', left: 0, top: 1, width: 169, flexDirection: 'row', justifyContent: 'center' }}>
            <ThemeText
                text={label}
                textOptions={{ fill: '#ffffff' }}
                flashFormat={{ antiAliasType: 'advanced' }}
                verticalAlign="top"
            />
        </Box>
        <PercentageBar
            value={value}
            max={max}
            colors={colors}
        />
        <Box layout={{ position: 'absolute', left: 0, top: 18, width: 169, flexDirection: 'row', justifyContent: 'center' }}>
            <ThemeText
                text={valueText ?? `${value}/${max}`}
                textOptions={{ fill: '#ffffff' }}
                flashFormat={{ antiAliasType: 'advanced' }}
                verticalAlign="top"
            />
        </Box>
        <ThemeImage
            src={icon}
            layout={{ position: 'absolute', left: 0, top: 16, width: 18, height: 18 }}
        />
    </Box>
);

/**
 * The pet panel - `InfoStandPetView` on the `pet_view` layout (190 wide): the pet's name and
 * breed, its picture and level, the three bars it lives by, its respect, age and owner, and the
 * respect button under the panel.
 *
 * A monsterplant is the odd one out - `status_item_list_monsterplant` swaps the bars for its
 * wellbeing (shown as `formatSeconds` of what is left) and how long it has left to grow, and it
 * has no level or respect line.
 *
 * The rows are `infostand_element_list` (an `itemlist_vertical` at 10,10, 173 wide, no spacing)
 * and the border is the list's height plus 20 (`updateWindow`), so the list is a column here.
 * `button_list` is `BUTTONS_MAX_WIDTH` wide and filled right to left in child order
 * (`arrangeButtons`).
 *
 * `updatePetRespect` puts `petrespect_icon` (`icon_petrespect`, 13x21) 2 after the centred
 * respect text, at the layout's y 3 - its bottom 3 rows cut by the 21-high container - and hides
 * both for a monsterplant. `setSpecialSkillLevel` fills `skill_level_indicator` (78x18 at 8,47 of
 * `level_container`) with `pet_skill_level_<getSkillLevelIndex>` and shows it, with the skill
 * text, only for pet type 15 under `pet.enhancements.enabled`.
 *
 * What is not drawn, and why:
 * - the pick up, train, buy food, treat, kick, move and rotate buttons: the port has no command
 *   behind any of them yet, so only the respect button is in the list;
 * - `growth_status_widget` is Flash's `countdown` widget, which the theme does not have: the
 *   time left is `formatSeconds` text in its 99x37 slot;
 * - `rarity_item_overlay_widget` (`rarity_item_overlay_preview`) has no theme widget either; its
 *   40x28 slot is kept empty so the rows below stay where Flash puts them.
 */
export const InfostandPetView = ({ info, figure, posture, name, respectLeft, onRespect, onClose }: InfostandPetViewProps) => {
    const t = useTranslation();
    const { texture: petTexture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction: 2 });
    // `InfoStandPetView.setSpecialSkillLevel`: `getBoolean("pet.enhancements.enabled")`.
    const petEnhancementsEnabled = useConfigValue<boolean>('pet.enhancements.enabled') === true;
    // `InfoStandPetView.update`: `type == 16`, the type from the pet's figure (`getPetType`) - not its breed.
    const petType = petTypeFromFigure(figure);
    const isMonsterplant = !!info && (petType === PetType.MONSTERPLANT);
    const showsSkill = petEnhancementsEnabled && (petType === SKILL_PET_TYPE);
    const showsRarity = !!info && RARITY_PET_TYPES.includes(petType);
    const rarityText = info ? t('infostand.pet.text.raritylevel', '', { level: t(`infostand.pet.raritylevel.${info.rarityLevel}`) }) : '';
    // `updateRespectButton`: shown while respects are left, never for a monsterplant.
    const showsRespectButton = !!info && !isMonsterplant && (respectLeft > 0);

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <Border
                variant="1"
                name="info_border"
                layout={{ width: 190, flexShrink: 0, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
            >
                <CloseButton
                    variant="1"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 170, top: 6, width: 18, height: 16 }}
                />
                <Box layout={{ flexDirection: 'column', width: LIST_WIDTH }}>
                    <ThemeText
                        text={info?.name.length ? info.name : name}
                        textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold' }}
                        flashFormat={{ antiAliasType: 'advanced' }}
                        name="name_text"
                        verticalAlign="top"
                        layout={{ alignSelf: 'center', flexShrink: 0 }}
                    />
                    {!!info && (
                        <CentredText
                            text={t(`pet.breed.${petType}.${info.breedId}`)}
                            name="breed_text"
                        />
                    )}
                    <Box layout={{ width: 163, height: 83, flexShrink: 0, overflow: 'hidden' }}>
                        {/* `set image`: the picture copied centred into the 80x83 `avatar_image`, cut at its edges. */}
                        <Box layout={{ position: 'absolute', left: 0, top: 0, width: 80, height: 83, overflow: 'hidden' }}>
                            {petTexture && (
                                <pixiSprite
                                    texture={petTexture}
                                    layout={{ position: 'absolute', left: Math.round((80 - petTexture.width) / 2), top: Math.round((83 - petTexture.height) / 2), width: petTexture.width, height: petTexture.height }}
                                />
                            )}
                        </Box>
                        {!!info && (
                            <Box layout={{ position: 'absolute', left: 76, top: 0, width: 95, height: 78, flexDirection: 'column' }}>
                                {!isMonsterplant && (
                                    <CentredText
                                        text={t('pet.level', '', { level: String(info.level), maxlevel: String(info.maxLevel) })}
                                        name="level_text"
                                        layout={{ marginTop: 10 }}
                                    />
                                )}
                                {showsSkill && (
                                    <ThemeText
                                        text={t(`infostand.pet.text.skill.${petType}`)}
                                        textOptions={{ fill: '#a4a4a4' }}
                                        flashFormat={{ antiAliasType: 'advanced' }}
                                        name="status_skill_text"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', top: 31, alignSelf: 'center' }}
                                    />
                                )}
                                {showsSkill && (
                                    <ThemeImage
                                        name="skill_level_indicator"
                                        src={LayoutImage(`room-ui/pet_skill_level_${getSkillLevelIndex(info.level, info.skillTresholds)}.png`)}
                                        bitmap={{}}
                                        layout={{ position: 'absolute', left: 8, top: 47, width: 78, height: 18 }}
                                    />
                                )}
                            </Box>
                        )}
                    </Box>
                    {!!info && (
                        <Box layout={{ width: 170, height: 140, flexShrink: 0, overflow: 'hidden' }}>
                            {!isMonsterplant && (
                                <Box layout={{ flexDirection: 'column', width: 170 }}>
                                    <StatusBar
                                        label={t('infostand.pet.text.happiness')}
                                        icon={LayoutImage('room-ui/icon_pet_happiness.png')}
                                        value={info.nutrition}
                                        max={info.maxNutrition}
                                        colors={HAPPINESS_COLORS}
                                    />
                                    <StatusBar
                                        label={t('infostand.pet.text.experience')}
                                        icon={LayoutImage('room-ui/icon_pet_experience.png')}
                                        value={info.experience}
                                        max={info.experienceRequiredToLevel}
                                        colors={EXPERIENCE_COLORS}
                                    />
                                    <StatusBar
                                        label={t('infostand.pet.text.energy')}
                                        icon={LayoutImage('room-ui/icon_pet_energy.png')}
                                        value={info.energy}
                                        max={info.maxEnergy}
                                        colors={ENERGY_COLORS}
                                    />
                                    {showsRarity && (
                                        // `status_rarity_level`: `margin_top` 5, 18 high, centred on the 170-wide list.
                                        <Box layout={{ width: 170, height: 18, flexShrink: 0, flexDirection: 'row', justifyContent: 'center', paddingTop: 5 }}>
                                            <ThemeText
                                                text={rarityText}
                                                textOptions={{ fill: '#ffffff' }}
                                                flashFormat={{ antiAliasType: 'advanced' }}
                                                name="status_rarity_level"
                                                verticalAlign="top"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            )}
                            {isMonsterplant && (
                                <Box layout={{ flexDirection: 'column', width: 170, gap: 2 }}>
                                    <StatusBar
                                        label={t('infostand.pet.text.wellbeing')}
                                        icon={LayoutImage('room-ui/icon_pet_wellbeing.png')}
                                        value={info.remainingWellBeingSeconds}
                                        max={info.maxWellBeingSeconds}
                                        colors={WELLBEING_COLORS}
                                        valueText={formatSeconds(info.remainingWellBeingSeconds)}
                                    />
                                    {/* `updateStateWidget`: the growth label and countdown go once it has grown. */}
                                    {(info.remainingGrowingSeconds > 0) && (
                                        <>
                                            <CentredText
                                                text={t('infostand.pet.text.growth')}
                                                name="growth_status_text"
                                                layout={{ marginBottom: 2 }}
                                            />
                                            <Box layout={{ width: 99, height: 37, flexShrink: 0, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <ThemeText
                                                    text={formatSeconds(info.remainingGrowingSeconds)}
                                                    textOptions={{ fill: '#ffffff' }}
                                                    flashFormat={{ antiAliasType: 'advanced' }}
                                                />
                                            </Box>
                                        </>
                                    )}
                                    {showsRarity && (
                                        // `status_rarity_level`: `margin_top` -2 over a 15-high field.
                                        <Box layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', justifyContent: 'center', overflow: 'hidden' }}>
                                            <ThemeText
                                                text={rarityText}
                                                textOptions={{ fill: '#ffffff' }}
                                                flashFormat={{ antiAliasType: 'advanced' }}
                                                name="status_rarity_level"
                                                verticalAlign="top"
                                                layout={{ marginTop: -2 }}
                                            />
                                        </Box>
                                    )}
                                    <Box layout={{ width: 40, height: 28, marginLeft: 67, flexShrink: 0 }} />
                                </Box>
                            )}
                        </Box>
                    )}
                    {!!info && (
                        <Box layout={{ width: 164, height: 21, flexShrink: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
                            {!isMonsterplant && (
                                <>
                                    <ThemeText
                                        text={t('infostand.text.petrespect', '', { count: String(info.respect) })}
                                        textOptions={{ fill: '#ffffff' }}
                                        flashFormat={{ antiAliasType: 'advanced' }}
                                        name="petrespect_text"
                                        verticalAlign="top"
                                        layout={{ marginTop: 5 }}
                                    />
                                    {/* `updatePetRespect`: `text.x + text.width + 2`; the negative right margin keeps the text alone centred. */}
                                    <ThemeImage
                                        name="petrespect_icon"
                                        src={LayoutImage('room-ui/icon_petrespect.png')}
                                        bitmap={{}}
                                        layout={{ width: 13, height: 21, marginLeft: 2, marginRight: -15, marginTop: 3, flexShrink: 0 }}
                                    />
                                </>
                            )}
                        </Box>
                    )}
                    {!!info && (
                        <>
                            <CentredText
                                text={t('pet.age', '', { age: String(info.age) })}
                                name="age_text"
                            />
                            <CentredText
                                text={t('infostand.text.petowner', '', { name: info.ownerName })}
                                name="owner_text"
                            />
                        </>
                    )}
                </Box>
            </Border>
            <Box layout={{ flexDirection: 'row-reverse', flexWrap: 'wrap', width: BUTTONS_MAX_WIDTH, minHeight: BUTTON_HEIGHT, columnGap: BUTTON_MARGIN, rowGap: BUTTON_MARGIN }}>
                {showsRespectButton && (
                    <Button
                        variant="1"
                        name="btn_petrespect"
                        textStyle="button_regular"
                        onPointerTap={onRespect}
                        layout={{ height: BUTTON_HEIGHT, flexShrink: 0 }}
                    >
                        {t('infostand.button.petrespect', '', { count: String(respectLeft) })}
                    </Button>
                )}
            </Box>
        </Box>
    );
};
