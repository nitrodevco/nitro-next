import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1642_purchaseWidgetBuyVipStub_xml` (layout "purchaseWidgetBuyVipStub", 360x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurchaseWidgetBuyVipStubLayoutProps {
    captionCtlgWidgetGetClubText?: string;
    layout?: BoxLayout;
    onCtlgBuyClubButton?: () => void;
}

export const PurchaseWidgetBuyVipStubLayout = ({ captionCtlgWidgetGetClubText, layout, onCtlgBuyClubButton }: PurchaseWidgetBuyVipStubLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 30, ...layout }}>
            <Region
                name="purchaseWidgetBuyVipStub"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    tintColor="#969696"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Icon
                    variant="12"
                    layout={{ position: 'absolute', left: 4, width: 20, top: 10, height: 10 }}
                />
                <ThemeText
                    text={captionCtlgWidgetGetClubText ?? t('catalog.buy.widget.get.vip.to.unlock.this.product')}
                    name="ctlg_widget_get_club_text"
                    layout={{ position: 'absolute', left: 23, width: 275, top: 6, height: 17 }}
                />
                <ButtonThick
                    variant="3"
                    name="ctlg_buy_club_button"
                    onPointerTap={onCtlgBuyClubButton}
                    layout={{ position: 'absolute', left: 233, right: 5, top: 3, height: 24, maxWidth: 122 }}
                >
                    {t('catalog.buy.widget.get.vip.button')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
