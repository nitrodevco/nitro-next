import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `score_value` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreValueItemProps {
    captionScoreValue?: string;
    layout?: BoxLayout;
    visibleScoreValue?: boolean;
}

export const UserViewLayoutScoreValueItem = ({ captionScoreValue, layout, visibleScoreValue }: UserViewLayoutScoreValueItemProps) => {
    return (
        (visibleScoreValue ?? false) && (
            <ThemeText
                text={captionScoreValue ?? ''}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                name="score_value"
                verticalAlign="top"
                layout={{ width: 170, height: 15, flexShrink: 0, ...layout }}
            />
        )
    );
};
