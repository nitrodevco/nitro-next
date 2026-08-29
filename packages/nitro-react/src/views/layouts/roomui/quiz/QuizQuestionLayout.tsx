import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1046_quiz_question_xml` (layout "quiz_question", 360x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizQuestionLayoutProps {
    layout?: BoxLayout;
    uiContainer?: QuizQuestionLayoutUiContainerProps;
    uiContainer2?: QuizQuestionLayoutUiContainer2Props;
}

export const QuizQuestionLayout = ({ layout, uiContainer, uiContainer2 }: QuizQuestionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 130, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 130 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 130, justifyContent: 'center' }}
                >
                    <QuizQuestionLayoutUiContainer2 {...uiContainer2} />
                    <QuizQuestionLayoutUiContainer {...uiContainer} />
                </Border>
            </Region>
        </Region>
    );
};

/** Named region `ui_container2` of QuizQuestionLayout - configured through the parent's `uiContainer2` prop. */
export interface QuizQuestionLayoutUiContainer2Props {
    captionQuizTopic?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const QuizQuestionLayoutUiContainer2 = ({ captionQuizTopic, layout, tags }: QuizQuestionLayoutUiContainer2Props) => {
    return (
        <Region
            name="ui_container2"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 203, top: 3, height: 70, justifyContent: 'center', ...layout }}
        >
            <Region
                name="quiz_topic"
                layout={{ position: 'absolute', alignSelf: 'center', marginTop: 1, marginBottom: -1, height: 68, maxWidth: 660, maxHeight: 68, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionQuizTopic ?? '1jjjjjjlllll'}
                    textStyle="text-style-ubuntu-condensed-regular"
                    textOptions={{ wordWrap: true }}
                />
            </Region>
        </Region>
    );
};

/** Named region `button_dislike` of QuizQuestionLayout - configured through the parent's `buttonDislike` prop. */
export interface QuizQuestionLayoutButtonDislikeProps {
    layout?: BoxLayout;
    onButtonDislike?: () => void;
    tags?: string[];
}

export const QuizQuestionLayoutButtonDislike = ({ layout, onButtonDislike, tags }: QuizQuestionLayoutButtonDislikeProps) => {
    return (
        <Region
            name="button_dislike"
            tags={tags}
            onPointerTap={onButtonDislike}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50, ...layout }}
        >
            <Border
                variant="3"
                name="border"
                tintColor="#b32e22"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <ThemeImage
                    src={layoutImage('word_quiz_thum_down_big.png')}
                    layout={{ position: 'absolute', left: 9, width: 31, top: 11, height: 34 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `button_like` of QuizQuestionLayout - configured through the parent's `buttonLike` prop. */
export interface QuizQuestionLayoutButtonLikeProps {
    layout?: BoxLayout;
    onButtonLike?: () => void;
    tags?: string[];
}

export const QuizQuestionLayoutButtonLike = ({ layout, onButtonLike, tags }: QuizQuestionLayoutButtonLikeProps) => {
    return (
        <Region
            name="button_like"
            tags={tags}
            onPointerTap={onButtonLike}
            cursor="pointer"
            layout={{ position: 'absolute', left: 121, width: 50, top: 0, height: 50, ...layout }}
        >
            <Border
                variant="3"
                name="border"
                tintColor="#007841"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <ThemeImage
                    src={layoutImage('word_quiz_thum_up_big.png')}
                    layout={{ position: 'absolute', left: 9, width: 31, top: 7, height: 34 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `ui_container` of QuizQuestionLayout - configured through the parent's `uiContainer` prop. */
export interface QuizQuestionLayoutUiContainerProps {
    buttonDislike?: QuizQuestionLayoutButtonDislikeProps;
    buttonLike?: QuizQuestionLayoutButtonLikeProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const QuizQuestionLayoutUiContainer = ({ buttonDislike, buttonLike, layout, tags }: QuizQuestionLayoutUiContainerProps) => {
    return (
        <Region
            name="ui_container"
            tags={tags}
            layout={{ position: 'absolute', width: 172, top: 74, height: 50, ...layout }}
        >
            <QuizQuestionLayoutButtonDislike {...buttonDislike} />
            <QuizQuestionLayoutButtonLike {...buttonLike} />
        </Region>
    );
};
