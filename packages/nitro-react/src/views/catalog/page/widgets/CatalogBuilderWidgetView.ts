import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { BUILDER_FURNI_PLACEABLE_STATUS_FURNI_LIMIT_REACHED, BUILDER_FURNI_PLACEABLE_STATUS_GUILD_ROOM, BUILDER_FURNI_PLACEABLE_STATUS_MISSING_OFFER, BUILDER_FURNI_PLACEABLE_STATUS_NOT_IN_ROOM, BUILDER_FURNI_PLACEABLE_STATUS_NOT_ROOM_OWNER_OR_GROUP_ADMIN, BUILDER_FURNI_PLACEABLE_STATUS_OKAY, BUILDER_FURNI_PLACEABLE_STATUS_VISITORS_IN_ROOM, getBuilderFurniPlaceableStatusForOffer, requestSelectedItemToMover } from '#base/commands';
import { CatalogWidgetEventEnum, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `updateButtons`' error icon and message for each refusing status; `MISSING_OFFER` hides the error instead. */
const ERRORS: Readonly<Record<number, { icon: string; message: string }>> = {
    [BUILDER_FURNI_PLACEABLE_STATUS_FURNI_LIMIT_REACHED]: { icon: 'icons_builder_error_furnilimit', message: 'builder.placement_widget.error.limit_reached' },
    [BUILDER_FURNI_PLACEABLE_STATUS_NOT_IN_ROOM]: { icon: 'icons_builder_error_notroom', message: 'builder.placement_widget.error.not_in_room' },
    [BUILDER_FURNI_PLACEABLE_STATUS_NOT_ROOM_OWNER_OR_GROUP_ADMIN]: { icon: 'icons_builder_error_room', message: 'builder.placement_widget.error.not_group_admin' },
    [BUILDER_FURNI_PLACEABLE_STATUS_GUILD_ROOM]: { icon: 'icons_builder_error_grouproom', message: 'builder.placement_widget.error.group_room' },
    [BUILDER_FURNI_PLACEABLE_STATUS_VISITORS_IN_ROOM]: { icon: 'icons_builder_error_userinroom', message: 'builder.placement_widget.error.visitors' },
};

/**
 * The placement bar of a Builders Club furni page - the `builderWidget` container at the bottom of
 * `layout_default_3x3.xml`, Flash's `BuilderCatalogWidget`, which attaches `builderWidget.xml`
 * (360x60): the hint, the place one / place many buttons, and over them an error strip saying why the selected offer cannot be placed.
 *
 * On a normal catalogue page the container is hidden and the widget listens to nothing (`init`).
 * On a Builders Club page, `updateButtons` runs on building (with no offer yet), on
 * `SELECT_PRODUCT`, on `CWE_ROOM_CHANGED` and on `YouAreOwnerMessageEvent`: it asks
 * `getBuilderFurniPlaceableStatusForOffer`, and after `YouAreOwner` treats "not the owner or a
 * group admin" as placeable - the rights packet that says so may not have landed yet. A placeable
 * offer enables both buttons and hides the strip; anything else disables them and shows the strip
 * with the status's icon and text, except a missing offer, which hides it.
 *
 * The buttons hand the offer to the object mover (`HabboCatalog.requestSelectedItemToMover`, place
 * many repeating the placement after each drop), which places it with `BuildersClubPlaceRoomItem` /
 * `BuildersClubPlaceWallItem`.
 */
export const CatalogBuilderWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const youAreOwnerSerial = useCatalogStore(x => x.youAreOwnerSerial);
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ status, setStatus ] = useState(BUILDER_FURNI_PLACEABLE_STATUS_MISSING_OFFER);
    const [ seenYouAreOwnerSerial, setSeenYouAreOwnerSerial ] = useState(youAreOwnerSerial);

    /** `updateButtons(youAreOwner)`. */
    const getStatus = (forOffer: IPurchasableOffer | undefined, youAreOwner: boolean) => {
        const placeableStatus = getBuilderFurniPlaceableStatusForOffer(store, forOffer);

        return ((placeableStatus === BUILDER_FURNI_PLACEABLE_STATUS_NOT_ROOM_OWNER_OR_GROUP_ADMIN) && youAreOwner) ? BUILDER_FURNI_PLACEABLE_STATUS_OKAY : placeableStatus;
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        if (!page.isBuilderPage) return;

        setOffer(event.offer);
        setStatus(getStatus(event.offer, false));
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.ROOM_CHANGED, () => {
        if (page.isBuilderPage) setStatus(getStatus(offer, false));
    });

    // `onYouAreOwner`: each new `YouAreOwnerMessage` the catalogue's handler counted.
    if (youAreOwnerSerial !== seenYouAreOwnerSerial) {
        setSeenYouAreOwnerSerial(youAreOwnerSerial);

        if (page.isBuilderPage) setStatus(getStatus(offer, true));
    }

    const placeable = (status === BUILDER_FURNI_PLACEABLE_STATUS_OKAY);
    const error = ERRORS[status];

    /** `windowProcedure`: `place_one` / `place_many` - the mover, with no receiver, repeating for many. */
    const placeOffer = (repeat: boolean) => {
        if (offer) requestSelectedItemToMover(store, undefined, offer, repeat);
    };

    // `init()`: on a normal page the container is hidden.
    useCatalogWidgetView(page.isBuilderPage
        ? {
                template: 'builderWidget',
                bindings: {
                    place_one: { disabled: !placeable, onPointerTap: () => placeOffer(false) },
                    place_many: { disabled: !placeable, onPointerTap: () => placeOffer(true) },
                    error_container: { visible: !placeable && !!error },
                    error_icon: error ? { asset: `habbo-window-manager-com-${error.icon}` } : {},
                    error_message: error ? { caption: `\${${error.message}}` } : {},
                },
            }
        : { bindings: { '': { visible: false } } });

    return null;
};
