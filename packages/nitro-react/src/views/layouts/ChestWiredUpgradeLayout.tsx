import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1129_chest_wired_upgrade_xml` (layout "chest_wired_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestWiredUpgradeLayoutProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCancelButton?: () => void;
    onClose?: () => void;
}

export const ChestWiredUpgradeLayout = ({ layout, onBuyButton, onCancelButton, onClose }: ChestWiredUpgradeLayoutProps) => {
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
                            <ThemeImage
                                name="wired_icon"
                                params={16}
                                src="${image.library.url}catalogue/icon_80.png"
                                layout={{ position: 'absolute', left: 89, width: 30, top: 7, height: 30 }}
                            />
                        </Border>
                        <Region
                            name="properties_itemlist"
                            params={144}
                            layout={{ position: 'absolute', left: 143, width: 197, top: 15, height: 67, flexDirection: 'column', gap: 4 }}
                        >
                            <Region
                                name="product_name"
                                params={16528}
                                layout={{ width: 197, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('wiredchests.upgrade.wired.info')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                            <Region
                                name="warning"
                                params={1}
                                layout={{ width: 197, height: 44, flexShrink: 0, minWidth: 197, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('wiredchests.big_fat_warning')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={16400}
                            layout={{ position: 'absolute', left: 142, width: 307, top: 137, height: 22, flexDirection: 'row' }}
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
                                name="free"
                                params={16}
                                layout={{ width: 39, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.upgrade.wired.cost')} />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="error_text"
                        params={16}
                        layout={{ width: 327, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Purchase not possible: A starters chest can not be upgraded to a Wired Chest."
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
