import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1052_effects_widget_xml` (layout "effects_widget", 190x85) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectsWidgetLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const EffectsWidgetLayout = ({ captionTitle, layout, onClose }: EffectsWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 85, ...layout }}>
            <Border
                variant="6"
                tintColor="#5b5953"
                layout={{ position: 'absolute', left: 0, width: 190, bottom: 0, height: 85 }}
            >
                <Border
                    variant="3"
                    tintColor="#292929"
                    layout={{ position: 'absolute', left: 5, width: 157, top: 5, height: 22 }}
                />
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 3, width: 184, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('widget.memenu.effects')}
                        textStyle="text-style-u-frame-title"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <CloseButton
                    variant="3"
                    name="close"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 165, width: 20, top: 6, height: 20 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, width: 178, top: 30, height: 48 }}
                >
                    <Region
                        name="list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                <Region
                    name="no_effects"
                    layout={{ position: 'absolute', left: 0, width: 190, top: 30, height: 48 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 190, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('widget.memenu.effects.info')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
