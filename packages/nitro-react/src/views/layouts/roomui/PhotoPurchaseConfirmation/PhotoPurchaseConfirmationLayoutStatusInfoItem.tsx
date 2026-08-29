import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `status_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutStatusInfoItemProps {
    captionStatusInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutStatusInfoItem = ({ captionStatusInfo, layout }: PhotoPurchaseConfirmationLayoutStatusInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_info"
            layout={{ width: 320, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionStatusInfo ?? t('camera.purchase.pleasewait')}
                textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
            />
        </Region>
    );
};
