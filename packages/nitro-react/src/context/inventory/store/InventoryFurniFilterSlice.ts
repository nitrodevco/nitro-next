/**
 * What the furni page's search box and its two dropmenus choose - Flash `inventory/furni/FurniView`'s
 * filter half (`populateFilterOptions`, `updateGridFilters`, `resetFilters`) and the predicates
 * `FurniGridView.passFilter` runs the grid through.
 *
 * Three things narrow the grid, and a group has to pass all of them:
 *
 * - the **main** filter (`filter.options`, `MAIN_FILTER_IDS`) - everything, floor items, wall items
 *   or the room layout papers;
 * - the **type** filter (`placement.options`), whose options depend on the main one
 *   (`getTypeFilterIds`) - so changing the main filter repopulates it and keeps the type only where
 *   the new list still has it (`getPreservedTypeFilter`);
 * - the **text** in the `filter` box, matched case-insensitively against the group's name, its
 *   description and its chest name.
 *
 * The option ids are Flash's and name their own texts: `inventory.furni.filter.main.<id>` and
 * `inventory.furni.filter.type.<id>`.
 */
import { IFurnitureData } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

import { InventoryFurniGroup, isInventoryFurniGroupWallItem, peekInventoryFurni } from './InventoryFurniGroup';

/** `FurniView.MAIN_FILTER_IDS`, in the order the dropmenu lists them. */
export const INVENTORY_FURNI_MAIN_FILTERS = [ 'all', 'floor_items', 'wall_items', 'room_layout' ] as const;

export type InventoryFurniMainFilter = typeof INVENTORY_FURNI_MAIN_FILTERS[number];

/** `getTypeFilterIds`: the type options each main filter offers, in order. */
const TYPE_FILTERS_FLOOR = [ 'any', 'sittable', 'layable', 'tiles_or_rugs', 'ltd', 'wired', 'credit_furni', 'clothes', 'pet_food', 'collectibles', 'tradable', 'non_tradable', 'recyclable' ] as const;
const TYPE_FILTERS_WALL = [ 'any', 'windows', 'dimmers', 'stickies', 'paintings', 'collectibles', 'tradable', 'non_tradable', 'recyclable' ] as const;
const TYPE_FILTERS_ROOM_LAYOUT = [ 'any', 'floors', 'wallpapers', 'landscape' ] as const;

export type InventoryFurniTypeFilter = typeof TYPE_FILTERS_FLOOR[number] | typeof TYPE_FILTERS_WALL[number] | typeof TYPE_FILTERS_ROOM_LAYOUT[number];

/** `FurniView.getTypeFilterIds`. */
export const getInventoryFurniTypeFilters = (main: InventoryFurniMainFilter): readonly InventoryFurniTypeFilter[] => {
    switch (main) {
        case 'wall_items':
            return TYPE_FILTERS_WALL;
        case 'room_layout':
            return TYPE_FILTERS_ROOM_LAYOUT;
        default:
            return TYPE_FILTERS_FLOOR;
    }
};

/** The `FurnitureItem` categories the room layout papers use (`§_-72Z§.isWallpaper` / `isFloor` / `isLandscape`). */
const CATEGORY_WALLPAPER = 2;
const CATEGORY_FLOOR = 3;
const CATEGORY_LANDSCAPE = 4;
const CATEGORY_STICKIE = 5;
const CATEGORY_CREDIT_FURNI = 12;
const CATEGORY_CLOTHES = 23;

/** `isTilesOrRugs`: the ceiling a rug's own height has to stay under. */
const TILES_OR_RUGS_MAX_HEIGHT = 0.2;

/** What a predicate needs besides the group: its furni data, which only the store outside this slice holds. */
export type InventoryFurniFilterContext = {
    /** The group's furni data, or undefined where the hotel sends none for the type. */
    furniData: IFurnitureData | undefined;
};

const hasCategory = (group: InventoryFurniGroup, ...categories: number[]): boolean => categories.includes(group.category);

/** `§_-72Z§.isRoomLayout`. */
const isRoomLayout = (group: InventoryFurniGroup): boolean => hasCategory(group, CATEGORY_WALLPAPER, CATEGORY_FLOOR, CATEGORY_LANDSCAPE);

/** `§_-72Z§.isTilesOrRugs`: a flat, walk-on, multi-tile floor piece - with two class names carved out by hand. */
const isTilesOrRugs = (furniData: IFurnitureData | undefined): boolean => {
    if (!furniData) return false;

    if (furniData.className.startsWith('tile_walkmagic') || (furniData.className === 'hole')) return false;

    if (!furniData.canPutStuffOn) return false;

    if ((furniData.category === 'rug') || (furniData.category === 'floor')) return true;

    if (furniData.className.startsWith('carpet')) return true;

    return !((furniData.height > TILES_OR_RUGS_MAX_HEIGHT) || !furniData.canStandOn || (furniData.tileSizeX <= 1) || (furniData.tileSizeY <= 1));
};

/** `FurniGridView.passMainFilter`. */
const passMainFilter = (main: InventoryFurniMainFilter, group: InventoryFurniGroup): boolean => {
    switch (main) {
        case 'floor_items':
            return !isInventoryFurniGroupWallItem(group);
        case 'wall_items':
            return isInventoryFurniGroupWallItem(group) && !isRoomLayout(group);
        case 'room_layout':
            return isRoomLayout(group);
        default:
            return true;
    }
};

/**
 * `FurniGridView.passTypeFilter` over `§_-72Z§`'s predicates. `collectibles` is `isNft`, whose
 * NFT inventory this client has not got, so it matches the class name prefix the wired trade's
 * own filter uses.
 */
const passTypeFilter = (type: InventoryFurniTypeFilter, group: InventoryFurniGroup, { furniData }: InventoryFurniFilterContext): boolean => {
    const className = furniData?.className ?? '';
    const item = peekInventoryFurni(group);

    switch (type) {
        case 'sittable':
            return !!furniData?.canSitOn;
        case 'layable':
            return !!furniData?.canLayOn;
        case 'tiles_or_rugs':
            return isTilesOrRugs(furniData);
        case 'ltd':
            return (item?.stuffData.uniqueNumber ?? 0) > 0;
        case 'wired':
            return !!furniData && (className.startsWith('wf_') || furniData.category.startsWith('wired_'));
        case 'credit_furni':
            return hasCategory(group, CATEGORY_CREDIT_FURNI) || className.startsWith('CF_');
        case 'clothes':
            return hasCategory(group, CATEGORY_CLOTHES);
        case 'pet_food':
            return !!furniData && (className.startsWith('petfood') || (furniData.furniLine === 'pet_food'));
        case 'collectibles':
            return className.startsWith('nft_');
        case 'tradable':
            return !!furniData?.tradeable;
        case 'non_tradable':
            return !!furniData && !furniData.tradeable;
        case 'recyclable':
            return !!item?.recyclable;
        case 'windows':
            return !!furniData && (className.startsWith('window_') || (furniData.furniLine === 'windows') || (furniData.category === 'window'));
        case 'dimmers':
            return !!furniData && (className.startsWith('dimmer_') || (furniData.category === 'dimmer') || (furniData.furniLine === 'dimmers'));
        case 'stickies':
            return hasCategory(group, CATEGORY_STICKIE);
        case 'paintings':
            return className.startsWith('diamond_painting');
        case 'floors':
            return hasCategory(group, CATEGORY_FLOOR);
        case 'wallpapers':
            return hasCategory(group, CATEGORY_WALLPAPER);
        case 'landscape':
            return hasCategory(group, CATEGORY_LANDSCAPE);
        default:
            return true;
    }
};

/** `FurniGridView.passFilter`'s text half: the group's name, its description or its chest name. */
const passTextFilter = (text: string, name: string, description: string, chestName: string): boolean => {
    if (!text) return true;

    const needle = text.toLowerCase();

    if (name.toLowerCase().includes(needle) || description.toLowerCase().includes(needle)) return true;

    return (chestName.length > 0) && chestName.toLowerCase().includes(needle);
};

/** What a group is matched with - the texts the grid compares, worked out by the caller that has the localization. */
export interface InventoryFurniFilterSubject extends InventoryFurniFilterContext {
    group: InventoryFurniGroup;
    name: string;
    description: string;
    chestName: string;
}

/** `FurniGridView.passFilter`, without the rented and wired-trade halves their own callers apply. */
export const passInventoryFurniFilter = (main: InventoryFurniMainFilter, type: InventoryFurniTypeFilter, text: string, subject: InventoryFurniFilterSubject): boolean => {
    if (!passMainFilter(main, subject.group)) return false;

    if (!passTypeFilter(type, subject.group, subject)) return false;

    return passTextFilter(text, subject.name, subject.description, subject.chestName);
};

type State = {
    furniFilterMain: InventoryFurniMainFilter;
    furniFilterType: InventoryFurniTypeFilter;
    /** The `filter` box's text; `clear_filter_button` shows while it has any. */
    furniFilterText: string;
};

type Actions = {
    /** `windowEventProc`'s `filter.options` case: the type filter is kept only where the new main filter still offers it. */
    setFurniFilterMain: (main: InventoryFurniMainFilter) => void;
    setFurniFilterType: (type: InventoryFurniTypeFilter) => void;
    setFurniFilterText: (text: string) => void;
    /** `FurniView.resetFilters` / `resetFilterOption`: everything back to `all` / `any` / no text. */
    resetFurniFilters: () => void;
};

export const InventoryFurniFilterSliceInitialState: State = {
    furniFilterMain: 'all',
    furniFilterType: 'any',
    furniFilterText: '',
};

export type InventoryFurniFilterSlice = State & Actions;

export const createInventoryFurniFilterSlice: StateCreator<InventoryFurniFilterSlice, [], [], InventoryFurniFilterSlice> = set => ({
    ...InventoryFurniFilterSliceInitialState,
    setFurniFilterMain: furniFilterMain => set((x) => {
        // `getPreservedTypeFilter`: a type the new main filter does not offer falls back to `any`.
        const available = getInventoryFurniTypeFilters(furniFilterMain);

        return { furniFilterMain, furniFilterType: available.includes(x.furniFilterType) ? x.furniFilterType : 'any' };
    }),
    setFurniFilterType: furniFilterType => set({ furniFilterType }),
    setFurniFilterText: furniFilterText => set({ furniFilterText }),
    resetFurniFilters: () => set({ ...InventoryFurniFilterSliceInitialState }),
});
