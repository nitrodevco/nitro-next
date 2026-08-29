import { BoxLayout, RadioButton, Region } from '#base/theme';

/** Row template `answer_list` of HabboWayQuizLayout - pass real rows through its `items…` slot. */
export interface HabboWayQuizLayoutAnswerListItemProps {
    layout?: BoxLayout;
    onRadiobutton?: () => void;
}

export const HabboWayQuizLayoutAnswerListItem = ({ layout, onRadiobutton }: HabboWayQuizLayoutAnswerListItemProps) => {
    return (
        <Region
            name="answer_list"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            <RadioButton
                variant="100"
                onPointerTap={onRadiobutton}
                layout={{ width: 318, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
            >
                answer
            </RadioButton>
        </Region>
    );
};
