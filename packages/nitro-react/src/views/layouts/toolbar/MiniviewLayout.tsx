import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1261_miniview_xml` (layout "miniview", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MiniviewLayoutProps {
    countdown?: ReactNode;
    layout?: BoxLayout;
}

export const MiniviewLayout = ({ countdown, layout }: MiniviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                name="returnusergifting"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="6"
                    tintColor="#686661"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <WidgetSlot
                        widgetType="countdown"
                        name="countdown"
                        options={{ 'countdown:running': 'true' }}
                        layout={{ position: 'absolute', left: 124, width: 99, top: 3, bottom: -11 }}
                    >
                        {countdown}
                    </WidgetSlot>
                    <Region layout={{ position: 'absolute', left: 10, width: 154, top: 6, bottom: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('next.gift.in')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
