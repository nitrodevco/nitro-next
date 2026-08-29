import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Region, ThemeText } from '#base/theme';

/** Generated from `1636_purchaseButtons_xml` (layout "purchaseButtons", 175x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurchaseButtonsLayoutProps {
    captionPurchaseLabel?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onGiftButton?: () => void;
}

export const PurchaseButtonsLayout = ({ captionPurchaseLabel, layout, onBuyButton, onGiftButton }: PurchaseButtonsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 175, height: 52, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 52 }}>
                <Region
                    name="default_buttons"
                    layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 51 }}
                >
                    <ContainerButton
                        variant="3"
                        name="buy_button"
                        tintColor="#00aa00"
                        onPointerTap={onBuyButton}
                        layout={{ position: 'absolute', left: 5, width: 160, top: 0, height: 24, minWidth: 160, maxWidth: 160, minHeight: 24, maxHeight: 24, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPurchaseLabel ?? t('catalog.purchase_confirmation.buy')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                    <Button
                        variant="3"
                        name="gift_button"
                        onPointerTap={onGiftButton}
                        layout={{ position: 'absolute', left: 5, width: 160, top: 28, height: 22, minWidth: 160, maxWidth: 160, minHeight: 22, maxHeight: 22 }}
                    >
                        {t('catalog.purchase_confirmation.gift')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
