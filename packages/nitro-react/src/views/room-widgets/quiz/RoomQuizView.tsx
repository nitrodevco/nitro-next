import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

export interface RoomQuizViewProps {
    /** What the room is being asked. */
    content: string;
    /** Seconds left, printed beside the question; nothing is shown once it reaches zero. */
    secondsLeft: number;
    /** Once answered - by us or by the clock - the bubble turns into the tally. */
    showResult: boolean;
    likes: number;
    dislikes: number;
    onLike: () => void;
    onDislike: () => void;
}

/** `WordQuizView.positionWindow` - centred across the top of the room, six pixels down. */
const TOP = 6;

/**
 * The quick question put to the whole room, on the `quiz_question` (360x130) and `quiz_result`
 * (200x65) layouts: thumbs up or down while it is open, and the tally once it is not.
 */
export const RoomQuizView = ({ content, secondsLeft, showResult, likes, dislikes, onLike, onDislike }: RoomQuizViewProps) => {
    if (showResult) return (
        <Box layout={{ position: 'absolute', alignSelf: 'center', top: TOP, width: 200, height: 63 }}>
            <Border
                variant="2"
                name="window_bg"
                tintColor="#000000"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region layout={{ position: 'absolute', left: 8, top: 0, bottom: 0, flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                    <Region layout={{ width: 32, height: 32, flexShrink: 0, justifyContent: 'center' }}>
                        <Border
                            variant="2"
                            tintColor="#b32e22"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text={String(dislikes)}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ fill: '#ffffff' }}
                            name="lbl_dislike_count"
                            layout={{ position: 'absolute', alignSelf: 'center', top: 7, height: 19 }}
                        />
                    </Region>
                    <ThemeText
                        text={content}
                        textStyle="text-style-ubuntu-condensed-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 100 }}
                        name="quiz_topic"
                        verticalAlign="top"
                        layout={{ height: 30, flexShrink: 0, minWidth: 10, maxWidth: 100 }}
                    />
                    <Region layout={{ width: 32, height: 32, flexShrink: 0, justifyContent: 'center' }}>
                        <Border
                            variant="2"
                            tintColor="#117843"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text={String(likes)}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ fill: '#ffffff' }}
                            name="lbl_like_count"
                            layout={{ position: 'absolute', alignSelf: 'center', top: 7, height: 19 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Box>
    );

    return (
        <Box layout={{ position: 'absolute', alignSelf: 'center', top: TOP, width: 360, height: 130 }}>
            <Border
                variant="2"
                name="window_bg"
                tintColor="#000000"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="ui_container2"
                    layout={{ position: 'absolute', alignSelf: 'center', width: 340, top: 3, height: 70, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={content}
                        textStyle="text-style-ubuntu-condensed-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 336 }}
                        name="quiz_topic"
                        verticalAlign="top"
                        layout={{ position: 'absolute', alignSelf: 'center', top: 1, height: 68 }}
                    />
                </Region>
                {/* The clock is silent at zero, as `WordQuizView.updateCounter` blanked it. */}
                {secondsLeft > 0 && (
                    <ThemeText
                        text={String(secondsLeft)}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ fill: '#ffffff' }}
                        name="countdown"
                        layout={{ position: 'absolute', right: 8, top: 6, height: 19 }}
                    />
                )}
                <Region
                    name="ui_container"
                    layout={{ position: 'absolute', alignSelf: 'center', width: 172, top: 74, height: 50 }}
                >
                    <Region
                        name="button_dislike"
                        onPointerTap={onDislike}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            name="border"
                            tintColor="#b32e22"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            <ThemeImage
                                src={LayoutImage('word_quiz_thum_down_big.png')}
                                layout={{ position: 'absolute', left: 9, width: 31, top: 11, height: 34 }}
                            />
                        </Border>
                    </Region>
                    <Region
                        name="button_like"
                        onPointerTap={onLike}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 121, width: 50, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            name="border"
                            tintColor="#007841"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            <ThemeImage
                                src={LayoutImage('word_quiz_thum_up_big.png')}
                                layout={{ position: 'absolute', left: 9, width: 31, top: 7, height: 34 }}
                            />
                        </Border>
                    </Region>
                </Region>
            </Border>
        </Box>
    );
};
