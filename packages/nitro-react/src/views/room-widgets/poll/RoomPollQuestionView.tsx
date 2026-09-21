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

/** `poll_answer_text_input` - the long-answer field, which the short one reuses at one line. */
const TEXT_AREA_HEIGHT = 90;
const TEXT_LINE_HEIGHT = 30;
const MAX_ANSWER_LENGTH = 512;

/**
 * One question of a poll, on the `poll_question` layout (382x561): the question, its answers in
 * whichever shape it takes, and the counter saying how far through the poll it is.
 *
 * Flash asked one question per window and sent each answer as it was given, so a poll abandoned
 * halfway still counts whatever was answered - the same here.
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
            id="poll-question"
            caption={t('poll_question_title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            defaultPosition={{ x: 140, y: 40 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 382, height: 561 }}
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
                    name="poll_question_headline"
                    layout={{ position: 'absolute', left: 80, right: 10, top: 15, height: 25 }}
                />
                <ThemeImage
                    name="poll_prompt_image"
                    src={LayoutImage('room-ui/poll_poll_prompt_question.png')}
                    layout={{ position: 'absolute', left: 10, width: 40, top: 7, height: 40 }}
                />
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 5, width: 365, top: 78, height: 414 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
            >
                <ThemeText
                    text={question.questionText}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                    name="poll_question_text"
                    verticalAlign="top"
                    layout={{ width: 360, flexShrink: 0 }}
                />
                <Region layout={{ width: 1, height: 10, flexShrink: 0 }} />
                {isText
                    ? (
                            <Border
                                variant="0"
                                name="poll_answer_border"
                                layout={{ width: 300, height: (question.questionType === PollQuestionType.TextArea) ? TEXT_AREA_HEIGHT : TEXT_LINE_HEIGHT, flexShrink: 0 }}
                            >
                                <TextInput
                                    value={text}
                                    onChange={onChangeText}
                                    maxLength={MAX_ANSWER_LENGTH}
                                    multiline={question.questionType === PollQuestionType.TextArea}
                                    layout={{ position: 'absolute', left: 8, right: 10, top: 3, bottom: 3 }}
                                />
                                <ThemeImage
                                    name="write_deco"
                                    src={LayoutImage('shared/common_small_pen.png')}
                                    layout={{ position: 'absolute', right: 5, width: 17, top: 6, height: 18 }}
                                />
                            </Border>
                        )
                    : question.questionChoices.map(choice => (
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
                                    textOptions={{ wordWrap: true, wordWrapWidth: 341 }}
                                    name="poll_answer_entity_text"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: isSingle ? 18 : 24, width: 341, top: 2, height: 30 }}
                                />
                            </Region>
                        ))}
            </ScrollArea>
            <Region
                name="footer_container"
                layout={{ position: 'absolute', left: 11, width: 360, bottom: 0, height: 45 }}
            >
                <ThemeText
                    text={t('poll_question_number', '%number% / %count%', { number: String(number), count: String(count) })}
                    textStyle="u_regular"
                    textOptions={{ fill: '#333333' }}
                    name="poll_question_number"
                    layout={{ position: 'absolute', left: 0, width: 100, top: 10, height: 17 }}
                />
                <Region
                    name="poll_question_cancel"
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 160, width: 74, top: 10, height: 17 }}
                >
                    <ThemeText
                        text={t('cancel')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <ButtonThick
                    variant="5"
                    name="poll_question_button_ok"
                    tintColor="#00aa00"
                    onPointerTap={onSubmit}
                    layout={{ position: 'absolute', left: 270, width: 80, top: 0, height: 40 }}
                >
                    {t('ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
