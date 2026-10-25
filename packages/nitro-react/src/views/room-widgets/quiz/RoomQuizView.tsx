/**
 * The quick question put to the whole room - Flash `WordQuizView`, on `habbo-room-ui-com`'s
 * `wordquiz_question` layout while it is open (`createWindow(STATE_QUESTION)`) and `wordquiz_result`
 * once answered (`displayResults` -> `createWindow(STATE_RESULT)`): `button_like` / `button_dislike`
 * answer (`onLike` / `onDislike`), `lbl_like_count` / `lbl_dislike_count` hold the tally
 * (`updateResults`).
 *
 * `createWindow` sets `quiz_topic` to the topic, its width to `min(660, textWidth + 6)` with the text
 * measured 660 wide (`getCorrectTextWidth`), and its y to 3; the layouts' flags carry the width on to
 * the window (`ui_container2` -> `window_bg` in the question, the list and `window_bg` in the result).
 * `positionWindow` centres the window on the desktop by the width of its first child, `window_bg`, 6
 * from the top.
 *
 * Neither layout has the `countdown` text `updateCounter` writes to, so Flash never shows the clock -
 * and neither does this view.
 */
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

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

const QUESTION_TEMPLATE = 'habbo-room-ui-com/wordquiz_question_xml';
const RESULT_TEMPLATE = 'habbo-room-ui-com/wordquiz_result_xml';

/** `getCorrectTextWidth` / `createWindow`: the width the topic is measured at, and its most. */
const TOPIC_MAX_WIDTH = 660;
/** `createWindow`: the topic's width past its text, and its y. */
const TOPIC_EXTRA_WIDTH = 6;
const TOPIC_Y = 3;

/** `positionWindow`: the window's y. */
const TOP = 6;

export const RoomQuizView = ({ content, showResult, likes, dislikes, onLike, onDislike }: RoomQuizViewProps) => {
    const arrange = ({ find }: TemplateWindows) => {
        const topic = find('quiz_topic');

        if (topic) {
            topic.setWidth(TOPIC_MAX_WIDTH);
            topic.setWidth(Math.min(TOPIC_MAX_WIDTH, topic.textWidth + TOPIC_EXTRA_WIDTH));
            topic.setY(TOPIC_Y);
        }
    };

    return (
        // `positionWindow`: centred across the desktop. The root container accommodates `window_bg`
        // (`resize_to_accommodate_children`), so centring the window centres `window_bg`.
        <Box
            pointerTransparent
            layout={{ position: 'absolute', left: 0, top: TOP, width: '100%', flexDirection: 'row', justifyContent: 'center' }}
        >
            {showResult
                ? (
                        <TemplateWindow
                            key="result"
                            id={RESULT_TEMPLATE}
                            bindings={{
                                quiz_topic: { caption: content },
                                lbl_like_count: { caption: String(likes) },
                                lbl_dislike_count: { caption: String(dislikes) },
                            }}
                            arrange={arrange}
                        />
                    )
                : (
                        <TemplateWindow
                            key="question"
                            id={QUESTION_TEMPLATE}
                            bindings={{
                                quiz_topic: { caption: content },
                                button_like: { onPointerTap: onLike },
                                button_dislike: { onPointerTap: onDislike },
                            }}
                            arrange={arrange}
                        />
                    )}
        </Box>
    );
};
