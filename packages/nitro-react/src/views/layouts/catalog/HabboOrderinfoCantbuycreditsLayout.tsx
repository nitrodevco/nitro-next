import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1703_habbo_orderinfo_cantbuycredits_xml` (layout "habbo_orderinfo_cantbuycredits", 284x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoCantbuycreditsLayoutProps {
    captionHabboMessageTextA?: string;
    captionHabboMessageTextB?: string;
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onSubscribe?: () => void;
}

export const HabboOrderinfoCantbuycreditsLayout = ({ captionHabboMessageTextA, captionHabboMessageTextB, layout, onButtonCancel, onSubscribe }: HabboOrderinfoCantbuycreditsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 284, height: 125, ...layout }}>
            <Region
                name="habbo_orderinfo_cantbuycredits"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionHabboMessageTextA ?? t('shopping_costs')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    name="habbo_message_text_a"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 250, top: 14, height: 17 }}
                />
                <ThemeText
                    text={captionHabboMessageTextB ?? t('shopping_mustsubscribe')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    name="habbo_message_text_b"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 16, width: 250, top: 34, height: 17 }}
                />
                <Button
                    variant="3"
                    name="subscribe"
                    onPointerTap={onSubscribe}
                    layout={{ position: 'absolute', left: 100, right: 151, top: 89, height: 123, maxWidth: 120 }}
                >
                    {t('ok')}
                </Button>
                <Button
                    variant="3"
                    name="button_cancel"
                    onPointerTap={onButtonCancel}
                    layout={{ position: 'absolute', left: 154, right: 76, top: 92, height: 22, maxWidth: 130 }}
                >
                    {t('cancel')}
                </Button>
            </Region>
        </Region>
    );
};
