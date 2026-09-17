import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Bubble, Button, ThemeText } from '#base/theme';

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
        | 'train';

export interface InfoBubblePetViewProps {
    name: string;
    /** Only its owner gets the entries that change it. */
    isOwner: boolean;
    canRespect: boolean;
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
    name, isOwner, canRespect, isMountable, isRiding, hasSaddle, ridingPermissionOpen,
    canBreed, hasBreedingPermission, canHarvest, canRevive, commands, onAction, onCommand, onClose,
}: InfoBubblePetViewProps) => {
    const t = useTranslation();
    const [ showCommands, setShowCommands ] = useState(false);

    const entries: { key: PetMenuAction; label: string; visible: boolean }[] = [
        { key: 'respect', label: t('infostand.button.petrespect'), visible: canRespect },
        { key: 'train', label: t('infostand.button.train', 'Train'), visible: isOwner && !!commands.length },
        { key: 'mount', label: t('infostand.button.mount'), visible: isOwner && isMountable && !isRiding },
        { key: 'dismount', label: t('infostand.button.dismount'), visible: isRiding },
        { key: 'saddle_off', label: t('infostand.button.saddleoff'), visible: isOwner && isMountable && hasSaddle && !isRiding },
        {
            key: 'toggle_riding_permission',
            label: t(ridingPermissionOpen ? 'infostand.button.ridingpermission.off' : 'infostand.button.ridingpermission.on'),
            visible: isOwner && isMountable,
        },
        {
            key: 'toggle_breeding_permission',
            label: t(hasBreedingPermission ? 'infostand.button.breedingpermission.off' : 'infostand.button.breedingpermission.on'),
            visible: isOwner && canBreed,
        },
        { key: 'harvest', label: t('infostand.button.harvest'), visible: isOwner && canHarvest },
        { key: 'revive', label: t('infostand.button.revive'), visible: isOwner && canRevive },
        { key: 'pick_up', label: t('infostand.button.pickup'), visible: isOwner && !isRiding },
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
                                        <Button
                                            key={command.id}
                                            variant="300"
                                            tintColor="#2d2a27"
                                            textColor="#ffffff"
                                            onPointerTap={() => {
                                                onCommand(command.label);
                                                onClose();
                                            }}
                                            layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                                        >
                                            {command.label}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="300"
                                        tintColor="#2d2a27"
                                        textColor="#ffffff"
                                        onPointerTap={() => setShowCommands(false)}
                                        layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                                    >
                                        {t('generic.back')}
                                    </Button>
                                </>
                            )
                        : entries.filter(entry => entry.visible).map(entry => (
                                <Button
                                    key={entry.key}
                                    variant="300"
                                    tintColor="#2d2a27"
                                    textColor="#ffffff"
                                    onPointerTap={() => {
                                    // Training opens the command list rather than doing anything itself.
                                        if (entry.key === 'train') {
                                            setShowCommands(true);

                                            return;
                                        }

                                        onAction(entry.key);
                                        onClose();
                                    }}
                                    layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                                >
                                    {entry.label}
                                </Button>
                            ))}
                </Box>
            </Box>
        </Bubble>
    );
};
