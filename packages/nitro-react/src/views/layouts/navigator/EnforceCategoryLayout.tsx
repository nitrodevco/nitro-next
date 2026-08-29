import { useTranslation } from '#base/context';
import { BoxLayout, Button, Dropmenu, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `3053_enforce_category_xml` (layout "enforce_category", 310x240) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EnforceCategoryLayoutProps {
    layout?: BoxLayout;
    onCategory?: () => void;
    onClose?: () => void;
    onOk?: () => void;
    onTradeMode?: () => void;
}

export const EnforceCategoryLayout = ({ layout, onCategory, onClose, onOk, onTradeMode }: EnforceCategoryLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('enforce.category.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 310, height: 240, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', left: 4, width: 295, top: 4, height: 75, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('enforce.category.body.text.multiline')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                    />
                </Region>
                <Dropmenu
                    variant="3"
                    name="category"
                    onPointerTap={onCategory}
                    layout={{ position: 'absolute', left: 6, width: 279, top: 68, height: 23 }}
                />
                <Region layout={{ position: 'absolute', left: 4, width: 295, top: 96, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('enforce.category.trade.setting')} />
                </Region>
                <Dropmenu
                    variant="3"
                    name="trade_mode"
                    onPointerTap={onTradeMode}
                    layout={{ position: 'absolute', left: 6, width: 279, top: 120, height: 23 }}
                />
                <Button
                    variant="3"
                    name="ok"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 132, top: 158, height: 32 }}
                >
                    {t('enforce.category.ok')}
                </Button>
            </Region>
        </Frame>
    );
};
