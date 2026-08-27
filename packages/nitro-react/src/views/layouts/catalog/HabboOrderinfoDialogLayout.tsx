import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1608_habbo_orderinfo_dialog_xml` (layout "habbo_orderinfo_dialog", 284x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoDialogLayoutProps {
    itemsOrderItemList?: ReactNode;
    layout?: BoxLayout;
}

export const HabboOrderinfoDialogLayout = ({ itemsOrderItemList, layout }: HabboOrderinfoDialogLayoutProps) => {
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
                        {itemsOrderItemList ?? (
                            <>
                                <HabboOrderinfoDialogLayoutInfoContainerItem />
                                <HabboOrderinfoDialogLayoutButtonContainerItem />
                            </>
                        )}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `infoContainer` of HabboOrderinfoDialogLayout - pass real rows through its `items…` slot. */
export interface HabboOrderinfoDialogLayoutInfoContainerItemProps {
    captionHabboOrderinfoTextA?: string;
    captionHabboOrderinfoTextB?: string;
    captionHabboOrderinfoTextC?: string;
    layout?: BoxLayout;
}

export const HabboOrderinfoDialogLayoutInfoContainerItem = ({ captionHabboOrderinfoTextA, captionHabboOrderinfoTextB, captionHabboOrderinfoTextC, layout }: HabboOrderinfoDialogLayoutInfoContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="infoContainer"
            params={16}
            layout={{ width: 284, height: 80, flexShrink: 0, ...layout }}
        >
            <Region
                name="habbo_orderinfo_text_a"
                params={16}
                layout={{ position: 'absolute', left: 16, width: 250, top: 14, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabboOrderinfoTextA ?? t('catalog.purchase.confirmation.dialog.costs')}
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
                    text={captionHabboOrderinfoTextB ?? t('catalog.purchase.confirmation.dialog.amount')}
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
                    text={captionHabboOrderinfoTextC ?? t('catalog.purchase.confirmation.dialog.remaining')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `buttonContainer` of HabboOrderinfoDialogLayout - pass real rows through its `items…` slot. */
export interface HabboOrderinfoDialogLayoutButtonContainerItemProps {
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onButtonOk?: () => void;
}

export const HabboOrderinfoDialogLayoutButtonContainerItem = ({ layout, onButtonCancel, onButtonOk }: HabboOrderinfoDialogLayoutButtonContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttonContainer"
            params={16}
            layout={{ width: 281, height: 34, flexShrink: 0, ...layout }}
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
    );
};
