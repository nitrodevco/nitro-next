import { AvatarEditorCategory, AvatarEditorColor, AvatarFigurePartType, AvatarGenderType, RoomId, SubTab } from '@nitrodevco/nitro-api';
import { GetWardrobeComposer, SaveWardrobeOutfitComposer, SetClothingChangeDataComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { useAvatarEditorActions, useAvatarEditorStore } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation, useWindowParams } from '#base/context/system';
import { useOwnClubLevel, useUserStore } from '#base/context/user';
import { AvatarEditorPartData, firstSelectableColorId, useAvatarEditorData, usePartThumbnailLifetime, useWindowVisibility } from '#base/hooks';
import { Button, ButtonThick, Frame, InfiniteGrid, LayoutImage, Region, TabButton, TabContent, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { AvatarEditorPaletteThumb } from './AvatarEditorPaletteThumb';
import { AvatarEditorPartThumb } from './AvatarEditorPartThumb';
import { AvatarEditorWardrobe } from './AvatarEditorWardrobe';

/**
 * The avatar editor window - the Flash `AvatarEditorView`: the `AvatarEditorFrame` layout
 * (`memenu_clothes`, a style 3 frame whose `maincontent` holds the editor) around the
 * `AvatarEditorContent` layout (`avatarEditorContent`, 490x490): the name banner, the wardrobe
 * toggle, the `mainTabs` tab context with each category's sub tabs in `contentArea`, the parts
 * and colour grids of `grid_container` (`AvatarEditorGridView`), the room previewer, the rotate
 * button and save. The wardrobe (`avatareditor_wardrobe`) goes into `sideContainer` at x 487, and
 * the content - and with it the frame, which reflects its size - grows by the wardrobe's 182px.
 *
 * Not drawn, because nothing in the port feeds them: `avatar_name_change` (Flash shows it under
 * `premium.name.change.enabled`, and its `AvatarEditorNameChangeView` is not ported), the `nfts`
 * tab and its content, the hot looks list and the effects list with their `effectParamsContainer`
 * (the port has no hot looks or effects data yet - their headers are drawn), and
 * `collectible_avatar_info`, which Flash only shows for an NFT outfit. The parts and palette grids
 * are the theme's virtualised `InfiniteGrid` in its `itemGrid` mode (`ItemGridController`: fixed
 * cells, no spacing, the scrollbar flush right; a part's cell mounts - and downloads its library -
 * only in view). The previewer has no `room_previewer:offsetx/offsety` (-65, -30) to take.
 */

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

const availableCategories: AvatarEditorCategory[] = [ AvatarEditorCategory.Generic, AvatarEditorCategory.Head, AvatarEditorCategory.Torso, AvatarEditorCategory.Legs, AvatarEditorCategory.Misc, AvatarEditorCategory.HotLooks, AvatarEditorCategory.Effects ];

/** Each `mainTabs` button's `bitmap` offset in the layout (52x42, centred): the icons are not all at the same height. */
const MAIN_TAB_BITMAP_OFFSET: Partial<Record<AvatarEditorCategory, { left: number; top: number }>> = {
    [AvatarEditorCategory.Generic]: { left: 1, top: -5 },
    [AvatarEditorCategory.Head]: { left: 0, top: -6 },
    [AvatarEditorCategory.Torso]: { left: 0, top: -6 },
    [AvatarEditorCategory.Legs]: { left: 0, top: -6 },
    [AvatarEditorCategory.Misc]: { left: 0, top: -4 },
    [AvatarEditorCategory.HotLooks]: { left: 0, top: -7 },
    [AvatarEditorCategory.Effects]: { left: 0, top: -5 },
};

/** The `habbo_window_layout_tab_context_3` selector's x: the tab buttons start 8px in. */
const TAB_SELECTOR_X = 8;
/** Each `mainTabs` `tab_container_button` is 52x46; the style 3 skin draws its 32px art at the top. */
const MAIN_TAB_WIDTH = 52;
const MAIN_TAB_HEIGHT = 46;

/** The sub tabs of a `*_content` container: 47x35 regions from x 6, 52px apart. */
const SUB_TAB_X = 6;
const SUB_TAB_STEP = 52;

/** The sub tab bitmap the layout draws 48px wide in its 47px region, clipped by it (`tab_misc`; `tab_girl` is the other, drawn by `genderTab`). */
const WIDE_SUB_TAB_ICONS = new Set([ 'avatar_editor_tabs_icon_misc_misc' ]);

/** `avatarEditorContent` is 490x490; its `sideContainer` sits at x 487 and the wardrobe layout is 182 wide. */
const CONTENT_WIDTH = 490;
const CONTENT_HEIGHT = 490;
const SIDE_CONTAINER_X = 487;
const WARDROBE_WIDTH = 182;

/** `AvatarEditorFrame`: `maincontent` at y 33 with 2px under it. */
const FRAME_CONTENT_TOP = 33;
const FRAME_CONTENT_BOTTOM = 2;

/** `thumbs` and the palettes are 330 wide; `AvatarEditorGridView.showPalettes` splits two layers `(330 - 10) / 2` each, 10 apart. */
const GRID_WIDTH = 330;
const PALETTE_GAP = 10;
/** `thumbs` and `palette0` / `palette1`: `thumb_template` (50x50) and `palette_template` (15x23) cells, no spacing. */
const PART_GRID = { width: 50, height: 50 } as const;
const PALETTE_GRID = { width: 15, height: 23 } as const;

const DEFAULT_FIGURES: Partial<Record<AvatarGenderType, string>> = {
    [AvatarGenderType.Male]: 'hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007',
    [AvatarGenderType.Female]: 'hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68',
};

/** Each category's sub tabs, in the order of its `*_content` container (the torso's is shirt, prints, jacket, accessories). */
const CATEGORY_TABS: Partial<Record<AvatarEditorCategory, SubTab[]>> = {
    head: [
        { setType: AvatarFigurePartType.Hair, icon: 'avatar_editor_tabs_head_hair' },
        { setType: AvatarFigurePartType.HeadAccessory, icon: 'avatar_editor_tabs_head_hats' },
        { setType: AvatarFigurePartType.HeadAccessoryExtra, icon: 'avatar_editor_tabs_head_accessories' },
        { setType: AvatarFigurePartType.EyeAccessory, icon: 'avatar_editor_tabs_head_eyewear' },
        { setType: AvatarFigurePartType.FaceAccessory, icon: 'avatar_editor_tabs_head_face_accessories' },
    ],
    torso: [
        { setType: AvatarFigurePartType.Chest, icon: 'avatar_editor_tabs_top_shirt' },
        { setType: AvatarFigurePartType.ChestPrint, icon: 'avatar_editor_tabs_top_prints' },
        { setType: AvatarFigurePartType.CoatChest, icon: 'avatar_editor_tabs_top_jacket' },
        { setType: AvatarFigurePartType.ChestAccessory, icon: 'avatar_editor_tabs_top_accessories' },
    ],
    legs: [
        { setType: AvatarFigurePartType.Legs, icon: 'avatar_editor_tabs_bottom_trousers' },
        { setType: AvatarFigurePartType.Shoes, icon: 'avatar_editor_tabs_bottom_shoes' },
        { setType: AvatarFigurePartType.WaistAccessory, icon: 'avatar_editor_tabs_bottom_accessories' },
    ],
    misc: [
        { setType: AvatarFigurePartType.Pet, icon: 'avatar_editor_tabs_icon_misc_pets' },
        { setType: AvatarFigurePartType.Misc, icon: 'avatar_editor_tabs_icon_misc_misc' },
    ],
};

/** A sub tab's bitmap: `TabUtils.setElementImage` - the `_off` art unless the tab is the current one or under the pointer. */
const subTabImage = (icon: string, active: boolean): string => LayoutImage(`avatar-editor/${icon}${active ? '' : '_off'}.png`);

const SUB_TAB_BITMAP = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

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
    const activeSetType = activeSubType[activeCategory];
    const { setActiveCategory, setActiveSubType, setWardrobeVisible, setWardrobeSlot, loadFigure, setPart, removePart, setColors, setGender } = useAvatarEditorActions();
    const { parts, palettes } = useAvatarEditorData(activeSetType);
    const { hide } = useWindowVisibility('avatar_editor');
    /** The sub tab under the pointer: `CategoryBaseView.activateTab` on `WME_OVER` lights it until `WME_OUT`. */
    const [ hoveredTab, setHoveredTab ] = useState<string | null>(null);

    usePartThumbnailLifetime();

    const previewerRef = useRef<RoomPreviewerHandle>(null);
    const maxWardrobeSlots = useConfigValue<number>('avatar.wardrobe.max.slots') ?? 14;
    const t = useTranslation();
    const { send } = useWebSocketContext();

    const changeGender = (next: AvatarGenderType) => {
        if (next === gender) return;

        setGender(next);
        loadFigure(DEFAULT_FIGURES[next] ?? '', next);
    };

    const selectPart = (part: AvatarEditorPartData) => {
        if (part.id === -1) {
            removePart(activeSetType);

            return;
        }

        setPart(activeSetType, part.id, figureParts[activeSetType]?.colorIds ?? [ firstSelectableColorId(activeSetType, clubLevel) ]);
    };

    /** `WardrobeSlot` set button: the current look goes into the slot (server slots are 1-based). */
    const saveWardrobeSlot = (index: number) => {
        if (!figure) return;

        send(new SaveWardrobeOutfitComposer({ slotId: index + 1, figure, gender }));
        setWardrobeSlot(index, { figure, gender });
    };

    /*
     * Saving usually means wearing the look yourself. While the editor is dressing a booth the
     * look belongs to that furni instead: it keeps one outfit per gender, and the gender travels
     * with the look so the server knows which of the two was dressed. The booth is done with the
     * editor either way, so the window closes behind it.
     */
    const saveFigure = () => {
        if (!clothingChange) {
            send(new UpdateFigureDataComposer({ figure, gender }));

            return;
        }

        send(new SetClothingChangeDataComposer({ objectId: clothingChange.objectId, gender, figure }));
        hide();
    };

    const selectColor = (color: AvatarEditorColor, layer: number) => {
        const colorIds = [ ...(figureParts[activeSetType]?.colorIds ?? []) ];

        colorIds[layer] = color.id;
        setColors(activeSetType, colorIds);
    };

    // The previewed avatar follows every edit (re-dressed in place, not re-added).
    useEffect(() => {
        if (figure) previewerRef.current?.updateAvatar(figure, gender);
    }, [ figure, gender ]);

    // A booth brings its own outfit; loading it here rather than at the call site keeps the
    // editing figure something only the editor ever sets.
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

    // The wardrobe is asked for once; the store keeps it across openings.
    useEffect(() => {
        if (!wardrobe.length) send(new GetWardrobeComposer({}));
    }, [ wardrobe.length ]);

    // `AvatarEditorView.setViewToCategory`: hot looks and effects hide the parts grid for their own lists.
    const showGrid = (activeCategory !== AvatarEditorCategory.HotLooks) && (activeCategory !== AvatarEditorCategory.Effects);
    const paletteWidth = (palettes.length > 1) ? ((GRID_WIDTH - PALETTE_GAP) / 2) : GRID_WIDTH;
    const contentWidth = wardrobeVisible ? (SIDE_CONTAINER_X + WARDROBE_WIDTH) : CONTENT_WIDTH;

    const genderTab = (tabGender: AvatarGenderType, tabName: string, left: number, imageWidth: number, icon: string) => (
        <Region
            name={tabName}
            onPointerTap={_ => changeGender(tabGender)}
            onPointerOver={_ => setHoveredTab(tabName)}
            onPointerOut={_ => setHoveredTab(null)}
            layout={{ position: 'absolute', left, width: 47, top: 0, height: 35, overflow: 'hidden' }}
        >
            <ThemeImage
                src={subTabImage(icon, (gender === tabGender) || (hoveredTab === tabName))}
                bitmap={SUB_TAB_BITMAP}
                layout={{ position: 'absolute', left: 0, width: imageWidth, top: 0, height: 35 }}
            />
        </Region>
    );

    return (
        <Frame
            variant="3"
            id="avatarEditor"
            caption={t('avatareditor.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={hide}
            resizeDirection="none"
            defaultPosition={{ x: 100, y: 30 }}
            margins={[ 0, 0, 0, 0 ]}
            layout={{ width: contentWidth, height: FRAME_CONTENT_TOP + CONTENT_HEIGHT + FRAME_CONTENT_BOTTOM }}
        >
            <Region
                name="maincontent"
                layout={{ position: 'absolute', left: 0, right: 0, top: FRAME_CONTENT_TOP, bottom: FRAME_CONTENT_BOTTOM }}
            >
                <Region
                    name="avatarEditorContent"
                    layout={{ position: 'absolute', left: 0, width: contentWidth, top: 0, height: CONTENT_HEIGHT }}
                >
                    <Region
                        name="avatarNameEditor"
                        layout={{ position: 'absolute', left: 1, width: 489, top: 0, height: 110 }}
                    >
                        <Region
                            name="name_background"
                            backgroundColor="#0e3f52"
                            layout={{ position: 'absolute', left: 0, width: 486, top: 0, height: 110 }}
                        />
                        <ThemeText
                            text={name}
                            textStyle="u_headline_big"
                            textOptions={{ fill: '#ffffff', fontSize: 28, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 40, width: 400, top: 15, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="wardrobeButtonContainer"
                        layout={{ position: 'absolute', left: 424, width: 55, top: 9, height: 30 }}
                    >
                        <Button
                            variant="3"
                            onPointerTap={_ => setWardrobeVisible(!wardrobeVisible)}
                            textStyle="button_shiny_regular"
                            layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                        />
                        <ThemeImage
                            name="wardrobe_icon"
                            src={LayoutImage('avatar-editor/avatar_editor_tabs_ae_tabs_wardrobe.png')}
                            bitmap={SUB_TAB_BITMAP}
                            layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                        />
                    </Region>
                    <Region
                        name="avatarEditor"
                        layout={{ position: 'absolute', left: 1, width: 489, top: 70, height: 414 }}
                    >
                        <Region
                            name="tabbedView"
                            layout={{ position: 'absolute', left: 0, width: 486, top: 4, height: 410, overflow: 'hidden' }}
                        >
                            {/* Its own box: `TabContext` stacks itself at zIndex 10, which must not lift it over `contentArea`. */}
                            <Region layout={{ position: 'absolute', left: 0, width: 486, top: 5, height: 395 }}>
                                <TabContext
                                    variant="3"
                                    name="mainTabs"
                                    layout={{ position: 'absolute', left: 0, width: 486, top: 0, height: 395, padding: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
                                >
                                    {/* `habbo_window_layout_tab_context_3`: the `_CONTENT` pane at y 30, 2px short of the bottom. */}
                                    <TabContent
                                        variant="3"
                                        layout={{ position: 'absolute', left: 0, width: 486, top: 30, height: 363, marginTop: 0, padding: 0, paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0 }}
                                    />
                                    { availableCategories.map((x, index) => {
                                        const offset = MAIN_TAB_BITMAP_OFFSET[x] ?? { left: 0, top: 0 };

                                        return (
                                            <TabButton
                                                key={x}
                                                variant="3"
                                                name={x}
                                                selected={activeCategory === x}
                                                onPointerTap={_ => setActiveCategory(x)}
                                                layout={{ position: 'absolute', left: TAB_SELECTOR_X + (index * MAIN_TAB_WIDTH), width: MAIN_TAB_WIDTH, top: 0, height: MAIN_TAB_HEIGHT, paddingLeft: 0, paddingRight: 0 }}
                                            >
                                                <ThemeImage
                                                    name="bitmap"
                                                    src={LayoutImage(`avatar-editor/avatar_editor_tabs_ae_tabs_${x}.png`)}
                                                    bitmap={SUB_TAB_BITMAP}
                                                    layout={{ position: 'absolute', left: offset.left, width: 52, top: offset.top, height: 42 }}
                                                />
                                            </TabButton>
                                        );
                                    })}
                                </TabContext>
                            </Region>
                            <Region
                                name="contentArea"
                                layout={{ position: 'absolute', left: 2, width: 486, top: 36, height: 365 }}
                            >
                                { activeCategory === AvatarEditorCategory.Generic && (
                                    <Region
                                        name="generic_content"
                                        layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35, overflow: 'hidden' }}
                                    >
                                        {genderTab(AvatarGenderType.Male, 'tab_boy', 6, 47, 'avatar_editor_tabs_gender_male')}
                                        <ThemeText
                                            text={t('avatareditor.generic.boy')}
                                            textStyle="u_regular"
                                            flashFormat={{ bold: true }}
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 50, top: 10, height: 17 }}
                                        />
                                        {genderTab(AvatarGenderType.Female, 'tab_girl', 100, 48, 'avatar_editor_tabs_gender_female')}
                                        <ThemeText
                                            text={t('avatareditor.generic.girl')}
                                            textStyle="u_regular"
                                            flashFormat={{ bold: true }}
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 150, top: 10, height: 17 }}
                                        />
                                    </Region>
                                )}
                                { CATEGORY_TABS[activeCategory] !== undefined && (
                                    <Region
                                        name={`${activeCategory}_content`}
                                        layout={{ position: 'absolute', left: 20, width: 280, top: 10, height: 35, overflow: 'hidden' }}
                                    >
                                        { CATEGORY_TABS[activeCategory].map((x, index) => (
                                            <Region
                                                key={x.setType}
                                                onPointerTap={_ => setActiveSubType(x.setType)}
                                                onPointerOver={_ => setHoveredTab(x.icon)}
                                                onPointerOut={_ => setHoveredTab(null)}
                                                layout={{ position: 'absolute', left: SUB_TAB_X + (index * SUB_TAB_STEP), width: 47, top: 0, height: 35, overflow: 'hidden' }}
                                            >
                                                <ThemeImage
                                                    src={subTabImage(x.icon, (activeSetType === x.setType) || (hoveredTab === x.icon))}
                                                    bitmap={SUB_TAB_BITMAP}
                                                    layout={{ position: 'absolute', left: 0, width: WIDE_SUB_TAB_ICONS.has(x.icon) ? 48 : 47, top: 0, height: 35 }}
                                                />
                                            </Region>
                                        ))}
                                    </Region>
                                )}
                                { activeCategory === AvatarEditorCategory.HotLooks && (
                                    <Region
                                        name="hotlooks_content"
                                        layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290 }}
                                    >
                                        <ThemeText
                                            text={t('avatareditor.hotlooks.title')}
                                            textStyle="u_regular"
                                            textOptions={{ fontSize: 20 }}
                                            flashFormat={{ bold: true }}
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 26 }}
                                        />
                                        <ThemeText
                                            text={t('avatareditor.hotlooks.choose')}
                                            textStyle="u_regular"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 0, width: 168, top: 28, height: 17 }}
                                        />
                                    </Region>
                                )}
                                { activeCategory === AvatarEditorCategory.Effects && (
                                    <Region
                                        name="effects_content"
                                        layout={{ position: 'absolute', left: 20, width: 140, top: 10, height: 35, overflow: 'hidden' }}
                                    >
                                        <ThemeImage
                                            src={LayoutImage('avatar-editor/avatar_editor_tabs_effects_fx.png')}
                                            bitmap={SUB_TAB_BITMAP}
                                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                        />
                                        <ThemeText
                                            text={t('inventory.effects')}
                                            textStyle="u_regular"
                                            textOptions={{ fontSize: 20 }}
                                            flashFormat={{ bold: true }}
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 40, width: 169, top: 4, height: 26 }}
                                        />
                                    </Region>
                                )}
                            </Region>
                            { showGrid && (
                                <Region
                                    name="grid_container"
                                    layout={{ position: 'absolute', left: 20, width: GRID_WIDTH, top: 94, height: 302, overflow: 'hidden' }}
                                >
                                    { (parts.length > 0) && (
                                        <Region
                                            name="thumbs"
                                            layout={{ position: 'absolute', left: 0, width: GRID_WIDTH, top: 0, height: 200, flexDirection: 'row' }}
                                        >
                                            <InfiniteGrid<AvatarEditorPartData>
                                                items={parts}
                                                scrollResetKey={activeSetType}
                                                getKey={x => x.id}
                                                itemGrid={PART_GRID}
                                                itemRender={x => (
                                                    <AvatarEditorPartThumb
                                                        selected={!!x.selected}
                                                        part={x}
                                                        setType={activeSetType}
                                                        colors={x.partColors}
                                                        usesColors={x.usesColors}
                                                        disabled={x.disabled}
                                                        isClub={x.isClub}
                                                        isSellable={x.isSellable}
                                                        isClear={x.isClear}
                                                        selectPart={() => selectPart(x)}
                                                    />
                                                )}
                                            />
                                        </Region>
                                    )}
                                    { (parts.length > 0) && palettes.map((x, index) => (
                                        <Region
                                            key={index}
                                            name={`palette${index}`}
                                            layout={{ position: 'absolute', left: index * (paletteWidth + PALETTE_GAP), width: paletteWidth, top: 210, height: 93, flexDirection: 'row' }}
                                        >
                                            <InfiniteGrid
                                                items={x}
                                                itemGrid={PALETTE_GRID}
                                                scrollResetKey={activeSetType}
                                                getKey={y => y.id}
                                                itemRender={y => (
                                                    <AvatarEditorPaletteThumb
                                                        color={y.color}
                                                        isClub={y.isClub}
                                                        selected={y.selected}
                                                        selectPalette={() => selectColor(y, index)}
                                                    />
                                                )}
                                            />
                                        </Region>
                                    ))}
                                    { (parts.length === 0) && (
                                        <>
                                            <ThemeText
                                                text={t('avatar.editor.content.notification')}
                                                textStyle="u_regular"
                                                clip
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 0, width: 298, top: 30, height: 128 }}
                                            />
                                            <ThemeText
                                                text={t('avatar.editor.content.title')}
                                                textStyle="u_bold"
                                                textOptions={{ fontSize: 20 }}
                                                clip
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 30 }}
                                            />
                                        </>
                                    )}
                                </Region>
                            )}
                        </Region>
                        <RoomPreviewer
                            ref={previewerRef}
                            roomId={RoomId.TEMP_ROOM_AVATAR_EDITOR}
                            scale={2}
                            layout={{ position: 'absolute', left: 351, width: 125, top: 88, height: 210 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={_ => saveFigure()}
                            textStyle="button_shiny_bold"
                            layout={{ position: 'absolute', left: 356, width: 122, top: 373, height: 28, minWidth: 100 }}
                        >
                            {t('avatareditor.save')}
                        </ButtonThick>
                        <Region
                            name="rotate_avatar"
                            onPointerTap={_ => previewerRef.current?.rotateAvatar()}
                            layout={{ position: 'absolute', left: 389, width: 50, top: 295, height: 31 }}
                        >
                            <ThemeImage
                                src={LayoutImage('avatar-editor/avatar_editor_rotate_avatar_button.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 29 }}
                            />
                        </Region>
                    </Region>
                    { wardrobeVisible && (
                        <Region
                            name="sideContainer"
                            layout={{ position: 'absolute', left: SIDE_CONTAINER_X, width: WARDROBE_WIDTH, top: 0, height: CONTENT_HEIGHT }}
                        >
                            <AvatarEditorWardrobe
                                slots={wardrobe}
                                slotCount={maxWardrobeSlots}
                                clubLevel={clubLevel}
                                onSave={saveWardrobeSlot}
                                onLoad={(_index, outfit) => loadFigure(outfit.figure, outfit.gender)}
                            />
                        </Region>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
