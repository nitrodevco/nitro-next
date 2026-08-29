import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `poll_answer_entity` of PollAnswerCheckboxInputLayout - pass real rows through its `items…` slot. */
export interface PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps {
    captionPollAnswerEntityText?: string;
    layout?: BoxLayout;
    onPollAnswerCheckbox?: () => void;
    onPollAnswerEntity?: () => void;
    visiblePollAnswerCheckbox?: boolean;
    visiblePollAnswerEntityText?: boolean;
}

export const PollAnswerCheckboxInputLayoutPollAnswerEntityItem = ({ captionPollAnswerEntityText, layout, onPollAnswerCheckbox, onPollAnswerEntity, visiblePollAnswerCheckbox, visiblePollAnswerEntityText }: PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps) => {
    return (
        <Region
            name="poll_answer_entity"
            onPointerTap={onPollAnswerEntity}
            cursor="pointer"
            layout={{ width: 365, height: 32, flexShrink: 0, ...layout }}
        >
            {(visiblePollAnswerCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="poll_answer_checkbox"
                    onPointerTap={onPollAnswerCheckbox}
                    layout={{ position: 'absolute', left: 7, width: 20, top: 5, height: 16 }}
                />
            )}
            {(visiblePollAnswerEntityText ?? true) && (
                <Region
                    name="poll_answer_entity_text"
                    layout={{ position: 'absolute', left: 24, width: 341, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPollAnswerEntityText ?? 'yksi%20kaksi%20kolme%20nelj%E4%20viisi%20kuu%20usi%20seit%20sem%E4n%20kahde%20ksan%20yhde%20ks%E4n%20yksi%20toi'}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 341 }}
                    />
                </Region>
            )}
        </Region>
    );
};
