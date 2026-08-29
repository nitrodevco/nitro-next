import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1044_quiz_like_xml` (layout "quiz_like", 32x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizLikeLayoutProps {
    buttonLike?: QuizLikeLayoutButtonLikeProps;
    layout?: BoxLayout;
}

export const QuizLikeLayout = ({ buttonLike, layout }: QuizLikeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 32, height: 32, ...layout }}>
            <Region layout={{ position: 'absolute', left: -1, width: 32, top: 0, height: 32 }}>
                <Border
                    variant="2"
                    name="white"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                />
                <Border
                    variant="2"
                    name="colored"
                    tintColor="#007841"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                />
                <QuizLikeLayoutButtonLike {...buttonLike} />
            </Region>
        </Region>
    );
};

/** Named region `button_like` of QuizLikeLayout - configured through the parent's `buttonLike` prop. */
export interface QuizLikeLayoutButtonLikeProps {
    layout?: BoxLayout;
    onButtonLike?: () => void;
}

export const QuizLikeLayoutButtonLike = ({ layout, onButtonLike }: QuizLikeLayoutButtonLikeProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_like"
            tooltip={t('quizz.like.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLike}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, maxWidth: 32, ...layout }}
        >
            <ThemeImage
                src={layoutImage('word_quiz_thum_up.png')}
                layout={{ position: 'absolute', left: 5, width: 22, top: 5, height: 22 }}
            />
        </Region>
    );
};
