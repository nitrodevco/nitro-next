import { FurnitureTypeEnum, IFurnitureData, IFurnitureType, IProductData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { fillLocalizationParameters } from '#base/utils';

import { createHotelViewSlice, HotelViewSlice } from './HotelViewSlice';
import { createSystemDialogsSlice, SystemDialogsSlice } from './SystemDialogsSlice';
import { createToolbarTransitionsSlice, ToolbarTransitionsSlice } from './ToolbarTransitionsSlice';
import { VisibleWindows, WindowName, WindowRegistry } from './WindowRegistry';

/**
 * The client-wide store: configuration, localizations, furniture and product data, the open
 * windows and their stacking, the toolbar's widths, the home room and the room session
 * requests, plus the dialogs, hotel view and toolbar transition slices.
 */
type State = {
    config: Record<string, unknown>;
    localizations: Record<string, string>;
    badgePointLimits: Record<string, number>;
    floorItems: Record<number, IFurnitureData>;
    wallItems: Record<number, IFurnitureData>;
    productData: Record<string, IProductData>;
    visibleWindows: VisibleWindows;
    topZIndex: number;
    topId: string | undefined;
    zIndexById: Record<string, number>;
    landingViewVisible: boolean;
    /**
     * How wide the toolbar's left group (the icons) and right group (the friend bar) are, as
     * the toolbar last measured them - what Flash's `toolBarAreaWidth` and `friendBarWidth`
     * answered. The chat bar sits between them when they leave it room. Until the toolbar has
     * reported, both are wide enough that nothing tries to fit.
     */
    toolbarAreaWidth: number;
    friendBarWidth: number;
    /**
     * The toolbar's open sub menu (`ToolbarExtendedMenu`): `me` (`MeMenuNewController`) or
     * `progression`, `undefined` for none. Here so `toolbar/memenu` can toggle it from outside the bar.
     */
    toolbarMenu: ToolbarMenu | undefined;
    /** From `NavigatorSettingsMessage`; 0 until it arrives or when no home room is set. */
    homeRoomId: number;
    /**
     * The Flash room session lifecycle, driven from outside the room context: `start` is
     * RSE_STARTED (a session was created and its OpenFlatConnection sent, or skipped for a
     * server-opened connection) - the room instance is created and the hotel view hidden right
     * away; `end` is RSE_ENDED (the session was disposed client-side). `sequence` makes a
     * repeated request for the same room id observable.
     */
    roomSessionRequest: RoomSessionRequest | undefined;
};

export type ToolbarMenu = 'me' | 'progression';

export interface RoomSessionRequest {
    type: 'start' | 'end';
    roomId: number;
    sequence: number;
}

type Actions = {
    setConfig: (config: Record<string, unknown>) => void;
    setConfigValue: <T = unknown>(key: string, value: T) => void;
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;
    interpolate: (text: string) => string;
    setLocalization: (localization: Record<string, string>) => void;
    /** `HabboLocalizationManager.setBadgePointLimit`, for every badge `BadgePointLimitsMessage` names. */
    setBadgePointLimits: (limits: Record<string, number>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
    parseFloorItems: (data: IFurnitureType[]) => void;
    parseWallItems: (data: IFurnitureType[]) => void;
    parseProductData: (data: IProductData[]) => void;
    toggleWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => void;
    showWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => void;
    hideWindow: (name: WindowName) => void;
    updateWindowParams: <T extends WindowName>(name: T, params: Partial<WindowRegistry[T]>) => void;
    bringWindowToFront: (id: string) => void;
    releaseWindow: (id: string) => void;
    setLandingViewVisible: (landingViewVisible: boolean) => void;
    setToolbarWidths: (toolbarAreaWidth: number, friendBarWidth: number) => void;
    setToolbarMenu: (toolbarMenu: ToolbarMenu | undefined) => void;
    /** `AbstractSubMenuController.toggleVisibility`: opens the menu, or closes it when it is the one open. */
    toggleToolbarMenu: (toolbarMenu: ToolbarMenu) => void;
    setHomeRoomId: (homeRoomId: number) => void;
    startRoomSession: (roomId: number) => void;
    endRoomSession: () => void;
};

const BASE_FRAME_Z_INDEX = 100;

const areWindowParamsEqual = (current: object, params: object) => {
    const entries = Object.entries(current);

    if (entries.length !== Object.keys(params).length) return false;

    return entries.every(([ key, value ]) => value === (params as Record<string, unknown>)[key]);
};

/** `RoomChatInputWidget.getToolBarWidth`: what a toolbar that is not there yet is taken to be. */
const UNMEASURED_TOOLBAR_WIDTH = 1000;

const initialState: State = {
    config: {},
    localizations: {},
    badgePointLimits: {},
    floorItems: {},
    wallItems: {},
    productData: {},
    visibleWindows: {},
    topZIndex: BASE_FRAME_Z_INDEX,
    topId: undefined,
    zIndexById: {},
    landingViewVisible: true,
    toolbarAreaWidth: UNMEASURED_TOOLBAR_WIDTH,
    friendBarWidth: UNMEASURED_TOOLBAR_WIDTH,
    toolbarMenu: undefined,
    homeRoomId: 0,
    roomSessionRequest: undefined,
};

/**
 * One furnidata entry as the client keeps it. A floor item's class name may carry its colour index
 * (`name*3`) and it has part colours (hex, with or without a leading `#`), a size, custom params,
 * the room-use flags and a height; a wall item has none of those.
 */
const toFurnitureData = (furniture: IFurnitureType, type: FurnitureTypeEnum): IFurnitureData => {
    const floor = (type === FurnitureTypeEnum.Floor);
    const classSplit = floor ? furniture.classname.split('*') : [ furniture.classname ];
    const className = classSplit[0];
    const hasColorIndex = classSplit.length > 1;

    return {
        type,
        id: furniture.id,
        fullName: furniture.classname,
        className,
        category: furniture.category ?? '',
        localizedName: furniture.name ?? '',
        description: furniture.description ?? '',
        revision: furniture.revision,
        tileSizeX: floor ? furniture.xdim : 0,
        tileSizeY: floor ? furniture.ydim : 0,
        tileSizeZ: 0,
        colors: (floor && furniture.partcolors) ? furniture.partcolors.color.map(color => parseInt(color.startsWith('#') ? color.slice(1) : color, 16)) : [],
        hasIndexedColor: hasColorIndex,
        colorIndex: hasColorIndex ? parseInt(classSplit[1]) : 0,
        adUrl: furniture.adurl ?? '',
        purchaseOfferId: furniture.offerid,
        purchaseCouldBeUsedForBuyout: furniture.buyout,
        rentOfferId: furniture.rentofferid,
        rentCouldBeUsedForBuyout: furniture.rentbuyout,
        availableForBuildersClub: furniture.bc,
        bcOfferId: furniture.bcofferid ?? -1,
        customParams: floor ? (furniture.customparams ?? '') : '',
        specialType: furniture.specialtype,
        canStandOn: floor && furniture.canstandon,
        canSitOn: floor && furniture.cansiton,
        canLayOn: floor && furniture.canlayon,
        canPutStuffOn: floor && furniture.canputstuffon,
        height: floor ? furniture.height : 0,
        excludeDynamic: furniture.excludeddynamic,
        furniLine: furniture.furniline ?? '',
        environment: furniture.environment ?? '',
        rare: furniture.rare,
        tradeable: furniture.tradeable,
        recyclable: furniture.recyclable,
        isExternalImage: className.indexOf('external_image') !== -1,
    };
};

const toFurnitureTable = (data: IFurnitureType[], type: FurnitureTypeEnum): Record<number, IFurnitureData> => {
    const table: Record<number, IFurnitureData> = {};

    for (const furniture of data) {
        if (furniture) table[furniture.id] = toFurnitureData(furniture, type);
    }

    return table;
};

export type SystemStore = State & Actions & SystemDialogsSlice & HotelViewSlice & ToolbarTransitionsSlice;

export const createSystemStore = () => createStore<SystemStore>()((set, get, store) => ({
    ...initialState,
    setConfig: (config: Record<string, unknown>) => set({ config }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set((state) => {
            return { config: { ...state.config, [key]: value } };
        }),
    /*
     * `HabboLocalizationManager.getLocalizationWithParams` / `getLocalization`: the text of `key`
     * with `replacements` filled (`Localization.fillParameterValues`, `fillLocalizationParameters`)
     * and its `${key}` placeholders resolved (`interpolate`). A key with no text answers
     * `defaultValue` - unless there are parameters: `registerParameter` creates the missing
     * localization with the key as its text, so it is the key, filled, that comes back.
     */
    getLocalizationValue: (key: string, defaultValue: string = '', replacements?: Record<string, string>) => {
        const { localizations, getLocalizationValue, interpolate } = get();
        const hasParameters = !!replacements && (Object.keys(replacements).length > 0);
        const raw = localizations[key] ?? (hasParameters ? key : undefined);

        if (raw === undefined) return interpolate(defaultValue);

        return interpolate(fillLocalizationParameters(raw, key, replacements, getLocalizationValue));
    },
    /*
     * CoreLocalizationManager.interpolate — replace every ${key} it can resolve, then
     * repeat (max 3 passes) so a value may itself contain placeholders. Stops early when
     * a pass resolves nothing; unresolved placeholders are left untouched.
     */
    interpolate: (text: string) => {
        if (!text) return text;

        const localizations = get().localizations;
        const pattern = /\$\{([^}]*)\}/g;

        let result = text;

        for (let pass = 0; pass < 3; pass++) {
            pattern.lastIndex = 0;

            const match = pattern.exec(result);

            if (!match) return result;

            let replaced = 0;

            for (let index = 1; index < match.length; index++) {
                const value = localizations[match[index]];

                if (value == null) continue;

                replaced++;
                result = result.replace(`\${${match[index]}}`, value);
            }

            if (replaced === 0) break;
        }

        return result;
    },
    setBadgePointLimits: (limits: Record<string, number>) => set(state => ({ badgePointLimits: { ...state.badgePointLimits, ...limits } })),
    setLocalization: (localizations: Record<string, string>) =>
        set(state => ({ localizations: { ...state.localizations, ...localizations } })),
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => {
        if (!furniture || !furniture.length) return;

        const locals = new Map<string, string>();

        for (const item of furniture) {
            switch (item.type) {
                case FurnitureTypeEnum.Floor:
                    locals.set(`roomItem.name.${item.id}`, item.localizedName);
                    locals.set(`roomItem.desc.${item.id}`, item.description);
                    break;
                case FurnitureTypeEnum.Wall:
                    locals.set(`wallItem.name.${item.id}`, item.localizedName);
                    locals.set(`wallItem.desc.${item.id}`, item.description);
                    break;
            }
        }

        if (locals.size === 0) return;

        set((state) => {
            const localizations = { ...state.localizations };

            for (const [ key, value ] of locals) localizations[key] = value;

            return { localizations };
        });
    },
    parseFloorItems: (data: IFurnitureType[]) => set({ floorItems: toFurnitureTable(data, FurnitureTypeEnum.Floor) }),
    // A reload replaces the table, as `SessionDataManager.refreshFurniData` clears it: a wall item a publish dropped goes.
    parseWallItems: (data: IFurnitureType[]) => set({ wallItems: toFurnitureTable(data, FurnitureTypeEnum.Wall) }),
    parseProductData: (data: IProductData[]) => set({ productData: Object.fromEntries(data.map(x => [ x.code, x ])) }),
    toggleWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => set((x) => {
        const current = x.visibleWindows[name];
        const visibleWindows = { ...x.visibleWindows };

        if (current && (!params || areWindowParamsEqual(current, params))) delete visibleWindows[name];
        else visibleWindows[name] = { ...params };

        return { visibleWindows };
    }),
    showWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => set((x) => {
        if (!params && x.visibleWindows[name]) return x;

        const visibleWindows = { ...x.visibleWindows };

        visibleWindows[name] = { ...params };

        return { visibleWindows };
    }),
    hideWindow: (name: WindowName) => set((x) => {
        if (!x.visibleWindows[name]) return x;

        const visibleWindows = { ...x.visibleWindows };

        delete visibleWindows[name];

        return { visibleWindows };
    }),
    updateWindowParams: <T extends WindowName>(name: T, params: Partial<WindowRegistry[T]>) => set((x) => {
        const current = x.visibleWindows[name];

        if (!current) return x;

        const visibleWindows = { ...x.visibleWindows };

        visibleWindows[name] = { ...current, ...params };

        return { visibleWindows };
    }),
    bringWindowToFront: (id: string) => {
        if (get().topId === id) return;

        set((state) => {
            const nextZIndex = state.topZIndex + 1;

            return {
                topZIndex: nextZIndex,
                topId: id,
                zIndexById: { ...state.zIndexById, [id]: nextZIndex },
            };
        });
    },
    releaseWindow: (id: string) => set((state) => {
        if (!(id in state.zIndexById)) return state;

        const { [id]: _released, ...zIndexById } = state.zIndexById;

        return { zIndexById, ...((state.topId === id) && { topId: undefined }) };
    }),
    setLandingViewVisible: (landingViewVisible: boolean) => set({ landingViewVisible }),
    setToolbarWidths: (toolbarAreaWidth: number, friendBarWidth: number) => set(x => (((x.toolbarAreaWidth === toolbarAreaWidth) && (x.friendBarWidth === friendBarWidth)) ? x : { toolbarAreaWidth, friendBarWidth })),
    setToolbarMenu: toolbarMenu => set(x => ((x.toolbarMenu === toolbarMenu) ? x : { toolbarMenu })),
    toggleToolbarMenu: toolbarMenu => set(x => ({ toolbarMenu: (x.toolbarMenu === toolbarMenu) ? undefined : toolbarMenu })),
    setHomeRoomId: (homeRoomId: number) => set({ homeRoomId }),
    startRoomSession: (roomId: number) => set(x => ({ roomSessionRequest: { type: 'start', roomId, sequence: (x.roomSessionRequest?.sequence ?? 0) + 1 } })),
    endRoomSession: () => set(x => ({ roomSessionRequest: { type: 'end', roomId: 0, sequence: (x.roomSessionRequest?.sequence ?? 0) + 1 } })),
    ...createSystemDialogsSlice(set, get, store),
    ...createHotelViewSlice(set, get, store),
    ...createToolbarTransitionsSlice(set, get, store),
}));

/**
 * The one SystemStore for the whole client. It lives as long as the app does, so there is nothing a
 * provider would add: components read it through their hooks, and code outside React - packet
 * handlers, commands - reads and writes it through `getState()`, which is always current.
 */
export const systemStore = createSystemStore();
