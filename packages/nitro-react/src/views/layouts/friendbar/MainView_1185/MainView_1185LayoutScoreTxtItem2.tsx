import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `score_txt` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutScoreTxtItem2Props {
    captionScoreTxt?: string;
    layout?: BoxLayout;
}

export const MainView_1185LayoutScoreTxtItem2 = ({ captionScoreTxt, layout }: MainView_1185LayoutScoreTxtItem2Props) => {
    return (
        <ThemeText
            text={captionScoreTxt ?? '7864'}
            name="score_txt"
            layout={{ width: 31, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
