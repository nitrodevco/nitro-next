import { useAchievementsSelectors } from "#base/context/achievements";
import { Button } from "#base/theme";

export const AchievementsListView = () => {
    const { achievementCategories } = useAchievementsSelectors();

    const allCategories = [...achievementCategories.values()].filter(category => category.code !== "new");

    return (
        <div className="grid grid-cols-3 px-4.5 py-1.75 gap-2">
            { allCategories.map(category =>
                <Button variant="400" className="w-27 h-25.5" key={ category.code }>
                    { category.code }
                </Button>)
            }
        </div>
    );
}