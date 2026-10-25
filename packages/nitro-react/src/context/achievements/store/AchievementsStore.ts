/** Session-owned achievement browser state, porting AS3 AchievementController. */
import type { IAchievement } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { type AchievementCategory, buildCategories, updateCategories, withMaxProgress } from './achievementModel';

interface AchievementsState {
    /** `GetAchievementsComposer` was sent this session. */
    requested: boolean;
    /** `_categories != null`: the list arrived and is never rebuilt. */
    categories: AchievementCategory[] | undefined;
    /** `_SafeStr_9181`: `show` ran before the list arrived. */
    openRequested: boolean;
    /** `_pendingCategorySelect`. */
    pendingCategory: string | undefined;
    /** `_category` (empty before a category is picked). */
    category: string;
    /** `_achievement`. */
    selectedId: number | undefined;
    /** `_SafeStr_9182`: the achievements updated while not selected, by id. */
    unseen: IAchievement[];
    score: number;
    /** `_SafeStr_9180`: the next level shown once the two second transition ends. */
    pending: IAchievement | undefined;
}

interface AchievementsActions {
    reset: () => void;
    request: () => boolean;
    show: () => void;
    setList: (achievements: IAchievement[], defaultCategory: string, newCodes?: string[]) => void;
    selectCategoryLink: (code: string) => void;
    pickCategory: (code: string) => void;
    selectAchievement: (id: number) => void;
    back: () => void;
    update: (achievement: IAchievement) => boolean;
    finishTransition: () => void;
    close: () => void;
    setScore: (score: number) => void;
}

const initialState: AchievementsState = {
    requested: false, categories: undefined, openRequested: false, pendingCategory: undefined,
    category: '', selectedId: undefined, unseen: [], score: 0, pending: undefined,
};

export const selectedAchievement = (state: AchievementsState) => state.categories
    ?.find(entry => entry.code === state.category)?.achievements.find(entry => entry.achievementId === state.selectedId);

export const createAchievementsStore = () => createStore<AchievementsState & AchievementsActions>()((set, get) => {
    // `pickCategory`: the first achievement of the category is selected.
    const pick = (categories: AchievementCategory[], code: string) => {
        const category = categories.find(entry => entry.code === code);

        if (!category) return false;

        set({ category: category.code, selectedId: category.achievements[0]?.achievementId });

        return true;
    };

    return {
        ...initialState,
        reset: () => set(initialState),
        request: () => {
            if (get().requested || get().categories) return false;

            set({ requested: true });

            return true;
        },
        // `AchievementController.show` before the list: remember that the window was asked for.
        show: () => {
            if (!get().categories) set({ openRequested: true });
        },
        // `AchievementController.onAchievements`.
        setList: (achievements, defaultCategory, newCodes = []) => {
            const state = get();
            const categories = state.categories ?? buildCategories(achievements, newCodes);

            if (!state.categories) set({ categories });

            if (!state.openRequested) return;

            set({ openRequested: false });

            if (pick(categories, state.pendingCategory ?? defaultCategory)) set({ pendingCategory: undefined });
        },
        // `selectCategoryInternalLink`.
        selectCategoryLink: (code) => {
            const { categories } = get();

            if (!categories || !pick(categories, code)) set({ pendingCategory: code });
        },
        pickCategory: (code) => {
            const { categories } = get();

            if (categories) pick(categories, code);
        },
        selectAchievement: selectedId => set({ selectedId }),
        // `onBack`: the category's unseen entries are cleared and the overview returns.
        back: () => {
            const { category, unseen } = get();

            set({ unseen: category ? unseen.filter(entry => entry.category !== category) : unseen, category: '', selectedId: undefined });
        },
        // `onAchievement`; true when the two second transition timer starts.
        update: (achievement) => {
            const state = get();

            if (!state.categories) return false;

            const current = selectedAchievement(state);
            const selected = !!current && current.achievementId === achievement.achievementId;
            const unseen = !selected && !state.unseen.some(entry => entry.achievementId === achievement.achievementId)
                ? [ ...state.unseen, achievement ]
                : state.unseen;

            if (selected && achievement.level > current.level) {
                const running = !!state.pending;

                set({
                    unseen, pending: achievement,
                    categories: updateCategories(state.categories, withMaxProgress(current)),
                });

                return !running;
            }

            set({ unseen, categories: updateCategories(state.categories, achievement) });

            return false;
        },
        // `switchIntoPendingLevel`.
        finishTransition: () => {
            const { pending, categories } = get();

            if (!pending || !categories) return;

            set({ pending: undefined, selectedId: pending.achievementId, categories: updateCategories(categories, pending) });
        },
        // `close`: only the unseen dictionary is replaced; the selection and transition stay.
        close: () => set({ unseen: [] }),
        setScore: score => set({ score }),
    };
});

export const achievementsStore = createAchievementsStore();
