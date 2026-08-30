import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `question` of HabboWayQuizLayout - pass real rows through its `items…` slot. */
export interface HabboWayQuizLayoutQuestionItemProps {
    captionQuestion?: string;
    layout?: BoxLayout;
}

export const HabboWayQuizLayoutQuestionItem = ({ captionQuestion, layout }: HabboWayQuizLayoutQuestionItemProps) => {
    return (
        <ThemeText
            text={captionQuestion ?? 'question'}
            textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 339 }}
            name="question"
            verticalAlign="top"
            layout={{ width: 339, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
