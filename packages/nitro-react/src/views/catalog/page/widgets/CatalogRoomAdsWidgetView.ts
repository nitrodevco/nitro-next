import { ClubLevelEnum, IPurchasableOffer, RoomEngineEvent } from '@nitrodevco/nitro-api';
import type { IRoomEntryData } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { getRoomAdsPurchaseInfo } from '#base/commands';
import { CatalogRoomAdPurchaseData, CatalogRoomAdPurchaseInfo, CatalogWidgetEventEnum, getCatalogPageText, useCatalogRoomAdActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useRoom } from '#base/context/room';
import { useConfigBoolean, useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent, useRoomEventDispatcher } from '#base/hooks';
import { useLatest, useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { priceDisplayItem } from './catalogPrice';

/** `getInteger("room_ad.duration.minutes", 120)`'s default. */
const DEFAULT_ROOM_AD_DURATION_MINUTES = 120;

/** `setDefaultRoom`: a room name longer than this is cut and given `...`. */
const ROOM_NAME_MAX_LENGTH = 25;

/**
 * `getExtensionMinutes`: an ad's length - with `roomad.limited_extension` on, a running ad being
 * extended also gets the minutes it has been expired (`now - expirationTime`, negative while it
 * still runs) added.
 */
const getExtensionMinutes = (data: CatalogRoomAdPurchaseData | undefined, minutes: number, limitedExtension: boolean, now: number) => {
    if (!limitedExtension || !data || !data.expirationTime) return minutes;

    return Math.trunc(((now - data.expirationTime.getTime()) / 60000) + minutes);
};

/**
 * The room ad page's widget - Flash's `RoomAdsCatalogWidget`, whose view is its
 * `roomAdsCatalogWidget` container's own children (`layout_roomads.xml`): the ad's length
 * (`ctlg_text_1`, `roomad.catalog_text` with its `%duration%`), the `categories_list` drop menu, the
 * ad's name (`name_input_text`) and description (`desc_input_text`), the `room_drop_menu`, the
 * price (`showPriceInContainer` into `price_container`) and the purchase widget (`NO_GIFT_OPTION`,
 * `ROOM_INITIATE_PURCHASE`) nested in it.
 *
 * `init()` asks which rooms the user may advertise (`getRoomAdsPurchaseInfo`), and the answer
 * (`onPurchaseInfoEvent`) fills the page: an ad being extended (`openRoomAdCatalogPageInExtendedMode`)
 * brings back its name, description, room and category; the categories are the navigator's visible
 * event categories; the rooms are listed with the current room selected; and the offer the user can
 * buy (the only one, or the VIP one for a VIP and the other for anyone else) is selected on the page,
 * its price shown, and remembered as the room ad being bought. Everything the user types and picks
 * is written into the catalogue's `roomAdPurchaseData` (`CatalogRoomAdSlice`), which
 * `purchaseProduct` sends as a `PurchaseRoomAdMessageComposer`. A room entered meanwhile becomes
 * the selected one (`REE_INITIALIZED`). After a purchase (`PURCHASE`) the inputs and the data are
 * cleared and the rooms asked for again.
 *
 * Flash's drop menus announce a programmatic selection as they do a pick (`WE_SELECTED`), and
 * this port does the same: the category list's first entry becomes the ad's category when the
 * answer arrives (the listener `init()` added hears the second `populateEventCategories`), and
 * the room list's selection sets the room and the length text. The room menu's pick handler
 * (`onRoomDropMenuEvent`) is attached as Sulake's JavaScript client attaches it; the AS3 build
 * defines it and never attaches it, so a pick there would not change the room.
 */
export const CatalogRoomAdsWidgetView = ({ page }: CatalogWidgetProps) => {
    const roomAdPurchaseData = useCatalogStore(x => x.roomAdPurchaseData);
    const eventCategories = useNavigatorStore(x => x.eventCategories);
    const durationMinutes = useConfigValue<number>('room_ad.duration.minutes') ?? DEFAULT_ROOM_AD_DURATION_MINUTES;
    const limitedExtension = (useConfigBoolean('roomad.limited_extension'));
    const room = useRoom();
    const store = useCatalogStoreApi();
    const { updateRoomAdPurchaseData, clearRoomAdPurchaseData } = useCatalogRoomAdActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();
    const [ duration, setDuration ] = useState(() => getExtensionMinutes(roomAdPurchaseData, durationMinutes, limitedExtension, Date.now()));
    // `ctlg_text_1` is the page's text until a room is picked, which puts `roomad.catalog_text` back.
    const [ durationTextShown, setDurationTextShown ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ rooms, setRooms ] = useState<IRoomEntryData[] | undefined>(undefined);
    const [ roomLabels, setRoomLabels ] = useState<string[]>([]);
    const [ roomSelection, setRoomSelection ] = useState(-1);
    const [ categorySelection, setCategorySelection ] = useState(0);
    const [ priceOffer, setPriceOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const visibleCategories = eventCategories.filter(category => category.visible);

    /**
     * `onEventCategoryMenuEvent`: the ad's category is the picked visible category's id, -1 past
     * the list - written only into purchase data that already exists.
     */
    const selectCategory = (index: number, data: CatalogRoomAdPurchaseData | undefined) => {
        setCategorySelection(index);

        const category = visibleCategories[index];

        if (data) updateRoomAdPurchaseData({ categoryId: category ? category.categoryId : -1 });
    };

    /** `onRoomDropMenuEvent`: the ad's room, and the length text for it (with the extension's minutes for the ad's own room). */
    const selectRoom = (index: number, list: IRoomEntryData[] | undefined, data: CatalogRoomAdPurchaseData | undefined) => {
        setRoomSelection(index);

        if (!list || !list.length) return;

        const entry = list[index];

        if (!entry || !data) return;

        updateRoomAdPurchaseData({ flatId: entry.roomId });
        setDuration((entry.roomId === data.extendedFlatId) ? getExtensionMinutes(data, durationMinutes, limitedExtension, Date.now()) : durationMinutes);
        setDurationTextShown(true);
    };

    /**
     * `setDefaultRoom`: select the room `roomId` (the first when it is not listed), filling the list
     * first when asked; the selected room becomes the ad's room.
     */
    const setDefaultRoom = (roomId: number, populate: boolean, list: IRoomEntryData[] | undefined, data: CatalogRoomAdPurchaseData | undefined) => {
        if (!list) {
            if (roomLabels.length) selectRoom(0, list, data);

            return;
        }

        let index = 0;

        list.forEach((entry, entryIndex) => {
            if (entry.roomId === roomId) index = entryIndex;
        });

        if (populate) {
            const labels = list.map(entry => ((entry.roomName.length > ROOM_NAME_MAX_LENGTH) ? `${entry.roomName.substring(0, ROOM_NAME_MAX_LENGTH)}...` : entry.roomName));

            if (!labels.length) labels.push(t('roomad.no.available.room', 'roomad.no.available.room'));

            setRoomLabels(labels);
        }

        const entry = list[index];

        if (!entry) {
            selectRoom(0, list, data);

            return;
        }

        // The selection is announced before the purchase data is made, as Flash sets it first.
        selectRoom(index, list, data);
        updateRoomAdPurchaseData({ flatId: entry.roomId });
    };

    /** `selectedOffer`: the page's only offer, or the first one for the user's club level (VIP or not). */
    const selectedOffer = (isVip: boolean): IPurchasableOffer | undefined => {
        if (page.offers.length === 1) return page.offers[0];

        return page.offers.find(offer => (((Number(offer.clubLevel) === Number(ClubLevelEnum.Vip)) && isVip) || ((Number(offer.clubLevel) !== Number(ClubLevelEnum.Vip)) && !isVip)));
    };

    /** `onPurchaseInfoEvent`: the rooms the user may advertise have arrived. */
    const onPurchaseInfoEvent = (info: CatalogRoomAdPurchaseInfo) => {
        const list = info.rooms.slice();
        const data = roomAdPurchaseData;

        // `setExtendData`: an ad being extended brings its texts, its room and its category back.
        if (data && data.extended) {
            setName(data.name ?? '');
            setDescription(data.description);
            list.push({ roomId: data.flatId, roomName: data.roomName ?? '', hasControllers: false });
            selectCategory(data.categoryId - 1, data);
        }

        setRooms(list);

        // `populateEventCategories`: the list is filled again and its first entry selected.
        selectCategory(0, data);

        setDefaultRoom(room?.roomId ?? -1, true, list, data);

        const offer = selectedOffer(info.isVip);

        if (!offer) return;

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer });

        updateRoomAdPurchaseData({ offerId: offer.offerId });
        setPriceOffer(offer);
    };

    /** `onRoomInitialized`: a room entered while the page is open (never a previewer's) becomes the selected one. */
    const onRoomInitialized = (roomId: number) => setDefaultRoom(roomId, false, rooms, roomAdPurchaseData);

    const onPurchaseInfoEventRef = useLatest(onPurchaseInfoEvent);

    // `onPurchaseConfirmationEvent`: after a purchase, ask again and start the next ad from nothing.
    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.PURCHASE, () => {
        getRoomAdsPurchaseInfo(send, store);
        setName('');
        setDescription('');
        clearRoomAdPurchaseData();
    });

    // `init()`: ask for the rooms, and listen for the answer the way the widget's own message listener did.
    useEffect(() => {
        const unsubscribe = store.subscribe((state, previous) => {
            if (state.roomAdPurchaseInfo && (state.roomAdPurchaseInfo !== previous.roomAdPurchaseInfo)) onPurchaseInfoEventRef.current(state.roomAdPurchaseInfo);
        });

        getRoomAdsPurchaseInfo(send, store);

        return unsubscribe;
    }, [ store, send ]);

    // `REE_INITIALIZED` of the room the user is in.
    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, () => {
        if (room) onRoomInitialized(room.roomId);
    });

    const onNameChange = (value: string) => {
        setName(value);

        if (roomAdPurchaseData) updateRoomAdPurchaseData({ name: value });
    };

    const onDescriptionChange = (value: string) => {
        setDescription(value);

        if (roomAdPurchaseData) updateRoomAdPurchaseData({ description: value });
    };

    const durationText = t('roomad.catalog_text', '', { duration: String(duration) });

    useCatalogWidgetView({
        bindings: {
            ctlg_text_1: { caption: durationTextShown ? durationText : (getCatalogPageText(page, 'ctlg_text_1') ?? durationText) },
            categories_list: {
                options: visibleCategories.map(category => `\${navigator.searchcode.title.eventcategory__${category.categoryId}}`),
                selection: categorySelection,
                onSelect: index => selectCategory(index, roomAdPurchaseData),
            },
            name_input_text: { caption: name, onChange: onNameChange },
            desc_input_text: { caption: description, onChange: onDescriptionChange },
            room_drop_menu: {
                options: roomLabels,
                selection: roomSelection,
                onSelect: index => selectRoom(index, rooms, roomAdPurchaseData),
            },
            price_container: { items: (templates && priceOffer) ? [ priceDisplayItem(templates, priceOffer, { config }) ] : [] },
        },
    });

    return null;
};
