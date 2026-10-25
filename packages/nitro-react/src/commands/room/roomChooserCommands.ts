/**
 * The furni and user choosers' content - Flash's `FurniChooserWidgetHandler` and
 * `UserChooserWidgetHandler` with the list half of `FurniChooserWidget` / `UsersChooserWidget`:
 * a row per furni (floor and wall) or per user of the room, sorted by name and then id
 * (`sortOn(["lowerCaseName", "id"], [null, NUMERIC])`). A furni row is named after its furni data
 * - a poster after its own `poster_<n>_name` - and carries the owner name its room object holds;
 * a user row carries the user's type. Rows with an id of 0 or less (a ghost being placed) are not
 * listed. Opening a chooser that is open builds its list again, as a second `:furni` does.
 */
import { IRoomObject, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ChooserItem, getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

const chooserItem = (id: number, category: RoomObjectCategoryEnum, name: string, ownerName: string | undefined, type: number = 0): ChooserItem => ({ id, category, name, ownerName, type, lowerCaseName: name.toLowerCase() });

/** `sortOn(["lowerCaseName", "id"], [null, Array.NUMERIC])`. */
const sortItems = (items: ChooserItem[]) => items.sort((a, b) => ((a.lowerCaseName < b.lowerCaseName) ? -1 : ((a.lowerCaseName > b.lowerCaseName) ? 1 : (a.id - b.id))));

/** `getLocalization(key, key)`. */
const localization = (key: string) => systemStore.getState().localizations[key] ?? key;

/** `FurniChooserWidgetHandler.getChooserItemFor`: a floor or wall object's row. */
const getFurniChooserItem = (object: IRoomObject | undefined, category: RoomObjectCategoryEnum): ChooserItem | undefined => {
    if (!object) return undefined;

    const { floorItems, wallItems } = systemStore.getState();
    const typeId = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId) ?? 0;
    const ownerName = object.model.getValue<string>(RoomObjectVariableEnum.FurnitureOwnerName);

    if (category === RoomObjectCategoryEnum.Floor) {
        const furniData = floorItems[typeId];

        return chooserItem(object.id, category, furniData ? furniData.localizedName : object.type, ownerName);
    }

    if (category === RoomObjectCategoryEnum.Wall) {
        const type = object.type;

        if (type.indexOf('poster') === 0) {
            const posterId = parseInt(type.replace('poster', ''), 10);

            return chooserItem(object.id, category, localization(`poster_${posterId}_name`), ownerName);
        }

        const furniData = wallItems[typeId];

        return chooserItem(object.id, category, furniData?.localizedName.length ? furniData.localizedName : type, ownerName);
    }

    return undefined;
};

/** `handleFurniChooserRequest` -> `onChooserContent`: every floor and wall furni of the room. */
export const openFurniChooser = () => {
    const room = getRoom();

    if (!room) return;

    const items: ChooserItem[] = [];

    for (const category of [ RoomObjectCategoryEnum.Floor, RoomObjectCategoryEnum.Wall ]) {
        for (const object of room.getRoomObjectsForCategory(category)) {
            const item = getFurniChooserItem(object, category);

            if (item && (item.id > 0)) items.push(item);
        }
    }

    roomStore.getState().setFurniChooserItems(sortItems(items));
};

export const closeFurniChooser = () => roomStore.getState().setFurniChooserItems(undefined);

/**
 * `onUpdateFurniChooser` (`RWROUE_FURNI_ADDED`) -> `RWRWM_FURNI_CHOOSER_ADD` -> `onChooserContentAdded`:
 * a furni that came into the room joins the open list, at its end.
 */
export const addFurniChooserItem = (objectId: number, category: RoomObjectCategoryEnum) => {
    const { furniChooserItems, setFurniChooserItems } = roomStore.getState();
    const room = getRoom();

    if (!furniChooserItems || !room) return;

    const item = getFurniChooserItem(room.getRoomObject(objectId, category), category);

    if (!item || (item.id <= 0) || furniChooserItems.some(existing => existing.id === item.id)) return;

    setFurniChooserItems([ ...furniChooserItems, item ]);
};

/** `onUpdateFurniChooser` (`RWROUE_FURNI_REMOVED`): a furni that left the room leaves the open list. */
export const removeFurniChooserItem = (objectId: number, category: RoomObjectCategoryEnum) => {
    const { furniChooserItems, setFurniChooserItems } = roomStore.getState();

    if (!furniChooserItems) return;

    const index = furniChooserItems.findIndex(item => (item.id === objectId) && (item.category === category));

    if (index >= 0) setFurniChooserItems(furniChooserItems.filter((_, i) => i !== index));
};

/**
 * `UserChooserWidgetHandler.isChooserDisabled` (WIN63-202610191507 UserChooserWidgetHandler.as:85-88): the room's
 * configuration items turned the user chooser off, and the user has no rights in the room. Rights holders keep it.
 */
export const isUserChooserDisabled = () => {
    const room = getRoom();

    return !!room && ((room.getRoomValue<number>(RoomObjectVariableEnum.ChooserDisabled) ?? 0) === 1) && (Number(roomStore.getState().controllerLevel) < Number(RoomControllerLevelEnum.Guest));
};

/**
 * `handleUserChooserRequest` -> `onChooserContent`: every user, pet and bot of the room, with its type.
 * Nothing while the chooser is disabled (WIN63-202610191507 UserChooserWidgetHandler.as:143-146), so a list
 * refresh after a user enters or leaves does not build it either.
 */
export const openUserChooser = () => {
    const room = getRoom();

    if (!room || isUserChooserDisabled()) return;

    const { usersByRoomObjectId, setUserChooserItems } = roomStore.getState();
    const items: ChooserItem[] = [];

    for (const object of room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Unit)) {
        const user = usersByRoomObjectId[object.id];

        if (user) items.push(chooserItem(user.objectId, RoomObjectCategoryEnum.Unit, user.name, undefined, Number(user.userType)));
    }

    setUserChooserItems(sortItems(items));
};

export const closeUserChooser = () => roomStore.getState().setUserChooserItems(undefined);

/** `onUpdateUserChooser`'s delayed request: the list is built again, if the chooser is still open. */
export const refreshUserChooser = () => {
    if (roomStore.getState().userChooserItems) openUserChooser();
};
