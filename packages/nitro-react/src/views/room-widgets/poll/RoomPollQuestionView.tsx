/**
 * One question of a poll - Flash `PollContentDialog`, on `habbo-room-ui-com`'s `poll_question` layout,
 * centred (`_window.center()`), its `poll_question_headline` the poll's headline.
 *
 * `nextQuestion` writes the question into `poll_question_text`, `poll_question_number` as
 * `poll_question_number` with `%number%` / `%count%`, and refills `poll_question_answer_container`
 * with the answer layout of the question's type:
 *
 * - single choice: `poll_answer_radiobutton_input` (`populateRadionButtonType`), multiple choice:
 *   `poll_answer_checkbox_input` (`populateCheckBoxType`) - `poll_answer_entity` cloned once per choice
 *   into `poll_answer_itemlist`, its `poll_answer_entity_text` the choice and its `POLL_SELECTABLE_ITEM`
 *   (the radio button or checkbox) the one that selects it (`populateSelectionList`);
 * - text line and text area: `poll_answer_text_input` (`populateTextLineType`, which
 *   `populateTextAreaType` calls), its `poll_answer_input` the answer.
 *
 * It then grows the window by what `poll_content_wrapper` holds beyond its own height
 * (`scrollableRegion.height - visibleRegion.height`). `poll_question_button_ok` answers (`onOk`).
 *
 * Flash asked one question per window and sent each answer as it was given, so a poll abandoned
 * halfway still counts whatever was answered - the same here. What differs: Flash's close button and
 * `poll_question_cancel` open `poll_cancel_confirm` before giving up the poll (`showCancelConfirm`);
 * the port has no confirm and gives it up at once. Flash re-centres the window after each question's
 * resize; the port's frame is centred when it opens.
 */
import { IPollQuestion, PollQuestionType } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { findTemplateChild, Template, TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

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

const QUESTION_TEMPLATE = 'habbo-room-ui-com/poll_question';
const RADIO_TEMPLATE = 'habbo-room-ui-com/poll_answer_radiobutton_input';
const CHECKBOX_TEMPLATE = 'habbo-room-ui-com/poll_answer_checkbox_input';
const TEXT_TEMPLATE = 'habbo-room-ui-com/poll_answer_text_input';

const arrange = ({ root, find }: TemplateWindows) => {
    const window = root();
    const wrapper = find('poll_content_wrapper');

    if (!window || !wrapper) return;

    window.setHeight(window.height + (wrapper.scrollableRegion.height - wrapper.height));
};

export const RoomPollQuestionView = ({
    headline, question, number, count, selected, text, onToggleChoice, onChangeText, onSubmit, onCancel,
}: RoomPollQuestionViewProps) => {
    const t = useTranslation();
    const radioTemplate = useTemplate(RADIO_TEMPLATE);
    const checkboxTemplate = useTemplate(CHECKBOX_TEMPLATE);
    const textTemplate = useTemplate(TEXT_TEMPLATE);

    if (!radioTemplate || !checkboxTemplate || !textTemplate) return null;

    const isText = (question.questionType === PollQuestionType.TextLine) || (question.questionType === PollQuestionType.TextArea);
    const isSingle = question.questionType === PollQuestionType.SingleChoice;

    /** `populateSelectionList`: `poll_answer_entity` once per choice, its selectable the choice's. */
    const selectionInput = (template: Template, selectable: string): TemplateItem => {
        const entity = findTemplateChild(template.elements, 'poll_answer_entity');

        return {
            key: `${question.questionId}`,
            from: template,
            bindings: {
                poll_answer_itemlist: {
                    items: entity
                        ? question.questionChoices.map(choice => ({
                                key: choice.value,
                                from: entity,
                                bindings: {
                                    poll_answer_entity_text: { caption: choice.choiceText },
                                    [selectable]: { selected: selected.includes(choice.value), onPointerTap: () => onToggleChoice(choice.value) },
                                },
                            }))
                        : [],
                },
            },
        };
    };

    let answer: TemplateItem;

    if (isText) answer = { key: `${question.questionId}`, from: textTemplate, bindings: { poll_answer_input: { caption: text, onChange: onChangeText } } };
    else if (isSingle) answer = selectionInput(radioTemplate, 'poll_answer_entity_radiobutton');
    else answer = selectionInput(checkboxTemplate, 'poll_answer_checkbox');

    return (
        <TemplateWindow
            id={QUESTION_TEMPLATE}
            frame={{ id: 'poll_question_frame', centered: true, rememberPosition: false, onClose: onCancel }}
            bindings={{
                poll_question_headline: { caption: headline },
                poll_question_text: { caption: question.questionText },
                poll_question_number: { caption: t('poll_question_number', '', { number: String(number), count: String(count) }) },
                poll_question_answer_container: { added: [ answer ] },
                poll_question_cancel: { onPointerTap: onCancel },
                poll_question_button_ok: { onPointerTap: onSubmit },
            }}
            arrange={arrange}
        />
    );
};
