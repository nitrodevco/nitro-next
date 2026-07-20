import { FurnitureType, type IFurnitureData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    localization: Record<string, string>;
    badgePointLimits: Map<string, number>;
    needsUpdate: boolean;
};

type Actions = {
    getLocalizationValue: (key: string, defaultValue?: string) => string;
    getLocalizationValueParams: (key: string, params: string[], replacements: string[]) => string;
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
};

const initialState: State = {
    localization: {},
    badgePointLimits: new Map(),
    needsUpdate: true,
};

export const LocalizationStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    getLocalizationValue: (key: string, defaultValue?: string) => {
        return get().localization[key] ?? defaultValue;
    },
    getLocalizationValueParams: (key: string, params: string[], replacements: string[]) => {
        let value = get().localization[key];

        if (value) for (let i = 0; i < params.length; i++) {
            const param = params[i];
            const replacement = replacements[i];

            value = value.replace(`%${param}%`, replacement);
        }

        return value ?? '';
    },
    setLocalization: (localizations: Record<string, string>) =>
        set(state => {
            return {
                localization: { ...state.localization, ...localizations },
                localizationNeedsUpdate: false,
            };
        }),
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => {
        if (!furniture || !furniture.length) return;

        const locals = new Map<string, string>();

        for (const item of furniture) {
            switch (item.type) {
                case FurnitureType.FLOOR:
                    locals.set(`roomitem.name.${item.id}`, item.localizedName);
                    locals.set(`roomitem.desc.${item.id}`, item.description);
                    break;
                case FurnitureType.WALL:
                    locals.set(`wallitem.name.${item.id}`, item.localizedName);
                    locals.set(`wallitem.desc.${item.id}`, item.description);
                    break;
            }
        }

        if (locals.size === 0) return;

        set(state => {
            const newLocals = { ...state.localization };

            for (const [key, value] of locals) newLocals[key] = value;

            return { localization: newLocals };
        });
    },
}));
