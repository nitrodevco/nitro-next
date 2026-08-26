import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1605_habbicon_purchase_confirmation_xml` (layout "habbicon_purchase_confirmation", 353x296) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconPurchaseConfirmationLayoutProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onConfirmButton?: () => void;
}

export const HabbiconPurchaseConfirmationLayout = ({ layout, onCancelButton, onClose, onConfirmButton }: HabbiconPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('habbicon_purchase.confirm.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 296, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={8405136}
                    layout={{ position: 'absolute', left: 0, width: 351, top: 8, height: 250, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="top_body"
                        params={144}
                        layout={{ width: 349, height: 164, flexShrink: 0 }}
                    >
                        <Border
                            variant="0"
                            name="preview_panel"
                            params={16}
                            tintColor="#f6f1df"
                            layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                        >
                            <Border
                                variant="0"
                                name="preview_frame"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 86, top: 19, height: 86 }}
                            >
                                <ThemeImage
                                    name="product_image"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 23, width: 40, top: 23, height: 40 }}
                                />
                            </Border>
                            <Region
                                name="preview_label"
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 110, top: 114, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('habbicons.hud.title')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                                />
                            </Region>
                        </Border>
                        <Region
                            name="properties_itemlist"
                            params={144}
                            layout={{ position: 'absolute', left: 143, width: 197, top: 15, height: 89, flexDirection: 'column', gap: 6 }}
                        >
                            <Region
                                name="product_name"
                                params={16528}
                                layout={{ width: 197, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbicons.hud.title')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Region
                                name="description_text"
                                params={16528}
                                layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbicon_purchase.confirm.habbicon.desc')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Border
                                variant="0"
                                name="receive_row"
                                params={16}
                                tintColor="#f0e8cf"
                                layout={{ width: 197, height: 28, flexShrink: 0 }}
                            >
                                <Region
                                    name="receive_text"
                                    params={16}
                                    layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('habbicon_purchase.confirm.habbicon.progress')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="price_line"
                            params={16400}
                            layout={{ position: 'absolute', left: 144, width: 280, top: 134, height: 22, flexDirection: 'row', gap: 6 }}
                        >
                            <Region
                                name="price_label"
                                params={16}
                                layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.cost')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="price_value"
                                params={16}
                                layout={{ width: 37, height: 22, flexShrink: 0, flexDirection: 'row', gap: 3 }}
                            >
                                <Region
                                    name="price_amount"
                                    params={16}
                                    layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="price_icon"
                                    params={16}
                                    layout={{ width: 22, height: 22, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="value_area"
                        params={144}
                        layout={{ width: 327, height: 39, flexShrink: 0, flexDirection: 'column', gap: 5 }}
                    >
                        <Region
                            name="normal_price_row"
                            params={144}
                            layout={{ width: 327, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="normal_price_label"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbicon_purchase.confirm.normal_price')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="normal_price_amount"
                                params={80}
                                layout={{ position: 'absolute', left: 232, width: 95, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                            >
                                <ThemeText
                                    text="0"
                                    textStyle="text-style-u-regular"
                                    textOptions={{ align: 'right' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="discount_row"
                            params={144}
                            layout={{ width: 327, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="discount_label"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbicon_purchase.confirm.discount')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#5f4c16' }}
                                />
                            </Region>
                            <Region
                                name="discount_amount"
                                params={1040}
                                layout={{ position: 'absolute', left: 232, width: 95, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                            >
                                <ThemeText
                                    text="0"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#5f4c16', align: 'right' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="buttons"
                        params={131216}
                        layout={{ width: 341, height: 27, flexShrink: 0, flexDirection: 'row', gap: 105 }}
                    >
                        <Button
                            variant="3"
                            name="cancel_button"
                            params={131089}
                            onPointerTap={onCancelButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.purchase_confirmation.cancel')}
                        </Button>
                        <ButtonThick
                            variant="5"
                            name="confirm_button"
                            params={131089}
                            tintColor="#00aa00"
                            onPointerTap={onConfirmButton}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.purchase_confirmation.buy')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
