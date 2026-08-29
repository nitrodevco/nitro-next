import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `publish_link` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishLinkItemProps {
    captionPublishLink?: string;
    layout?: BoxLayout;
    onPublishLink?: () => void;
}

export const PhotoPurchaseConfirmationLayoutPublishLinkItem = ({ captionPublishLink, layout, onPublishLink }: PhotoPurchaseConfirmationLayoutPublishLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_link"
            layout={{ width: 140, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onPublishLink}
            cursor="pointer"
        >
            {captionPublishLink ?? t('camera.link.to.published')}
        </Region>
    );
};
