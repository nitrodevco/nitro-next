import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1353_marketplace_no_credits_xml` (layout "marketplace_no_credits", 252x153) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceNoCreditsLayoutProps {
    layout?: BoxLayout;
    onCancelNoCreditsButton?: () => void;
    onClose?: () => void;
    onGetCreditsButton?: () => void;
}

export const MarketplaceNoCreditsLayout = ({ layout, onCancelNoCreditsButton, onClose, onGetCreditsButton }: MarketplaceNoCreditsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="out%20of%20credits"
            name="out%20of%20credits"
            params={33025}
            caption={t('inventory.marketplace.no_credits.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 252, height: 153, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 116 }}
                >
                    <Region
                        params={2192}
                        layout={{ position: 'absolute', left: 7, width: 223, top: 12, height: 65, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('inventory.marketplace.no_credits.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 223 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="get_credits_button"
                        params={132113}
                        onPointerTap={onGetCreditsButton}
                        layout={{ position: 'absolute', left: 10, width: 81, top: 82, height: 28, maxWidth: 105 }}
                    >
                        {t('inventory.marketplace.no_credits.get_credits')}
                    </Button>
                    <Button
                        variant="3"
                        name="cancel_no_credits_button"
                        params={394321}
                        onPointerTap={onCancelNoCreditsButton}
                        layout={{ position: 'absolute', left: 180, width: 50, top: 82, height: 28, maxWidth: 105 }}
                    >
                        {t('inventory.marketplace.no_credits.cancel')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
