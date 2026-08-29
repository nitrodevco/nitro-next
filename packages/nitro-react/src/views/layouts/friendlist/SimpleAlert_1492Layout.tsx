import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1492_simple_alert_xml` (layout "simple_alert", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleAlert_1492LayoutProps {
    captionBodyText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const SimpleAlert_1492Layout = ({ captionBodyText, layout, onClose, onOk }: SimpleAlert_1492LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="alert_%203"
            name="alert_%203"
            caption="PH Caption"
            onClose={onClose}
            layout={{ width: 161, height: 157, minWidth: 161, minHeight: 157, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Border
                    variant="0"
                    name="border"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 0, height: 100 }}
                >
                    <Region
                        name="body_text"
                        layout={{ position: 'absolute', left: 5, right: 5, top: 0, height: 140, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBodyText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 140 }}
                        />
                    </Region>
                </Border>
                <Button
                    variant="0"
                    name="ok"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 60, bottom: -9, height: 21, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.ok')}
                </Button>
            </Region>
        </Frame>
    );
};
