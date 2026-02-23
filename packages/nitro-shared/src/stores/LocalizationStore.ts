import { FurnitureType, type IFurnitureData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    localization: Map<string, string>;
    badgePointLimits: Map<string, number>;
    needsUpdate: boolean;
};

type Actions = {
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
};

const initialState: State = {
    localization: new Map(),
    badgePointLimits: new Map(),
    needsUpdate: true,
};

export const LocalizationStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    loadAsync: async (...urls: string[]) => {
        if (!urls || !urls.length) return;

        const locals = new Map<string, string>();

        try {
            for (const url of urls) {
                if (!url || !url.length) continue;

                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid localization url');

                const data = (await response.json()) as { [index: string]: any };

                for (const key in data) locals.set(key, data[key]);
            }

            if (locals.size === 0) return;

            set(state => {
                const newLocals = new Map(state.localization);

                for (const [key, value] of locals) newLocals.set(key, value);

                return { localization: newLocals };
            });
        } catch (e) {
            throw new Error(`Failed to load localization: ${e}`);
        }
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
            const newLocals = new Map(state.localization);

            for (const [key, value] of locals) newLocals.set(key, value);

            return { localization: newLocals };
        });
    },
}));
