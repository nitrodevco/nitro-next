import { IPollQuestion, PollQuestionType } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { Border, ButtonThick, CheckBox, Frame, LayoutImage, RadioButton, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

export interface RoomPollQuestionViewProps {
    headline: string;
    question: IPollQuestion;
    /** Which question of how many, for the counter in the footer. */
    number: number;
    count: number;
    /** The choice values ticked so far, or the single line typed for a text question. */
    selected: string[];
    text: string;
    onToggleChoice: (value: string) => void;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

/** `poll_answer_text_input`'s `max_chars`. */
const MAX_ANSWER_LENGTH = 512;

/**
 * One question of a poll, on the `poll_question` layout (382x561, frame style 3, margins
 * 6/25/6/7) that `PollContentDialog` builds and centres: the question, its answers in whichever
 * shape it takes, and the counter saying how far through the poll it is. The answers are the
 * layouts `PollContentDialog.nextQuestion` puts in `poll_question_answer_container` -
 * `poll_answer_radiobutton_input`, `poll_answer_checkbox_input`, or `poll_answer_text_input` for
 * both text types (`populateTextAreaType` is `populateTextLineType`: one 300x90 multiline field).
 *
 * Flash asked one question per window and sent each answer as it was given, so a poll abandoned
 * halfway still counts whatever was answered - the same here.
 *
 * What differs: Flash's close button and cancel label open `poll_cancel_confirm` before giving up
 * the poll (`showCancelConfirm`); the port has no confirm and gives it up at once.
 */
export const RoomPollQuestionView = ({
    headline, question, number, count, selected, text, onToggleChoice, onChangeText, onSubmit, onCancel,
}: RoomPollQuestionViewProps) => {
    const t = useTranslation();
    const isText = (question.questionType === PollQuestionType.TextLine) || (question.questionType === PollQuestionType.TextArea);
    const isSingle = question.questionType === PollQuestionType.SingleChoice;

    return (
        <Frame
            variant="3"
            id="poll_question_frame"
            caption={t('poll_question_title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 382, height: 561, minWidth: 382 }}
        >
            <Region
                name="header_region"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 60 }}
            >
                <ThemeText
                    text={headline}
                    textStyle="u_headline_big"
                    textOptions={{ fill: '#ffffff' }}
                    clip
                    name="poll_question_headline"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 80, right: 10, top: 15, height: 25 }}
                />
                <ThemeImage
                    name="poll_prompt_image"
                    src={LayoutImage('room-ui/poll_poll_prompt_question.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 10, width: 40, top: 7, height: 40 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 370, top: 70, bottom: 35 }}>
                <Region
                    name="poll_content_wrapper"
                    layout={{ position: 'absolute', left: 5, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ height: 414, width: 365, flexShrink: 0 }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                    >
                        <ThemeText
                            text={question.questionText}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                            name="poll_question_text"
                            verticalAlign="top"
                            layout={{ width: 360, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 1, height: 10, flexShrink: 0 }} />
                        <Region
                            name="poll_question_answer_container"
                            layout={{ width: 363, height: 384, flexShrink: 0 }}
                        >
                            {isText && (
                                <Border
                                    variant="0"
                                    name="poll_answer_border"
                                    layout={{ position: 'absolute', left: 10, width: 300, top: 12, height: 90 }}
                                >
                                    <TextInput
                                        value={text}
                                        onChange={onChangeText}
                                        maxLength={MAX_ANSWER_LENGTH}
                                        multiline
                                        textStyle="u_bold"
                                        flashPlacement
                                        alwaysShowSelection
                                        backgroundColor={null}
                                        focusedBackgroundColor={null}
                                        layout={{ position: 'absolute', left: 8, right: 10, top: 3, bottom: 3 }}
                                    />
                                    <ThemeImage
                                        name="write_deco"
                                        src={LayoutImage('shared/common_small_pen.png')}
                                        bitmap={{}}
                                        layout={{ position: 'absolute', left: 270, width: 17, top: 10, height: 18 }}
                                    />
                                </Border>
                            )}
                            {!isText && (
                                <Region
                                    name="poll_answer_itemlist"
                                    layout={{ position: 'absolute', left: 0, width: 365, top: 0, minHeight: 125, flexDirection: 'column' }}
                                >
                                    {question.questionChoices.map(choice => (
                                        <Region
                                            key={choice.value}
                                            name="poll_answer_entity"
                                            onPointerTap={() => onToggleChoice(choice.value)}
                                            cursor="pointer"
                                            layout={{ width: 365, height: 32, flexShrink: 0 }}
                                        >
                                            {isSingle
                                                ? (
                                                        <RadioButton
                                                            variant="0"
                                                            name="poll_answer_entity_radiobutton"
                                                            selected={selected.includes(choice.value)}
                                                            layout={{ position: 'absolute', left: 0, width: 19, top: 4, height: 16 }}
                                                        />
                                                    )
                                                : (
                                                        <CheckBox
                                                            variant="0"
                                                            name="poll_answer_checkbox"
                                                            selected={selected.includes(choice.value)}
                                                            layout={{ position: 'absolute', left: 7, width: 20, top: 5, height: 16 }}
                                                        />
                                                    )}
                                            <ThemeText
                                                text={choice.choiceText}
                                                textStyle="u_regular"
                                                textOptions={{ wordWrap: true, wordWrapWidth: 337 }}
                                                name="poll_answer_entity_text"
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: isSingle ? 18 : 24, width: 341, top: 2, height: 30 }}
                                            />
                                        </Region>
                                    ))}
                                </Region>
                            )}
                        </Region>
                    </ScrollArea>
                    <Region layout={{ width: 1, height: 10, flexShrink: 0 }} />
                </Region>
            </Region>
            <Region
                name="footer_container"
                layout={{ position: 'absolute', left: 5, width: 383, bottom: -2, height: 45 }}
            >
                <ThemeText
                    text={t('poll_question_number', '', { number: String(number), count: String(count) })}
                    textStyle="u_regular"
                    textOptions={{ fill: '#333333' }}
                    name="poll_question_number"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 254, top: 10, height: 17 }}
                />
                <Region
                    name="poll_question_cancel"
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 190, width: 74, top: 10, height: 17 }}
                >
                    <ThemeText
                        text={t('cancel')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#333333' }}
                        verticalAlign="top"
                    />
                </Region>
                <ButtonThick
                    variant="5"
                    name="poll_question_button_ok"
                    tintColor="#00aa00"
                    onPointerTap={onSubmit}
                    layout={{ position: 'absolute', left: 270, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
                >
                    {t('ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
