import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `competition_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionNameItemProps {
    captionCompetitionName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCompetitionNameItem = ({ captionCompetitionName, layout }: PhotoPurchaseConfirmationLayoutCompetitionNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCompetitionName ?? t('camera.competition.header')}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 191 }}
            name="competition_name"
            verticalAlign="top"
            layout={{ width: 191, flexShrink: 0, maxWidth: 191, ...layout }}
        />
    );
};
