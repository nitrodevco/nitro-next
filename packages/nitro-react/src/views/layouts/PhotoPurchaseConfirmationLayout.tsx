import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1060_photo_purchase_confirmation_xml` (layout "photo_purchase_confirmation", 340x686) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PhotoPurchaseConfirmationLayoutProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCancelButton?: () => void;
    onClose?: () => void;
    onCompetitionButton?: () => void;
    onInventoryLink?: () => void;
    onPublishButton?: () => void;
    onPublishLink?: () => void;
    onSpendingDisclaimer?: () => void;
}

export const PhotoPurchaseConfirmationLayout = ({ layout, onBuyButton, onCancelButton, onClose, onCompetitionButton, onInventoryLink, onPublishButton, onPublishLink, onSpendingDisclaimer }: PhotoPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={164097}
            caption={t('camera.confirm_phase.title')}
            tintColor="#555555"
            onClose={onClose}
            layout={{ width: 340, height: 686, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="contentlist"
                    params={12732432}
                    layout={{ position: 'absolute', left: 10, width: 325, top: 39, height: 640, flexDirection: 'column', gap: 6 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 320, height: 320, flexShrink: 0 }}
                    >
                        <Region
                            name="image_bg"
                            params={16}
                            backgroundColor="#cccccc"
                            layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                        />
                        <Region
                            name="loadingText"
                            params={786640}
                            layout={{ position: 'absolute', left: 33, width: 255, top: 130, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('camera.loading')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                        <ThemeImage
                            name="product_image"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                        />
                    </Region>
                    <Region
                        name="status_info"
                        params={16}
                        layout={{ width: 320, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('camera.purchase.pleasewait')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                        />
                    </Region>
                    <Border
                        variant="2"
                        name="competition_wrapper"
                        params={147472}
                        tintColor="#4d1725"
                        layout={{ width: 316, height: 62, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55 }}
                    >
                        <Region
                            name="properties_itemlist"
                            params={8388624}
                            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 58, flexDirection: 'column', gap: 2 }}
                        >
                            <Region
                                name="competition_name"
                                params={8536080}
                                layout={{ width: 191, height: 19, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('camera.competition.header')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 191 }}
                                />
                            </Region>
                            <Region
                                name="competition_info"
                                params={8536080}
                                layout={{ width: 190, height: 37, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('camera.competition.info')}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 190 }}
                                />
                            </Region>
                        </Region>
                        <Button
                            variant="5"
                            name="competition_button"
                            params={394257}
                            tintColor="#00aa00"
                            onPointerTap={onCompetitionButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 199, width: 110, top: 28, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('generic.submit')}
                        </Button>
                    </Border>
                    <Border
                        variant="2"
                        name="purchase_wrapper"
                        params={147472}
                        tintColor="#c7c6bf"
                        layout={{ width: 316, height: 55, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55 }}
                    >
                        <Region
                            name="properties_itemlist"
                            params={16}
                            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 43, flexDirection: 'column', gap: 2 }}
                        >
                            <Region
                                name="product_name"
                                params={8536080}
                                layout={{ width: 191, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('camera.purchase.header')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
                                />
                            </Region>
                            <Region
                                name="quantity"
                                params={8536080}
                                visible={false}
                                layout={{ width: 41, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="X 123"
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="price_area"
                                params={147472}
                                layout={{ width: 336, height: 22, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="cost_info"
                                    params={16}
                                    layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('catalog.purchase.confirmation.dialog.cost')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="purchase_credit_cost_text"
                                    params={147472}
                                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                />
                                <Icon
                                    variant="34"
                                    name="credit_icon"
                                    params={16}
                                    layout={{ width: 30, height: 30, flexShrink: 0 }}
                                />
                                <Region
                                    name="purchase_ducket_cost_text"
                                    params={147472}
                                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                />
                                <Icon
                                    variant="32"
                                    name="ducket_icon"
                                    params={16}
                                    layout={{ width: 30, height: 30, flexShrink: 0 }}
                                />
                            </Region>
                            <Region
                                name="inventory_link_area"
                                params={147472}
                                visible={false}
                                layout={{ width: 319, height: 25, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="purchase_count_info"
                                    params={16}
                                    layout={{ width: 188, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('camera.purchase.count.info')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="purchase_count"
                                    params={147472}
                                    layout={{ width: 11, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="inventory_link"
                                    params={1}
                                    layout={{ width: 120, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    onPointerTap={onInventoryLink}
                                    cursor="pointer"
                                >
                                    <ThemeText text={t('camera.open.inventory')} />
                                </Region>
                            </Region>
                        </Region>
                        <Button
                            variant="5"
                            name="buy_button"
                            params={394257}
                            tintColor="#00aa00"
                            onPointerTap={onBuyButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 199, width: 110, top: 20, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.purchase_confirmation.buy')}
                        </Button>
                    </Border>
                    <Border
                        variant="2"
                        name="publish_wrapper"
                        params={147472}
                        tintColor="#c7c6bf"
                        layout={{ width: 316, height: 83, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 83 }}
                    >
                        <Region
                            name="publish_area_itemlist"
                            params={8388624}
                            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 75, flexDirection: 'column' }}
                        >
                            <Region
                                name="publish_explanation"
                                params={8536080}
                                layout={{ width: 300, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('camera.publish.explanation')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                                />
                            </Region>
                            <Region
                                name="publish_detailed_explanation"
                                params={147472}
                                layout={{ width: 191, height: 34, flexShrink: 0, maxWidth: 191, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('camera.publish.detailed.explanation')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
                                />
                            </Region>
                            <Region
                                name="publish_price_area"
                                params={147472}
                                layout={{ width: 302, height: 22, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="publish_cost_info"
                                    params={16}
                                    layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('catalog.purchase.confirmation.dialog.cost')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="publish_ducket_cost_text"
                                    params={147472}
                                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                />
                                <Icon
                                    variant="32"
                                    name="publish_ducket_icon"
                                    params={16}
                                    layout={{ width: 30, height: 30, flexShrink: 0 }}
                                />
                            </Region>
                            <Region
                                name="publish_link_area"
                                params={147472}
                                visible={false}
                                layout={{ width: 140, height: 25, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="publish_link"
                                    params={1}
                                    layout={{ width: 140, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    onPointerTap={onPublishLink}
                                    cursor="pointer"
                                >
                                    <ThemeText text={t('camera.link.to.published')} />
                                </Region>
                            </Region>
                        </Region>
                        <Button
                            variant="5"
                            name="publish_button"
                            params={393361}
                            tintColor="#00aa00"
                            onPointerTap={onPublishButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 199, width: 110, top: 50, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('camera.publish.button.text')}
                        </Button>
                    </Border>
                    <Region
                        name="bad_photo_removal_disclaimer"
                        params={147472}
                        layout={{ width: 320, height: 17, flexShrink: 0 }}
                    >
                        <Region
                            name="removal_disclaimer"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('camera.warning.disclaimer')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="disclaimer"
                        params={147472}
                        layout={{ width: 311, height: 17, flexShrink: 0 }}
                    >
                        <Region
                            name="spending_disclaimer_text"
                            params={16}
                            layout={{ position: 'absolute', left: 33, width: 278, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('disclaimer.credit_spending')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                            />
                        </Region>
                        <CheckBox
                            variant="3"
                            name="spending_disclaimer"
                            params={17}
                            onPointerTap={onSpendingDisclaimer}
                            layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
                        />
                    </Region>
                    <Region
                        name="buttons"
                        params={16}
                        layout={{ width: 325, height: 27, flexShrink: 0 }}
                    >
                        <Button
                            variant="3"
                            name="cancel_button"
                            params={132113}
                            onPointerTap={onCancelButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.purchase_confirmation.cancel')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
