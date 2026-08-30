import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, ThemeText } from '#base/theme';

/** Generated from `953_boygirl_xml` (layout "boygirl", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BoygirlLayoutProps {
    layout?: BoxLayout;
    onBoy?: () => void;
    onClose?: () => void;
    onGirl?: () => void;
}

export const BoygirlLayout = ({ layout, onBoy, onClose, onGirl }: BoygirlLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            caption={t('widget.furni.clothingchange.gender.title')}
            tintColor="#3d3d3d"
            onClose={onClose}
            layout={{ width: 308, height: 151, minWidth: 308, minHeight: 151, ...layout }}
        >
            <Border
                variant="0"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9 }}
            >
                <Button
                    variant="0"
                    name="Boy"
                    onPointerTap={onBoy}
                    layout={{ position: 'absolute', right: 177, width: 100, bottom: 15, height: 22, minWidth: 100 }}
                >
                    {t('widget.furni.clothingchange.gender.male')}
                </Button>
                <Button
                    variant="0"
                    name="Girl"
                    onPointerTap={onGirl}
                    layout={{ position: 'absolute', right: 22, width: 100, bottom: 15, height: 22, minWidth: 100 }}
                >
                    {t('widget.furni.clothingchange.gender.female')}
                </Button>
                <ThemeText
                    text={t('widget.furni.clothingchange.gender.info')}
                    textOptions={{ fill: '#000000' }}
                    layout={{ position: 'absolute', left: 20, width: 254, top: 16, height: 42 }}
                />
            </Border>
        </Frame>
    );
};
