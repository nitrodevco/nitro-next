/**
 * The pet training window - `PetCommandTool`: `pet_commands`, at 100,70, opened by its owner's
 * `train` (`openTrainingView`) on that pet.
 * - `avatar_image` the pet's picture centred, `pet_name` its name; a click on the picture asks for
 *   the pet's info again (`RWUAM_REQUEST_PET_UPDATE`).
 * - `commands_container`: a clone of `pet_command_template` per command the pet has
 *   (`allCommandIds`), two to a row 86 apart, rows 25 apart, each `pet.command.<id>`, enabled when
 *   the pet can do it; all disabled until the commands are in (`requestEnabledCommands`). A press
 *   speaks `<name> <command>` at the pet as chat (`RWPCM_PET_COMMAND`) and disables every button for
 *   1.1 s (`BUTTONS_DISABLED_MS`). The container is as tall as its rows, the window that plus 160 -
 *   180 with `pet.enhancements.enabled`.
 * - `status_skill_container` only for a horse with `pet.enhancements.enabled` (`updateStateElement`):
 *   `(level - lower + experience share) * 100` of `(upper - lower) * 100`, as text and as a 162 x 16
 *   bar (border 0xDADADA, background 0x3A3A3A, the share in 0x8547BE under a 4 px 0xA06AD2 strip).
 * - The header's close hides it.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { requestPetCommands, requestPetInfo, sayChat } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetCommands, useRoomPetInfo, useRoomUserByObjectId } from '#base/context/room';
import { useConfigBoolean, useIsWindowVisible, useTranslation, useWindowActions, useWindowParams } from '#base/context/system';
import { useChatPetFace } from '#base/hooks';
import { Box, TemplateItem, TemplateWindow, TemplateWindows, ThemeImage, useTemplateFrame } from '#base/theme';
import { petTypeFromFigure } from '#base/utils';
import { PET_EXPERIENCE_BAR_COLORS, PetPercentageBar } from '#base/views/shared/PetPercentageBar';

const DEFAULT_POSITION = { x: 100, y: 70 };
const BUTTONS_DISABLED_MS = 1100;
const COLUMN_X = 86;
const ROW_HEIGHT = 25;
/** `pet_commands`' `avatar_image`. */
const IMAGE_WIDTH = 71;
const IMAGE_HEIGHT = 90;
const PET_TYPE_HORSE = 15;

/** `getLowerSkillTreshold`: the last threshold not above the level. */
const lowerThreshold = (level: number, thresholds: number[]) => {
    let lower = 0;

    for (const threshold of thresholds) {
        if (threshold > level) break;

        lower = threshold;
    }

    return lower;
};

/** `getUpperSkillTreshold`: the threshold after the lower one, or the lower one when it is the last. */
const upperThreshold = (level: number, thresholds: number[]) => {
    const lower = lowerThreshold(level, thresholds);
    const index = thresholds.indexOf(lower);

    return ((index >= 0) && (index < thresholds.length - 1)) ? thresholds[index + 1] : lower;
};

export const PetTrainingView = () => {
    const isVisible = useIsWindowVisible('pet_training');
    const { petId } = useWindowParams('pet_training');

    return (isVisible && petId) ? <PetTrainingWindow petId={petId} /> : null;
};

const PetTrainingWindow = ({ petId }: { petId: number }) => {
    const { objectId = -1 } = useWindowParams('pet_training');
    const info = useRoomPetInfo(petId);
    const commands = useRoomPetCommands(petId);
    const user = useRoomUserByObjectId(objectId);
    const enhancements = useConfigBoolean('pet.enhancements.enabled');
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ disabledUntil, setDisabledUntil ] = useState(0);
    const frame = useTemplateFrame({ id: 'petCommands', defaultPosition: DEFAULT_POSITION, onClose: () => hideWindow('pet_training') });
    const figure = user?.figure ?? '';
    const { texture } = useChatPetFace(figure, 'std', { scale: RoomGeometryScaleType.ZoomedIn, direction: 2 });
    const name = info?.name ?? user?.name ?? '';

    // `showCommandToolForPet`: the commands asked for when they are not known yet.
    useEffect(() => {
        if (!commands) requestPetCommands(send, petId);
    }, [ commands, petId, send ]);

    // `onButtonDisableTimeout`: the buttons back as the pet's commands say, 1.1 s after a press.
    useEffect(() => {
        if (!disabledUntil) return;

        const timer = setTimeout(() => setDisabledUntil(0), Math.max(0, disabledUntil - Date.now()));

        return () => clearTimeout(timer);
    }, [ disabledUntil ]);

    const all = commands?.all ?? [];
    const rows = Math.ceil(all.length / 2);
    const containerHeight = rows * ROW_HEIGHT;

    const items: TemplateItem[] = all.map((id, index) => ({
        key: String(id),
        from: 'commands_container/pet_command_template',
        bindings: {
            '': {
                caption: t(`pet.command.${id}`),
                disabled: !commands?.enabled.includes(id) || (disabledUntil > 0),
                onPointerTap: () => {
                    // `onTrainButtonMouseClick`: spoken at the pet, then every button disabled for a moment.
                    sayChat(send, `${name} ${t(`pet.command.${id}`)}`, 0);
                    setDisabledUntil(Date.now() + BUTTONS_DISABLED_MS);
                },
            },
        },
        arrange: ({ root }) => {
            root()?.setX((index % 2) * COLUMN_X);
            root()?.setY(Math.floor(index / 2) * ROW_HEIGHT);
        },
    }));

    const isHorse = petTypeFromFigure(figure) === PET_TYPE_HORSE;
    const skillShown = enhancements && isHorse && !!info;
    const lower = info ? lowerThreshold(info.level, info.skillTresholds) : 0;
    const share = (info && info.experienceRequiredToLevel > 0) ? (info.experience / info.experienceRequiredToLevel) : 0;
    const skillValue = info ? Math.trunc(((info.level - lower) + share) * 100) : 0;
    const skillMax = info ? ((upperThreshold(info.level, info.skillTresholds) - lower) * 100) : 0;

    const arrange = ({ find, root }: TemplateWindows) => {
        find('commands_container')?.setHeight(containerHeight);
        root()?.setHeight(containerHeight + (enhancements ? 180 : 160));
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/pet_commands"
            frame={frame}
            arrange={arrange}
            bindings={{
                avatar_image: {
                    // `onCommandWindowAvatarImageClick`: `RWUAM_REQUEST_PET_UPDATE`.
                    onPointerTap: () => requestPetInfo(send, petId),
                    children: texture && (
                        <Box layout={{ position: 'absolute', left: 0, top: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, overflow: 'hidden' }}>
                            <ThemeImage
                                texture={texture}
                                width={texture.width}
                                height={texture.height}
                                layout={{ position: 'absolute', left: Math.round((IMAGE_WIDTH - texture.width) / 2), top: Math.round((IMAGE_HEIGHT - texture.height) / 2) }}
                            />
                        </Box>
                    ),
                },
                pet_name: { caption: name },
                commands_container: { items },
                status_skill_container: { visible: skillShown },
                status_skill_value_text: { caption: `${skillValue}/${skillMax}` },
                status_skill_text: { caption: `\${infostand.pet.text.skill.next.${PET_TYPE_HORSE}}` },
                status_skill_bitmap: skillShown
                    ? { children: (
                            <PetPercentageBar
                                value={skillValue}
                                max={skillMax}
                                colors={PET_EXPERIENCE_BAR_COLORS}
                            />
                        ) }
                    : {},
            }}
        />
    );
};
