import { ISimpleRoomObjectData, PetType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { PetInfoMessageType } from '@nitrodevco/nitro-packets';

import { useConfigValue, useTranslation } from '#base/context/system';
import { useChatPetFace } from '#base/hooks';
import { Box, CountdownWidget, LayoutImage, Region, TemplateBindings, TemplateWindow, TemplateWindows, ThemeImage } from '#base/theme';
import { petTypeFromFigure } from '#base/utils';

import { arrangeInfostandButtons } from './infostandButtons';

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
    /** `InfoStandPetData.isOwnPet`: the pet's owner is the viewer. */
    isOwnPet: boolean;
    /** `InfoStandPetData.canRemovePet`, as `InfoStandWidgetHandler` works it out. */
    canRemovePet: boolean;
    /** `InfoStandPetView.update`'s gate on `move` and `rotate`, less its monsterplant test. */
    canMoveAndRotate: boolean;
    onRespect: () => void;
    /** `btn_pick` and `btn_kick` - both `RWUAM_PICKUP_PET`. */
    onPickUp: () => void;
    /** `btn_buy_food`: `openCatalogPage("pet_accessories")`. */
    onBuyFood: () => void;
    /** `btn_pettreat`: `RWUAM_TREAT_PET`. */
    onTreat: () => void;
    /** `btn_move` / `btn_rotate`: `RWFAM_MOVE` / `RWFUAM_ROTATE` on the pet's room object. */
    onMove: () => void;
    onRotate: () => void;
    onClose: () => void;
}

/** `InfoStandPetView.STATUS_BAR_WIDTH` / `STATUS_BAR_HEIGTH` / `STATUS_BAR_HIGHLIGHT_HEIGHT`. */
const STATUS_BAR_WIDTH = 162;
const STATUS_BAR_HEIGHT = 16;
const STATUS_BAR_HIGHLIGHT_HEIGHT = 4;
/** `STATUS_BAR_BORDER_COLOR` / `STATUS_BAR_BG_COLOR`. */
const STATUS_BAR_BORDER_COLOR = '#dadada';
const STATUS_BAR_BG_COLOR = '#3a3a3a';

interface BarColors {
    content: string;
    highlight: string;
}

/** The content and highlight colours `update` hands `updateStateElement` for each bar. */
const HAPPINESS_COLORS: BarColors = { content: '#009ac0', highlight: '#1fd1f2' };
const EXPERIENCE_COLORS: BarColors = { content: '#8547be', highlight: '#a06ad2' };
const ENERGY_COLORS: BarColors = { content: '#5e9d00', highlight: '#8ac51e' };
const WELLBEING_COLORS: BarColors = { content: '#5e9d00', highlight: '#8ac51e' };

/** `setRarityLevel`: the pet types whose rarity line shows. */
const RARITY_PET_TYPES = [ 16, 26 ];

/** `setSpecialSkillLevel`: only this pet type has a special skill. */
const SKILL_PET_TYPE = 15;

/** `updateWindow`: the border is the element list's height plus this. */
const BORDER_PADDING = 20;

/** `pet_view`'s `avatar_image` (80x83): `set image` copies the picture into a bitmap of its size. */
const AVATAR_IMAGE_WIDTH = 80;
const AVATAR_IMAGE_HEIGHT = 83;

/** `button_list`'s `CMD_BUTTON_REGION`s in child order - `arrangeButtons`' order - each holding `btn_<name>`. */
const BUTTON_REGIONS = [ 'pick', 'train', 'buy_food', 'petrespect', 'pettreat', 'kick', 'rotate', 'move' ] as const;

type ButtonRegion = typeof BUTTON_REGIONS[number];

/** The bars `update` fills: the default list's three, or the monsterplant's wellbeing. */
const DEFAULT_STATES = [ 'happiness', 'experience', 'energy' ] as const;
const MONSTERPLANT_STATES = [ 'wellbeing' ] as const;

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

/**
 * `createPercentageBar`: a 162x16 bitmap - a one-pixel `STATUS_BAR_BORDER_COLOR` frame round the
 * `STATUS_BAR_BG_COLOR` well, the content colour filled from four pixels down and the highlight
 * over the top four, both `value / max` of the inner width.
 */
const PercentageBar = ({ value, max, colors }: { value: number; max: number; colors: BarColors }) => {
    const total = Math.max(max, 1);
    const ratio = Math.min(Math.max(value, 0), total) / total;
    const innerWidth = STATUS_BAR_WIDTH - 2;
    // `fillRect` takes the rectangle's width as an integer, dropping the fraction.
    const filled = Math.trunc(ratio * innerWidth);

    return (
        <Region
            backgroundColor={STATUS_BAR_BORDER_COLOR}
            layout={{ position: 'absolute', left: 0, top: 0, width: STATUS_BAR_WIDTH, height: STATUS_BAR_HEIGHT }}
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

/**
 * The pet panel - `InfoStandPetView` drawn from its Flash template (`habbo-room-ui-com/pet_view`):
 * the pet's name and breed, its picture and level, the three bars it lives by, its respect, age
 * and owner, and the command buttons under the panel. Everything drawn that the code does not set
 * - the border, the close button, the icons, the texts' formats and places - is the layout's.
 *
 * `update` is the bindings: the texts' captions with their parameters, `showStatusContainer`
 * swapping `status_item_list_default` for `status_item_list_monsterplant` (its wellbeing as
 * `formatSeconds` of what is left, and the `countdown` widget of the time left to grow, both
 * hidden once grown - `updateStateWidget`), `setLevelText` / `updatePetRespect` hiding the level
 * and respect for a monsterplant, `setSpecialSkillLevel` showing the skill text and
 * `pet_skill_level_<getSkillLevelIndex>` only for pet type 15 under `pet.enhancements.enabled`,
 * `setRarityLevel` the rarity line for types 16 and 26, and `showButton` each command's region.
 * The bars (`createPercentageBar`), the picture (`set image`), the countdown (`CountdownWidget`,
 * never `countdown:running` in this layout, so it shows the seconds it was given) and the rarity
 * plaque (`RarityItemPreviewOverlayWidget`'s `rarity_item_overlay_preview_xml`) go into their
 * elements as children.
 *
 * `arrange` is what the code measures and moves: `updatePetRespect` puts the respect icon 2 past
 * its text, `updateStateElement` sizes each bar's bitmap to the bar, `onButtonResized` gives each
 * region its button's width, `arrangeButtons` fills `button_list` right to left within
 * `BUTTONS_MAX_WIDTH`, wrapping onto a new row, and `updateWindow` fits the element list to its
 * items, the border to the list plus 20 and the window to both, the narrower right-aligned.
 *
 * Until the info arrives the panel is the name and picture alone, with no buttons.
 *
 * What is not done, and why:
 * - `btn_train` opens Flash's `PetCommandTool` window, which the port does not have (its commands
 *   are the pet menu's rows), so the train button stays hidden;
 * - `btn_buy_food`'s `trackGoogle` has no tracking receiver here.
 */
export const InfostandPetView = ({ info, figure, posture, name, respectLeft, isOwnPet, canRemovePet, canMoveAndRotate, onRespect, onPickUp, onBuyFood, onTreat, onMove, onRotate, onClose }: InfostandPetViewProps) => {
    const t = useTranslation();
    const { texture: petTexture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction: 2 });
    // `InfoStandPetView.setSpecialSkillLevel`: `getBoolean("pet.enhancements.enabled")`.
    const petEnhancementsEnabled = useConfigValue<boolean>('pet.enhancements.enabled') === true;
    // `InfoStandPetView.update`: `type == 16`, the type from the pet's figure (`getPetType`) - not its breed.
    const petType = petTypeFromFigure(figure);
    const isMonsterplant = !!info && (petType === PetType.MONSTERPLANT);
    const showsSkill = !!info && petEnhancementsEnabled && (petType === SKILL_PET_TYPE);
    const showsRarity = RARITY_PET_TYPES.includes(petType);
    const growing = !!info && (info.remainingGrowingSeconds > 0);

    // `InfoStandPetView.update`'s `showButton` calls, `updateRespectButton` last for the respect.
    const shownButtons: Record<ButtonRegion, boolean> = info
        ? {
                pick: isMonsterplant ? canRemovePet : isOwnPet,
                train: false,
                buy_food: !isMonsterplant,
                petrespect: !isMonsterplant && (respectLeft > 0),
                pettreat: isMonsterplant && (info.energy > 0) && ((info.energy / info.maxEnergy) < 0.98),
                kick: !isMonsterplant && canRemovePet,
                rotate: isMonsterplant && canMoveAndRotate,
                move: isMonsterplant && canMoveAndRotate,
            }
        : { pick: false, train: false, buy_food: false, petrespect: false, pettreat: false, kick: false, rotate: false, move: false };

    const bindings: TemplateBindings = {
        '#close': { onPointerTap: onClose },
        name_text: { caption: info?.name.length ? info.name : name },
        // `set image`: the picture copied centred into `avatar_image`'s bitmap, cut at its edges.
        avatar_image: {
            children: petTexture && (
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: AVATAR_IMAGE_WIDTH, height: AVATAR_IMAGE_HEIGHT, overflow: 'hidden' }}>
                    <ThemeImage
                        texture={petTexture}
                        width={petTexture.width}
                        height={petTexture.height}
                        layout={{ position: 'absolute', left: Math.round((AVATAR_IMAGE_WIDTH - petTexture.width) / 2), top: Math.round((AVATAR_IMAGE_HEIGHT - petTexture.height) / 2) }}
                    />
                </Box>
            ),
        },
        level_container: { visible: !!info },
        // The buttons are `showButton`'s; each click is `onButtonClicked`'s by the button's name.
        btn_pick: { onPointerTap: onPickUp },
        btn_kick: { onPointerTap: onPickUp },
        btn_buy_food: { onPointerTap: onBuyFood },
        btn_petrespect: { onPointerTap: onRespect, caption: t('infostand.button.petrespect', '', { count: String(respectLeft) }) },
        btn_pettreat: { onPointerTap: onTreat },
        btn_move: { onPointerTap: onMove },
        btn_rotate: { onPointerTap: onRotate },
    };

    for (const region of BUTTON_REGIONS) bindings[`button_list/${region}`] = { visible: shownButtons[region] };

    if (!info) bindings.infostand_element_list = { show: [ 'name_text', 'image_container' ] };

    if (info) {
        const rarityText = t('infostand.pet.text.raritylevel', '', { level: t(`infostand.pet.raritylevel.${info.rarityLevel}`) });
        // `updateStateElement`: the value over the bar, and the bar.
        const state = (key: string, value: number, max: number, colors: BarColors, valueText?: string) => {
            bindings[`status_${key}_value_text`] = { caption: valueText ?? `${value}/${max}` };
            bindings[`status_${key}_bitmap`] = {
                children: (
                    <PercentageBar
                        value={value}
                        max={max}
                        colors={colors}
                    />
                ),
            };
        };

        Object.assign(bindings, {
            breed_text: { caption: t(`pet.breed.${petType}.${info.breedId}`) },
            level_text: { visible: !isMonsterplant, caption: t('pet.level', '', { level: String(info.level), maxlevel: String(info.maxLevel) }) },
            status_skill_text: { visible: showsSkill, caption: t(`infostand.pet.text.skill.${petType}`) },
            skill_level_indicator: { visible: showsSkill, asset: LayoutImage(`habbo-room-ui-com/pet_skill_level_${getSkillLevelIndex(info.level, info.skillTresholds)}.png`) },
            status_item_list_default: { visible: !isMonsterplant },
            status_item_list_monsterplant: { visible: isMonsterplant },
            'status_item_list_default/status_rarity_level': { visible: showsRarity, caption: rarityText },
            'status_item_list_monsterplant/status_rarity_level': { visible: showsRarity, caption: rarityText },
            growth_status_text: { visible: growing },
            growth_status_widget: {
                visible: growing,
                children: (
                    <CountdownWidget
                        seconds={info.remainingGrowingSeconds}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                ),
            },
            // `showRarityItem`: the plaque's level, set only for a level of 0 or more.
            rarity_item_overlay_widget: {
                children: (
                    <Box layout={{ position: 'absolute', left: 0, top: 0 }}>
                        <TemplateWindow
                            id="habbo-window-manager-com/rarity_item_overlay_preview_xml"
                            bindings={(info.rarityLevel >= 0) ? { level: { caption: String(info.rarityLevel) } } : undefined}
                        />
                    </Box>
                ),
            },
            petrespect_text: { visible: !isMonsterplant, caption: t('infostand.text.petrespect', '', { count: String(info.respect) }) },
            petrespect_icon: { visible: !isMonsterplant, asset: LayoutImage('habbo-room-ui-com/icon_petrespect.png') },
            age_text: { caption: t('pet.age', '', { age: String(info.age) }) },
            owner_text: { caption: t('infostand.text.petowner', '', { name: info.ownerName }) },
        } satisfies TemplateBindings);

        if (isMonsterplant) {
            state('wellbeing', info.remainingWellBeingSeconds, info.maxWellBeingSeconds, WELLBEING_COLORS, formatSeconds(info.remainingWellBeingSeconds));
        } else {
            state('happiness', info.nutrition, info.maxNutrition, HAPPINESS_COLORS);
            state('experience', info.experience, info.experienceRequiredToLevel, EXPERIENCE_COLORS);
            state('energy', info.energy, info.maxEnergy, ENERGY_COLORS);
        }
    }

    const arrange = ({ find, root }: TemplateWindows) => {
        // `updatePetRespect`: `petrespect_icon.x = petrespect_text.x + petrespect_text.width + 2`.
        const respectText = find('petrespect_container/petrespect_text');

        if (respectText) find('petrespect_container/petrespect_icon')?.setX(respectText.x + respectText.width + 2);

        // `updateStateElement`: the bitmap takes the bar's size.
        if (info) {
            for (const key of (isMonsterplant ? MONSTERPLANT_STATES : DEFAULT_STATES)) {
                const bar = find(`status_${key}_bitmap`);

                bar?.setWidth(STATUS_BAR_WIDTH);
                bar?.setHeight(STATUS_BAR_HEIGHT);
            }
        }

        const buttons = find('button_list');

        if (buttons) {
            // `createWindow` / `onButtonResized` and `arrangeButtons`, in child order.
            arrangeInfostandButtons(buttons, find, BUTTON_REGIONS, name => `btn_${name}`);
        }

        // `updateWindow`: the list to its items, the border to the list, the window to them both.
        const list = find('infostand_element_list');
        const border = find('info_border');
        const window = root();

        if (!list || !border || !window || !buttons) return;

        list.setHeight(list.scrollableRegion.height);
        border.setHeight(list.height + BORDER_PADDING);
        window.setWidth(Math.max(border.width, buttons.width));
        window.setHeight(window.scrollableRegion.height);

        if (border.width < buttons.width) {
            border.setX(window.width - border.width);
            buttons.setX(0);
        } else {
            buttons.setX(window.width - buttons.width);
            border.setX(0);
        }
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/pet_view"
            bindings={bindings}
            arrange={arrange}
        />
    );
};
