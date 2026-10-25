import type { AchievementCategory } from '#base/context/achievements';
import { categoryProgress } from '#base/context/achievements';
import { useTranslation } from '#base/context/system';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

/** `AchievementCategory`'s layout size. */
export const CATEGORY_WIDTH = 112;
export const CATEGORY_HEIGHT = 105;

interface AchievementCategoryEntryProps {
    x: number;
    y: number;
    /** The category, or none for an empty tile. */
    category?: AchievementCategory;
    unseenCount: number;
    hovered: boolean;
    onPick: (code: string) => void;
    onHover: (hovered: boolean) => void;
}

/**
 * One tile of the category grid: the `habbo-quest-engine-com/AchievementCategory` template, as
 * `AchievementController.refreshCategoryEntry` fills it and `refreshMouseOver` lights it - the active
 * background swapped for the hover one and the content shifted up and left by a pixel.
 */
export const AchievementCategoryEntry = ({ x, y, category, unseenCount, hovered, onPick, onHover }: AchievementCategoryEntryProps) => {
    const t = useTranslation();
    const progress = category && categoryProgress(category);
    // `HabboQuestEngine.getAchievementCategoryName`: the key is its own fallback.
    const name = category && t(`quests.${category.code}.name`, `quests.${category.code}.name`);

    // `refreshMouseOver`: the hovered tile's content at the container's origin, the others' a pixel in.
    const arrange = ({ find }: TemplateWindows) => {
        const content = find('hover_container');

        content?.setX(hovered ? 0 : 1);
        content?.setY(hovered ? 0 : 1);
    };

    return (
        <Box layout={{ position: 'absolute', left: x, top: y }}>
            <TemplateWindow
                id="habbo-quest-engine-com/AchievementCategory"
                bindings={{
                    category_region: {
                        visible: !!category,
                        onPointerTap: () => category && onPick(category.code),
                        onPointerOver: () => onHover(true),
                        onPointerOut: () => onHover(false),
                    },
                    category_bg_inact: { visible: !category },
                    category_bg_act: { visible: !!category && !hovered },
                    category_bg_act_hover: { visible: hovered },
                    header_txt: { visible: !!category, caption: name },
                    completion_txt: { visible: !!category, caption: progress && `${progress.progress}/${progress.max}` },
                    // `HabboQuestEngine.setupAchievementCategoryImage(window, category, true)`.
                    category_pic_bitmap: { visible: !!category, asset: category && `\${image.library.questing.url}ach_category_${category.code}.png` },
                    unseen_count_border: { visible: !!category && unseenCount > 0 },
                    unseen_count: { caption: String(unseenCount) },
                }}
                arrange={arrange}
            />
        </Box>
    );
};
