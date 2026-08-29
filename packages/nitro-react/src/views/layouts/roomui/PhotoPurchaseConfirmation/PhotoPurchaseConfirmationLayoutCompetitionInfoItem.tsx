import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `competition_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionInfoItemProps {
    captionCompetitionInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCompetitionInfoItem = ({ captionCompetitionInfo, layout }: PhotoPurchaseConfirmationLayoutCompetitionInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="competition_info"
            layout={{ width: 190, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCompetitionInfo ?? t('camera.competition.info')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};
