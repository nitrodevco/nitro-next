import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

export interface RoomQuizViewProps {
    /** What the room is being asked. */
    content: string;
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
 * `WordQuizView.createWindow` widens `quiz_topic` to the text it holds - `textWidth` measured at
 * 660 wide, plus 6 - so a wrapping field only wraps past 660 (its `max_lines` is 2).
 */
const TOPIC_WRAP_WIDTH = 660 - 4;

/**
 * The quick question put to the whole room, on the `quiz_question` (360x130) and `quiz_result`
 * (200x65) layouts `WordQuizView.createWindow` builds: thumbs up or down while it is open, and the
 * tally once it is not.
 *
 * Neither layout has the `countdown` text `WordQuizView.updateCounter` writes to, so Flash never
 * shows the clock - and neither does this view.
 *
 * Both windows are as wide as the topic. `createWindow` sets `quiz_topic`'s width to
 * `min(660, textWidth + 6)` - the bitmap's `textWidth + 4` and 2 more, hence the text's
 * `marginRight` - and the flags carry that on: in `quiz_question` the topic reflects its width to
 * `ui_container2`, which reflects it to `window_bg` (360 = the layout's 203-wide topic + 157, so
 * 79 left of it and 78 right), and `ui_container` stays centred under it; in `quiz_result` the
 * `itemlist_horizontal` grows with the topic and `window_bg` accommodates it, so the window ends
 * at the list's right edge, 8 in from its left. `positionWindow` centres the window by the width
 * of its first child, `window_bg`, which is the window's own width either way.
 */
export const RoomQuizView = ({ content, showResult, likes, dislikes, onLike, onDislike }: RoomQuizViewProps) => {
    if (showResult) return (
        <Box layout={{ position: 'absolute', alignSelf: 'center', top: TOP, height: 65, flexDirection: 'row' }}>
            <Region layout={{ height: 63, flexDirection: 'row', flexShrink: 0 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ height: 63, flexDirection: 'row', flexShrink: 0 }}
                >
                    <Region layout={{ marginLeft: 8, height: 63, maxWidth: 772, flexDirection: 'row', alignItems: 'flex-start', gap: 20, flexShrink: 0 }}>
                        <Region
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ width: 32, height: 32, marginTop: 6, flexShrink: 0 }}
                        >
                            <Border
                                variant="2"
                                tintColor="#b32e22"
                                layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                            />
                            <ThemeText
                                text={String(dislikes)}
                                textStyle="u_headline_small"
                                textOptions={{ fill: '#ffffff' }}
                                name="lbl_dislike_count"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 9, top: 7, height: 19, maxWidth: 130 }}
                            />
                        </Region>
                        <ThemeText
                            text={content}
                            textStyle="ubuntu_condensed_regular"
                            textOptions={{ fontSize: 24, wordWrap: true, wordWrapWidth: TOPIC_WRAP_WIDTH }}
                            name="quiz_topic"
                            verticalAlign="top"
                            layout={{ marginTop: 3, marginRight: 2, flexShrink: 0, minWidth: 8, maxWidth: 658, maxHeight: 58 }}
                        />
                        <Region
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ width: 40, height: 34, marginTop: 6, flexShrink: 0 }}
                        >
                            <Border
                                variant="2"
                                tintColor="#117843"
                                layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                            />
                            <ThemeText
                                text={String(likes)}
                                textStyle="u_headline_small"
                                textOptions={{ fill: '#ffffff' }}
                                name="lbl_like_count"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 9, top: 7, height: 19, maxWidth: 130 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Box>
    );

    return (
        <Box layout={{ position: 'absolute', alignSelf: 'center', top: TOP, height: 130, flexDirection: 'row' }}>
            <Border
                variant="2"
                name="window_bg"
                tintColor="#000000"
                blend={0.8}
                layout={{ height: 130, flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}
            >
                <Region
                    name="ui_container2"
                    layout={{ marginLeft: 79, marginRight: 78, marginTop: 3, height: 70, flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}
                >
                    <ThemeText
                        text={content}
                        textStyle="ubuntu_condensed_regular"
                        textOptions={{ fontSize: 28, wordWrap: true, wordWrapWidth: TOPIC_WRAP_WIDTH }}
                        name="quiz_topic"
                        verticalAlign="top"
                        layout={{ marginTop: 3, marginRight: 2, flexShrink: 0, maxWidth: 658, maxHeight: 68 }}
                    />
                </Region>
                <Region
                    name="ui_container"
                    layout={{ position: 'absolute', alignSelf: 'center', width: 172, top: 74, height: 50 }}
                >
                    <Region
                        name="button_dislike"
                        onPointerTap={onDislike}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    >
                        <Border
                            variant="3"
                            name="border"
                            tintColor="#b32e22"
                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                        >
                            <ThemeImage
                                src={LayoutImage('room-ui/word_quiz_thum_down_big.png')}
                                bitmap={{}}
                                layout={{ position: 'absolute', left: 9, width: 31, top: 11, height: 34 }}
                            />
                        </Border>
                    </Region>
                    <Region
                        name="button_like"
                        onPointerTap={onLike}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 121, width: 50, top: 0, height: 50 }}
                    >
                        <Border
                            variant="3"
                            name="border"
                            tintColor="#007841"
                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                        >
                            <ThemeImage
                                src={LayoutImage('room-ui/word_quiz_thum_up_big.png')}
                                bitmap={{}}
                                layout={{ position: 'absolute', left: 9, width: 31, top: 7, height: 34 }}
                            />
                        </Border>
                    </Region>
                </Region>
            </Border>
        </Box>
    );
};
