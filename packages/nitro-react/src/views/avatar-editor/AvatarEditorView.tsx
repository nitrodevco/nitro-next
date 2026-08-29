import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { ReactNode, useState } from 'react';

import { AvatarImage } from '#base/components';
import { useOwnUserFigure, useOwnUserGender, useOwnUserInfo, useSystemActions } from '#base/context';
import { BoxLayout } from '#base/theme';
import { AvatarEditorContentLayout } from '#base/views/layouts/avatareditor/avatar/AvatarEditorContent/AvatarEditorContentLayout';
import { AvatarEditorContentLayoutPaletteTemplateItem } from '#base/views/layouts/avatareditor/avatar/AvatarEditorContent/AvatarEditorContentLayoutPaletteTemplateItem';
import { AvatarEditorContentLayoutThumbTemplateItem } from '#base/views/layouts/avatareditor/avatar/AvatarEditorContent/AvatarEditorContentLayoutThumbTemplateItem';
import { AvatarEditorFrameLayout } from '#base/views/layouts/avatareditor/avatar/AvatarEditorFrameLayout';
import { OutfitLayout } from '#base/views/layouts/avatareditor/avatar/wardrobe/OutfitLayout';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AvatarEditorWardrobe, AvatarEditorWardrobeSlot } from './AvatarEditorWardrobe';

/** The editor's top-level tabs - `AvatarEditorView.as` `_allCategories` (effects/misc are config-gated there). */
export type AvatarEditorCategory = 'generic' | 'head' | 'torso' | 'legs' | 'hotlooks' | 'wardrobe' | 'nfts' | 'effects' | 'misc';

/** Figure set types the category models register (`HeadModel.initCategory("hr")`, ...). */
export type AvatarEditorSetType = 'hd' | 'hr' | 'ha' | 'he' | 'ea' | 'fa' | 'ch' | 'cc' | 'cp' | 'ca' | 'lg' | 'sh' | 'wa' | 'pt' | 'mc';

/** One clothing part in the grid (`AvatarEditorGridPartItem`). */
export interface AvatarEditorPart {
    id: number;
    /** Rendered thumbnail, when available. */
    imageUrl?: string;
    isClub?: boolean;
    isSellable?: boolean;
    selected?: boolean;
    disabled?: boolean;
}

/** One swatch in a colour palette (`AvatarEditorGridColorItem`). */
export interface AvatarEditorColor {
    id: number;
    /** CSS colour. */
    color: string;
    isClub?: boolean;
    selected?: boolean;
}

/** A saved look shown in the hot-looks grid (`HotLooksView`, rendered with the `Outfit` layout). */
export interface AvatarEditorOutfit {
    figure: string;
    gender: AvatarGenderType;
    imageUrl?: string;
}

interface SubTab {
    setType: AvatarEditorSetType;
    /** Layout element name of the tab region (`tab_hair`, ...), also the prop suffix. */
    tab: string;
    /** Icon base name; the layouts show `<base>_off`, TabUtils strips `_off` for the active one. */
    icon: string;
}

/** Sub-tab -> set type, as `HeadView`/`TorsoView`/`LegsView`/`MiscView` switch them. */
const CATEGORY_TABS: Partial<Record<AvatarEditorCategory, SubTab[]>> = {
    head: [
        { setType: 'hr', tab: 'Hair', icon: 'avatar_editor_tabs_head_hair' },
        { setType: 'ha', tab: 'Hat', icon: 'avatar_editor_tabs_head_hats' },
        { setType: 'he', tab: 'Accessories', icon: 'avatar_editor_tabs_head_accessories' },
        { setType: 'ea', tab: 'Eyewear', icon: 'avatar_editor_tabs_head_eyewear' },
        { setType: 'fa', tab: 'Masks', icon: 'avatar_editor_tabs_head_face_accessories' },
    ],
    torso: [
        { setType: 'ch', tab: 'Shirt', icon: 'avatar_editor_tabs_top_shirt' },
        { setType: 'cc', tab: 'Jacket', icon: 'avatar_editor_tabs_top_jacket' },
        { setType: 'cp', tab: 'Prints', icon: 'avatar_editor_tabs_top_prints' },
        { setType: 'ca', tab: 'Accessories', icon: 'avatar_editor_tabs_top_accessories' },
    ],
    legs: [
        { setType: 'lg', tab: 'Pants', icon: 'avatar_editor_tabs_bottom_trousers' },
        { setType: 'sh', tab: 'Shoes', icon: 'avatar_editor_tabs_bottom_shoes' },
        { setType: 'wa', tab: 'Belts', icon: 'avatar_editor_tabs_bottom_accessories' },
    ],
    misc: [
        { setType: 'pt', tab: 'Pets', icon: 'avatar_editor_tabs_icon_misc_pets' },
        { setType: 'mc', tab: 'Misc', icon: 'avatar_editor_tabs_icon_misc_misc' },
    ],
};

/** The first sub-tab each category opens on (`switchCategory("hr")` in `HeadView.init`, ...). */
const DEFAULT_SET_TYPE: Partial<Record<AvatarEditorCategory, AvatarEditorSetType>> = { generic: 'hd', head: 'hr', torso: 'ch', legs: 'lg', misc: 'pt' };

const tabIcon = (base: string, active: boolean) => layoutImage(`${base}${active ? '' : '_off'}.png`);

/** `AvatarEditorContent` is 490x490; the frame template adds its header (33px) and bottom edge (2px). */
const CONTENT_SIZE = 490;
const FRAME_CHROME = { width: 6, height: 35 };
/** `AvatarEditorView.as` DEFAULT_LOCATION */
const DEFAULT_LOCATION = { left: 100, top: 30 };

export interface AvatarEditorViewProps {
    /** Shown in the name banner - defaults to the session user. */
    name?: string;
    figure?: string;
    gender?: AvatarGenderType;
    /** Categories offered as tabs - defaults to every category (the client gates `effects`/`misc` by config). */
    categories?: AvatarEditorCategory[];
    category?: AvatarEditorCategory;
    setType?: AvatarEditorSetType;
    /** Parts of the active set type. */
    parts?: AvatarEditorPart[];
    /** Colour palettes for the selected part's colour layers (at most two, `MAX_COLOR_LAYERS`). */
    palettes?: AvatarEditorColor[][];
    hotLooks?: AvatarEditorOutfit[];
    /** NFT avatars grid content - rendered into the `nfts` grid as-is. */
    nfts?: ReactNode;
    /** Wardrobe slots (`WardrobeModel.slots`) - undefined hides the wardrobe button like a non-club user. */
    wardrobeSlots?: AvatarEditorWardrobeSlot[];
    wardrobeOpen?: boolean;
    /** `premium.name.change.enabled` */
    nameChangeEnabled?: boolean;
    layout?: BoxLayout;
    onCategoryChange?: (category: AvatarEditorCategory) => void;
    onSetTypeChange?: (setType: AvatarEditorSetType) => void;
    onGenderChange?: (gender: AvatarGenderType) => void;
    onPartSelect?: (part: AvatarEditorPart, setType: AvatarEditorSetType) => void;
    onColorSelect?: (color: AvatarEditorColor, layer: number, setType: AvatarEditorSetType) => void;
    onHotLookSelect?: (outfit: AvatarEditorOutfit, index: number) => void;
    onWardrobeSave?: (slot: number) => void;
    onWardrobeLoad?: (slot: number, outfit: AvatarEditorWardrobeSlot) => void;
    onWardrobeToggle?: (open: boolean) => void;
    onSave?: () => void;
    onClose?: () => void;
}

/**
 * The avatar editor window, assembled from the `AvatarEditorFrame` / `AvatarEditorContent` /
 * `Outfit` / `avatareditor_wardrobe_base` layout ports the way com/sulake/habbo/avatar/
 * AvatarEditorView.as assembled the originals: the content window sits in the frame's
 * `maincontent`, `mainTabs` selects a category whose `<category>_content` sub-tab strip is shown
 * in `contentArea`, the grid (`thumbs` + `palette0`/`palette1`) shows the active set type's
 * parts and colour layers, the `avatarWidget` slot holds the figure preview (rotated by
 * `rotate_avatar`), and the wardrobe opens in `sideContainer`. All data comes in through props;
 * the selection state (category, sub-tab, direction, wardrobe open) is kept here when the
 * caller doesn't control it.
 */
export const AvatarEditorView = ({
    name, figure, gender, categories, category: controlledCategory, setType: controlledSetType, parts = [], palettes = [], hotLooks = [], nfts,
    wardrobeSlots, wardrobeOpen: controlledWardrobeOpen, nameChangeEnabled = false, layout,
    onCategoryChange, onSetTypeChange, onGenderChange, onPartSelect, onColorSelect, onHotLookSelect, onWardrobeSave, onWardrobeLoad, onWardrobeToggle, onSave, onClose,
}: AvatarEditorViewProps) => {
    const { toggleWindow } = useSystemActions();
    const ownInfo = useOwnUserInfo();
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const [ localCategory, setLocalCategory ] = useState<AvatarEditorCategory>('generic');
    const [ localSetType, setLocalSetType ] = useState<AvatarEditorSetType>('hd');
    const [ localWardrobeOpen, setLocalWardrobeOpen ] = useState(false);
    const [ direction, setDirection ] = useState(4);

    const category = controlledCategory ?? localCategory;
    const setType = controlledSetType ?? localSetType;
    const wardrobeOpen = controlledWardrobeOpen ?? localWardrobeOpen;
    const resolvedFigure = figure ?? ownFigure;
    const resolvedGender = gender ?? ownGender;
    const availableCategories = new Set(categories ?? [ 'generic', 'head', 'torso', 'legs', 'hotlooks', 'wardrobe', 'nfts', 'effects', 'misc' ]);

    const selectCategory = (next: AvatarEditorCategory) => {
        if (!availableCategories.has(next)) return;

        setLocalCategory(next);
        onCategoryChange?.(next);

        const first = DEFAULT_SET_TYPE[next];

        if (first) {
            setLocalSetType(first);
            onSetTypeChange?.(first);
        }
    };

    const selectSetType = (next: AvatarEditorSetType) => {
        setLocalSetType(next);
        onSetTypeChange?.(next);
    };

    const toggleWardrobe = () => {
        setLocalWardrobeOpen(!wardrobeOpen);
        onWardrobeToggle?.(!wardrobeOpen);
    };

    const close = () => (onClose ? onClose() : toggleWindow('avatar_editor'));

    /** `srcTab<Name>` / `onTab<Name>` props for one category's sub-tab strip. */
    const subTabProps = (tabs: SubTab[] | undefined): Record<string, unknown> => {
        const props: Record<string, unknown> = {};

        for (const tab of tabs ?? []) {
            props[`srcTab${tab.tab}`] = tabIcon(tab.icon, setType === tab.setType);
            props[`onTab${tab.tab}`] = () => selectSetType(tab.setType);
        }

        return props;
    };

    const thumbs = parts.map(part => (
        <AvatarEditorContentLayoutThumbTemplateItem
            key={part.id}
            srcBitmap={part.imageUrl}
            visibleBitmap={!!part.imageUrl}
            visibleHover={!!part.selected}
            visibleClubIcon={!!part.isClub}
            visibleSellableIcon={!!part.isSellable}
            onThumbTemplate={() => !part.disabled && onPartSelect?.(part, setType)}
        />
    ));

    const palette = (layer: number) => (palettes[layer] ?? []).map(color => (
        <AvatarEditorContentLayoutPaletteTemplateItem
            key={color.id}
            srcColor={layoutImage('avatar_editor_editor_clr_13x21_2.png')}
            tintColor={color.color}
            visibleBorder={!!color.selected}
            visibleClubIcon={!!color.isClub}
            onPaletteTemplate={() => onColorSelect?.(color, layer, setType)}
        />
    ));

    return (
        <AvatarEditorFrameLayout
            onClose={close}
            layout={{ position: 'absolute', ...DEFAULT_LOCATION, width: CONTENT_SIZE + FRAME_CHROME.width, height: CONTENT_SIZE + FRAME_CHROME.height, ...layout }}
            maincontent={(
                <AvatarEditorContentLayout avatarEditorContent={{
                    captionAvatarName: name ?? ownInfo.name,
                    visibleAvatarNameChange: nameChangeEnabled,
                    onWardrobe: toggleWardrobe,
                    sideContainer: wardrobeOpen && wardrobeSlots
                        ? (
                                <AvatarEditorWardrobe
                                    slots={wardrobeSlots}
                                    onSave={onWardrobeSave}
                                    onLoad={onWardrobeLoad}
                                />
                            )
                        : null,
                    avatarEditor: {
                        avatarWidget: resolvedFigure
                            ? (
                                    <AvatarImage
                                        figure={resolvedFigure}
                                        gender={resolvedGender}
                                        direction={direction}
                                    />
                                )
                            : null,
                        onRotateAvatar: () => setDirection(current => (current + 1) % 8),
                        onSave,
                        visibleCollectibleAvatarInfo: false,
                        tabbedView: {
                            selectedMainTabs: category,
                            onGeneric: () => selectCategory('generic'),
                            onHead: () => selectCategory('head'),
                            onTorso: () => selectCategory('torso'),
                            onLegs: () => selectCategory('legs'),
                            onHotlooks: () => selectCategory('hotlooks'),
                            onNfts: () => selectCategory('nfts'),
                            onEffects: () => selectCategory('effects'),
                            onMisc: () => selectCategory('misc'),
                            contentArea: {
                                visibleGenericContent: category === 'generic',
                                visibleHeadContent: category === 'head',
                                visibleTorsoContent: category === 'torso',
                                visibleLegsContent: category === 'legs',
                                visibleHotlooksContent: category === 'hotlooks',
                                visibleNftsContent: category === 'nfts',
                                visibleEffectsContent: category === 'effects',
                                visibleMiscContent: category === 'misc',
                                // generic: the boy/girl toggle is the gender (`BodyView`)
                                srcTabBoy: tabIcon('avatar_editor_tabs_gender_male', resolvedGender === AvatarGenderType.Male),
                                srcTabGirl: tabIcon('avatar_editor_tabs_gender_female', resolvedGender === AvatarGenderType.Female),
                                onTabBoy: () => onGenderChange?.(AvatarGenderType.Male),
                                onTabGirl: () => onGenderChange?.(AvatarGenderType.Female),
                                ...subTabProps(CATEGORY_TABS.legs),
                                ...subTabProps(CATEGORY_TABS.misc),
                                headContent: subTabProps(CATEGORY_TABS.head),
                                torsoContent: subTabProps(CATEGORY_TABS.torso),
                                itemsHotlooks: hotLooks.map((outfit, index) => (
                                    <OutfitLayout
                                        key={index}
                                        srcBitmap={outfit.imageUrl}
                                        visibleOutfitGradient={false}
                                        onButton={() => onHotLookSelect?.(outfit, index)}
                                    />
                                )),
                                itemsNfts: nfts,
                            },
                            gridContainer: {
                                itemsThumbs: thumbs,
                                itemsPalette0: palette(0),
                                itemsPalette1: palette(1),
                                // `AvatarEditorGridView.initFromList`: the title/notification only show for an empty category
                                captionContentTitle: parts.length ? '' : undefined,
                                captionContentNotification: parts.length ? '' : undefined,
                            },
                        },
                    },
                }}
                />
            )}
        />
    );
};
