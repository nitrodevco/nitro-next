import { BoxLayout, RadioButton, Region, ThemeText } from '#base/theme';

/** Row template `poll_answer_entity` of PollAnswerRadiobuttonInputLayout - pass real rows through its `items…` slot. */
export interface PollAnswerRadiobuttonInputLayoutPollAnswerEntityItemProps {
    captionPollAnswerEntityText?: string;
    layout?: BoxLayout;
    onPollAnswerEntityRadiobutton?: () => void;
    visiblePollAnswerEntityRadiobutton?: boolean;
    visiblePollAnswerEntityText?: boolean;
}

export const PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem = ({ captionPollAnswerEntityText, layout, onPollAnswerEntityRadiobutton, visiblePollAnswerEntityRadiobutton, visiblePollAnswerEntityText }: PollAnswerRadiobuttonInputLayoutPollAnswerEntityItemProps) => {
    return (
        <Region
            name="poll_answer_entity"
            layout={{ width: 365, height: 32, flexShrink: 0, ...layout }}
        >
            {(visiblePollAnswerEntityRadiobutton ?? true) && (
                <RadioButton
                    variant="0"
                    name="poll_answer_entity_radiobutton"
                    onPointerTap={onPollAnswerEntityRadiobutton}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 4, height: 16 }}
                />
            )}
            {(visiblePollAnswerEntityText ?? true) && (
                <ThemeText
                    text={captionPollAnswerEntityText ?? 'yksi%20kaksi%20kolme%20nelj%E4%20viisi%20kuu%20usi%20seit%20sem%E4n%20kahde%20ksan%20yhde%20ks%E4n%20yksi%20toi'}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 341 }}
                    name="poll_answer_entity_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 18, width: 341, top: 2, height: 30 }}
                />
            )}
        </Region>
    );
};
