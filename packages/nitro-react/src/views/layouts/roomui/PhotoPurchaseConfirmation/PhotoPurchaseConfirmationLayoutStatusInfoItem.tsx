import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `status_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutStatusInfoItemProps {
    captionStatusInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutStatusInfoItem = ({ captionStatusInfo, layout }: PhotoPurchaseConfirmationLayoutStatusInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionStatusInfo ?? t('camera.purchase.pleasewait')}
            textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
            name="status_info"
            verticalAlign="top"
            layout={{ width: 320, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
