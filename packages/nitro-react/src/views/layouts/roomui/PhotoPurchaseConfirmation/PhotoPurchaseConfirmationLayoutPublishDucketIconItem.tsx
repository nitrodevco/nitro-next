import { BoxLayout, Icon } from '#base/theme';

/** Row template `publish_ducket_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDucketIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDucketIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutPublishDucketIconItemProps) => {
    return (
        <Icon
            variant="32"
            name="publish_ducket_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
