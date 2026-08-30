import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `publish_explanation` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishExplanationItemProps {
    captionPublishExplanation?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishExplanationItem = ({ captionPublishExplanation, layout }: PhotoPurchaseConfirmationLayoutPublishExplanationItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPublishExplanation ?? t('camera.publish.explanation')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            name="publish_explanation"
            verticalAlign="top"
            layout={{ width: 300, flexShrink: 0, ...layout }}
        />
    );
};
