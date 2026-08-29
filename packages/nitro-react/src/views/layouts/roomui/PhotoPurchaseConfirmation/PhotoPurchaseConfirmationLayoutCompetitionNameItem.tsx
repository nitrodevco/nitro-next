import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `competition_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionNameItemProps {
    captionCompetitionName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCompetitionNameItem = ({ captionCompetitionName, layout }: PhotoPurchaseConfirmationLayoutCompetitionNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="competition_name"
            layout={{ width: 191, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCompetitionName ?? t('camera.competition.header')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};
