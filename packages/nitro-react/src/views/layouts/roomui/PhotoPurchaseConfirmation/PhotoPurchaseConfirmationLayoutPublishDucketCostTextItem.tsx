import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `publish_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps {
    captionPublishDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem = ({ captionPublishDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps) => {
    return (
        <ThemeText
            text={captionPublishDucketCostText ?? ''}
            textStyle="text-style-u-bold"
            name="publish_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
