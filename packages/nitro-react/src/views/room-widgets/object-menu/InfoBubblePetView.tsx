import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, CheckBox, ContainerButton, Region, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';
import { InfoBubbleMenuFrame } from './InfoBubbleMenuFrame';
import { OWN_PET_MENU_GEOMETRY, PET_MENU_GEOMETRY } from './InfoBubbleMenuGeometry';

/** What the pet's menu can be asked to do. */
export type PetMenuAction
    = | 'respect'
        | 'pick_up'
        | 'mount'
        | 'dismount'
        | 'saddle_off'
        | 'toggle_riding_permission'
        | 'toggle_breeding_permission'
        | 'harvest'
        | 'revive'
        | 'train'
        | 'breed'
        | 'wired_inspect';

export interface InfoBubblePetViewProps {
    name: string;
    /** Only its owner gets the entries that change it. */
    isOwner: boolean;
    canRespect: boolean;
    /** How many scratches you have left today - the button counts them down. */
    respectsLeft: number;
    /** A horse: it can be climbed on, saddled and given riding permission. */
    isMountable: boolean;
    /** We are on it right now. */
    isRiding: boolean;
    hasSaddle: boolean;
    ridingPermissionOpen: boolean;
    canBreed: boolean;
    hasBreedingPermission: boolean;
    canHarvest: boolean;
    canRevive: boolean;
    /** Its owner may start breeding it: a plant with a partner in the room, or a pet the nests are on for. */
    canStartBreeding: boolean;
    /** `showInspectButton` - the wired menu's inspection of this pet, last in both pet menus. */
    showWiredInspect: boolean;
    /** The commands it has learned; picking one speaks it. */
    commands: { id: number; label: string }[];
    onAction: (action: PetMenuAction) => void;
    onCommand: (label: string) => void;
    onClose: () => void;
}

/** The pet menus' rows are 101 wide; a row with a checkbox is 40 high. */
const ROW_WIDTH = 101;
const ROW_HEIGHT = 26;
const TOGGLE_ROW_HEIGHT = 40;

/** The rows of a permission toggle - `toggle_riding_permission` and `toggle_breeding_permission`. */
const TOGGLE_ROWS: PetMenuAction[] = [ 'toggle_riding_permission', 'toggle_breeding_permission' ];

/**
 * A 40-high toggle row of `own_pet_menu`: a `container_button` at (-3, -4) 107x46 holding a style 1
 * checkbox at 9,17 and a `u_regular` 11 label at 26 (y 3 for riding, 0 for breeding), 78 wide,
 * wrapping onto up to three lines.
 */
const ToggleRow = ({ caption, checked, labelTop, onPress }: { caption: string; checked: boolean; labelTop: number; onPress: () => void }) => (
    <Box layout={{ width: ROW_WIDTH, height: TOGGLE_ROW_HEIGHT, flexShrink: 0, overflow: 'hidden' }}>
        <ContainerButton
            variant="3"
            tintColor="#2d2a27"
            onPointerTap={onPress}
            layout={{ position: 'absolute', left: -3, top: -4, width: 107, height: 46 }}
        >
            <CheckBox
                variant="1"
                selected={checked}
                layout={{ position: 'absolute', left: 9, top: 17 }}
            />
            <ThemeText
                text={caption}
                textStyle="u_regular"
                textOptions={{ fill: '#ffffff', fontSize: 11, wordWrap: true, wordWrapWidth: 74 }}
                name="label"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 26, top: labelTop }}
            />
        </ContainerButton>
    </Box>
);

/**
 * The menu behind a pet, on the `pet_menu` / `own_pet_menu` layouts. Which entries appear depends
 * on what the pet is - a horse is mounted and saddled, a monsterplant is harvested and revived -
 * which is what `OwnPetMenuView`'s four modes decided.
 *
 * Training is not a packet: a command is spoken at the pet, so picking one sends `<name> <command>`
 * as ordinary chat, exactly as `RoomWidgetPetCommandMessage` did. Flash trains in a window of its
 * own (`PetCommandTool`); here the commands are the menu's rows, with a way back.
 *
 * Its owner gets `own_pet_menu`, anyone else `pet_menu`: the name centred in a 28-high header,
 * the rows in the layout's child order below the rule, and the `minimize` arrow.
 */
export const InfoBubblePetView = ({
    name, isOwner, canRespect, respectsLeft, isMountable, isRiding, hasSaddle, ridingPermissionOpen,
    canBreed, hasBreedingPermission, canHarvest, canRevive, canStartBreeding, showWiredInspect, commands, onAction, onCommand, onClose,
}: InfoBubblePetViewProps) => {
    const t = useTranslation();
    const [ showCommands, setShowCommands ] = useState(false);
    const [ collapsed, setCollapsed ] = useState(false);

    // In the layout's child order.
    const entries: { key: PetMenuAction; label: string; visible: boolean }[] = [
        { key: 'mount', label: t('infostand.button.mount'), visible: isOwner && isMountable && !isRiding },
        { key: 'toggle_riding_permission', label: t('infostand.button.toggle_riding_permission'), visible: isOwner && isMountable },
        { key: 'dismount', label: t('infostand.button.dismount'), visible: isRiding },
        { key: 'respect', label: t('infostand.button.petrespect', '', { count: String(respectsLeft) }), visible: canRespect },
        { key: 'train', label: t('infostand.button.train', 'Train'), visible: isOwner && !!commands.length },
        { key: 'pick_up', label: t('infostand.button.pickup'), visible: isOwner && !isRiding },
        { key: 'saddle_off', label: t('infostand.button.saddleoff'), visible: isOwner && isMountable && hasSaddle && !isRiding },
        { key: 'breed', label: t('infostand.button.breed'), visible: isOwner && canStartBreeding },
        { key: 'harvest', label: t('infostand.button.harvest'), visible: isOwner && canHarvest },
        { key: 'revive', label: t('infostand.button.revive'), visible: isOwner && canRevive },
        { key: 'toggle_breeding_permission', label: t('infostand.button.toggle_breeding_permission'), visible: isOwner && canBreed },
        { key: 'wired_inspect', label: t('infostand.button.wired_inspect'), visible: showWiredInspect },
    ];

    const visibleEntries = entries.filter(entry => entry.visible);
    const rowHeights = showCommands
        ? [ ...commands.map(() => ROW_HEIGHT), ROW_HEIGHT ]
        : visibleEntries.map(entry => (TOGGLE_ROWS.includes(entry.key) ? TOGGLE_ROW_HEIGHT : ROW_HEIGHT));

    const act = (action: PetMenuAction) => {
        // Training opens the command list rather than doing anything itself.
        if (action === 'train') {
            setShowCommands(true);

            return;
        }

        onAction(action);
        onClose();
    };

    return (
        <InfoBubbleMenuFrame
            geometry={isOwner ? OWN_PET_MENU_GEOMETRY : PET_MENU_GEOMETRY}
            rowHeights={rowHeights}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed(!collapsed)}
            header={(
                // `profile_link` at 0,-1, 107x28, the name centred both ways and wrapping.
                <Region
                    name="profile_link"
                    layout={{ position: 'absolute', left: 0, top: -1, width: 107, height: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ThemeText
                        text={name}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 11, align: 'center', wordWrap: true, wordWrapWidth: 103 }}
                        name="name"
                        verticalAlign="top"
                    />
                </Region>
            )}
        >
            {showCommands && (
                <>
                    {commands.map(command => (
                        <InfoBubbleMenuButton
                            key={command.id}
                            width={ROW_WIDTH}
                            caption={command.label}
                            onPress={() => {
                                onCommand(command.label);
                                onClose();
                            }}
                        />
                    ))}
                    <InfoBubbleMenuButton
                        width={ROW_WIDTH}
                        caption={t('generic.back')}
                        onPress={() => setShowCommands(false)}
                    />
                </>
            )}
            {!showCommands && visibleEntries.map((entry) => {
                if (entry.key === 'toggle_riding_permission') {
                    return (
                        <ToggleRow
                            key={entry.key}
                            caption={entry.label}
                            checked={ridingPermissionOpen}
                            labelTop={3}
                            onPress={() => act(entry.key)}
                        />
                    );
                }

                if (entry.key === 'toggle_breeding_permission') {
                    return (
                        <ToggleRow
                            key={entry.key}
                            caption={entry.label}
                            checked={hasBreedingPermission}
                            labelTop={0}
                            onPress={() => act(entry.key)}
                        />
                    );
                }

                return (
                    <InfoBubbleMenuButton
                        key={entry.key}
                        width={ROW_WIDTH}
                        caption={entry.label}
                        onPress={() => act(entry.key)}
                    />
                );
            })}
        </InfoBubbleMenuFrame>
    );
};
