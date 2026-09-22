/**
 * The special items display's controller - `catalog/special_items_display/SpecialItemsController`:
 * `linkReceived` / `initialize` / `parseSpecialItems` / `openView` for a
 * `special_items_display/<key>` link, and `makeClaim` for the free claim button.
 *
 * The set comes from the hotel's config the way Flash's `getProperty` read it:
 * `special_items.<key>.items` is `<itemKey>,<type>,<furni class name>` entries joined by `;`, of
 * which only the `furni` type is parsed (`FurniSpecialItem`) and only a furni the furnidata knows
 * is kept; `special_items.<key>.free_claim` names a product the server can hand out once
 * (`HasClaimedProductComposer` / `ClaimProductComposer`). The server this client talks to does
 * not answer either packet yet, so a set with a free claim stays in its fetching state with the
 * claim button disabled, as Flash's would against the same server.
 */
import { ClaimProductComposer, HasClaimedProductComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { SPECIAL_ITEM_TYPE_FURNI, SPECIAL_ITEMS_CLAIM_STATE_BROWSING, SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE, SPECIAL_ITEMS_CLAIM_STATE_FETCHING, SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE, SpecialItem, specialItemsStore } from '#base/context/special-items';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** `getProperty(key)`: the config value as a string, `''` when the hotel has none. */
const getProperty = (key: string): string => {
    const value = systemStore.getState().config[key];

    return ((typeof value === 'string') || (typeof value === 'number')) ? String(value) : '';
};

/** `parseSpecialItems`: the set's valid items, numbered in the order they are kept. */
const parseSpecialItems = (key: string): SpecialItem[] => {
    const { floorItems, getLocalizationValue } = systemStore.getState();
    const furniByName = new Map(Object.values(floorItems).map(furni => [ furni.fullName, furni ]));
    const items: SpecialItem[] = [];

    for (const entry of getProperty(`special_items.${key}.items`).split(';')) {
        // `split(",", 3)`.
        const [ itemKey, itemType, furniName ] = entry.split(',').slice(0, 3);

        if (itemType !== SPECIAL_ITEM_TYPE_FURNI) continue;

        // `FurniSpecialItem.isValid`: the furni has to be in the furnidata.
        const furni = furniByName.get(furniName);

        if (!furni) continue;

        // `AbstractSpecialItem` / `FurniSpecialItem.name`: the hotel's title, else the furni's own name.
        const title = getLocalizationValue(`special_items.${key}.body.${itemKey}.title`, '');

        items.push({
            index: items.length,
            itemKey,
            name: title.length ? title : furni.localizedName,
            description: getLocalizationValue(`special_items.${key}.body.${itemKey}.desc`, ''),
            furniTypeId: furni.id,
            className: furni.className,
            colorIndex: furni.colorIndex,
        });
    }

    return items;
};

/**
 * `linkReceived("special_items_display/<key>")` -> `initialize`: parse the set and, when it has
 * any item, ask whether its free claim was taken and show the display. A set with no valid item
 * opens nothing.
 */
export const openSpecialItemsDisplay = (send: Send, key: string) => {
    const items = parseSpecialItems(key);

    if (!items.length) return;

    const freeClaim = getProperty(`special_items.${key}.free_claim`);
    const { setSpecialItems, displaySpecialItems } = specialItemsStore.getState();

    setSpecialItems(key, items, freeClaim, freeClaim.length ? SPECIAL_ITEMS_CLAIM_STATE_FETCHING : SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE);

    if (freeClaim.length) send(new HasClaimedProductComposer({ claimId: freeClaim }));

    // `openView`: `displayNewData`, then `show` (centred) when it is not up already.
    displaySpecialItems();
    systemStore.getState().showWindow('special_items_display');
};

/** `onClaimClick` -> `makeClaim`: only a claimable (or, per `makeClaim`, a browsing) claim is sent. */
export const claimSpecialItems = (send: Send) => {
    const { freeClaim, claimState, setClaimed } = specialItemsStore.getState();

    if (!freeClaim.length) return;

    if ((claimState !== SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE) && (claimState !== SPECIAL_ITEMS_CLAIM_STATE_BROWSING)) return;

    send(new ClaimProductComposer({ claimId: freeClaim }));
    setClaimed();
};
