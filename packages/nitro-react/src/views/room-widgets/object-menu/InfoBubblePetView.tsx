import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Bubble, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';

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

/**
 * The menu behind a pet, on the `pet_menu` / `own_pet_menu` layouts. Which entries appear depends
 * on what the pet is - a horse is mounted and saddled, a monsterplant is harvested and revived -
 * which is what `OwnPetMenuView`'s four modes decided.
 *
 * Training is not a packet: a command is spoken at the pet, so picking one sends `<name> <command>`
 * as ordinary chat, exactly as `RoomWidgetPetCommandMessage` did.
 */
export const InfoBubblePetView = ({
    name, isOwner, canRespect, respectsLeft, isMountable, isRiding, hasSaddle, ridingPermissionOpen,
    canBreed, hasBreedingPermission, canHarvest, canRevive, canStartBreeding, showWiredInspect, commands, onAction, onCommand, onClose,
}: InfoBubblePetViewProps) => {
    const t = useTranslation();
    const [ showCommands, setShowCommands ] = useState(false);

    const entries: { key: PetMenuAction; label: string; visible: boolean }[] = [
        { key: 'respect', label: t('infostand.button.petrespect', '', { count: String(respectsLeft) }), visible: canRespect },
        { key: 'train', label: t('infostand.button.train', 'Train'), visible: isOwner && !!commands.length },
        { key: 'mount', label: t('infostand.button.mount'), visible: isOwner && isMountable && !isRiding },
        { key: 'dismount', label: t('infostand.button.dismount'), visible: isRiding },
        { key: 'saddle_off', label: t('infostand.button.saddleoff'), visible: isOwner && isMountable && hasSaddle && !isRiding },
        {
            key: 'toggle_riding_permission',
            // Flash drew a checkbox beside these; the tick stands in for it.
            label: `${t('infostand.button.toggle_riding_permission')}${ridingPermissionOpen ? ' ✓' : ''}`,
            visible: isOwner && isMountable,
        },
        {
            key: 'toggle_breeding_permission',
            label: `${t('infostand.button.toggle_breeding_permission')}${hasBreedingPermission ? ' ✓' : ''}`,
            visible: isOwner && canBreed,
        },
        { key: 'breed', label: t('infostand.button.breed'), visible: isOwner && canStartBreeding },
        { key: 'harvest', label: t('infostand.button.harvest'), visible: isOwner && canHarvest },
        { key: 'revive', label: t('infostand.button.revive'), visible: isOwner && canRevive },
        { key: 'pick_up', label: t('infostand.button.pickup'), visible: isOwner && !isRiding },
        { key: 'wired_inspect', label: t('infostand.button.wired_inspect'), visible: showWiredInspect },
    ];

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            <Box layout={{ minWidth: 110, maxWidth: 110, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}>
                    <ThemeText
                        text={name}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Box>
                <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                    {showCommands
                        ? (
                                <>
                                    {commands.map(command => (
                                        <InfoBubbleMenuButton
                                            key={command.id}
                                            caption={command.label}
                                            onPress={() => {
                                                onCommand(command.label);
                                                onClose();
                                            }}
                                        />
                                    ))}
                                    <InfoBubbleMenuButton
                                        caption={t('generic.back')}
                                        onPress={() => setShowCommands(false)}
                                    />
                                </>
                            )
                        : entries.filter(entry => entry.visible).map(entry => (
                                <InfoBubbleMenuButton
                                    key={entry.key}
                                    caption={entry.label}
                                    onPress={() => {
                                    // Training opens the command list rather than doing anything itself.
                                        if (entry.key === 'train') {
                                            setShowCommands(true);

                                            return;
                                        }

                                        onAction(entry.key);
                                        onClose();
                                    }}
                                />
                            ))}
                </Box>
            </Box>
        </Bubble>
    );
};
