import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1685_habbo_orderinfo_nocredits_xml` (layout "habbo_orderinfo_nocredits", 284x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoNocreditsLayoutProps {
    habboOrderinfoNocredits?: HabboOrderinfoNocreditsLayoutHabboOrderinfoNocreditsProps;
    layout?: BoxLayout;
}

export const HabboOrderinfoNocreditsLayout = ({ habboOrderinfoNocredits, layout }: HabboOrderinfoNocreditsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 284, height: 125, ...layout }}>
            <HabboOrderinfoNocreditsLayoutHabboOrderinfoNocredits {...habboOrderinfoNocredits} />
        </Region>
    );
};

/** Named region `habbo_orderinfo_nocredits` of HabboOrderinfoNocreditsLayout - configured through the parent's `habboOrderinfoNocredits` prop. */
export interface HabboOrderinfoNocreditsLayoutHabboOrderinfoNocreditsProps {
    captionHabboMessageTextA?: string;
    captionHabboMessageTextB?: string;
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onNobalanceOk?: () => void;
}

export const HabboOrderinfoNocreditsLayoutHabboOrderinfoNocredits = ({ captionHabboMessageTextA, captionHabboMessageTextB, layout, onButtonCancel, onNobalanceOk }: HabboOrderinfoNocreditsLayoutHabboOrderinfoNocreditsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habbo_orderinfo_nocredits"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 125, ...layout }}
        >
            <Region
                name="habbo_message_text_a"
                params={16}
                layout={{ position: 'absolute', left: 16, width: 250, top: 14, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabboMessageTextA ?? t('shopping_costs')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
            <Region
                name="habbo_message_text_b"
                params={16}
                layout={{ position: 'absolute', left: 16, width: 250, top: 34, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabboMessageTextB ?? t('shopping_nocash')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
            <Button
                variant="3"
                name="nobalance_ok"
                params={393361}
                onPointerTap={onNobalanceOk}
                layout={{ position: 'absolute', left: 77, right: 174, top: 90, height: 22, maxWidth: 80 }}
            >
                {t('ok')}
            </Button>
            <Button
                variant="3"
                name="button_cancel"
                params={393361}
                onPointerTap={onButtonCancel}
                layout={{ position: 'absolute', left: 193, right: 37, top: 90, height: 22, maxWidth: 80 }}
            >
                {t('cancel')}
            </Button>
        </Region>
    );
};
