import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `publish_detailed_explanation` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItemProps {
    captionPublishDetailedExplanation?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem = ({ captionPublishDetailedExplanation, layout }: PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_detailed_explanation"
            layout={{ width: 191, height: 34, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishDetailedExplanation ?? t('camera.publish.detailed.explanation')}
                textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};
