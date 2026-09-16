import { AvatarEditorCategory, AvatarEditorColor, AvatarFigurePartType, AvatarGenderType, RoomId, SubTab } from '@nitrodevco/nitro-api';
import { GetWardrobeComposer, SaveWardrobeOutfitComposer, SetClothingChangeDataComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef } from 'react';

import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { useAvatarEditorActions, useAvatarEditorSelectors, useConfigValue, useOwnClubLevel, useOwnUserInfo, useTranslation, useWebSocketContext, useWindowParams } from '#base/context';
import { useAvatarEditorHandler } from '#base/handlers';
import { AvatarEditorPartData, firstSelectableColorId, useAvatarEditorData, useAvatarEditorVisibility, usePartThumbnailLifetime } from '#base/hooks';
import { Button, ButtonThick, Frame, InfiniteGrid, LayoutImage, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { AvatarEditorPaletteThumb } from './AvatarEditorPaletteThumb';
import { AvatarEditorPartThumb } from './AvatarEditorPartThumb';
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

const availableCategories: AvatarEditorCategory[] = [ AvatarEditorCategory.Generic, AvatarEditorCategory.Head, AvatarEditorCategory.Torso, AvatarEditorCategory.Legs, AvatarEditorCategory.Misc, AvatarEditorCategory.HotLooks, AvatarEditorCategory.Effects ];

const DEFAULT_FIGURES: Partial<Record<AvatarGenderType, string>> = {
    [AvatarGenderType.Male]: 'hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007',
    [AvatarGenderType.Female]: 'hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68',
};

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
        { setType: AvatarFigurePartType.CoatChest, icon: 'avatar_editor_tabs_top_jacket' },
        { setType: AvatarFigurePartType.ChestPrint, icon: 'avatar_editor_tabs_top_prints' },
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

export const AvatarEditor = () => {
    const { name, figure: ownFigure, sex: ownGender } = useOwnUserInfo();
    const clubLevel = useOwnClubLevel();
    const { clothingChange } = useWindowParams('avatar_editor');
    const { activeCategory, activeSubType, wardrobeVisible, wardrobe, figure, parts: figureParts, gender } = useAvatarEditorSelectors();
    const activeSetType = activeSubType[activeCategory];
    const { setActiveCategory, setActiveSubType, setWardrobeVisible, setWardrobeSlot, loadFigure, setPart, removePart, setColors, setGender } = useAvatarEditorActions();
    const { parts, palettes } = useAvatarEditorData(activeSetType);
    const { hide } = useAvatarEditorVisibility();

    usePartThumbnailLifetime();

    const previewerRef = useRef<RoomPreviewerHandle>(null);
    const maxWardrobeSlots = useConfigValue<number>('avatar.wardrobe.max.slots') ?? 14;
    const t = useTranslation();
    const { send } = useWebSocketContext();

    useAvatarEditorHandler(maxWardrobeSlots);

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

    useEffect(() => {
        send(new GetWardrobeComposer({}));
    }, []);

    return (
        <Frame
            variant="3"
            id="avatarEditor"
            caption={t('avatareditor.title')}
            onClose={hide}
            layout={{ position: 'absolute', width: 'auto', height: 500, top: 30, left: 100 }}
            contentLayout={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}
        >
            <Region layout={{ flexDirection: 'row', flex: 1, height: '100%' }}>
                <Region layout={{ width: 490, height: '100%', flexDirection: 'column', overflow: 'hidden' }}>
                    <Region
                        backgroundColor="#0e3f52"
                        layout={{ position: 'absolute', left: 1, right: 1, height: 110, overflow: 'hidden', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={name}
                            textStyle="text-style-il-frame-modal-title"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            layout={{ top: 15 }}
                        />
                        <Button
                            onPointerTap={_ => setWardrobeVisible(!wardrobeVisible)}
                            variant="3"
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', right: 11, top: 9, width: 55, height: 30 }}
                        >
                            <ThemeImage
                                name="wardrobe_icon"
                                src={LayoutImage('avatar_editor_tabs_ae_tabs_wardrobe.png')}
                            />
                        </Button>
                    </Region>
                    <TabContext layout={{
                        position: 'absolute',
                        top: 75,
                        left: 0,
                    }}
                    >
                        { availableCategories?.length && availableCategories.map(x => (
                            <TabButton
                                key={x}
                                selected={activeCategory === x}
                                onPointerTap={_ => setActiveCategory(x)}
                                layout={{ width: 52, height: 46 }}
                            >
                                <ThemeImage src={LayoutImage(`avatar_editor_tabs_ae_tabs_${x}.png`)} />
                            </TabButton>
                        ))}
                    </TabContext>
                    <Region layout={{
                        position: 'absolute', top: 110, bottom: 0, width: '100%', flexDirection: 'row', padding: 10, gap: 10,
                    }}
                    >
                        <Region layout={{
                            flex: 1, minWidth: 0, flexDirection: 'column', gap: 5, overflow: 'hidden',
                        }}
                        >
                            <Region layout={{ alignItems: 'center', height: 35 }}>
                                { activeCategory === AvatarEditorCategory.Generic && (
                                    <>
                                        <Region
                                            onPointerTap={_ => changeGender(AvatarGenderType.Male)}
                                            layout={{ alignItems: 'center', gap: 4 }}
                                        >
                                            <ThemeImage src={LayoutImage(`avatar_editor_tabs_gender_male${gender !== AvatarGenderType.Male ? '_off' : ''}.png`)} />
                                            <ThemeText text={t('avatareditor.generic.boy')} />
                                        </Region>
                                        <Region
                                            onPointerTap={_ => changeGender(AvatarGenderType.Female)}
                                            layout={{ alignItems: 'center', gap: 4 }}
                                        >
                                            <ThemeImage src={LayoutImage(`avatar_editor_tabs_gender_female${gender !== AvatarGenderType.Female ? '_off' : ''}.png`)} />
                                            <ThemeText text={t('avatareditor.generic.girl')} />
                                        </Region>
                                    </>
                                )}
                                { CATEGORY_TABS[activeCategory] !== undefined && CATEGORY_TABS[activeCategory].map(x => (
                                    <Region
                                        key={x.setType}
                                        layout={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50 }}
                                    >
                                        <ThemeImage
                                            onPointerTap={_ => setActiveSubType(x.setType)}
                                            src={LayoutImage(`${x.icon}${activeSetType !== x.setType ? '_off' : ''}.png`)}
                                        />
                                    </Region>
                                ))}
                            </Region>
                            <InfiniteGrid<AvatarEditorPartData>
                                items={parts}
                                scrollResetKey={activeSetType}
                                getKey={x => x.id}
                                overrideColumnCount={6}
                                itemWidth={50}
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
                            <Region layout={{ flexDirection: 'row', gap: 5, height: 95, width: '100%' }}>
                                { palettes.map((x, index) => (
                                    /* One or two colour layers: each palette splits the row evenly and
                               wraps its swatches into a grid. */
                                    <Region
                                        key={index}
                                        layout={{ flex: 1, minWidth: 0, height: '100%' }}
                                    >
                                        <ScrollArea
                                            variant="3"
                                            orientation="vertical"
                                            scrollResetKey={activeSetType}
                                            layout={{ width: '100%', height: '100%' }}
                                            contentLayout={{ position: 'relative', width: '100%', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start', gap: 1 }}
                                        >
                                            { x.map(y => (
                                                <AvatarEditorPaletteThumb
                                                    key={y.id}
                                                    color={y.color}
                                                    isClub={y.isClub}
                                                    selected={y.selected}
                                                    selectPalette={() => selectColor(y, index)}
                                                />
                                            )) }
                                        </ScrollArea>
                                    </Region>
                                ))}
                            </Region>
                        </Region>
                        <Region layout={{
                            width: 130, flexShrink: 0, flexDirection: 'column', alignItems: 'center', overflow: 'hidden',
                        }}
                        >
                            <Region layout={{
                                width: '100%', flex: 1, minHeight: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4, overflow: 'hidden',
                            }}
                            >
                                <RoomPreviewer
                                    ref={previewerRef}
                                    roomId={RoomId.TEMP_ROOM_AVATAR_EDITOR}
                                    scale={2}
                                    layout={{ width: 125, height: 210 }}
                                />
                                <ThemeImage
                                    onPointerTap={_ => previewerRef.current?.rotateAvatar()}
                                    src={LayoutImage('avatar_editor_rotate_avatar_button.png')}
                                />
                            </Region>
                            <ButtonThick
                                variant="3"
                                onPointerTap={_ => saveFigure()}
                                textStyle="text-style-button-shiny-bold"
                                layout={{ width: 100, height: 28 }}
                            >
                                {t('avatareditor.save')}
                            </ButtonThick>
                        </Region>
                    </Region>
                </Region>
                { wardrobeVisible && (
                    <AvatarEditorWardrobe
                        slots={wardrobe}
                        slotCount={maxWardrobeSlots}
                        clubLevel={clubLevel}
                        onSave={saveWardrobeSlot}
                        onLoad={(_index, outfit) => loadFigure(outfit.figure, outfit.gender)}
                    />
                )}
            </Region>
        </Frame>
    );
};
