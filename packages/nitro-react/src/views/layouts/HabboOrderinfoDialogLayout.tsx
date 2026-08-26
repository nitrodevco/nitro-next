import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1608_habbo_orderinfo_dialog_xml` (layout "habbo_orderinfo_dialog", 284x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoDialogLayoutProps {
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onButtonOk?: () => void;
}

export const HabboOrderinfoDialogLayout = ({ layout, onButtonCancel, onButtonOk }: HabboOrderinfoDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 284, height: 149, ...layout }}>
            <Region
                name="habbo_orderinfo_dialog"
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 149 }}
            >
                <Border
                    variant="0"
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 149 }}
                >
                    <Region
                        name="orderItemList"
                        params={131088}
                        layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 149, flexDirection: 'column' }}
                    >
                        <Region
                            name="infoContainer"
                            params={16}
                            layout={{ width: 284, height: 80, flexShrink: 0 }}
                        >
                            <Region
                                name="habbo_orderinfo_text_a"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 250, top: 14, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.costs')}
                                    textStyle="text-style-u-small"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                                />
                            </Region>
                            <Region
                                name="habbo_orderinfo_text_b"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 250, top: 34, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.amount')}
                                    textStyle="text-style-u-small"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                                />
                            </Region>
                            <Region
                                name="habbo_orderinfo_text_c"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 250, top: 54, height: 26, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.remaining')}
                                    textStyle="text-style-u-small"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="buttonContainer"
                            params={16}
                            layout={{ width: 281, height: 34, flexShrink: 0 }}
                        >
                            <Button
                                variant="3"
                                name="button_cancel"
                                params={393361}
                                onPointerTap={onButtonCancel}
                                layout={{ position: 'absolute', left: 151, width: 56, top: 3, height: 22, maxWidth: 130 }}
                            >
                                {t('generic.cancel')}
                            </Button>
                            <Button
                                variant="3"
                                name="button_ok"
                                params={131217}
                                onPointerTap={onButtonOk}
                                layout={{ position: 'absolute', left: 80, width: 35, top: 3, height: 22, maxWidth: 130 }}
                            >
                                {t('generic.ok')}
                            </Button>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
