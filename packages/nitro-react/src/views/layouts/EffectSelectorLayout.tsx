import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `994_effect_selector_xml` (layout "effect_selector", 280x270) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectSelectorLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const EffectSelectorLayout = ({ layout, onClose }: EffectSelectorLayoutProps) => {
    return (
        <Frame
            variant="3"
            params={110593}
            caption="Show effect on avatar"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 280, height: 270, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2224}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 4, width: 256, top: 17, height: 215 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, width: 256, top: 17, height: 215 }}
                >
                    <Region
                        name="effect_list"
                        params={2224}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            name="0"
                            params={145}
                            layout={{ width: 256, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="None"
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    </Region>
                </ScrollArea>
            </Region>
        </Frame>
    );
};
