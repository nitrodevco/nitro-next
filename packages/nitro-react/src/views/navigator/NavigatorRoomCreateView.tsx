/**
 * Room creation - `RoomCreateViewCtrl` over `habbo-navigator-com/roc_create_room_xml`, which the new
 * navigator's `create_room` button opens (`HabboNewNavigator.createRoom`).
 *
 * - The name and description fields are `TextFieldManager`s (25 and 128 characters): each starts
 *   out holding its info text (`navigator.createroom.roomnameinfo` / `roomdescinfo`) as real text,
 *   not a placeholder, and the first focus clears it. Until then the field reads as empty.
 * - Create checks the name first (`checkMandatory`: more than two characters once trimmed, and not
 *   the info text). A name that fails turns the field `0xf1a39b` and shows `nav_error_popup` over
 *   it; focusing the untouched field or a name that passes restores the colour, but the popup stays
 *   until the window is opened again, as it does in Flash. A good form sends `CreateFlatComposer`
 *   and waits: `FlatCreatedMessage` enters the room and closes this window.
 * - `layout_item_list` holds `RoomCreateViewCtrl`'s own layouts as `roc_room_thumbnail`s, two to a
 *   row (`getRow`, a plain container the code makes) - each `bg_pic` the image library's
 *   `newroom/model_<name>.png`. A club layout carries the `club_icon` and picking one without club
 *   opens the club centre instead (`onChooseLayout` -> `openCatalogClubPage`); the staff-only ones are
 *   listed only for `hasSecurity(4)`. Under them, without VIP, `roc_vip_promo` links to the club
 *   centre too.
 * - `refreshSelection` marks the picked layout - its `bg_sel`, the white tile icon and size text on
 *   `0xff6f8284` - and its `select_arrow` bobs on a 100 ms timer (`updateArrowPos`). Flash moves
 *   each thumbnail's own arrow, so one picked again resumes where it stopped; here the one arrow
 *   position is shared, which only shows as the bob not restarting from the top.
 *
 * Opening the window while it is already open brings it forward without resetting the form;
 * Flash's `show()` calls `refresh()` either way.
 */
import { ClubLevelEnum } from '@nitrodevco/nitro-api';
import { useEffect, useMemo, useState } from 'react';

import { createFlat, openClubCenter } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { ROOM_CREATE_LAYOUTS, RoomCreateLayout, useNavigatorStore } from '#base/context/navigator';
import { useConfigBoolean, useTranslation } from '#base/context/system';
import { ClientGates, useClientGate, useOwnClubLevel, useOwnHasClub } from '#base/context/user';
import { useWindowVisibility } from '#base/hooks';
import { LayoutImage, TemplateBindings, TemplateElement, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { flatCategoryName } from '#base/utils';

import { NavigatorErrorPopup } from './NavigatorErrorPopup';
import { ROOM_TRADE_MODE_TEXTS } from './roomTradeModeTexts';

const TEMPLATE = 'habbo-navigator-com/roc_create_room_xml';
const THUMBNAIL_TEMPLATE = 'habbo-navigator-com/roc_room_thumbnail_xml';
const VIP_PROMO_TEMPLATE = 'habbo-navigator-com/roc_vip_promo_xml';

/** `ROOM_LIMIT_NON_SUBSCRIBER` / `ROOM_LIMIT_HC`: the highest visitor cap offered, which `refresh` picks by `hasVip`. */
const ROOM_LIMIT_NON_SUBSCRIBER = 50;
const ROOM_LIMIT_HC = 75;

/** The `TextFieldManager` limits the two fields are built with. */
const MAX_NAME_LENGTH = 25;
const MAX_DESCRIPTION_LENGTH = 128;

/** `input.textBackgroundColor`: `refresh` sets white, `displayError` `0xf1a39b`. */
const INPUT_BACKGROUND = 0xffffff;
const INPUT_ERROR_BACKGROUND = 0xf1a39b;

/** `refreshSelection`: `tile_size_txt`'s text colour and window colour, selected and not. */
const TILE_TEXT_SELECTED = { color: 0xffffff, background: 0x6f8284 };
const TILE_TEXT_UNSELECTED = { color: 0x000000, background: 0xcccccb };

/** `room_name_input` in `room_settings_container`, where `displayError` puts its popup. */
const NAME_FIELD = { left: 0, top: 20, width: 240 };

/** `updateArrowPos`: the timer's period and the range the arrow bobs over. */
const ARROW_TICK_MS = 100;
const ARROW_TOP = 0;
const ARROW_BOTTOM = 15;

/** A row's two places, as `addThumbnail` puts every other thumbnail one width to the right. */
const ROW_PLACES = [ 'left', 'right' ] as const;

interface ArrowState { y: number; down: boolean }

/** `updateArrowPos`: one step - a pixel near either end, two in between, turning at the ends. */
const stepArrow = ({ y, down }: ArrowState): ArrowState => {
    const step = ((Math.abs(y - ARROW_TOP) < 2) || (Math.abs(y - ARROW_BOTTOM) < 2)) ? 1 : 2;
    const next = y + (down ? step : -step);

    if (next < ARROW_TOP) return { y: ARROW_TOP + 1, down: true };
    if (next > ARROW_BOTTOM) return { y: ARROW_BOTTOM - 1, down: false };

    return { y: next, down };
};

/** A copy of an element and everything under it: a binding finds its element by identity, so two places can share none. */
const cloneElement = (element: TemplateElement): TemplateElement => ({ ...element, children: element.children.map(cloneElement) });

/**
 * `getRow`: `createWindow("", "", 4, 0, 16, ...)`, a plain container, holding one thumbnail and,
 * one width to its right, the next - here as an element, its thumbnails named for their place.
 */
const rowElement = (thumbnail: TemplateElement, count: number): TemplateElement => ({
    tag: 'container',
    x: 0,
    y: 0,
    width: thumbnail.width * 2,
    height: thumbnail.height,
    params: { parentGraphics: true },
    vars: {},
    children: ROW_PLACES.slice(0, count).map((name, index) => ({ ...cloneElement(thumbnail), name, x: index * thumbnail.width })),
});

/** A `TextFieldManager`'s field: the text, and whether it still holds its info text. */
interface ManagedField { text: string; info: boolean }

/** `getText`: the info text reads as nothing. */
const fieldText = (field: ManagedField) => (field.info ? '' : field.text);

export const NavigatorRoomCreateView = () => {
    const flatCategories = useNavigatorStore(x => x.flatCategories);
    const clubLevel = useOwnClubLevel();
    // `SessionDataManager.hasClub` and `hasVip` are both `clubLevel >= 1` in this revision.
    const hasClub = useOwnHasClub();
    const isStaff = useClientGate(ClientGates.RoomCreateStaffOptions);
    const staffCategories = useClientGate(ClientGates.StaffCategories);
    const clubBuyDisabled = useConfigBoolean('habbo_club_buy_disabled');
    const { hide } = useWindowVisibility('navigator_room_create');
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'navigator_room_create', centered: true, onClose: hide });
    const thumbnailTemplate = useTemplate(THUMBNAIL_TEMPLATE);
    const vipPromoTemplate = useTemplate(VIP_PROMO_TEMPLATE);

    const [ name, setName ] = useState<ManagedField>({ text: t('navigator.createroom.roomnameinfo'), info: true });
    const [ description, setDescription ] = useState<ManagedField>({ text: t('navigator.createroom.roomdescinfo'), info: true });
    const [ nameErrorShown, setNameErrorShown ] = useState(false);
    const [ nameErrorBackground, setNameErrorBackground ] = useState(false);
    const [ categoryIndex, setCategoryIndex ] = useState(0);
    const [ visitorsIndex, setVisitorsIndex ] = useState(0);
    const [ tradeIndex, setTradeIndex ] = useState(0);
    const [ selectedLayout, setSelectedLayout ] = useState(ROOM_CREATE_LAYOUTS[0].name);
    const [ arrow, setArrow ] = useState<ArrowState>({ y: ARROW_TOP, down: true });

    useEffect(() => {
        const timer = setInterval(() => setArrow(stepArrow), ARROW_TICK_MS);

        return () => clearInterval(timer);
    }, []);

    const hasVip = hasClub;

    /** `isAllowed(layout, requireClub)`: listing asks only about staff layouts; choosing asks about club too. */
    const isAllowed = (layout: RoomCreateLayout, requireClub: boolean) => {
        if (layout.requiredClubLevel === Number(ClubLevelEnum.None)) return true;
        if (layout.requiredClubLevel === Number(ClubLevelEnum.Club)) return !requireClub || hasClub;
        if (layout.requiredClubLevel === Number(ClubLevelEnum.Vip)) return !requireClub || hasVip;

        return isStaff;
    };

    // `prepareCategorySelection`: visible, not automatic, and staff-only ones for `hasSecurity(7)`.
    const categories = flatCategories.filter(category => category.visible && !category.automatic && (!category.staffOnly || staffCategories));

    // `refreshMaxVisitors`: 10 to the cap in steps of 5.
    const visitorCap = hasVip ? ROOM_LIMIT_HC : ROOM_LIMIT_NON_SUBSCRIBER;
    const visitorSteps = Array.from({ length: ((visitorCap - 10) / 5) + 1 }, (_, i) => 10 + (i * 5));

    const listedLayouts = ROOM_CREATE_LAYOUTS.filter(layout => isAllowed(layout, false));
    const rows = Array.from({ length: Math.ceil(listedLayouts.length / 2) }, (_, i) => listedLayouts.slice(i * 2, (i * 2) + 2));
    const showVipPromo = (Number(clubLevel) < Number(ClubLevelEnum.Vip)) && !clubBuyDisabled;

    // The row prototypes, one of each width, kept while the thumbnail layout is.
    const rowElements = useMemo(() => {
        const thumbnail = thumbnailTemplate?.elements[0];

        return thumbnail ? [ rowElement(thumbnail, 1), rowElement(thumbnail, 2) ] : undefined;
    }, [ thumbnailTemplate ]);

    const chooseLayout = (layout: RoomCreateLayout) => {
        if (isAllowed(layout, true)) setSelectedLayout(layout.name);
        else openClubCenter(send);
    };

    /** `onInputClick`: the first focus of a field still holding its info text empties it. */
    const focusField = (field: ManagedField, setField: (field: ManagedField) => void, isName: boolean) => {
        if (!field.info) return;

        setField({ text: '', info: false });

        if (isName) setNameErrorBackground(false);
    };

    const create = () => {
        const flatName = fieldText(name);

        // `checkMandatory(navigator.createroom.nameerr)`.
        if (name.info || (flatName.trim().length <= 2)) {
            setNameErrorBackground(true);
            setNameErrorShown(true);

            return;
        }

        setNameErrorBackground(false);

        createFlat(send, {
            flatName,
            flatDescription: fieldText(description),
            flatModelName: `model_${selectedLayout}`,
            categoryID: categories[categoryIndex]?.nodeId ?? 0,
            maxPlayers: visitorSteps[visitorsIndex],
            tradeSetting: tradeIndex,
        });
    };

    /** `addThumbnail` and `refreshSelection` over one place of a row. */
    const thumbnailBindings = (place: string, layout: RoomCreateLayout): TemplateBindings => {
        const selected = layout.name === selectedLayout;
        const tileText = selected ? TILE_TEXT_SELECTED : TILE_TEXT_UNSELECTED;

        return {
            [place]: { onPointerTap: () => chooseLayout(layout) },
            [`${place}/bg_sel`]: { visible: selected },
            [`${place}/bg_unsel`]: { visible: !selected },
            [`${place}/bg_pic`]: { asset: `\${image.library.url}newroom/model_${layout.name}.png` },
            [`${place}/tile_size_txt`]: { caption: `${layout.tileSize} ${t('navigator.createroom.tilesize')}`, color: tileText.color, backgroundColor: tileText.background },
            // `refreshButton`: each shown with the navigator's bitmap of its name.
            [`${place}/tile_icon_black`]: { visible: !selected, asset: LayoutImage('habbo-navigator-com/tile_icon_black.png') },
            [`${place}/tile_icon_white`]: { visible: selected, asset: LayoutImage('habbo-navigator-com/tile_icon_white.png') },
            [`${place}/select_arrow`]: { visible: selected, asset: LayoutImage('habbo-navigator-com/select_arrow.png') },
            [`${place}/club_icon`]: { visible: (layout.requiredClubLevel === Number(ClubLevelEnum.Club)) || (layout.requiredClubLevel === Number(ClubLevelEnum.Vip)) },
        };
    };

    const items: TemplateItem[] = [];

    if (rowElements) for (const row of rows) {
        const selectedPlace = row.findIndex(layout => layout.name === selectedLayout);

        items.push({
            key: row[0].name,
            from: rowElements[row.length - 1],
            bindings: Object.assign({}, ...row.map((layout, index) => thumbnailBindings(ROW_PLACES[index], layout))) as TemplateBindings,
            // `updateArrowPos` moves the picked thumbnail's arrow.
            arrange: (selectedPlace >= 0) ? ({ find }: TemplateWindows) => find(`${ROW_PLACES[selectedPlace]}/select_arrow`)?.setY(arrow.y) : undefined,
        });
    }

    if (showVipPromo && vipPromoTemplate) items.push({
        key: 'vip_promo',
        from: vipPromoTemplate,
        bindings: { link: { onPointerTap: () => openClubCenter(send) } },
    });

    const inputBackground = nameErrorBackground ? INPUT_ERROR_BACKGROUND : INPUT_BACKGROUND;

    const bindings: TemplateBindings = {
        room_name_input: {
            caption: name.text,
            maxChars: MAX_NAME_LENGTH,
            backgroundColor: inputBackground,
            onFocus: () => focusField(name, setName, true),
            onChange: text => setName({ text, info: false }),
        },
        room_desc_input: {
            caption: description.text,
            maxChars: MAX_DESCRIPTION_LENGTH,
            backgroundColor: INPUT_BACKGROUND,
            onFocus: () => focusField(description, setDescription, false),
            onChange: text => setDescription({ text, info: false }),
        },
        categories_list: { options: categories.map(category => flatCategoryName(category, t)), selection: categoryIndex, onSelect: setCategoryIndex },
        visitors_list: { options: visitorSteps.map(String), selection: visitorsIndex, onSelect: setVisitorsIndex },
        trade_settings_list: { options: ROOM_TRADE_MODE_TEXTS, selection: tradeIndex, onSelect: setTradeIndex },
        create_button: { onPointerTap: create },
        back_button: { onPointerTap: hide },
        layout_item_list: { items },
        // `displayError` adds its popup to the name field's own parent.
        room_settings_container: {
            children: nameErrorShown
                ? (
                        <NavigatorErrorPopup
                            text={t('navigator.createroom.nameerr')}
                            fieldLeft={NAME_FIELD.left}
                            fieldTop={NAME_FIELD.top}
                            fieldWidth={NAME_FIELD.width}
                        />
                    )
                : undefined,
        },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
