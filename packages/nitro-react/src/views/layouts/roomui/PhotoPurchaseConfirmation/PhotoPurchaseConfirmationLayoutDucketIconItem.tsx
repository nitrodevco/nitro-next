import { BoxLayout, Icon } from '#base/theme';

/** Row template `ducket_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutDucketIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutDucketIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutDucketIconItemProps) => {
    return (
        <Icon
            variant="32"
            name="ducket_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
