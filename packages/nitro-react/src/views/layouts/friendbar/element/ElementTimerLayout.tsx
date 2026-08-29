import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `84_element_timer_xml` (layout "element_timer", 149x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementTimerLayoutProps {
    captionTimerCaptionTxt?: string;
    colorableTextColor?: string;
    countdownWidget?: ReactNode;
    layout?: BoxLayout;
}

export const ElementTimerLayout = ({ captionTimerCaptionTxt, colorableTextColor, countdownWidget, layout }: ElementTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 149, height: 56, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="timer_caption_txt"
                    layout={{ position: 'absolute', left: 0, right: 3, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTimerCaptionTxt ?? 'Timer caption ph'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ fill: colorableTextColor, align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    options={{ 'countdown:running': 'true' }}
                    layout={{ position: 'absolute', width: 99, bottom: 0, height: 37 }}
                >
                    {countdownWidget}
                </WidgetSlot>
            </Region>
        </Region>
    );
};
