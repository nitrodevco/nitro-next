import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `publish_explanation` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishExplanationItemProps {
    captionPublishExplanation?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishExplanationItem = ({ captionPublishExplanation, layout }: PhotoPurchaseConfirmationLayoutPublishExplanationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_explanation"
            layout={{ width: 300, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishExplanation ?? t('camera.publish.explanation')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};
