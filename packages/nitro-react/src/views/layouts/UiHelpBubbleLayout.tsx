import { BoxLayout, Bubble, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1036_ui_help_bubble_xml` (layout "ui_help_bubble", 180x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UiHelpBubbleLayoutProps {
    layout?: BoxLayout;
    onHelpBubbleBtnOk?: () => void;
}

export const UiHelpBubbleLayout = ({ layout, onHelpBubbleBtnOk }: UiHelpBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 500, ...layout }}>
            <Region
                name="master_container"
                params={96}
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 500, maxWidth: 180 }}
            >
                <Bubble
                    variant="7"
                    name="bubble"
                    params={2433}
                    layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 500, maxWidth: 200 }}
                >
                    <Region
                        name="profile_region"
                        params={2193}
                        layout={{ position: 'absolute', left: 2, width: 160, top: 2, height: 440, maxWidth: 200 }}
                    >
                        <Region
                            name="help_bubble_text"
                            params={12585104}
                            layout={{ position: 'absolute', left: 0, width: 159, top: 0, height: 437, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Testing Testing!testingdsf"
                                textStyle="text-style-u-bold"
                                textOptions={{ wordWrap: true, wordWrapWidth: 159 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="5"
                        name="help_bubble_btn_ok"
                        params={917713}
                        tintColor="#33cc33"
                        onPointerTap={onHelpBubbleBtnOk}
                        layout={{ position: 'absolute', left: 59, width: 41, top: 441, height: 28 }}
                    >
                        OK
                    </Button>
                </Bubble>
            </Region>
        </Region>
    );
};
