import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `84_element_timer_xml` (layout "element_timer", 149x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementTimerLayoutProps {
    captionTimerCaptionTxt?: string;
    layout?: BoxLayout;
}

export const ElementTimerLayout = ({ captionTimerCaptionTxt, layout }: ElementTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 149, height: 56, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 56 }}
            >
                <Region
                    name="timer_caption_txt"
                    tags={[ 'COLORABLE' ]}
                    layout={{ position: 'absolute', left: 0, width: 146, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTimerCaptionTxt ?? 'Timer caption ph'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    options={{ 'countdown:running': 'true' }}
                    layout={{ position: 'absolute', left: 25, width: 99, top: 19, height: 37 }}
                />
            </Region>
        </Region>
    );
};
