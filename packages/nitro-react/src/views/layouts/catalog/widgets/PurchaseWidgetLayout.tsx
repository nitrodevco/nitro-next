import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeText } from '#base/theme';

/** Generated from `1612_purchaseWidget_xml` (layout "purchaseWidget", 360x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurchaseWidgetLayoutProps {
    defaultButtons?: PurchaseWidgetLayoutDefaultButtonsProps;
    layout?: BoxLayout;
}

export const PurchaseWidgetLayout = ({ defaultButtons, layout }: PurchaseWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 30, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}>
                <Border
                    variant="6"
                    name="selection_information"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}
                >
                    <Region layout={{ position: 'absolute', left: 10, width: 341, top: 5, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('catalog.purchase.select.info')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ fill: '#666666', align: 'center' }}
                        />
                    </Region>
                </Border>
                <PurchaseWidgetLayoutDefaultButtons {...defaultButtons} />
            </Region>
        </Region>
    );
};

/** Named region `default_buttons` of PurchaseWidgetLayout - configured through the parent's `defaultButtons` prop. */
export interface PurchaseWidgetLayoutDefaultButtonsProps {
    captionPurchaseLabel?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onGiftButton?: () => void;
    visibleDefaultButtons?: boolean;
}

export const PurchaseWidgetLayoutDefaultButtons = ({ captionPurchaseLabel, layout, onBuyButton, onGiftButton, visibleDefaultButtons }: PurchaseWidgetLayoutDefaultButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="default_buttons"
            visible={visibleDefaultButtons ?? false}
            layout={{ position: 'absolute', left: 0, width: 360, top: 3, height: 25, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="buy_button"
                tintColor="#00aa00"
                onPointerTap={onBuyButton}
                layout={{ position: 'absolute', left: 185, width: 170, top: 0, height: 24, minWidth: 170, maxWidth: 170, minHeight: 24, maxHeight: 24, justifyContent: 'center' }}
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
                layout={{ position: 'absolute', left: 5, width: 170, top: 0, height: 24, minWidth: 170, maxWidth: 170, minHeight: 24, maxHeight: 24 }}
            >
                {t('catalog.purchase_confirmation.gift')}
            </Button>
        </Region>
    );
};
