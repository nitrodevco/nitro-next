import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1060_photo_purchase_confirmation_xml` (layout "photo_purchase_confirmation", 340x686) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PhotoPurchaseConfirmationLayoutProps {
    contentlist?: PhotoPurchaseConfirmationLayoutContentlistProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PhotoPurchaseConfirmationLayout = ({ contentlist, layout, onClose }: PhotoPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('camera.confirm_phase.title')}
            tintColor="#555555"
            onClose={onClose}
            layout={{ width: 340, height: 686, ...layout }}
        >
            <PhotoPurchaseConfirmationLayoutContentlist {...contentlist} />
        </Frame>
    );
};

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

/** Row template `competition_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionNameItemProps {
    captionCompetitionName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCompetitionNameItem = ({ captionCompetitionName, layout }: PhotoPurchaseConfirmationLayoutCompetitionNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="competition_name"
            layout={{ width: 191, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCompetitionName ?? t('camera.competition.header')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};

/** Row template `competition_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionInfoItemProps {
    captionCompetitionInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCompetitionInfoItem = ({ captionCompetitionInfo, layout }: PhotoPurchaseConfirmationLayoutCompetitionInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="competition_info"
            layout={{ width: 190, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCompetitionInfo ?? t('camera.competition.info')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Row template `competition_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionWrapperItemProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    onCompetitionButton?: () => void;
}

export const PhotoPurchaseConfirmationLayoutCompetitionWrapperItem = ({ itemsPropertiesItemlist, layout, onCompetitionButton }: PhotoPurchaseConfirmationLayoutCompetitionWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="competition_wrapper"
            tintColor="#4d1725"
            layout={{ width: 316, height: 62, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55, ...layout }}
        >
            <Region
                name="properties_itemlist"
                layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 58, flexDirection: 'column', gap: 2 }}
            >
                {itemsPropertiesItemlist ?? (
                    <>
                        <PhotoPurchaseConfirmationLayoutCompetitionNameItem />
                        <PhotoPurchaseConfirmationLayoutCompetitionInfoItem />
                    </>
                )}
            </Region>
            <Button
                variant="5"
                name="competition_button"
                tintColor="#00aa00"
                onPointerTap={onCompetitionButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 7, width: 110, bottom: 7, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
            >
                {t('generic.submit')}
            </Button>
        </Border>
    );
};

/** Row template `product_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: PhotoPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            layout={{ width: 191, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('camera.purchase.header')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};

/** Row template `quantity` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
    visibleQuantity?: boolean;
}

export const PhotoPurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout, visibleQuantity }: PhotoPurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        (visibleQuantity ?? false) && (
            <Region
                name="quantity"
                layout={{ width: 41, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionQuantity ?? 'X 123'}
                    textStyle="text-style-u-bold"
                />
            </Region>
        )
    );
};

/** Row template `cost_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCostInfoItemProps {
    captionCostInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCostInfoItem = ({ captionCostInfo, layout }: PhotoPurchaseConfirmationLayoutCostInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cost_info"
            layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCostInfo ?? t('catalog.purchase.confirmation.dialog.cost')}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `purchase_credit_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps {
    captionPurchaseCreditCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem = ({ captionPurchaseCreditCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps) => {
    return (
        <Region
            name="purchase_credit_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseCreditCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `credit_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCreditIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCreditIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutCreditIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="credit_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `purchase_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps {
    captionPurchaseDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem = ({ captionPurchaseDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps) => {
    return (
        <Region
            name="purchase_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseDucketCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `ducket_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutDucketIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutDucketIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutDucketIconItemProps) => {
    return (
        <Icon
            variant="32"
            name="ducket_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `price_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPriceAreaItemProps {
    itemsPriceArea?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPriceAreaItem = ({ itemsPriceArea, layout }: PhotoPurchaseConfirmationLayoutPriceAreaItemProps) => {
    return (
        <Region
            name="price_area"
            layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsPriceArea ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutCostInfoItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem />
                    <PhotoPurchaseConfirmationLayoutCreditIconItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem />
                    <PhotoPurchaseConfirmationLayoutDucketIconItem />
                </>
            )}
        </Region>
    );
};

/** Row template `purchase_count_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCountInfoItemProps {
    captionPurchaseCountInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem = ({ captionPurchaseCountInfo, layout }: PhotoPurchaseConfirmationLayoutPurchaseCountInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="purchase_count_info"
            layout={{ width: 188, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseCountInfo ?? t('camera.purchase.count.info')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `purchase_count` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCountItemProps {
    captionPurchaseCount?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCountItem = ({ captionPurchaseCount, layout }: PhotoPurchaseConfirmationLayoutPurchaseCountItemProps) => {
    return (
        <Region
            name="purchase_count"
            layout={{ width: 11, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseCount ?? '0'}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `inventory_link` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutInventoryLinkItemProps {
    captionInventoryLink?: string;
    layout?: BoxLayout;
    onInventoryLink?: () => void;
}

export const PhotoPurchaseConfirmationLayoutInventoryLinkItem = ({ captionInventoryLink, layout, onInventoryLink }: PhotoPurchaseConfirmationLayoutInventoryLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="inventory_link"
            layout={{ width: 120, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onInventoryLink}
            cursor="pointer"
        >
            <ThemeText text={captionInventoryLink ?? t('camera.open.inventory')} />
        </Region>
    );
};

/** Row template `inventory_link_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutInventoryLinkAreaItemProps {
    itemsInventoryLinkArea?: ReactNode;
    layout?: BoxLayout;
    visibleInventoryLinkArea?: boolean;
}

export const PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem = ({ itemsInventoryLinkArea, layout, visibleInventoryLinkArea }: PhotoPurchaseConfirmationLayoutInventoryLinkAreaItemProps) => {
    return (
        (visibleInventoryLinkArea ?? false) && (
            <Region
                name="inventory_link_area"
                layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsInventoryLinkArea ?? (
                    <>
                        <PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem />
                        <PhotoPurchaseConfirmationLayoutPurchaseCountItem />
                        <PhotoPurchaseConfirmationLayoutInventoryLinkItem />
                    </>
                )}
            </Region>
        )
    );
};

/** Named region `properties_itemlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `propertiesItemlist` prop. */
export interface PhotoPurchaseConfirmationLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout }: PhotoPurchaseConfirmationLayoutPropertiesItemlistProps) => {
    return (
        <Region
            name="properties_itemlist"
            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 43, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutProductNameItem />
                    <PhotoPurchaseConfirmationLayoutQuantityItem />
                    <PhotoPurchaseConfirmationLayoutPriceAreaItem />
                    <PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem />
                </>
            )}
        </Region>
    );
};

/** Row template `purchase_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseWrapperItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    propertiesItemlist?: PhotoPurchaseConfirmationLayoutPropertiesItemlistProps;
}

export const PhotoPurchaseConfirmationLayoutPurchaseWrapperItem = ({ layout, onBuyButton, propertiesItemlist }: PhotoPurchaseConfirmationLayoutPurchaseWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="purchase_wrapper"
            tintColor="#c7c6bf"
            layout={{ width: 316, height: 55, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55, ...layout }}
        >
            <PhotoPurchaseConfirmationLayoutPropertiesItemlist {...propertiesItemlist} />
            <Button
                variant="5"
                name="buy_button"
                tintColor="#00aa00"
                onPointerTap={onBuyButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 7, width: 110, bottom: 8, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
            >
                {t('catalog.purchase_confirmation.buy')}
            </Button>
        </Border>
    );
};

/** Row template `publish_explanation` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishExplanationItemProps {
    captionPublishExplanation?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishExplanationItem = ({ captionPublishExplanation, layout }: PhotoPurchaseConfirmationLayoutPublishExplanationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_explanation"
            layout={{ width: 300, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishExplanation ?? t('camera.publish.explanation')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

/** Row template `publish_detailed_explanation` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItemProps {
    captionPublishDetailedExplanation?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem = ({ captionPublishDetailedExplanation, layout }: PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_detailed_explanation"
            layout={{ width: 191, height: 34, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishDetailedExplanation ?? t('camera.publish.detailed.explanation')}
                textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};

/** Row template `publish_cost_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishCostInfoItemProps {
    captionPublishCostInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishCostInfoItem = ({ captionPublishCostInfo, layout }: PhotoPurchaseConfirmationLayoutPublishCostInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_cost_info"
            layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishCostInfo ?? t('catalog.purchase.confirmation.dialog.cost')}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `publish_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps {
    captionPublishDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem = ({ captionPublishDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPublishDucketCostTextItemProps) => {
    return (
        <Region
            name="publish_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPublishDucketCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `publish_ducket_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishDucketIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishDucketIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutPublishDucketIconItemProps) => {
    return (
        <Icon
            variant="32"
            name="publish_ducket_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `publish_price_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishPriceAreaItemProps {
    itemsPublishPriceArea?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishPriceAreaItem = ({ itemsPublishPriceArea, layout }: PhotoPurchaseConfirmationLayoutPublishPriceAreaItemProps) => {
    return (
        <Region
            name="publish_price_area"
            layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsPublishPriceArea ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutPublishCostInfoItem />
                    <PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem />
                    <PhotoPurchaseConfirmationLayoutPublishDucketIconItem />
                </>
            )}
        </Region>
    );
};

/** Row template `publish_link` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishLinkItemProps {
    captionPublishLink?: string;
    layout?: BoxLayout;
    onPublishLink?: () => void;
}

export const PhotoPurchaseConfirmationLayoutPublishLinkItem = ({ captionPublishLink, layout, onPublishLink }: PhotoPurchaseConfirmationLayoutPublishLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="publish_link"
            layout={{ width: 140, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onPublishLink}
            cursor="pointer"
        >
            <ThemeText text={captionPublishLink ?? t('camera.link.to.published')} />
        </Region>
    );
};

/** Row template `publish_link_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishLinkAreaItemProps {
    itemsPublishLinkArea?: ReactNode;
    layout?: BoxLayout;
    visiblePublishLinkArea?: boolean;
}

export const PhotoPurchaseConfirmationLayoutPublishLinkAreaItem = ({ itemsPublishLinkArea, layout, visiblePublishLinkArea }: PhotoPurchaseConfirmationLayoutPublishLinkAreaItemProps) => {
    return (
        (visiblePublishLinkArea ?? false) && (
            <Region
                name="publish_link_area"
                layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsPublishLinkArea ?? (
                    <PhotoPurchaseConfirmationLayoutPublishLinkItem />
                )}
            </Region>
        )
    );
};

/** Named region `publish_area_itemlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `publishAreaItemlist` prop. */
export interface PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps {
    itemsPublishAreaItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishAreaItemlist = ({ itemsPublishAreaItemlist, layout }: PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps) => {
    return (
        <Region
            name="publish_area_itemlist"
            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 75, flexDirection: 'column', ...layout }}
        >
            {itemsPublishAreaItemlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutPublishExplanationItem />
                    <PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem />
                    <PhotoPurchaseConfirmationLayoutPublishPriceAreaItem />
                    <PhotoPurchaseConfirmationLayoutPublishLinkAreaItem />
                </>
            )}
        </Region>
    );
};

/** Row template `publish_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishWrapperItemProps {
    layout?: BoxLayout;
    onPublishButton?: () => void;
    publishAreaItemlist?: PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps;
}

export const PhotoPurchaseConfirmationLayoutPublishWrapperItem = ({ layout, onPublishButton, publishAreaItemlist }: PhotoPurchaseConfirmationLayoutPublishWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="publish_wrapper"
            tintColor="#c7c6bf"
            layout={{ width: 316, height: 83, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 83, ...layout }}
        >
            <PhotoPurchaseConfirmationLayoutPublishAreaItemlist {...publishAreaItemlist} />
            <Button
                variant="5"
                name="publish_button"
                tintColor="#00aa00"
                onPointerTap={onPublishButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 199, right: 7, top: 50, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
            >
                {t('camera.publish.button.text')}
            </Button>
        </Border>
    );
};

/** Row template `bad_photo_removal_disclaimer` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItemProps {
    captionRemovalDisclaimer?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem = ({ captionRemovalDisclaimer, layout }: PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bad_photo_removal_disclaimer"
            layout={{ width: 320, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRemovalDisclaimer ?? t('camera.warning.disclaimer')}
                textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
            />
        </Region>
    );
};

/** Row template `disclaimer` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutDisclaimerItemProps {
    captionSpendingDisclaimerText?: string;
    layout?: BoxLayout;
    onSpendingDisclaimer?: () => void;
}

export const PhotoPurchaseConfirmationLayoutDisclaimerItem = ({ captionSpendingDisclaimerText, layout, onSpendingDisclaimer }: PhotoPurchaseConfirmationLayoutDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer"
            layout={{ width: 311, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="spending_disclaimer_text"
                layout={{ position: 'absolute', left: 33, width: 278, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSpendingDisclaimerText ?? t('disclaimer.credit_spending')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                />
            </Region>
            <CheckBox
                variant="3"
                name="spending_disclaimer"
                onPointerTap={onSpendingDisclaimer}
                layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `buttons` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutButtonsItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const PhotoPurchaseConfirmationLayoutButtonsItem = ({ layout, onCancelButton }: PhotoPurchaseConfirmationLayoutButtonsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            layout={{ width: 325, height: 27, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="cancel_button"
                onPointerTap={onCancelButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 110, bottom: 0, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
            >
                {t('catalog.purchase_confirmation.cancel')}
            </Button>
        </Region>
    );
};

/** Named region `contentlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `contentlist` prop. */
export interface PhotoPurchaseConfirmationLayoutContentlistProps {
    captionLoadingText?: string;
    itemsContentlist?: ReactNode;
    layout?: BoxLayout;
    srcProductImage?: string;
}

export const PhotoPurchaseConfirmationLayoutContentlist = ({ captionLoadingText, itemsContentlist, layout, srcProductImage }: PhotoPurchaseConfirmationLayoutContentlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="contentlist"
            layout={{ position: 'absolute', left: 10, top: 39, bottom: 7, flexDirection: 'column', gap: 6, ...layout }}
        >
            {itemsContentlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutStatusInfoItem />
                    <PhotoPurchaseConfirmationLayoutCompetitionWrapperItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseWrapperItem />
                    <PhotoPurchaseConfirmationLayoutPublishWrapperItem />
                    <PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem />
                    <PhotoPurchaseConfirmationLayoutDisclaimerItem />
                    <PhotoPurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ width: 320, height: 320, flexShrink: 0, justifyContent: 'center' }}>
                <Region
                    name="image_bg"
                    backgroundColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                />
                <Region
                    name="loadingText"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 255, top: 130, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLoadingText ?? t('camera.loading')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="product_image"
                    src={srcProductImage}
                    layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                />
            </Region>
        </Region>
    );
};
