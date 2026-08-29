import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, CheckBox, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1708_club_buy_confirmation_xml` (layout "purchase_confirmation", 369x210) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyConfirmationLayoutProps {
    captionEndDate?: string;
    captionSubscriptionName?: string;
    disclaimer?: ClubBuyConfirmationLayoutDisclaimerProps;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onSelectButton?: () => void;
    purchaseCostBox?: ClubBuyConfirmationLayoutPurchaseCostBoxProps;
}

export const ClubBuyConfirmationLayout = ({ captionEndDate, captionSubscriptionName, disclaimer, layout, onCancelButton, onClose, onSelectButton, purchaseCostBox }: ClubBuyConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('catalog.club.buy.confirm')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 369, height: 210, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 10 }}>
                    <Region layout={{ width: 354, height: 97, flexShrink: 0 }}>
                        <Icon
                            variant="18"
                            name="icon"
                            layout={{ position: 'absolute', left: 12, width: 85, top: 20, height: 40 }}
                        />
                        <Region layout={{ position: 'absolute', left: 109, top: 10, flexDirection: 'column', gap: 3 }}>
                            <Region
                                name="subscription_name"
                                layout={{ width: 245, flexShrink: 0, minWidth: 245, maxWidth: 245, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionSubscriptionName ?? t('catalog.vip.buy.confirm.product')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 245 }}
                                />
                            </Region>
                            <Region
                                name="end_date"
                                layout={{ width: 207, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionEndDate ?? t('catalog.vip.buy.confirm.end_date')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 207 }}
                                />
                            </Region>
                            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                                <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <ThemeText
                                        text={t('catalog.purchase.confirmation.dialog.cost')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <ClubBuyConfirmationLayoutPurchaseCostBox {...purchaseCostBox} />
                            </Region>
                        </Region>
                    </Region>
                    <ClubBuyConfirmationLayoutDisclaimer {...disclaimer} />
                    <Region layout={{ width: 355, height: 27, flexShrink: 0 }}>
                        <Button
                            variant="3"
                            name="cancel_button"
                            onPointerTap={onCancelButton}
                            layout={{ position: 'absolute', left: 9, width: 120, bottom: 0, height: 27, minWidth: 120, maxWidth: 120, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('cancel')}
                        </Button>
                        <ButtonThick
                            variant="5"
                            name="select_button"
                            tintColor="#00aa00"
                            onPointerTap={onSelectButton}
                            layout={{ position: 'absolute', right: 0, width: 120, bottom: 0, height: 27, minWidth: 120, maxWidth: 120, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.club.buy.subscribe')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `purchase_cost_box` of ClubBuyConfirmationLayout - configured through the parent's `purchaseCostBox` prop. */
export interface ClubBuyConfirmationLayoutPurchaseCostBoxProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ClubBuyConfirmationLayoutPurchaseCostBox = ({ layout, tags }: ClubBuyConfirmationLayoutPurchaseCostBoxProps) => {
    return (
        <Region
            name="purchase_cost_box"
            tags={tags}
            layout={{ width: 20, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `disclaimer` of ClubBuyConfirmationLayout - configured through the parent's `disclaimer` prop. */
export interface ClubBuyConfirmationLayoutDisclaimerProps {
    layout?: BoxLayout;
    onSpendingDisclaimer?: () => void;
    tags?: string[];
}

export const ClubBuyConfirmationLayoutDisclaimer = ({ layout, onSpendingDisclaimer, tags }: ClubBuyConfirmationLayoutDisclaimerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer"
            tags={tags}
            layout={{ width: 353, height: 17, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 31, width: 322, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('disclaimer.credit_spending')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 322 }}
                />
            </Region>
            <CheckBox
                variant="3"
                name="spending_disclaimer"
                onPointerTap={onSpendingDisclaimer}
                layout={{ position: 'absolute', left: 11, width: 342, top: 0, height: 16 }}
            />
        </Region>
    );
};
