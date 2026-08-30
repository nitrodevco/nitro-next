import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `disclaimer` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutDisclaimerItemProps {
    layout?: BoxLayout;
    onSpendingDisclaimer?: () => void;
    visibleSpendingDisclaimer?: boolean;
}

export const PurchaseConfirmationLayoutDisclaimerItem = ({ layout, onSpendingDisclaimer, visibleSpendingDisclaimer }: PurchaseConfirmationLayoutDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer"
            layout={{ width: 311, height: 17, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('disclaimer.credit_spending')}
                textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 33, width: 278, top: 0, bottom: 0 }}
            />
            {(visibleSpendingDisclaimer ?? true) && (
                <CheckBox
                    variant="3"
                    name="spending_disclaimer"
                    onPointerTap={onSpendingDisclaimer}
                    layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
                />
            )}
        </Region>
    );
};
