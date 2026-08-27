import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1046_quiz_question_xml` (layout "quiz_question", 360x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizQuestionLayoutProps {
    captionQuizTopic?: string;
    layout?: BoxLayout;
    onButtonDislike?: () => void;
    onButtonLike?: () => void;
}

export const QuizQuestionLayout = ({ captionQuizTopic, layout, onButtonDislike, onButtonLike }: QuizQuestionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 130, ...layout }}>
            <Region
                params={147456}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 130 }}
            >
                <Border
                    variant="2"
                    name="window_bg"
                    params={131088}
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 130 }}
                >
                    <Region
                        name="ui_container2"
                        params={4341968}
                        layout={{ position: 'absolute', left: 79, width: 203, top: 3, height: 70 }}
                    >
                        <Region
                            name="quiz_topic"
                            params={8260816}
                            layout={{ position: 'absolute', left: 0, width: 203, top: 2, height: 68, maxWidth: 660, maxHeight: 68, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionQuizTopic ?? '1jjjjjjlllll'}
                                textStyle="text-style-ubuntu-condensed-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 203 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="ui_container"
                        params={192}
                        layout={{ position: 'absolute', left: 94, width: 172, top: 74, height: 50 }}
                    >
                        <Region
                            name="button_dislike"
                            params={17}
                            onPointerTap={onButtonDislike}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                        >
                            <Border
                                variant="3"
                                name="border"
                                params={16}
                                tintColor="#b32e22"
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                            >
                                <ThemeImage
                                    params={18}
                                    src={layoutImage('word_quiz_thum_down_big.png')}
                                    layout={{ position: 'absolute', left: 9, width: 31, top: 11, height: 34 }}
                                />
                            </Border>
                        </Region>
                        <Region
                            name="button_like"
                            params={17}
                            onPointerTap={onButtonLike}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 121, width: 50, top: 0, height: 50 }}
                        >
                            <Border
                                variant="3"
                                name="border"
                                params={16}
                                tintColor="#007841"
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                            >
                                <ThemeImage
                                    params={18}
                                    src={layoutImage('word_quiz_thum_up_big.png')}
                                    layout={{ position: 'absolute', left: 9, width: 31, top: 7, height: 34 }}
                                />
                            </Border>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
