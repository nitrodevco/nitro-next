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
 * - `avatarWidget` is the room previewer with the editing figure; `rotate_avatar` turns it,
 *   `save` saves the look (or a clothing booth's) and closes the editor.
 * - `setSideContent`: `wardrobe` toggles the wardrobe (`AvatarEditorWardrobe`) into
 *   `sideContainer`, which takes its width; the content and the frame grow with it.
 *
 * Not ported: `avatar_name_change` (`premium.name.change.enabled`, `AvatarEditorNameChangeView`),
 * the hot looks and effects lists - the port has no data for them, so their headers show over an
 * empty page and `effectParamsContainer` stays hidden.
 */
import { AvatarEditorCategory, AvatarFigurePartType, AvatarGenderType, RoomId } from '@nitrodevco/nitro-api';
import { GetSelectedNftWardrobeOutfitComposer, GetUserNftWardrobeComposer, GetWardrobeComposer, INftWardrobeItem, SaveUserNftWardrobeComposer, SaveWardrobeOutfitComposer, SetClothingChangeDataComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useState } from 'react';

import { hasAvatarEditorInvalidClubItems, hasAvatarEditorInvalidSellableItems, openClubCenter, stripAvatarEditorClubItems, stripAvatarEditorInvalidSellableItems } from '#base/commands';
import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { DEFAULT_WARDROBE_SLOTS, normalizeGender, useAvatarEditorActions, useAvatarEditorStore, WARDROBE_SLOTS_KEY } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useSystemActions, useTranslation, useWindowParams } from '#base/context/system';
import { useOwnClubLevel, useUserStore } from '#base/context/user';
import { AvatarEditorColorData, AvatarEditorPartData, useAvatarEditorData, usePartThumbnailLifetime, useWindowVisibility } from '#base/hooks';
import { TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useAvatarImageTexture, useTemplate } from '#base/theme';
import { firstSelectableColorId } from '#base/utils';

import { AvatarEditorPartImage } from './AvatarEditorPartImage';
import { AvatarEditorWardrobe } from './AvatarEditorWardrobe';

/**
 * How the editor is opened. A clothing-change booth borrows it to dress itself: the outfit it
 * already holds is loaded instead of the user's own look, and saving writes back to that furni.
 * Anything else opens the editor on the user, which is the ordinary case and needs no params.
 */
export type AvatarEditorViewWindowParams = {
    clothingChange?: {
        objectId: number;
        figure: string;
        gender: AvatarGenderType;
    };
};

const LIBRARY = 'habbo-avatar-editor-com';

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

/** `NftOutfit.initNftColors`: `button`'s colour and `outfit_gradient`'s, each plain and picked (`0` for no gradient). */
const NFT_OUTFIT_COLORS: Record<string, [ number, number, number, number ]> = {
    'habbo:avatar': [ 0xFFFF6800, 0xFFFF8823, 0, 0 ],
    'habbo:clothes': [ 0xFFA09AB3, 0xFFB3ADC5, 0, 0 ],
    'habbo:avatar_genesis': [ 0xFF1D97A7, 0xFF3CA9B9, 0xFF9430B3, 0xFFA84BC3 ],
};
const NFT_OUTFIT_DEFAULT_COLORS: [ number, number, number, number ] = [ 0xFFFFFFFF, 0xFFFFFFFF, 0, 0 ];

/** `NftWardrobeParamView.getLocalizedCollectionName` / `getCollectionTextColor`: `avatar_info_text`'s name and colour per contract. */
const NFT_COLLECTION_NAMES: Record<string, string> = {
    'habbo:avatar': 'wardrobe.token.avatar.name',
    'habbo:clothes': 'wardrobe.token.clothing.name',
    'habbo:avatar_genesis': 'wardrobe.token.crafted_avatar.name',
};
const NFT_COLLECTION_TEXT_COLORS: Record<string, number> = {
    'habbo:avatar': 0xFF8823,
    'habbo:clothes': 0xB3ADC5,
    'habbo:avatar_genesis': 0x1ACAE1,
};
const NFT_COLLECTION_DEFAULT_TEXT_COLOR = 0xFFFFFF;

/** `Outfit` (35x60): `OutfitView.update` puts the look at the bottom, centred. */
const OUTFIT_WIDTH = 35;
const OUTFIT_HEIGHT = 60;
/** `Outfit.update`: the look faces 4. */
const OUTFIT_DIRECTION = 4;

/** An NFT outfit's look in its `Outfit`'s `bitmap`. */
const NftOutfitImage = ({ outfit, zoom }: { outfit: INftWardrobeItem; zoom: boolean }) => {
    const avatar = useAvatarImageTexture(outfit.figureString, normalizeGender(outfit.gender), { direction: OUTFIT_DIRECTION, scale: zoom ? 0.5 : 1 });

    if (!avatar.texture) return null;

    return (
        <pixiSprite
            texture={avatar.texture}
            eventMode="none"
            x={Math.trunc((OUTFIT_WIDTH - avatar.width) / 2)}
            y={OUTFIT_HEIGHT - avatar.height}
            layout={false}
        />
    );
};

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

/** `AvatarEditorView.SAVE_TIMEOUT_MS`. */
const SAVE_TIMEOUT_MS = 1500;

/** `showPalettes`: two palettes share the parts grid's width, 10 apart. */
const PALETTE_GAP = 10;

/** `AvatarEditorContent` is 490 high; the frame's `maincontent` sits 33 down with 2 under it. */
const CONTENT_HEIGHT = 490;
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

/** `sideContainer`'s x, the wardrobe layout's width, and `setSideContent`'s width for an empty side. */
const SIDE_CONTAINER_X = 487;
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
    const ownFigure = useUserStore(x => x.figure);
    const ownGender = useUserStore(x => x.sex);
    const clubLevel = useOwnClubLevel();
    const { clothingChange } = useWindowParams('avatar_editor');
    const activeCategory = useAvatarEditorStore(x => x.activeCategory);
    const activeSubType = useAvatarEditorStore(x => x.activeSubType);
    const wardrobeVisible = useAvatarEditorStore(x => x.wardrobeVisible);
    const wardrobe = useAvatarEditorStore(x => x.wardrobe);
    const figure = useAvatarEditorStore(x => x.figure);
    const figureParts = useAvatarEditorStore(x => x.parts);
    const gender = useAvatarEditorStore(x => x.gender);
    const figureSetIds = useAvatarEditorStore(x => x.figureSetIds);
    const activeSetType = activeSubType[activeCategory];
    const { setActiveCategory, setActiveSubType, setWardrobeVisible, setWardrobeSlot, loadFigure, setPart, removePart, setColors, setGender, setSelectedNftOutfitId, setNftOutfit, setNftSelection } = useAvatarEditorActions();
    const nftOutfits = useAvatarEditorStore(x => x.nftOutfits);
    const selectedNftOutfitId = useAvatarEditorStore(x => x.selectedNftOutfitId);
    const nftCurrentTokenId = useAvatarEditorStore(x => x.nftCurrentTokenId);
    const nftFallbackFigure = useAvatarEditorStore(x => x.nftFallbackFigure);
    const nftFallbackGender = useAvatarEditorStore(x => x.nftFallbackGender);
    const nftRollbackFigure = useAvatarEditorStore(x => x.nftRollbackFigure);
    const nftRollbackGender = useAvatarEditorStore(x => x.nftRollbackGender);
    // `NftWardrobeParamView`: the outfit `collectible_avatar_info` names, until the category changes.
    const [ nftInfoOutfit, setNftInfoOutfit ] = useState<INftWardrobeItem | null>(null);
    const outfitTemplate = useTemplate(`${LIBRARY}/Outfit`);
    const zoom = useConfigValue<boolean>('zoom.enabled') === true;
    const { parts, palettes } = useAvatarEditorData(activeSetType);
    const { hide } = useWindowVisibility('avatar_editor');
    const miscEnabled = useConfigValue<boolean>('clothing.misc.tab.enabled') === true;
    const effectsEnabled = useConfigValue<boolean>('effects.in.avatar.editor') === true;
    const maxWardrobeSlots = useConfigValue<number>(WARDROBE_SLOTS_KEY) ?? DEFAULT_WARDROBE_SLOTS;
    // `startSellablePurchase`: the catalogue page `catalog.clothes.page` names.
    const clothesPage = useConfigValue<string>('catalog.clothes.page');
    // `generateDataContent`: the `GET_MORE` thumb with `avatareditor.support.sellablefurni`. This hotel
    // leaves it unset; the official one shows the thumb (editor-plus.png, avatareditor.png), so unset is on.
    const sellableSupport = useConfigValue<boolean>('avatareditor.support.sellablefurni') ?? OFFICIAL_SELLABLE_SUPPORT;
    const { showWindow } = useSystemActions();
    const t = useTranslation();
    // The sub tab, part and colour under the pointer (`WME_OVER` / `WME_OUT`).
    const [ hoveredTab, setHoveredTab ] = useState<string | null>(null);
    const [ hoveredPart, setHoveredPart ] = useState<number | null>(null);
    const [ hoveredColor, setHoveredColor ] = useState<string | null>(null);
    // The room previewer once its room exists: the content template, and the previewer in it, mount after the window.
    const [ previewer, setPreviewer ] = useState<RoomPreviewerHandle | null>(null);
    const { send } = useWebSocketContext();
    // `SAVE_TIMEOUT_MS`: `save` is disabled for a moment after every press.
    const [ saveLocked, setSaveLocked ] = useState(false);
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

        send(new SaveWardrobeOutfitComposer({ slotId: index + 1, figure, gender }));
        setWardrobeSlot(index, { figure, gender });
    };

    /*
     * `windowEventProc`'s `save`, disabled for `SAVE_TIMEOUT_MS` whatever it does: a sellable item the
     * user does not own opens the catalogue's clothes page (`startSellablePurchase`), a club item above
     * the user's club level the club centre (`openHabboClubAdWindow`) - neither saves. Otherwise
     * `saveCurrentSelection()` then `manager.close()`. While the editor dresses a booth the look
     * belongs to that furni: it keeps one outfit per gender, and the gender travels with the look.
     */
    /** `catalog.openCatalogPage(catalog.clothes.page)`: without the page, the catalogue as it opens (its front page). */
    const openClothesPage = () => showWindow('catalog', { pageName: clothesPage ?? '' });

    const saveFigure = () => {
        setSaveLocked(true);

        if (hasAvatarEditorInvalidSellableItems()) {
            openClothesPage();

            return;
        }

        if (hasAvatarEditorInvalidClubItems(clubLevel)) {
            openClubCenter(send);

            return;
        }

        if (clothingChange) {
            send(new SetClothingChangeDataComposer({ objectId: clothingChange.objectId, gender, figure }));
        } else if (selectedNftOutfitId !== null) {
            // `saveCurrentSelection`: a picked NFT outfit is worn by its id, and the worn one asked for again.
            send(new SaveUserNftWardrobeComposer({ id: selectedNftOutfitId }));
            send(new GetSelectedNftWardrobeOutfitComposer({}));
            setSelectedNftOutfitId(null);
        } else {
            send(new UpdateFigureDataComposer({ figure, gender }));
        }

        // `hasNftOutfit()`: the worn outfit is forgotten until the server answers again.
        if (!clothingChange && (nftCurrentTokenId !== null)) setNftSelection(null);

        hide();
    };

    useEffect(() => {
        if (!saveLocked) return;

        const timer = setTimeout(() => setSaveLocked(false), SAVE_TIMEOUT_MS);

        return () => clearTimeout(timer);
    }, [ saveLocked ]);

    // `AvatarEditorView.update`, run as a look is loaded or the club level or owned clothes change:
    // club items above the club level and sellable items the user does not own are taken off.
    useEffect(() => {
        if (hasAvatarEditorInvalidClubItems(clubLevel)) stripAvatarEditorClubItems(clubLevel);
        if (hasAvatarEditorInvalidSellableItems()) stripAvatarEditorInvalidSellableItems(clubLevel);
    }, [ figure, clubLevel, figureSetIds ]);

    // The previewed avatar follows every edit (re-dressed in place, not re-added).
    useEffect(() => {
        if (figure) previewer?.updateAvatar(figure, gender);
    }, [ previewer, figure, gender ]);

    // A booth brings its own outfit; loading it here keeps the editing figure something only the editor sets.
    useEffect(() => {
        if (!clothingChange) return;

        loadFigure(clothingChange.figure, clothingChange.gender, true);
    }, [ clothingChange?.objectId, clothingChange?.figure, clothingChange?.gender ]);

    // The editor can mount before the user's info arrives; (re)load the editing figure whenever
    // the server-side look changes, so opening with an empty figure never sticks.
    useEffect(() => {
        if (clothingChange) return;

        if (!ownFigure && !ownGender) return;

        loadFigure(ownFigure || DEFAULT_FIGURES[ownGender] || '', ownGender, true);
    }, [ ownFigure, ownGender, !!clothingChange ]);

    // `HabboAvatarEditor.init`'s `sendGetSelectedNftWardrobeOutfitMessage` and
    // `NftAvatarsModel.requestNftAvatars`, as the editor's categories are made.
    useEffect(() => {
        send(new GetSelectedNftWardrobeOutfitComposer({}));
        send(new GetUserNftWardrobeComposer({}));
    }, []);

    /** `NftAvatarsModel.selectNftAvatar`: an outfit with a look is put on, remembered for the save and named. */
    const selectNftOutfit = (outfit: INftWardrobeItem) => {
        if (outfit.figureString === '') return;

        setNftOutfit(outfit.id);
        loadFigure(outfit.figureString, normalizeGender(outfit.gender));
        setNftInfoOutfit(outfit);
    };

    /** `HabboAvatarEditor.loadNftFigure`: the picked outfit, else the worn one (which it then picks). */
    const loadNftFigure = () => {
        if (selectedNftOutfitId !== null) {
            const picked = nftOutfits.find(outfit => outfit.id === selectedNftOutfitId);

            if (picked) loadFigure(picked.figureString, normalizeGender(picked.gender));

            return;
        }

        if (nftCurrentTokenId === null) return;

        const worn = nftOutfits.find(outfit => outfit.tokenId === nftCurrentTokenId);

        if (!worn) return;

        setNftOutfit(worn.id);
        loadFigure(worn.figureString, normalizeGender(worn.gender));
    };

    /**
     * `AvatarEditorView.windowEventProc`'s `WE_SELECTED`, then `setViewToCategory`: the look follows
     * the tab while an NFT outfit is worn or picked (not for hot looks or effects, except that effects
     * show the worn outfit). The NFT tab closes the side content.
     */
    const selectCategory = (category: AvatarEditorCategory) => {
        if (category === shownCategory) return;

        const hasNftOutfit = nftCurrentTokenId !== null;
        const isNfts = category === AvatarEditorCategory.Nfts;
        let fallback = false;
        let rollback = false;
        let nft = false;

        if ((category !== AvatarEditorCategory.Effects) && (category !== AvatarEditorCategory.HotLooks)) {
            if (hasNftOutfit && isNfts) nft = true;
            else if (hasNftOutfit) fallback = true;
            else if ((selectedNftOutfitId !== null) && !isNfts) rollback = true;
        }

        if (hasNftOutfit && (category === AvatarEditorCategory.Effects)) nft = true;

        setActiveCategory(category);
        setNftInfoOutfit(null);

        if (isNfts) setWardrobeVisible(false);

        if (fallback) {
            // `loadFallbackFigure`: only a look that is not empty.
            if (nftFallbackFigure !== '') loadFigure(nftFallbackFigure, nftFallbackGender);
        } else if (rollback) {
            loadFigure(nftRollbackFigure, nftRollbackGender);
        } else if (nft) {
            loadNftFigure();
        }
    };

    // The wardrobe is asked for once; the store keeps it across openings.
    useEffect(() => {
        if (!wardrobe.length) send(new GetWardrobeComposer({}));
    }, [ wardrobe.length ]);

    const categories = CATEGORIES.filter(({ category }) => {
        if (category === AvatarEditorCategory.Misc) return miscEnabled;
        if (category === AvatarEditorCategory.Effects) return effectsEnabled;

        return true;
    }).map(({ category }) => category);
    // A category whose tab is gone falls back to the first.
    const shownCategory = categories.includes(activeCategory) ? activeCategory : categories[0];
    const showGrid = (shownCategory !== AvatarEditorCategory.HotLooks) && (shownCategory !== AvatarEditorCategory.Effects) && (shownCategory !== AvatarEditorCategory.Nfts);
    // `setSideContent`: the content reaches `sideContainer`'s right edge - the wardrobe's width with it,
    // 1 with nothing in it - so the name banner ends where the frame's right border begins.
    const contentWidth = SIDE_CONTAINER_X + (wardrobeVisible ? WARDROBE_WIDTH : EMPTY_SIDE_WIDTH);

    const nftItems: TemplateItem[] = outfitTemplate
        ? nftOutfits.map((outfit) => {
                const [ background, activeBackground, gradient, activeGradient ] = NFT_OUTFIT_COLORS[outfit.contractKey] ?? NFT_OUTFIT_DEFAULT_COLORS;
                const active = outfit.id === selectedNftOutfitId;

                return {
                    key: outfit.id,
                    from: outfitTemplate,
                    bindings: {
                        '': { onPointerTap: () => selectNftOutfit(outfit) },
                        // `OutfitView`: a look-less outfit's button is disabled.
                        button: { color: active ? activeBackground : background, disabled: outfit.figureString === '' },
                        outfit_gradient: { visible: gradient !== 0, color: active ? activeGradient : gradient },
                        bitmap: {
                            children: (
                                <NftOutfitImage
                                    outfit={outfit}
                                    zoom={zoom}
                                />
                            ),
                        },
                    },
                };
            })
        : [];

    const viewBindings: TemplateBindings = {
        avatar_name: { caption: name },
        // `setSideContent('wardrobe')` / `'nothing'`.
        // `setViewToCategory`: disabled on the NFT tab.
        wardrobe: { disabled: shownCategory === AvatarEditorCategory.Nfts, onPointerTap: () => setWardrobeVisible(!wardrobeVisible) },
        sideContainer: {
            children: wardrobeVisible && (
                <AvatarEditorWardrobe
                    slots={wardrobe}
                    slotCount={maxWardrobeSlots}
                    clubLevel={clubLevel}
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

        // `NftAvatarsView.update` - the grid, not the tab of the same name.
        'nfts_content/nfts': { items: nftItems },

        effectParamsContainer: { visible: false },
        // `NftWardrobeParamView.updateView`: the contract's name (`null` for one it does not know) and the outfit's id.
        collectible_avatar_info: { visible: nftInfoOutfit !== null },
        avatar_info_text: nftInfoOutfit
            ? {
                    caption: `${(nftInfoOutfit.contractKey in NFT_COLLECTION_NAMES) ? t(NFT_COLLECTION_NAMES[nftInfoOutfit.contractKey]) : 'null'} #${nftInfoOutfit.id}`,
                    color: NFT_COLLECTION_TEXT_COLORS[nftInfoOutfit.contractKey] ?? NFT_COLLECTION_DEFAULT_TEXT_COLOR,
                }
            : {},
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
                bitmap: { asset: GET_MORE_ICON, pivot: 'center' },
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
        find('sideContainer')?.setWidth(wardrobeVisible ? WARDROBE_WIDTH : EMPTY_SIDE_WIDTH);

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

    return (
        <TemplateWindow
            id={`${LIBRARY}/AvatarEditorFrame`}
            frame={frame}
            width={contentWidth}
            height={CONTENT_HEIGHT + FRAME_CHROME_HEIGHT}
            bindings={{
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
