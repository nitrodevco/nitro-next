import { RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';

import { closeUserChooser, refreshUserChooser } from '#base/commands';
import { useRoomStore } from '#base/context/room';
import { useRoomEventDispatcher, useRoomObjectSelect } from '#base/hooks';
import { UserChooserView } from '#base/views/room-widgets/chooser/UserChooserView';

/** `onUpdateUserChooser`: the list is asked for again this long after someone comes or goes. */
const REFRESH_DELAY_MS = 100;

/**
 * The user chooser - Flash's `UsersChooserWidget` (`:chooser`, `roomChatCommands`): while it is
 * open, someone coming into the room or leaving it has the whole list built again 100 ms later
 * (`onUpdateUserChooser`), and a chosen row is selected in the room
 * (`UserChooserWidgetHandler` `RWROM_SELECT_OBJECT`), opening their infostand.
 */
export const RoomUserChooserWidget = () => {
    const items = useRoomStore(x => x.userChooserItems);
    const { selectObject } = useRoomObjectSelect();

    // A refresh that lands after the chooser closed does nothing (`refreshUserChooser`).
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([ RoomWidgetUpdateRoomObjectEvent.USER_ADDED, RoomWidgetUpdateRoomObjectEvent.USER_REMOVED ], () => {
        setTimeout(refreshUserChooser, REFRESH_DELAY_MS);
    }, !!items);

    if (!items) return null;

    return (
        <UserChooserView
            items={items}
            onChoose={item => selectObject(item.id, item.category)}
            onClose={closeUserChooser}
        />
    );
};
