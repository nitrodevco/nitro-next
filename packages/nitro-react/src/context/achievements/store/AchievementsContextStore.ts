import { AchievementCategoryCode, AchievementStateType, AchievementUtilities, IAchievementCategory, IAchievementData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    selectedCategory: string;
    achievementCategories: Map<string, IAchievementCategory>
}

type Actions = {
    setSelectedCategory: (category: string) => void;
    processAchievementCategories: (achievements: IAchievementData[]) => void;
}

const initialState: State = {
    selectedCategory: '',
    achievementCategories: new Map(),
};

export type AchievementsContextStore = State & Actions;

export const createAchievementsContextStore = () => createStore<AchievementsContextStore>()((set, get, store) => ({
    ...initialState,
    setSelectedCategory: (selectedCategory: string) => set({ selectedCategory }),
    processAchievementCategories: (achievements: IAchievementData[]) => set(() => {
        const newCodes = AchievementUtilities.getNewCodes();
        const archiveCategory = AchievementUtilities.createCategory(AchievementCategoryCode.Archive);

        const categoriesByCode = new Map<string, IAchievementCategory>();
        const orderedCategories: IAchievementCategory[] = [];

        categoriesByCode.set(AchievementCategoryCode.Archive, archiveCategory);

        const newAchievements: IAchievementData[] = [];

        let miscCategory: IAchievementCategory | undefined = undefined;

        for (const achievement of achievements) {
            if(!achievement.category.length) continue;

            let existing = achievement.state === AchievementStateType.Archived
                ? archiveCategory
                : categoriesByCode.get(achievement.category);

            if(!existing)
            {
                existing = AchievementUtilities.createCategory(achievement.category);

                categoriesByCode.set(achievement.category, existing);

                if(achievement.category === AchievementCategoryCode.Misc) miscCategory = existing;
                else orderedCategories.push(existing);
            }

            existing.achievements.push(achievement);

            if(AchievementUtilities.isNew(newCodes, achievement)) newAchievements.push(achievement);
        }

        if(miscCategory) orderedCategories.push(miscCategory);

        orderedCategories.push(archiveCategory);

        if(newAchievements.length)
        {
            const newCategory = AchievementUtilities.createCategory(AchievementCategoryCode.New, newAchievements);

            categoriesByCode.set(AchievementCategoryCode.New, newCategory);
            orderedCategories.push(newCategory);
        }

        return {
            achievementCategories: new Map(orderedCategories.map(category => [category.code, category]))
        };
    })
}));
