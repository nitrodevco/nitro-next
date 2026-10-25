import { RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';

import { addFurniChooserItem, closeFurniChooser, removeFurniChooserItem } from '#base/commands';
import { useRoomStore } from '#base/context/room';
import { useRoomEventDispatcher, useRoomObjectSelect } from '#base/hooks';
import { FurniChooserView } from '#base/views/room-widgets/chooser/FurniChooserView';

/**
 * The furni chooser - Flash's `FurniChooserWidget` (`:furni`, `roomChatCommands`): while it is
 * open, a furni that comes into the room joins its list and one that leaves it goes
 * (`onUpdateFurniChooser`), and a chosen row is selected in the room
 * (`FurniChooserWidgetHandler` `RWROM_SELECT_OBJECT`), opening its infostand.
 */
export const RoomFurniChooserWidget = () => {
    const items = useRoomStore(x => x.furniChooserItems);
    const { selectObject } = useRoomObjectSelect();

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.FURNI_ADDED, event => addFurniChooserItem(event.objectId, event.category), !!items);
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED, event => removeFurniChooserItem(event.objectId, event.category), !!items);

    if (!items) return null;

    return (
        <FurniChooserView
            items={items}
            onChoose={item => selectObject(item.id, item.category)}
            onClose={closeFurniChooser}
        />
    );
};
