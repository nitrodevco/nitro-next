import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `achievements_header_cont` of AchievementsLayout - configured through the parent's `achievementsHeaderCont` prop. */
export interface AchievementsLayoutAchievementsHeaderContProps {
    captionCategoryNameTxt?: string;
    captionCategoryProgressTxt?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    srcCategoryPicBitmap?: string;
}

export const AchievementsLayoutAchievementsHeaderCont = ({ captionCategoryNameTxt, captionCategoryProgressTxt, layout, onBackButton, srcCategoryPicBitmap }: AchievementsLayoutAchievementsHeaderContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_header_cont"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 75, ...layout }}
        >
            <Region
                backgroundColor="#8899a2"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 0 }}
            />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 387, top: 74, height: 1 }}
            />
            <ThemeImage
                name="category_pic_bitmap"
                src={srcCategoryPicBitmap}
                layout={{ position: 'absolute', left: 297, width: 84, top: 3, height: 72 }}
            />
            <Region
                name="category_name_txt"
                layout={{ position: 'absolute', left: 78, right: 25, top: 13, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCategoryNameTxt ?? 'Category Name Placeholder'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 286 }}
                />
            </Region>
            <Region
                name="category_progress_txt"
                layout={{ position: 'absolute', left: 78, right: 66, top: 40, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCategoryProgressTxt ?? t('achievements.details.categoryprogress')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 245 }}
                />
            </Region>
            <Region
                name="back_button"
                onPointerTap={onBackButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 14, width: 33, top: 21, height: 34 }}
            >
                <ThemeImage
                    src={layoutImage('icons_back.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                />
            </Region>
        </Region>
    );
};
