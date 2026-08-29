import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `bad_photo_removal_disclaimer` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItemProps {
    captionRemovalDisclaimer?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem = ({ captionRemovalDisclaimer, layout }: PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bad_photo_removal_disclaimer"
            layout={{ width: 320, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRemovalDisclaimer ?? t('camera.warning.disclaimer')}
                textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
            />
        </Region>
    );
};
