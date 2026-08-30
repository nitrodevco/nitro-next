import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `infoContainer` of HabboOrderinfoDialogLayout - pass real rows through its `items…` slot. */
export interface HabboOrderinfoDialogLayoutInfoContainerItemProps {
    captionHabboOrderinfoTextA?: string;
    captionHabboOrderinfoTextB?: string;
    captionHabboOrderinfoTextC?: string;
    layout?: BoxLayout;
    visibleHabboOrderinfoTextA?: boolean;
    visibleHabboOrderinfoTextB?: boolean;
    visibleHabboOrderinfoTextC?: boolean;
}

export const HabboOrderinfoDialogLayoutInfoContainerItem = ({ captionHabboOrderinfoTextA, captionHabboOrderinfoTextB, captionHabboOrderinfoTextC, layout, visibleHabboOrderinfoTextA, visibleHabboOrderinfoTextB, visibleHabboOrderinfoTextC }: HabboOrderinfoDialogLayoutInfoContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="infoContainer"
            layout={{ width: 284, height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleHabboOrderinfoTextA ?? true) && (
                <ThemeText
                    text={captionHabboOrderinfoTextA ?? t('catalog.purchase.confirmation.dialog.costs')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    name="habbo_orderinfo_text_a"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 250, top: 14, height: 15 }}
                />
            )}
            {(visibleHabboOrderinfoTextB ?? true) && (
                <ThemeText
                    text={captionHabboOrderinfoTextB ?? t('catalog.purchase.confirmation.dialog.amount')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    name="habbo_orderinfo_text_b"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 250, top: 34, height: 15 }}
                />
            )}
            {(visibleHabboOrderinfoTextC ?? true) && (
                <ThemeText
                    text={captionHabboOrderinfoTextC ?? t('catalog.purchase.confirmation.dialog.remaining')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    name="habbo_orderinfo_text_c"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 250, top: 54, height: 26 }}
                />
            )}
        </Region>
    );
};
