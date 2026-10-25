/**
 * The avatar editor window - Flash `AvatarEditorView`: `habbo-avatar-editor-com/AvatarEditorFrame`
 * (`getFrame`, opened at `DEFAULT_LOCATION` 100,30) with `AvatarEditorContent` embedded in its
 * `maincontent` (`embedToContext`).
 *
 * - `createWindow`: `avatar_name` is the user's name. `mainTabs` keeps only the available
 *   categories, in layout order (later tabs move left into a removed one's place): generic, head,
 *   torso, legs, hot looks, the NFT outfits (`nfts`), and effects only with
 *   `effects.in.avatar.editor`, misc only with `clothing.misc.tab.enabled`.
 * - `setViewToCategory`: `contentArea` shows the selected category's `<category>_content`; the
 *   parts grid (`AvatarEditorGridView`, `grid_container`) shows for the part categories, not for
 *   hot looks, NFT outfits or effects; `effectParamsContainer` only on effects.
 * - `NftAvatarsModel` / `NftAvatarsView`: the user's NFT outfits (`GetUserNftWardrobeMessageComposer`,
 *   asked as the editor opens) fill `nfts`, one `Outfit` each (`NftOutfit`: the look facing 4 at the
 *   bottom of `bitmap`, `button` and `outfit_gradient` in its contract's colours, brighter while
 *   picked). Picking one (`selectNftAvatar`) loads its look and names it in `collectible_avatar_info`
 *   (`NftWardrobeParamView`: its contract's name and `#id` in the contract's colour), and a save then
 *   wears it (`SaveUserNftWardrobeMessageComposer` and `GetSelectedNftWardrobeOutfitMessageComposer`)
 *   instead of sending the figure.
 * - `HabboAvatarEditor.onUserNftWardrobeMessage` (`GetSelectedNftWardrobeOutfitMessageComposer`, asked
 *   as the editor opens): with an NFT outfit worn the editor shows the server's fallback look away from
 *   the NFT tab. `windowEventProc`'s `WE_SELECTED` swaps the look as the tab changes: to the worn NFT
 *   outfit on the NFT tab (and on effects), to the fallback look elsewhere, or - with none worn - back
 *   to the look from before an outfit was picked (`loadRollbackFigure`). On the NFT tab `wardrobe` is
 *   disabled and the side content closed.
 * - The category views (`BodyView`, `HeadView`, ...): each sub tab's `BITMAP` is its `_off` art
 *   unless it is the current one or under the pointer (`TabUtils.setElementImage`); the gender tabs
 *   light the editing gender, and pressing one changes it.
 * - `AvatarEditorGridView.initFromList`: `thumbs` holds a clone of `thumb_template` per part
 *   (`AvatarEditorGridPartItem`: `BG_COLOR` full while selected, at half under the pointer; the
 *   thumbnail in `bitmap`; `CLUB_ICON` and `SELLABLE_ICON`), the palettes a clone of
 *   `palette_template` per colour (`AvatarEditorGridColorItem`: the swatch in `COLOR_IMAGE`, the
 *   `BORDER` `_3` while selected or under the pointer, else `_1`; `CLUB_ICON`). A category without
 *   parts shows `content_title` and `content_notification` instead. `showPalettes`: one palette as
 *   wide as `thumbs`, or two `(width - 10) / 2` wide, 10 apart.
 * - `avatarWidget` is the room previewer with the editing figure, wearing the editor's effect
 *   (`FigureDataView.update` with `avatarEffectType`); `rotate_avatar` turns it,
 *   `save` saves the look (or a clothing booth's) and closes the editor.
 * - `setSideContent`: `wardrobe` toggles the wardrobe (`AvatarEditorWardrobe`) into
 *   `sideContainer`, which takes its width; the content and the frame grow with it.
 *
 * The effects tab: `useAvatarEditorEffects`; the NFT outfits: `useAvatarEditorNfts`; `save`:
 * `useAvatarEditorSave`.
 *
 * Not ported: `avatar_name_change` (`premium.name.change.enabled`, `AvatarEditorNameChangeView`) - its
 * layouts are only in the AS3, not in the `habbo-avatar-editor-com` template bundle.
 */
import { AvatarEditorCategory, AvatarFigurePartType, AvatarGenderType, RoomId } from '@nitrodevco/nitro-api';
import { useEffect, useMemo, useRef, useState } from 'react';

import { closeAvatarEditorEffect, hasAvatarEditorInvalidClubItems, hasAvatarEditorInvalidSellableItems, markAvatarEditorInitialised, openClubCenter, requestAvatarEditorData, returnAvatarEditorFromBooth, saveWardrobeOutfit, stripAvatarEditorClubItems, stripAvatarEditorInvalidSellableItems } from '#base/commands';
import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { DEFAULT_WARDROBE_SLOTS, useAvatarEditorActions, useAvatarEditorStore, WARDROBE_SLOTS_KEY } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useConfigValue, useWindowParams } from '#base/context/system';
import { useOwnClubLevel, useOwnUserFigure, useOwnUserGender, useUserStore } from '#base/context/user';
import { AvatarEditorColorData, AvatarEditorPartData, useAvatarEditorData, usePartThumbnailLifetime, useWindowVisibility } from '#base/hooks';
import { findTemplateChild, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, ThemeImage, useTemplate } from '#base/theme';
import { firstSelectableColorId } from '#base/utils';

import { AvatarEditorOutfitImage } from './AvatarEditorOutfitImage';
import { AvatarEditorPartImage } from './AvatarEditorPartImage';
import { AvatarEditorWardrobe } from './AvatarEditorWardrobe';
import { useAvatarEditorEffects } from './useAvatarEditorEffects';
import { useAvatarEditorNfts } from './useAvatarEditorNfts';
import { useAvatarEditorSave } from './useAvatarEditorSave';

const LIBRARY = 'habbo-avatar-editor-com';

/** `FurnitureClothingChangeWidgetHandler`: the booth's editor shows these tabs only (`AvatarEditorView._availableCategories`). */
const BOOTH_CATEGORIES: readonly AvatarEditorCategory[] = [ AvatarEditorCategory.Torso, AvatarEditorCategory.Legs ];

/** `AvatarEditorView._allCategories` in `mainTabs`' order; effects and misc each behind a setting. */
const CATEGORIES: readonly { category: AvatarEditorCategory; setting?: string }[] = [
    { category: AvatarEditorCategory.Generic },
    { category: AvatarEditorCategory.Head },
    { category: AvatarEditorCategory.Torso },
    { category: AvatarEditorCategory.Legs },
    { category: AvatarEditorCategory.Misc, setting: 'clothing.misc.tab.enabled' },
    { category: AvatarEditorCategory.HotLooks },
    { category: AvatarEditorCategory.Effects, setting: 'effects.in.avatar.editor' },
    { category: AvatarEditorCategory.Nfts },
];

/** Each category's sub tabs (`<category>_content`'s regions) and the set type each switches to - `HeadView.switchCategory` and its kin. */
const CATEGORY_TABS: Partial<Record<AvatarEditorCategory, readonly { tab: string; setType: AvatarFigurePartType }[]>> = {
    [AvatarEditorCategory.Head]: [
        { tab: 'tab_hair', setType: AvatarFigurePartType.Hair },
        { tab: 'tab_hat', setType: AvatarFigurePartType.HeadAccessory },
        { tab: 'tab_accessories', setType: AvatarFigurePartType.HeadAccessoryExtra },
        { tab: 'tab_eyewear', setType: AvatarFigurePartType.EyeAccessory },
        { tab: 'tab_masks', setType: AvatarFigurePartType.FaceAccessory },
    ],
    [AvatarEditorCategory.Torso]: [
        { tab: 'tab_shirt', setType: AvatarFigurePartType.Chest },
        { tab: 'tab_prints', setType: AvatarFigurePartType.ChestPrint },
        { tab: 'tab_jacket', setType: AvatarFigurePartType.CoatChest },
        { tab: 'tab_accessories', setType: AvatarFigurePartType.ChestAccessory },
    ],
    [AvatarEditorCategory.Legs]: [
        { tab: 'tab_pants', setType: AvatarFigurePartType.Legs },
        { tab: 'tab_shoes', setType: AvatarFigurePartType.Shoes },
        { tab: 'tab_belts', setType: AvatarFigurePartType.WaistAccessory },
    ],
    [AvatarEditorCategory.Misc]: [
        { tab: 'tab_pets', setType: AvatarFigurePartType.Pet },
        { tab: 'tab_misc', setType: AvatarFigurePartType.Misc },
    ],
};

/** `BodyView`'s gender tabs. */
const GENDER_TABS: readonly { tab: string; gender: AvatarGenderType; icon: string }[] = [
    { tab: 'tab_boy', gender: AvatarGenderType.Male, icon: 'avatar_editor_tabs_gender_male' },
    { tab: 'tab_girl', gender: AvatarGenderType.Female, icon: 'avatar_editor_tabs_gender_female' },
];

/** Each sub tab's art, as the layout names it without its `_off`. */
const SUB_TAB_ICONS: Record<string, string> = {
    'head/tab_hair': 'avatar_editor_tabs_head_hair',
    'head/tab_hat': 'avatar_editor_tabs_head_hats',
    'head/tab_accessories': 'avatar_editor_tabs_head_accessories',
    'head/tab_eyewear': 'avatar_editor_tabs_head_eyewear',
    'head/tab_masks': 'avatar_editor_tabs_head_face_accessories',
    'torso/tab_shirt': 'avatar_editor_tabs_top_shirt',
    'torso/tab_prints': 'avatar_editor_tabs_top_prints',
    'torso/tab_jacket': 'avatar_editor_tabs_top_jacket',
    'torso/tab_accessories': 'avatar_editor_tabs_top_accessories',
    'legs/tab_pants': 'avatar_editor_tabs_bottom_trousers',
    'legs/tab_shoes': 'avatar_editor_tabs_bottom_shoes',
    'legs/tab_belts': 'avatar_editor_tabs_bottom_accessories',
    'misc/tab_pets': 'avatar_editor_tabs_icon_misc_pets',
    'misc/tab_misc': 'avatar_editor_tabs_icon_misc_misc',
};

/** `TabUtils.setElementImage`: the art itself while active, its `_off` art otherwise. */
const subTabAsset = (icon: string, active: boolean) => `habbo-window-manager-com-${icon}${active ? '' : '_off'}`;

/** `AvatarEditorGridColorItem`'s swatch and its two borders. */
const COLOR_ASSET = 'habbo-window-manager-com-avatar_editor_editor_clr_13x21_2';
const COLOR_BORDER_SELECTED = 'habbo-window-manager-com-avatar_editor_editor_clr_13x21_3';
const COLOR_BORDER = 'habbo-window-manager-com-avatar_editor_editor_clr_13x21_1';

/** `AvatarEditorGridPartItem.onMouseOver`: the highlight's blend under the pointer. */
const HOVER_ALPHA = 0.5;

/** `showPalettes`: two palettes share the parts grid's width, 10 apart. */
const PALETTE_GAP = 10;

/** The frame's `maincontent` sits 33 down with 2 under it. */
const FRAME_CHROME_HEIGHT = 35;

/**
 * `avatarWidget` (125x210) - `RoomPreviewerWidget` with `room_previewer:zoom` 2 and `offsetx` / `offsety`
 * -65 / -30: the preview canvas, the widget's size, has the object's location at its centre
 * (`RoomPreviewer.getRoomCanvas`), and is drawn twice its size at that offset. The port renders the
 * room at scale 2 into the widget, so the feet are held where that centre lands.
 */
const AVATAR_WIDGET_WIDTH = 125;
const AVATAR_WIDGET_HEIGHT = 210;
const AVATAR_WIDGET_ZOOM = 2;
const AVATAR_WIDGET_OFFSET_X = -65;
const AVATAR_WIDGET_OFFSET_Y = -30;
const AVATAR_ANCHOR = {
    x: ((AVATAR_WIDGET_ZOOM * AVATAR_WIDGET_WIDTH) / 2) + AVATAR_WIDGET_OFFSET_X,
    y: ((AVATAR_WIDGET_ZOOM * AVATAR_WIDGET_HEIGHT) / 2) + AVATAR_WIDGET_OFFSET_Y,
};

/** The wardrobe layout's width, and `setSideContent`'s width for an empty side. */
const WARDROBE_WIDTH = 182;
const EMPTY_SIDE_WIDTH = 1;

/** `AvatarEditorGridView.GET_MORE`, its icon (`camera_zoom_in`) and a hover id no part has. */
const GET_MORE = 'GET_MORE';
const GET_MORE_ICON = 'habbo-window-manager-com-camera_zoom_in';
const GET_MORE_ID = -2;
const OFFICIAL_SELLABLE_SUPPORT = true;

const DEFAULT_FIGURES: Partial<Record<AvatarGenderType, string>> = {
    [AvatarGenderType.Male]: 'hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007',
    [AvatarGenderType.Female]: 'hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68',
};

export const AvatarEditor = () => {
    const name = useUserStore(x => x.name);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const clubLevel = useOwnClubLevel();
    const { clothingChange } = useWindowParams('avatar_editor');
    const activeCategory = useAvatarEditorStore(x => x.activeCategory);
    const activeSubType = useAvatarEditorStore(x => x.activeSubType);
    const wardrobeVisible = useAvatarEditorStore(x => x.wardrobeVisible);
    const wardrobe = useAvatarEditorStore(x => x.wardrobe);
    const figure = useAvatarEditorStore(x => x.figure);
    const figureParts = useAvatarEditorStore(x => x.parts);
    const gender = useAvatarEditorStore(x => x.gender);
    const avatarEffectType = useAvatarEditorStore(x => x.avatarEffectType);
    const figureSetIds = useAvatarEditorStore(x => x.figureSetIds);
    const activeSetType = activeSubType[activeCategory];
    const { setActiveCategory, setActiveSubType, setWardrobeVisible, setWardrobeSlot, loadFigure, setPart, removePart, setColors, setGender, lendToBooth } = useAvatarEditorActions();
    const hotLooks = useAvatarEditorStore(x => x.hotLooks);
    const outfitTemplate = useTemplate(`${LIBRARY}/Outfit`);
    const contentTemplate = useTemplate(`${LIBRARY}/AvatarEditorContent`);
    const zoom = useConfigBoolean('zoom.enabled');
    const { parts, palettes } = useAvatarEditorData(activeSetType);
    const { hide } = useWindowVisibility('avatar_editor');
    const miscEnabled = useConfigBoolean('clothing.misc.tab.enabled');
    const effectsEnabled = useConfigBoolean('effects.in.avatar.editor');
    const maxWardrobeSlots = useConfigValue<number>(WARDROBE_SLOTS_KEY) ?? DEFAULT_WARDROBE_SLOTS;
    // `generateDataContent`: the `GET_MORE` thumb with `avatareditor.support.sellablefurni`. This hotel
    // leaves it unset; the official one shows the thumb (editor-plus.png, avatareditor.png), so unset is on.
    const sellableSupport = useConfigBoolean('avatareditor.support.sellablefurni', OFFICIAL_SELLABLE_SUPPORT);
    // The sub tab, part and colour under the pointer (`WME_OVER` / `WME_OUT`).
    const [ hoveredTab, setHoveredTab ] = useState<string | null>(null);
    const [ hoveredPart, setHoveredPart ] = useState<number | null>(null);
    const [ hoveredColor, setHoveredColor ] = useState<string | null>(null);
    // The room previewer once its room exists: the content template, and the previewer in it, mount after the window.
    const [ previewer, setPreviewer ] = useState<RoomPreviewerHandle | null>(null);
    const { send } = useWebSocketContext();
    const frame = useMemo(() => ({
        id: 'avatarEditor',
        defaultPosition: { x: 100, y: 30 },
        // `header_button_close`: club items the user may not wear are taken off before it closes.
        onClose: () => {
            if (hasAvatarEditorInvalidClubItems(clubLevel)) stripAvatarEditorClubItems(clubLevel);

            hide();
        },
    }), [ hide, clubLevel ]);

    usePartThumbnailLifetime();
    // The effects tab is the one shown only while it is enabled (`shownCategory` falls back otherwise).
    const effectsTab = useAvatarEditorEffects(effectsEnabled && (activeCategory === AvatarEditorCategory.Effects));
    const nfts = useAvatarEditorNfts(outfitTemplate, zoom);
    const { saveLocked, saveFigure, openClothesPage } = useAvatarEditorSave(hide, effectsTab.save);

    const changeGender = (next: AvatarGenderType) => {
        if (next === gender) return;

        setGender(next);
        loadFigure(DEFAULT_FIGURES[next] ?? '', next);
    };

    /** `CategoryBaseModel.selectPart`: a part above the user's club level is not put on - the club centre opens instead. */
    const selectPart = (part: AvatarEditorPartData) => {
        if (part.disabled) {
            openClubCenter(send);

            return;
        }

        if (part.id === -1) {
            removePart(activeSetType);

            return;
        }

        setPart(activeSetType, part.id, figureParts[activeSetType]?.colorIds ?? [ firstSelectableColorId(activeSetType, clubLevel) ]);
    };

    /** `CategoryBaseModel.selectColor`: as `selectPart`, for a colour. */
    const selectColor = (color: AvatarEditorColorData, layer: number) => {
        if (color.disabled) {
            openClubCenter(send);

            return;
        }

        const colorIds = [ ...(figureParts[activeSetType]?.colorIds ?? []) ];

        colorIds[layer] = color.id;
        setColors(activeSetType, colorIds);
    };

    /** `WardrobeSlot` set button: the current look goes into the slot (server slots are 1-based). */
    const saveWardrobeSlot = (index: number) => {
        if (!figure) return;

        saveWardrobeOutfit(send, index + 1, figure, gender);
        setWardrobeSlot(index, { figure, gender });
    };

    // `AvatarEditorView.update`, run as a look is loaded or the club level or owned clothes change:
    // club items above the club level and sellable items the user does not own are taken off.
    useEffect(() => {
        if (hasAvatarEditorInvalidClubItems(clubLevel)) stripAvatarEditorClubItems(clubLevel);
        if (hasAvatarEditorInvalidSellableItems()) stripAvatarEditorInvalidSellableItems(clubLevel);
    }, [ figure, clubLevel, figureSetIds ]);

    // The previewed avatar follows every edit and the effect it wears (re-dressed in place, not re-added).
    useEffect(() => {
        if (figure) previewer?.updateAvatar(figure, gender, avatarEffectType);
    }, [ previewer, figure, gender, avatarEffectType ]);

    // `HabboAvatarEditorManager.close`, however the window goes.
    useEffect(() => () => closeAvatarEditorEffect(), []);

    // A booth brings its own outfit; loading it here keeps the editing figure something only the editor sets. It is editor
    // instance 1, made anew each time (`openEditor(1, this, ["torso","legs"])`, `selectDefaultCategory`: torso), so the
    // main editor's own look is set aside until it opens again.
    useEffect(() => {
        if (!clothingChange) return;

        lendToBooth();
        setActiveCategory(AvatarEditorCategory.Torso);
        loadFigure(clothingChange.figure, clothingChange.gender, true);
    }, [ clothingChange?.objectId, clothingChange?.figure, clothingChange?.gender ]);

    // `HabboAvatarEditorManager.loadOwnAvatarInEditor` as the editor opens: once the server has named a worn NFT outfit
    // (`hasNftOutfit` - any token id, the empty one too, until the next save) only the fallback look is loaded, and an empty
    // fallback loads nothing, so a change left unsaved is still there when the editor opens again. After a save the token is
    // cleared (`saveCurrentSelection`) and every later opening loads the session's look (official: lab30 + lab32, 2/2). It runs
    // once an opening: nothing in the editor listens to the user's figure, so a figure update while it is open (a booth, a
    // mannequin) leaves the look being edited alone. The editor can mount before the user's info arrives, so opening with an
    // empty figure never sticks. After a booth the main editor gets its own look back first (instance 0 was only hidden), and
    // the booth's `GetSelectedNftWardrobe` answer reaches it too (each instance listens, `HabboAvatarEditor.init`), so the
    // token it names counts here as well; a main editor that never opened before the booth starts on the user's look.
    const ownLoaded = useRef(false);

    useEffect(() => {
        if (clothingChange) {
            ownLoaded.current = false;

            return;
        }

        if (!ownFigure && !ownGender) return;

        if (ownLoaded.current) return;

        ownLoaded.current = !!ownFigure;

        if (!returnAvatarEditorFromBooth()) return;

        loadFigure(ownFigure || DEFAULT_FIGURES[ownGender] || '', ownGender, true);
    }, [ ownFigure, ownGender, !!clothingChange ]);

    // `HabboAvatarEditor.init` (`requestAvatarEditorData`). The main editor is only hidden on
    // close, so once a session; the clothing change editor is disposed on close (`HabboAvatarEditorManager.close`)
    // and opens on torso and legs only, so every opening and without hot looks.
    useEffect(() => {
        if (!clothingChange && !markAvatarEditorInitialised()) return;

        requestAvatarEditorData(send, !!clothingChange);
    }, [ !!clothingChange ]);

    /**
     * `AvatarEditorView.windowEventProc`'s `WE_SELECTED`, then `setViewToCategory`: the look follows
     * the tab while an NFT outfit is worn or picked (`useAvatarEditorNfts`). The NFT tab closes the
     * side content.
     */
    const selectCategory = (category: AvatarEditorCategory) => {
        if (category === shownCategory) return;

        setActiveCategory(category);

        if (category === AvatarEditorCategory.Nfts) setWardrobeVisible(false);

        nfts.followCategory(category);
    };

    const categories = CATEGORIES.filter(({ category }) => {
        if (clothingChange) return BOOTH_CATEGORIES.includes(category);
        if (category === AvatarEditorCategory.Misc) return miscEnabled;
        if (category === AvatarEditorCategory.Effects) return effectsEnabled;

        return true;
    }).map(({ category }) => category);
    // A category whose tab is gone falls back to the first.
    const shownCategory = categories.includes(activeCategory) ? activeCategory : categories[0];
    // `_effectsGridView` is built on the parts' `grid_container` too.
    const showGrid = (shownCategory !== AvatarEditorCategory.HotLooks) && (shownCategory !== AvatarEditorCategory.Nfts);
    const effectsShown = shownCategory === AvatarEditorCategory.Effects;
    // `setSideContent`: the content reaches `sideContainer`'s right edge - the wardrobe's width with it,
    // 1 with nothing in it - so the name banner ends where the frame's right border begins.
    const sideContainerX = (contentTemplate && findTemplateChild(contentTemplate.elements, 'sideContainer')?.x) ?? 0;
    // `isSideContentEnabled`: the booth's editor has no side content, so no wardrobe (`AvatarEditorView.update`).
    const sideShown = wardrobeVisible && !clothingChange;
    const contentWidth = sideContainerX + (sideShown ? WARDROBE_WIDTH : EMPTY_SIDE_WIDTH);

    // `HotLooksView.update`: the looks of the gender being edited, each an `Outfit` whose button is
    // enabled for a real look (`OutfitView`); a press puts the look on (`HotLooksModel.selectHotLook`).
    const hotLookItems: TemplateItem[] = outfitTemplate
        ? hotLooks.filter(look => look && (look.gender === gender)).map((look, index) => ({
                key: String(index),
                from: outfitTemplate,
                bindings: {
                    '': { onPointerTap: () => look?.figure && loadFigure(look.figure, look.gender) },
                    button: { disabled: !look?.figure },
                    outfit_gradient: { visible: false },
                    bitmap: { children: look?.figure && (
                        <AvatarEditorOutfitImage
                            figure={look.figure}
                            gender={look.gender}
                            zoom={zoom}
                        />
                    ) },
                },
            }))
        : [];

    const viewBindings: TemplateBindings = {
        avatar_name: { caption: name },
        // `setSideContent('wardrobe')` / `'nothing'`.
        // `setViewToCategory`: disabled on the NFT tab.
        wardrobe: { disabled: shownCategory === AvatarEditorCategory.Nfts, onPointerTap: () => setWardrobeVisible(!wardrobeVisible) },
        wardrobeButtonContainer: { visible: !clothingChange },
        sideContainer: {
            children: sideShown && (
                <AvatarEditorWardrobe
                    slots={wardrobe}
                    slotCount={maxWardrobeSlots}
                    onSave={saveWardrobeSlot}
                    onLoad={(index, outfit) => loadFigure(outfit.figure, outfit.gender)}
                />
            ),
        },

        mainTabs: {
            items: categories.map(category => ({
                key: category,
                from: `mainTabs/${category}`,
                bindings: { '': { selected: category === shownCategory, onPointerTap: () => selectCategory(category) } },
            })),
        },

        // `BodyView.updateGenderTab`; a press changes the editing gender.
        ...Object.fromEntries(GENDER_TABS.map(({ tab, gender: tabGender }) => [ `generic_content/${tab}`, {
            onPointerTap: () => changeGender(tabGender),
            onPointerOver: () => setHoveredTab(`generic/${tab}`),
            onPointerOut: () => setHoveredTab(null),
        } ])),
        ...Object.fromEntries(GENDER_TABS.map(({ tab, gender: tabGender, icon }) => [ `generic_content/${tab}/#BITMAP`, { asset: subTabAsset(icon, (gender === tabGender) || (hoveredTab === `generic/${tab}`)) } ])),

        // The NFT outfits' grid and `collectible_avatar_info`.
        ...nfts.bindings,
        'hotlooks_content/hotlooks': { items: hotLookItems },

        ...effectsTab.paramBindings,
        grid_container: { visible: showGrid },
    };

    // `setViewToCategory`: only the selected category's container is in `contentArea`.
    for (const category of CATEGORIES) viewBindings[`contentArea/${category.category}_content`] = { visible: category.category === shownCategory };

    // The category views' sub tabs.
    for (const [ category, tabs ] of Object.entries(CATEGORY_TABS)) {
        for (const { tab, setType } of tabs) {
            const key = `${category}/${tab}`;

            viewBindings[`${category}_content/${tab}`] = {
                onPointerTap: () => setActiveSubType(setType),
                onPointerOver: () => setHoveredTab(key),
                onPointerOut: () => setHoveredTab(null),
            };
            viewBindings[`${category}_content/${tab}/#BITMAP`] = { asset: subTabAsset(SUB_TAB_ICONS[key], (activeSetType === setType) || (hoveredTab === key)) };
        }
    }

    // `AvatarEditorGridView.initFromList`.
    const thumbs: TemplateItem[] = parts.map(part => ({
        key: String(part.id),
        from: 'thumb_template',
        bindings: {
            '': {
                onPointerTap: () => selectPart(part),
                onPointerOver: () => setHoveredPart(part.id),
                onPointerOut: () => setHoveredPart(current => ((current === part.id) ? null : current)),
            },
            '#BG_COLOR': { visible: part.selected || (hoveredPart === part.id), alpha: part.selected ? 1 : HOVER_ALPHA },
            bitmap: {
                children: (
                    <AvatarEditorPartImage
                        part={part}
                        setType={activeSetType}
                        colors={part.partColors}
                        usesColors={part.usesColors}
                        isClear={part.isClear}
                        disabled={part.disabled}
                    />
                ),
            },
            '#CLUB_ICON': { visible: part.isClub },
            '#SELLABLE_ICON': { visible: part.isSellable },
        },
    }));

    const paletteItems = (layer: number): TemplateItem[] => (palettes[layer] ?? []).map((color) => {
        const key = `${layer}/${color.id}`;

        return {
            key: String(color.id),
            from: 'palette_template',
            bindings: {
                '': {
                    onPointerTap: () => selectColor(color, layer),
                    onPointerOver: () => setHoveredColor(key),
                    onPointerOut: () => setHoveredColor(current => ((current === key) ? null : current)),
                },
                '#COLOR_IMAGE': { asset: COLOR_ASSET, color: color.partColor.rgb },
                '#BORDER': { asset: (color.selected || (hoveredColor === key)) ? COLOR_BORDER_SELECTED : COLOR_BORDER },
                '#CLUB_ICON': { visible: color.isClub },
            },
        };
    });

    // `GET_MORE`: the last thumb, `camera_zoom_in` centred in it; a click opens the clothes page (`onGridItemClicked`).
    if (sellableSupport) {
        thumbs.push({
            key: GET_MORE,
            from: 'thumb_template',
            bindings: {
                '': {
                    onPointerTap: openClothesPage,
                    onPointerOver: () => setHoveredPart(GET_MORE_ID),
                    onPointerOut: () => setHoveredPart(current => ((current === GET_MORE_ID) ? null : current)),
                },
                '#BG_COLOR': { visible: hoveredPart === GET_MORE_ID, alpha: HOVER_ALPHA },
                // `updateThumbVisualization` copies the icon unscaled into the bitmap's centre; the layout's bitmap stretches.
                bitmap: {
                    children: (
                        <ThemeImage
                            src={GET_MORE_ICON}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, width: '100%', top: 0, height: '100%' }}
                        />
                    ),
                },
                '#CLUB_ICON': { visible: false },
                '#SELLABLE_ICON': { visible: false },
            },
        });
    }

    const hasParts = thumbs.length > 0;
    // `showPalettes(colorLayerCount)`: none without parts.
    const layers = parts.length ? palettes.length : 0;

    const bindings: TemplateBindings = {
        ...viewBindings,
        thumbs: { visible: hasParts, items: thumbs },
        palette0: { visible: layers > 0, items: paletteItems(0) },
        palette1: { visible: layers > 1, items: paletteItems(1) },
        content_title: { visible: !hasParts },
        content_notification: { visible: !hasParts },
        // `AvatarEditorGridViewEffects.initFromList` / `showPalettes(0)`.
        ...(effectsShown && {
            thumbs: { visible: effectsTab.hasEffects, items: effectsTab.thumbs },
            palette0: { visible: false },
            palette1: { visible: false },
            content_title: { visible: !effectsTab.hasEffects },
            content_notification: { visible: !effectsTab.hasEffects },
        }),
        avatarWidget: {
            children: (
                <RoomPreviewer
                    onReady={setPreviewer}
                    roomId={RoomId.TEMP_ROOM_AVATAR_EDITOR}
                    scale={AVATAR_WIDGET_ZOOM}
                    anchor={AVATAR_ANCHOR}
                    layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                />
            ),
        },
        rotate_avatar: { onPointerTap: () => previewer?.rotateAvatar() },
        save: { disabled: saveLocked, onPointerTap: saveFigure },
    };

    const arrange = ({ find }: TemplateWindows) => {
        // `setSideContent`: `sideContainer` as wide as the wardrobe, or 1 with nothing in it.
        find('sideContainer')?.setWidth(sideShown ? WARDROBE_WIDTH : EMPTY_SIDE_WIDTH);

        // `showPalettes`: one palette as wide as the parts grid, or two sharing it.
        const grid = find('thumbs');
        const first = find('palette0');
        const second = find('palette1');

        if (!grid || !first || !second) return;

        if (layers === 1) {
            first.setWidth(grid.width);
        } else if (layers > 1) {
            const width = Math.trunc((grid.width - PALETTE_GAP) / 2);

            first.setWidth(width);
            second.setWidth(width);
            second.setX(first.x + first.width + PALETTE_GAP);
        }
    };

    // The frame is sized from the content's layout, so it waits for it.
    if (!contentTemplate) return null;

    return (
        <TemplateWindow
            id={`${LIBRARY}/AvatarEditorFrame`}
            frame={frame}
            width={contentWidth}
            height={contentTemplate.height + FRAME_CHROME_HEIGHT}
            bindings={{
                // `getFrame(categories, title)`: the booth names its editor.
                ...(clothingChange ? { '': { caption: '${widget.furni.clothingchange.editor.title}' } } : {}),
                maincontent: {
                    children: (
                        <TemplateWindow
                            id={`${LIBRARY}/AvatarEditorContent`}
                            width={contentWidth}
                            bindings={bindings}
                            arrange={arrange}
                        />
                    ),
                },
            }}
        />
    );
};
