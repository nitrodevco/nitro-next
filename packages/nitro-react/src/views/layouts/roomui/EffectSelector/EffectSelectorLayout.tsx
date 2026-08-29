import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

import { EffectSelectorLayout_0Item } from './EffectSelectorLayout_0Item';

/** Generated from `994_effect_selector_xml` (layout "effect_selector", 280x270) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectSelectorLayoutProps {
    itemsEffectList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const EffectSelectorLayout = ({ itemsEffectList, layout, onClose }: EffectSelectorLayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="Show effect on avatar"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 280, height: 270, ...layout }}
        >
            <Region
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 4, right: 20, top: 17, bottom: 38 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 4, right: 20, top: 17, bottom: 38 }}
            >
                <Region
                    name="effect_list"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsEffectList ?? (
                        <EffectSelectorLayout_0Item />
                    )}
                </Region>
            </ScrollArea>
        </Frame>
    );
};
