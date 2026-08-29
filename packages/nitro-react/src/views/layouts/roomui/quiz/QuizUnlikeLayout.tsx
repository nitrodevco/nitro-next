import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `920_quiz_unlike_xml` (layout "quiz_unlike", 32x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizUnlikeLayoutProps {
    layout?: BoxLayout;
    onButtonLike?: () => void;
}

export const QuizUnlikeLayout = ({ layout, onButtonLike }: QuizUnlikeLayoutProps) => {
    const t = useTranslation();

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
                    tintColor="#b32e22"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                />
                <Region
                    name="button_like"
                    tooltip={t('quizz.like.button.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onButtonLike}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, maxWidth: 32 }}
                >
                    <ThemeImage
                        src={layoutImage('word_quiz_thum_down.png')}
                        layout={{ position: 'absolute', left: 5, width: 22, top: 8, height: 22 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
