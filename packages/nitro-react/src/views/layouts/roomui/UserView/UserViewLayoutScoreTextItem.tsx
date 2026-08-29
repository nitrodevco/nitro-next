import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `score_text` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreTextItemProps {
    captionScoreText?: string;
    layout?: BoxLayout;
    visibleScoreText?: boolean;
}

export const UserViewLayoutScoreTextItem = ({ captionScoreText, layout, visibleScoreText }: UserViewLayoutScoreTextItemProps) => {
    const t = useTranslation();

    return (
        (visibleScoreText ?? false) && (
            <Region
                name="score_text"
                layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionScoreText ?? t('infostand.text.achievement_score')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        )
    );
};
