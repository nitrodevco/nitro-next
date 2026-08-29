import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutStampPurchasingContainer, CollectibleHubLayoutStampPurchasingContainerProps } from './CollectibleHubLayoutStampPurchasingContainer';

/** Named region `category_footer` of CollectibleHubLayout - configured through the parent's `categoryFooter` prop. */
export interface CollectibleHubLayoutCategoryFooterProps {
    captionNoWalletText?: string;
    layout?: BoxLayout;
    onCreateWalletButton?: () => void;
    onMoreInfoButton?: () => void;
    stampPurchasingContainer?: CollectibleHubLayoutStampPurchasingContainerProps;
    visibleNoWalletContainer?: boolean;
}

export const CollectibleHubLayoutCategoryFooter = ({ captionNoWalletText, layout, onCreateWalletButton, onMoreInfoButton, stampPurchasingContainer, visibleNoWalletContainer }: CollectibleHubLayoutCategoryFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_footer"
            layout={{ position: 'absolute', left: 0, width: 488, top: 330, height: 100, overflow: 'hidden', ...layout }}
        >
            <Border
                variant="3"
                name="large_border"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <CollectibleHubLayoutStampPurchasingContainer {...stampPurchasingContainer} />
                {(visibleNoWalletContainer ?? false) && (
                    <Region
                        name="no_wallet_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Region
                            name="no_wallet_text"
                            layout={{ position: 'absolute', left: 10, width: 360, alignSelf: 'center', marginTop: -41.5, marginBottom: 41.5, height: 17, minHeight: 0, maxHeight: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNoWalletText ?? t('shop.minting.no_wallet.description')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                            />
                        </Region>
                        <ThemeImage
                            src={layoutImage('image_connection_problem.png')}
                            layout={{ position: 'absolute', left: 380, width: 92, top: 5, height: 90 }}
                        />
                        <Button
                            variant="5"
                            name="create_wallet_button"
                            tintColor="#2095d4"
                            onPointerTap={onCreateWalletButton}
                            layout={{ position: 'absolute', left: 10, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                        >
                            {t('shop.minting.create.wallet')}
                        </Button>
                        <Button
                            variant="5"
                            name="more_info_button"
                            tintColor="#2095d4"
                            onPointerTap={onMoreInfoButton}
                            layout={{ position: 'absolute', left: 192, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                        >
                            {t('shop.minting.link.wallet')}
                        </Button>
                    </Region>
                )}
            </Border>
        </Region>
    );
};
