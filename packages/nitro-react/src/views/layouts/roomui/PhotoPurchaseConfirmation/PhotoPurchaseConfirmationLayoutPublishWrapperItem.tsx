import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutPublishAreaItemlist, PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps } from './PhotoPurchaseConfirmationLayoutPublishAreaItemlist';

/** Row template `publish_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishWrapperItemProps {
    layout?: BoxLayout;
    onPublishButton?: () => void;
    publishAreaItemlist?: PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps;
    visiblePublishAreaItemlist?: boolean;
    visiblePublishButton?: boolean;
}

export const PhotoPurchaseConfirmationLayoutPublishWrapperItem = ({ layout, onPublishButton, publishAreaItemlist, visiblePublishAreaItemlist, visiblePublishButton }: PhotoPurchaseConfirmationLayoutPublishWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="publish_wrapper"
            tintColor="#c7c6bf"
            layout={{ width: 316, height: 83, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 83, ...layout }}
        >
            {(visiblePublishAreaItemlist ?? true) && (
                <PhotoPurchaseConfirmationLayoutPublishAreaItemlist {...publishAreaItemlist} />
            )}
            {(visiblePublishButton ?? true) && (
                <Button
                    variant="5"
                    name="publish_button"
                    tintColor="#00aa00"
                    onPointerTap={onPublishButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 199, right: 7, top: 50, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                >
                    {t('camera.publish.button.text')}
                </Button>
            )}
        </Border>
    );
};
