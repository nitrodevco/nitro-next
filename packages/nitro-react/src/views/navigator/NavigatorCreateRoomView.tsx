import { ClubLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { CreateFlatComposer, getFlatCategoryVisibleName } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useInterpolate, useNavigatorActions, useNavigatorSelectors, useOwnClubLevel, useOwnSecurityLevel, useTranslation, useWebSocketContext } from '#base/context';
import { Button, ButtonThick, DropmenuSelect, FieldErrorPopup, Frame, ScrollArea } from '#base/theme';

import type { RoomLayout } from './NavigatorCreateRoomLayouts';
import { INPUT_ERROR_BACKGROUND, isLayoutAllowed, ROOM_LAYOUTS, ROOM_LIMIT_HC, ROOM_LIMIT_NON_SUBSCRIBER } from './NavigatorCreateRoomLayouts';
import { NavigatorCreateRoomThumbnailView } from './NavigatorCreateRoomThumbnailView';

/** prepareTradeModeSelection() — three fixed options, the selection index is the wire value */
const TRADE_MODES = [
    'navigator.roomsettings.trade_not_allowed',
    'navigator.roomsettings.trade_not_with_Controller',
    'navigator.roomsettings.trade_allowed'
];

/**
 * roc_create_room — frame style 3, 585x367. Measured against a genuine client
 * screenshot: title bar 31px, content origin at frame-y 24, so the two containers
 * (XML y=15) sit at frame-y 39 and end at 354, leaving ~10px beige above the edge.
 *   room_settings_container (10,15) 255x315 — captions in Volter Bold with the inputs,
 *     dropmenus and buttons at the offsets cited inline
 *   room_layout_container   (270,15) 300x315 — choose_layout_caption + layout_item_list
 *     (290x295, two thumbnails per row) with its scrollbar
 */
export const NavigatorCreateRoomView = () => {
    const { flatCategories } = useNavigatorSelectors();
    const { hideCreateRoom } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const clubLevel = useOwnClubLevel();
    const securityLevel = useOwnSecurityLevel();
    const interpolate = useInterpolate();
    const t = useTranslation();

    const [selectedLayout, setSelectedLayout] = useState<RoomLayout>(ROOM_LAYOUTS[0]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [visitorsIndex, setVisitorsIndex] = useState(0);
    const [tradeIndex, setTradeIndex] = useState(0);
    const [nameError, setNameError] = useState(false);

    // sessionData.hasClub / hasVip / hasSecurity(n)
    const hasClub = clubLevel >= ClubLevelEnum.Club;
    const hasVip = clubLevel >= ClubLevelEnum.Vip;
    const hasStaffSecurity = securityLevel >= SecurityLevelEnum.Employee;      /* hasSecurity(4) */
    const hasCategorySecurity = securityLevel >= SecurityLevelEnum.Community;   /* hasSecurity(7) */

    /* refresh() resets the form on every show; NavigatorView mounts this only while
     * createRoomOpen, so a fresh mount already yields those defaults. */
    /* prepareCategorySelection(): visible, not automatic, staffOnly only with hasSecurity(7) */
    const categories = flatCategories.filter(x => x.visible && !x.automatic && (!x.staffOnly || hasCategorySecurity));

    /* refreshMaxVisitors(hasVip ? 75 : 50): 10, 15, … inclusive */
    const maxVisitors = hasVip ? ROOM_LIMIT_HC : ROOM_LIMIT_NON_SUBSCRIBER;
    const visitorOptions: number[] = [];

    for (let value = 10; value <= maxVisitors; value += 5) visitorOptions.push(value);

    // isAllowed(layout, false) decides visibility — only staff layouts are hidden
    const visibleLayouts = ROOM_LAYOUTS.filter(x => isLayoutAllowed(x, false, hasClub, hasVip, hasStaffSecurity));

    const selectLayout = (layout: RoomLayout) => {
        // onChooseLayout: allowed -> select; otherwise openCatalogClubPage("RoomCreateViewCtrl")
        if (isLayoutAllowed(layout, true, hasClub, hasVip, hasStaffSecurity)) {
            setSelectedLayout(layout);

            return;
        }

        // TODO: openCatalogClubPage — no catalog club-page opener exists yet
    };

    /* TextFieldManager.isInputValid(): !placeholder && trim(text).length > 2 */
    const create = () => {
        if (name.trim().length <= 2) {
            setNameError(true);

            return;
        }

        setNameError(false);

        send(new CreateFlatComposer({
            flatName: name,
            flatDescription: description,
            flatModelName: `model_${selectedLayout.name}`,
            categoryID: categories[categoryIndex]?.nodeId ?? 0,
            maxPlayers: visitorOptions[visitorsIndex] ?? visitorOptions[0],
            tradeSetting: tradeIndex
        }));
    };

    /* border="true" background="true" on both inputs — a Flash TextField border is 1px black */
    const inputClasses = 'absolute left-0 px-1 bg-white border border-black text-style-regular text-black outline-none';

    return (
        <Frame
            caption={t('navigator.createroom.title')}
            /*
             * Util.getLocationRelativeTo(desktop) — the window opens centred.
             * Band positions measured from a genuine client screenshot: title bar 31px,
             * columns at frame-y 39 (content origin 24 + container y 15), ending at 354
             * of the declared 367 — a ~10px beige inset above the bottom edge.
             */
            className="inset-0 m-auto w-146.25 h-91.75"
            contentClassName="relative"
            id="navigator-create-room"
            resizeDirection="none"
            variant="3"
            onClose={hideCreateRoom}>
            {/* room_settings_container — (10,15) 255x315; children at exact XML offsets.
                top: frame-y 39 measured − our 34px chrome = 5px */}
            <div className="absolute left-2.5 top-1.25 w-63.75 h-78.75">
                <span className="absolute left-0 top-0 text-style-button-bold">{t('navigator.roomname')}</span>
                {/* room_name_input (0,20) 240x19, maxlength 25 */}
                <input
                    className={`${inputClasses} top-5 w-60 h-4.75`}
                    maxLength={25}
                    placeholder={t('navigator.createroom.roomnameinfo')}
                    style={{ backgroundColor: nameError ? INPUT_ERROR_BACKGROUND : '#ffffff' }}
                    type="text"
                    value={name}
                    onChange={event => { setName(event.target.value); setNameError(false); }} />
                {/* the error bubble sits above the input, centred, overlapping it by 3px */}
                {nameError && (
                    <FieldErrorPopup className="absolute left-30 top-5 -translate-x-1/2 -translate-y-[calc(100%-3px)]" text={t('navigator.createroom.nameerr')} />
                )}
                <span className="absolute left-0 top-12.5 text-style-button-bold">{t('navigator.roomdesc')}</span>
                {/* room_desc_input (0,70) 240x60, multiline, maxlength 128 */}
                <textarea
                    className={`${inputClasses} top-17.5 w-60 h-15 resize-none`}
                    maxLength={128}
                    placeholder={t('navigator.createroom.roomdescinfo')}
                    value={description}
                    onChange={event => setDescription(event.target.value)} />
                <span className="absolute left-0 top-35 text-style-button-bold">{t('navigator.category')}</span>
                {/* categories_list — dropmenu style="2" (unregistered, falls back to 0), (0,160) 240x21 */}
                <DropmenuSelect
                    className="absolute left-0 top-40 w-60 h-5.25"
                    options={categories.map(x => interpolate(getFlatCategoryVisibleName(x)))}
                    selectedIndex={categoryIndex}
                    variant="2"
                    onSelect={setCategoryIndex} />
                <span className="absolute left-0 top-47.5 text-style-button-bold">{t('navigator.maxvisitors')}</span>
                {/* visitors_list — dropmenu style="0", (0,210) 240x21 */}
                <DropmenuSelect
                    className="absolute left-0 top-52.5 w-60 h-5.25"
                    options={visitorOptions.map(String)}
                    selectedIndex={visitorsIndex}
                    variant="0"
                    onSelect={setVisitorsIndex} />
                <span className="absolute left-0 top-60 text-style-button-bold">{t('navigator.tradesettings')}</span>
                {/* trade_settings_list — dropmenu style="0", (0,260) 240x21; selection index is the wire value */}
                <DropmenuSelect
                    className="absolute left-0 top-65 w-60 h-5.25"
                    options={TRADE_MODES.map(x => t(x))}
                    selectedIndex={tradeIndex}
                    variant="0"
                    onSelect={setTradeIndex} />
                {/* create_button (0,290) 100x21 button_thick style 0 · back_button (140,290) 100x21 button style 0 */}
                <ButtonThick className="absolute left-0 top-72.5 flex items-center justify-center p-0 w-25 h-5.25" variant="0" onClick={create}>
                    {t('navigator.createroom.create')}
                </ButtonThick>
                <Button className="absolute left-35 top-72.5 flex items-center justify-center p-0 w-25 h-5.25" variant="0" onClick={hideCreateRoom}>
                    {t('generic.cancel')}
                </Button>
            </div>
            {/* room_layout_container — (270,15) 300x315 */}
            <div className="absolute left-67.5 top-1.25 w-75 h-78.75">
                <span className="absolute left-0 top-0 text-style-button-bold">{t('navigator.createroom.chooselayoutcaption')}</span>
                {/* layout_item_list (0,20) 290x295 with the scroller OVERLAPPING at x=278 —
                    the scrollbar column must not steal width from the 2x137 tile rows, so
                    the area spans the container's full 300px */}
                <ScrollArea className="absolute left-0 top-5 w-75 h-73.75" contentClassName="flex flex-wrap" variant="0">
                    {visibleLayouts.map(layout => (
                        <NavigatorCreateRoomThumbnailView
                            key={layout.name}
                            layout={layout}
                            selected={layout.name === selectedLayout.name}
                            tileSizeLabel={`${layout.tileSize} ${t('navigator.createroom.tilesize')}`}
                            onSelect={selectLayout} />
                    ))}
                </ScrollArea>
            </div>
        </Frame>
    );
}
