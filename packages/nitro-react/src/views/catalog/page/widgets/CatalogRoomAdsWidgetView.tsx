import { ClubLevelEnum, IPurchasableOffer, RoomEngineEvent } from '@nitrodevco/nitro-api';
import type { IRoomEntryData } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { getRoomAdsPurchaseInfo } from '#base/commands';
import { CatalogRoomAdPurchaseData, CatalogRoomAdPurchaseInfo, CatalogWidgetEventEnum, getCatalogPageText, useCatalogRoomAdActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useRoom } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogPriceDisplayView } from './CatalogProductPriceView';

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
 * (`ctlg_text_1`, `roomad.catalog_text` with its `%duration%`), the event category drop menu, the
 * ad's name (up to 25 characters) and description (up to 100), the room drop menu, the price and
 * the purchase widget (`NO_GIFT_OPTION`, `ROOM_INITIATE_PURCHASE`) nested in it.
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
export const CatalogRoomAdsWidgetView = ({ page, children }: CatalogWidgetProps) => {
    const roomAdPurchaseData = useCatalogStore(x => x.roomAdPurchaseData);
    const eventCategories = useNavigatorStore(x => x.eventCategories);
    const durationMinutes = useConfigValue<number>('room_ad.duration.minutes') ?? DEFAULT_ROOM_AD_DURATION_MINUTES;
    const limitedExtension = (useConfigValue<boolean>('roomad.limited_extension') === true);
    const room = useRoom();
    const store = useCatalogStoreApi();
    const { updateRoomAdPurchaseData, clearRoomAdPurchaseData } = useCatalogRoomAdActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
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

    const onPurchaseInfoEventRef = useRef(onPurchaseInfoEvent);
    const onRoomInitializedRef = useRef(onRoomInitialized);

    useEffect(() => {
        onPurchaseInfoEventRef.current = onPurchaseInfoEvent;
        onRoomInitializedRef.current = onRoomInitialized;
    });

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
    useEffect(() => {
        if (!room) return;

        const onInitialized = () => onRoomInitializedRef.current(room.roomId);

        room.eventDispatcher.addEventListener(RoomEngineEvent.INITIALIZED, onInitialized);

        return () => room.eventDispatcher.removeEventListener(RoomEngineEvent.INITIALIZED, onInitialized);
    }, [ room ]);

    const onNameChange = (value: string) => {
        setName(value);

        if (roomAdPurchaseData) updateRoomAdPurchaseData({ name: value });
    };

    const onDescriptionChange = (value: string) => {
        setDescription(value);

        if (roomAdPurchaseData) updateRoomAdPurchaseData({ description: value });
    };

    const durationText = t('roomad.catalog_text', '', { duration: String(duration) });
    const categoryLabels = visibleCategories.map(category => t(`navigator.searchcode.title.eventcategory__${category.categoryId}`));

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <ThemeText
                name="ctlg_text_1"
                text={durationTextShown ? durationText : (getCatalogPageText(page, 'ctlg_text_1') ?? durationText)}
                textStyle="u_headline_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 14 }}
            />
            <Region layout={{ position: 'absolute', left: 10, width: 329, top: 44, height: 24 }}>
                <Dropmenu
                    variant="3"
                    caption={categoryLabels[categorySelection] ?? ''}
                    options={categoryLabels.map((label, index) => ({ key: index, label, selected: (index === categorySelection), onSelect: () => selectCategory(index, roomAdPurchaseData) }))}
                    layout={{ width: 329, height: 24 }}
                />
            </Region>
            <ThemeText
                text={t('roomad.catalog_name')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 83 }}
            />
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 102, height: 33 }}
            >
                <TextInput
                    value={name}
                    onChange={onNameChange}
                    maxLength={25}
                    textStyle="u_regular"
                    flashPlacement
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 5, width: 318, top: 5, height: 22 }}
                />
            </Border>
            <ThemeText
                text={t('roomad.catalog_description')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 149 }}
            />
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 168, bottom: 148 }}
            >
                <TextInput
                    value={description}
                    onChange={onDescriptionChange}
                    maxLength={100}
                    multiline
                    textStyle="u_regular"
                    flashPlacement
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 4, bottom: 6 }}
                />
            </Border>
            <ThemeText
                text={t('roomad.catalog_roomname')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, bottom: 119 }}
            />
            <Region layout={{ position: 'absolute', left: 10, width: 330, bottom: 91, height: 24 }}>
                <Dropmenu
                    variant="3"
                    caption={roomLabels[roomSelection] ?? ''}
                    options={roomLabels.map((label, index) => ({ key: index, label, selected: (index === roomSelection), onSelect: () => selectRoom(index, rooms, roomAdPurchaseData) }))}
                    layout={{ width: 330, height: 24 }}
                />
            </Region>
            <Region
                name="price_container"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 58, height: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}
            >
                {priceOffer && <CatalogPriceDisplayView offer={priceOffer} />}
            </Region>
            {children}
        </Region>
    );
};
