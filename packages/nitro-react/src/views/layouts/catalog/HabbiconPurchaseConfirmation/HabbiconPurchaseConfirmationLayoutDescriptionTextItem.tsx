import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description_text` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutDescriptionTextItemProps {
    captionDescriptionText?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutDescriptionTextItem = ({ captionDescriptionText, layout }: HabbiconPurchaseConfirmationLayoutDescriptionTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDescriptionText ?? t('habbicon_purchase.confirm.habbicon.desc')}
            textStyle="text-style-u-regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="description_text"
            verticalAlign="top"
            layout={{ width: 197, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
