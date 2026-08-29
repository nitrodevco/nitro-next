import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1044_quiz_like_xml` (layout "quiz_like", 32x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizLikeLayoutProps {
    layout?: BoxLayout;
    onButtonLike?: () => void;
}

export const QuizLikeLayout = ({ layout, onButtonLike }: QuizLikeLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 32, height: 32, ...layout }}>
            <Region layout={{ position: 'absolute', left: -1, right: 1, top: 0, bottom: 0 }}>
                <Border
                    variant="2"
                    name="white"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Border
                    variant="2"
                    name="colored"
                    tintColor="#007841"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="button_like"
                    tooltip={t('quizz.like.button.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onButtonLike}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 32, maxWidth: 32 }}
                >
                    <ThemeImage
                        src={layoutImage('word_quiz_thum_up.png')}
                        layout={{ position: 'absolute', left: 5, width: 22, top: 5, height: 22 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
