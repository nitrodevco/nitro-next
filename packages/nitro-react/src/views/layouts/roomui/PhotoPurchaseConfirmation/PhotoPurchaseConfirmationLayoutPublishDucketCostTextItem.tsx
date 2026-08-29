import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `publish_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps {
    captionPublishDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem = ({ captionPublishDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps) => {
    return (
        <Region
            name="publish_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishDucketCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
