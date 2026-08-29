import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `stamp_purchasing_container` of CollectibleHubLayout - configured through the parent's `stampPurchasingContainer` prop. */
export interface CollectibleHubLayoutStampPurchasingContainerProps {
    captionMintTokenBalance?: string;
    captionSilverCostText?: string;
    captionStampsHeader?: string;
    captionStampsHeader2?: string;
    layout?: BoxLayout;
    onSilverBuyButton?: () => void;
    onStampsPurchaseDropdown?: () => void;
    spacing?: ReactNode;
    spacing2?: ReactNode;
}

export const CollectibleHubLayoutStampPurchasingContainer = ({ captionMintTokenBalance, captionSilverCostText, captionStampsHeader, captionStampsHeader2, layout, onSilverBuyButton, onStampsPurchaseDropdown, spacing, spacing2 }: CollectibleHubLayoutStampPurchasingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="stamp_purchasing_container"
            layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100, ...layout }}
        >
            <Border
                variant="3"
                name="stamps_container"
                tintColor="#d6dbe1"
                layout={{ position: 'absolute', left: 42, width: 200, top: 14, height: 72 }}
            >
                <ThemeImage
                    src={layoutImage('collectables_icon_curator_stamp_large.png')}
                    layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                />
                <Region
                    name="stamps_header"
                    layout={{ position: 'absolute', left: 68, width: 122, top: 12, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStampsHeader ?? t('shop.minting.tokens')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="mint_token_balance"
                    layout={{ position: 'absolute', left: 67, width: 21, top: 26, height: 37, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMintTokenBalance ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="3"
                name="stamp_buying_container"
                tintColor="#d6dbe1"
                layout={{ position: 'absolute', left: 246, width: 200, top: 14, height: 72 }}
            >
                <Region layout={{ position: 'absolute', right: 4, top: 4, flexDirection: 'row', gap: 6 }}>
                    <Region
                        name="stamps_header"
                        layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionStampsHeader2 ?? t('collectibles.buy.mint.tokens')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    {/* `border` is hidden and has no name to show it by */}
                    <Dropmenu
                        variant="0"
                        name="stamps_purchase_dropdown"
                        onPointerTap={onStampsPurchaseDropdown}
                        layout={{ width: 48, height: 21, flexShrink: 0 }}
                    >
                        100
                    </Dropmenu>
                </Region>
                <Region layout={{ position: 'absolute', right: 4, top: 36, flexDirection: 'row' }}>
                    <Region
                        name="silver_cost_text"
                        layout={{ width: 13, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSilverCostText ?? '1'}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        name="spacing"
                        layout={{ width: 4, height: 30, flexShrink: 0 }}
                    >
                        {spacing}
                    </Region>
                    <ThemeImage
                        src={layoutImage('pursearea_mid_silver_icon.png')}
                        layout={{ width: 24, height: 30, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        layout={{ width: 6, height: 30, flexShrink: 0 }}
                    >
                        {spacing2}
                    </Region>
                    <Button
                        variant="5"
                        name="silver_buy_button"
                        tintColor="#2095d4"
                        onPointerTap={onSilverBuyButton}
                        layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                    >
                        {t('generic.buy')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
