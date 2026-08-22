import { FurnitureTypeEnum, IFurnitureData, IFurnitureType, IProductData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { VisibleWindows, WindowName, WindowRegistry } from './WindowRegistry';

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
}

type Actions = {
    setConfig: (config: Record<string, unknown>) => void;
    setConfigValue: <T = unknown>(key: string, value: T) => void;
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;
    interpolate: (text: string) => string;
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
    parseFloorItems: (data: IFurnitureType[]) => void;
    parseWallItems: (data: IFurnitureType[]) => void;
    parseProductData: (data: IProductData[]) => void;
    toggleWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => void;
    showWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => void;
    hideWindow: (name: WindowName) => void;
    updateWindowParams: <T extends WindowName>(name: T, params: Partial<WindowRegistry[T]>) => void;
    bringWindowToFront: (id: string) => void;
    setLandingViewVisible: (landingViewVisible: boolean) => void;
};

const BASE_FRAME_Z_INDEX = 100;

const areWindowParamsEqual = (current: object, params: object) => {
    const entries = Object.entries(current);

    if (entries.length !== Object.keys(params).length) return false;

    return entries.every(([key, value]) => value === (params as Record<string, unknown>)[key]);
}

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
    landingViewVisible: true
};

export type SystemStore = State & Actions;

export const createSystemStore = () => createStore<SystemStore>()((set, get, store) => ({
    ...initialState,
    setConfig: (config: Record<string, unknown>) => set({ config }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set((state) => {
            return { config: { ...state.config, [key]: value } };
        }),
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => {
        let value = get().localizations[key] ?? defaultValue;

        if (replacements) {
            const keys = Object.keys(replacements);

            if (keys.length) for (const key of keys) value = value.replace(`%${key}%`, replacements[key]);
        }

        // HabboLocalizationManager.getLocalization runs interpolate() over the result
        return get().interpolate(value);
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
    setLocalization: (localizations: Record<string, string>) =>
        set(state => {
            return {
                localizations: { ...state.localizations, ...localizations },
                localizationNeedsUpdate: false,
            };
        }),
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => {
        if (!furniture || !furniture.length) return;

        const locals = new Map<string, string>();

        for (const item of furniture) {
            switch (item.type) {
                case FurnitureTypeEnum.Floor:
                    locals.set(`roomitem.name.${item.id}`, item.localizedName);
                    locals.set(`roomitem.desc.${item.id}`, item.description);
                    break;
                case FurnitureTypeEnum.Wall:
                    locals.set(`wallitem.name.${item.id}`, item.localizedName);
                    locals.set(`wallitem.desc.${item.id}`, item.description);
                    break;
            }
        }

        if (locals.size === 0) return;

        set(state => {
            const localizations = { ...state.localizations };

            for (const [key, value] of locals) localizations[key] = value;

            return { localizations };
        });
    },
    parseFloorItems: (data: IFurnitureType[]) => set(x => {
        const floorItems: Record<number, IFurnitureData> = {};

        for (const furniture of data) {
            if (!furniture) continue;

            const colors: number[] = [];

            if (furniture.partcolors) {
                for (const color of furniture.partcolors.color) {
                    let colorCode = color;

                    if (colorCode.charAt(0) === '#') {
                        colorCode = colorCode.replace('#', '');

                        colors.push(parseInt(colorCode, 16));
                    } else {
                        colors.push(parseInt(colorCode, 16));
                    }
                }
            }

            const classSplit = furniture.classname.split('*');
            const className = classSplit[0];
            const colorIndex = classSplit.length > 1 ? parseInt(classSplit[1]) : 0;
            const hasColorIndex = classSplit.length > 1;

            floorItems[furniture.id] = {
                type: FurnitureTypeEnum.Floor,
                id: furniture.id,
                fullName: furniture.classname,
                className: className,
                category: furniture.category ?? '',
                localizedName: furniture.name ?? '',
                description: furniture.description ?? '',
                revision: furniture.revision,
                tileSizeX: furniture.xdim,
                tileSizeY: furniture.ydim,
                tileSizeZ: 0,
                colors: colors,
                hasIndexedColor: hasColorIndex,
                colorIndex: colorIndex,
                adUrl: furniture.adurl ?? '',
                purchaseOfferId: furniture.offerid,
                purchaseCouldBeUsedForBuyout: furniture.buyout,
                rentOfferId: furniture.rentofferid,
                rentCouldBeUsedForBuyout: furniture.rentbuyout,
                availableForBuildersClub: furniture.bc,
                customParams: furniture.customparams ?? '',
                specialType: furniture.specialtype,
                canStandOn: furniture.canstandon,
                canSitOn: furniture.cansiton,
                canLayOn: furniture.canlayon,
                excludeDynamic: furniture.excludeddynamic,
                furniLine: furniture.furniline ?? '',
                environment: furniture.environment ?? '',
                rare: furniture.rare,
                isExternalImage: !(className.indexOf('external_image') === -1)
            };
        }

        return { floorItems };
    }),
    parseWallItems: (data: IFurnitureType[]) => set(x => {
        const wallItems = { ...x.wallItems };

        for (const furniture of data) {
            if (!furniture) continue;

            wallItems[furniture.id] = {
                type: FurnitureTypeEnum.Wall,
                id: furniture.id,
                fullName: furniture.classname,
                className: furniture.classname,
                category: furniture.category ?? '',
                localizedName: furniture.name ?? '',
                description: furniture.description ?? '',
                revision: furniture.revision,
                tileSizeX: 0,
                tileSizeY: 0,
                tileSizeZ: 0,
                colors: [],
                hasIndexedColor: false,
                colorIndex: 0,
                adUrl: furniture.adurl ?? '',
                purchaseOfferId: furniture.offerid,
                purchaseCouldBeUsedForBuyout: furniture.buyout,
                rentOfferId: furniture.rentofferid,
                rentCouldBeUsedForBuyout: furniture.rentbuyout,
                availableForBuildersClub: furniture.bc,
                customParams: '',
                specialType: furniture.specialtype,
                canStandOn: false,
                canSitOn: false,
                canLayOn: false,
                excludeDynamic: furniture.excludeddynamic,
                furniLine: furniture.furniline ?? '',
                environment: furniture.environment ?? '',
                rare: furniture.rare,
                isExternalImage: !(furniture.classname.indexOf('external_image') === -1)
            };
        }

        return { wallItems };
    }),
    parseProductData: (data: IProductData[]) => set({ productData: Object.fromEntries(data.map(x => [x.code, x])) }),
    toggleWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => set(x => {
        const current = x.visibleWindows[name];
        const visibleWindows = { ...x.visibleWindows };

        if (current && (!params || areWindowParamsEqual(current, params))) delete visibleWindows[name];
        else visibleWindows[name] = { ...params };

        return { visibleWindows };
    }),
    showWindow: <T extends WindowName>(name: T, params?: WindowRegistry[T]) => set(x => {
        if (!params && x.visibleWindows[name]) return x;

        const visibleWindows = { ...x.visibleWindows };

        visibleWindows[name] = { ...params };

        return { visibleWindows };
    }),
    hideWindow: (name: WindowName) => set(x => {
        if (!x.visibleWindows[name]) return x;

        const visibleWindows = { ...x.visibleWindows };

        delete visibleWindows[name];

        return { visibleWindows };
    }),
    updateWindowParams: <T extends WindowName>(name: T, params: Partial<WindowRegistry[T]>) => set(x => {
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
    setLandingViewVisible: (landingViewVisible: boolean) => set({ landingViewVisible }),
}));
