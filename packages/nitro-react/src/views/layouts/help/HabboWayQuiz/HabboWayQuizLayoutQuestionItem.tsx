import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `question` of HabboWayQuizLayout - pass real rows through its `items…` slot. */
export interface HabboWayQuizLayoutQuestionItemProps {
    captionQuestion?: string;
    layout?: BoxLayout;
}

export const HabboWayQuizLayoutQuestionItem = ({ captionQuestion, layout }: HabboWayQuizLayoutQuestionItemProps) => {
    return (
        <Region
            name="question"
            layout={{ width: 339, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuestion ?? 'question'}
                textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 339 }}
            />
        </Region>
    );
};
