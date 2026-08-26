import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Dropmenu, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1180_chest_upgrade_xml` (layout "chest_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestUpgradeLayoutProps {
    layout?: BoxLayout;
    onAmountSelectionDropmenu?: () => void;
    onBuyButton?: () => void;
    onCancelButton?: () => void;
    onClose?: () => void;
}

export const ChestUpgradeLayout = ({ layout, onAmountSelectionDropmenu, onBuyButton, onCancelButton, onClose }: ChestUpgradeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('wiredchests.upgrade.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 287, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={8538256}
                    layout={{ position: 'absolute', left: 0, width: 351, top: 8, height: 241, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        params={144}
                        layout={{ width: 349, height: 164, flexShrink: 0 }}
                    >
                        <Border
                            variant="0"
                            params={16}
                            tintColor="#f1f1f1"
                            layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                        >
                            <ThemeImage
                                name="product_image"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                            />
                        </Border>
                        <Region
                            name="properties_itemlist"
                            params={144}
                            layout={{ position: 'absolute', left: 143, width: 197, top: 15, height: 132, flexDirection: 'column', gap: 4 }}
                        >
                            <Region
                                name="product_name"
                                params={16528}
                                layout={{ width: 197, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('wiredchests.upgrade.capacity.extra')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Region
                                name="current_capacity"
                                params={16528}
                                layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('wiredchests.upgrade.capacity.current')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Region
                                name="new_capacity"
                                params={16528}
                                layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('wiredchests.upgrade.capacity.new')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 276, height: 25, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 213, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('wiredchests.upgrade.capacity.amount')} />
                                </Region>
                                <Dropmenu
                                    variant="3"
                                    name="amount_selection_dropmenu"
                                    params={17}
                                    onPointerTap={onAmountSelectionDropmenu}
                                    layout={{ width: 58, height: 25, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={16400}
                            layout={{ position: 'absolute', left: 142, width: 356, top: 137, height: 22, flexDirection: 'row' }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.cost')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="purchase_cost_box"
                                params={147472}
                                layout={{ width: 88, height: 25, flexShrink: 0 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                                >
                                    <Region
                                        name="price_credits"
                                        params={16}
                                        layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text="0" />
                                    </Region>
                                    <Icon
                                        variant="34"
                                        params={16}
                                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="plus"
                                        params={16}
                                        layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text=" " />
                                    </Region>
                                    <Region
                                        name="price_diamonds"
                                        params={16}
                                        layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text="0" />
                                    </Region>
                                    <Icon
                                        variant="41"
                                        params={16}
                                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="error_text"
                        params={16}
                        layout={{ width: 327, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Purchase not possible: already at maximum chest capacity"
                            textOptions={{ fill: '#c42f3d', wordWrap: true, wordWrapWidth: 327 }}
                        />
                    </Region>
                    <Region
                        name="buttons"
                        params={131216}
                        layout={{ width: 341, height: 27, flexShrink: 0, flexDirection: 'row', gap: 105 }}
                    >
                        <Button
                            variant="3"
                            name="cancel_button"
                            params={132113}
                            onPointerTap={onCancelButton}
                            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                        >
                            {t('catalog.purchase_confirmation.cancel')}
                        </Button>
                        <ButtonThick
                            variant="5"
                            name="buy_button"
                            params={132113}
                            tintColor="#00aa00"
                            onPointerTap={onBuyButton}
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
