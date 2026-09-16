import { ContextMenuEnum, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useOwnUserId, useTranslation, useWebSocketContext } from '#base/context';
import { useRoomFurnitureData } from '#base/hooks';
import { Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

export interface FurnitureContextMenuViewProps {
    objectData: ISimpleRoomObjectData;
    /** The `ContextMenuEnum` value the object's logic offers. */
    menu: string;
    onClose: () => void;
}

/**
 * The little menu a selected piece of furniture puts over itself, at the size the
 * `generic_usable_menu` layout gives it (115x86): the furni's name, a rule, and the button that
 * uses it, over a collapse arrow. Flash built every one of these menus from that one layout
 * with a different caption, which is why there is a single view here rather than one each.
 *
 * Only the menus Flash actually shows are shown. `DUMMY` (a friend furni still locked), the
 * effect box and the mystery trophy open their own dialogs on use instead, so they get no menu,
 * and `FRIEND_FURNITURE` waits for the engraving dialog it belongs to.
 */
export const FurnitureContextMenuView = ({ objectData, menu, onClose }: FurnitureContextMenuViewProps) => {
    const { objectId, category } = objectData;
    const furnitureData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const [ collapsed, setCollapsed ] = useState<boolean>(false);
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
            title = t('furni.random_teleport.name');
            caption = t('widget.generic_usable.button.use');
            break;
        case ContextMenuEnum.PURCHASABLE_CLOTHING:
        case ContextMenuEnum.GENERIC_USABLE:
            title = furnitureData.name || t('furni.generic_usable.name');
            caption = t('widget.generic_usable.button.use');
            break;
        default:
            return null;
    }

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ width: 115, flexDirection: 'column' }}
        >
            <Region layout={{ width: 107, flexDirection: 'column', alignItems: 'center', paddingTop: 7 }}>
                <ThemeText
                    text={title}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    layout={{ height: 16, width: '100%' }}
                />
                <Region
                    backgroundColor="#000000"
                    layout={{ marginLeft: 2, marginRight: 2, height: 1, width: 103 }}
                />
                {!collapsed && (
                    <ContainerButton
                        variant="3"
                        tintColor="#2d2a27"
                        onPointerTap={useFurniture}
                        layout={{ width: 101, height: 26, marginTop: 1 }}
                    >
                        <ThemeText
                            text={caption}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
                <Region
                    cursor="pointer"
                    onPointerTap={() => setCollapsed(!collapsed)}
                    layout={{ width: 100, height: 18, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Icon
                        variant={collapsed ? '6' : '7'}
                        layout={{ width: 13, height: 10 }}
                    />
                </Region>
            </Region>
        </Bubble>
    );
};
