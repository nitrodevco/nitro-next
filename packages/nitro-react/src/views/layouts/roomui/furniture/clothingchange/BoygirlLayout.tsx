import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

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
            params={32768}
            caption={t('widget.furni.clothingchange.gender.title')}
            tintColor="#3d3d3d"
            onClose={onClose}
            layout={{ width: 308, height: 151, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    params={2192}
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', left: 0, width: 296, top: 0, height: 119 }}
                >
                    <Button
                        variant="0"
                        name="Boy"
                        params={1180753}
                        onPointerTap={onBoy}
                        layout={{ position: 'absolute', left: 19, width: 100, top: 82, height: 22, minWidth: 100 }}
                    >
                        {t('widget.furni.clothingchange.gender.male')}
                    </Button>
                    <Button
                        variant="0"
                        name="Girl"
                        params={1442897}
                        onPointerTap={onGirl}
                        layout={{ position: 'absolute', left: 174, width: 100, top: 82, height: 22, minWidth: 100 }}
                    >
                        {t('widget.furni.clothingchange.gender.female')}
                    </Button>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 254, top: 16, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.furni.clothingchange.gender.info')}
                            textOptions={{ fill: '#000000' }}
                        />
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};
