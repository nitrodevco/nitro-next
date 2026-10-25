import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu, useMinimizedMenu } from './useButtonMenu';

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
        | 'treat'
        | 'compost'
        | 'pass_handitem'
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
    /** `sharedhorseriding.enabled`: others ride a horse too, and its owner says who may. */
    sharedRidingEnabled: boolean;
    canBreed: boolean;
    hasBreedingPermission: boolean;
    canHarvest: boolean;
    canRevive: boolean;
    /** A living monsterplant: `treat` shows, enabled by `treatEnabled`. */
    canTreat: boolean;
    treatEnabled: boolean;
    /** A dead monsterplant its owner may compost - the own menu's `compost`. */
    canCompost: boolean;
    /** The user carries an item the pet can be handed - `pass_handitem`, in both menus. */
    canPassHandItem: boolean;
    /** Its owner may start breeding it: a plant with a partner in the room, or a pet the nests are on for. */
    canStartBreeding: boolean;
    /** `showInspectButton` - the wired menu's inspection of this pet, last in both pet menus. */
    showWiredInspect: boolean;
    /** `OwnPetMenuView`'s `train`, in every own-pet mode but the monsterplant's. */
    canTrain: boolean;
    onAction: (action: PetMenuAction) => void;
    onClose: () => void;
}

/**
 * The menu behind a pet, drawn from its `pet_menu` / `own_pet_menu` template - its owner gets
 * `own_pet_menu`, anyone else `pet_menu`. Which rows of `buttons` show depends on what the pet is -
 * a horse is mounted and saddled, a monsterplant is harvested and revived - which is what
 * `OwnPetMenuView`'s modes decided. A permission row's checkbox shows the permission.
 *
 * A horse's rows follow both views' `setup` modes: a saddled horse nobody rides (mode 1) offers
 * `mount` - to anyone else only with `sharedhorseriding.enabled`, which also gives its owner
 * `toggle_riding_permission` - and a ridden one (mode 2) `dismount`, on the same terms, with no
 * `train`.
 *
 * `train` opens the training window (`openTrainingView` -> `PetCommandTool`, `PetTrainingView`).
 */
export const InfoBubblePetView = ({
    name, isOwner, canRespect, respectsLeft, isMountable, isRiding, hasSaddle, ridingPermissionOpen, sharedRidingEnabled,
    canBreed, hasBreedingPermission, canHarvest, canRevive, canTreat, treatEnabled, canCompost, canPassHandItem, canStartBreeding, showWiredInspect, canTrain, onAction, onClose,
}: InfoBubblePetViewProps) => {
    const t = useTranslation();
    const { showButton } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();

    if (minimizedView) return minimizedView;

    const entries: { key: PetMenuAction; visible: boolean; caption?: string; enabled?: boolean }[] = [
        { key: 'mount', visible: hasSaddle && !isRiding && (isOwner || sharedRidingEnabled) },
        { key: 'toggle_riding_permission', visible: isOwner && hasSaddle && !isRiding && sharedRidingEnabled },
        { key: 'dismount', visible: isRiding && (isOwner || sharedRidingEnabled) },
        { key: 'respect', visible: canRespect, caption: t('infostand.button.petrespect', '', { count: String(respectsLeft) }) },
        { key: 'treat', visible: canTreat, enabled: treatEnabled },
        { key: 'train', visible: isOwner && canTrain && !isRiding },
        { key: 'pick_up', visible: isOwner && !isRiding },
        { key: 'saddle_off', visible: isOwner && isMountable && hasSaddle && !isRiding },
        { key: 'breed', visible: isOwner && canStartBreeding },
        { key: 'harvest', visible: isOwner && canHarvest },
        { key: 'revive', visible: isOwner && canRevive },
        { key: 'compost', visible: isOwner && canCompost },
        { key: 'toggle_breeding_permission', visible: isOwner && canBreed },
        { key: 'pass_handitem', visible: canPassHandItem },
        { key: 'wired_inspect', visible: showWiredInspect },
    ];

    const act = (action: PetMenuAction) => {
        onAction(action);
        onClose();
    };

    const visibleEntries = entries.filter(entry => entry.visible);
    const bindings: TemplateBindings = {
        ...minimizeBindings,
        name: { caption: name, setCaptionAfterBuild: true },
    };

    bindings.buttons = { show: visibleEntries.map(entry => entry.key) };

    for (const entry of visibleEntries) showButton(bindings, entry.key, () => act(entry.key), { caption: entry.caption, enabled: entry.enabled });

    if (isOwner) {
        bindings['toggle_riding_permission_checkbox'] = { selected: ridingPermissionOpen };
        bindings['toggle_breeding_permission_checkbox'] = { selected: hasBreedingPermission };
    }

    return (
        <TemplateWindow
            id={isOwner ? 'habbo-room-ui-com/own_pet_menu' : 'habbo-room-ui-com/pet_menu'}
            bindings={bindings}
        />
    );
};
