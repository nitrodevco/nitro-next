import { ContextMenuEnum, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { useRoomFurnitureData } from '#base/hooks';

import { FurnitureMenuBubble } from './FurnitureMenuBubble';

export interface FurnitureContextMenuViewProps {
    objectData: ISimpleRoomObjectData;
    /** The `ContextMenuEnum` value the object's logic offers. */
    menu: string;
    onClose: () => void;
}

/**
 * The little menu a selected piece of furniture puts over itself, on the `generic_usable_menu`
 * layout (115x86, drawn by `FurnitureMenuBubble`): the furni's name, a rule, and the `use` row,
 * over the minimize arrow. `monsterplant_seed_menu`, `mysterybox_menu` and `random_teleport_menu`
 * are that same window with their own captions, which is why there is a single view here rather
 * than one each.
 *
 * Only the menus Flash actually shows are shown. `DUMMY` (a friend furni still locked), the
 * effect box and the mystery trophy open their own dialogs on use instead, so they get no menu,
 * and `FRIEND_FURNITURE` waits for the engraving dialog it belongs to.
 */
export const FurnitureContextMenuView = ({ objectData, menu, onClose }: FurnitureContextMenuViewProps) => {
    const { objectId, category } = objectData;
    const furnitureData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const t = useTranslation();
    const { send } = useWebSocketContext();

    if (!furnitureData) return null;

    const isOwner = furnitureData.ownerId === ownUserId;

    const useFurniture = () => {
        send(new UseFurnitureComposer({ objectId, param: 0 }));
        onClose();
    };

    let title: string;
    let caption: string;

    switch (menu) {
        case ContextMenuEnum.MONSTERPLANT_SEED:
            // Flash gates this one on ownership: someone else's seed offers you nothing.
            if (!isOwner) return null;

            title = t('furni.mnstr_seed.name');
            caption = t('widget.monsterplant_seed.button.use');
            break;
        case ContextMenuEnum.MYSTERY_BOX:
            title = t('mysterybox.context.title');
            caption = t(isOwner ? 'mysterybox.context.owner.use' : 'mysterybox.context.other.use');
            break;
        case ContextMenuEnum.RANDOM_TELEPORT:
            // `random_teleport_menu` names its own caption.
            title = t('furni.random_teleport.name');
            caption = t('widget.random_teleport.button.use');
            break;
        case ContextMenuEnum.PURCHASABLE_CLOTHING:
        case ContextMenuEnum.GENERIC_USABLE:
            // `GenericUsableFurnitureContextMenuView.updateWindow` always captions it `${furni.generic_usable.name}`.
            title = t('furni.generic_usable.name');
            caption = t('widget.generic_usable.button.use');
            break;
        default:
            return null;
    }

    return (
        <FurnitureMenuBubble
            title={title}
            buttons={[ { key: 'use', label: caption, onPointerTap: useFurniture } ]}
            minimizeGap={1}
        />
    );
};
