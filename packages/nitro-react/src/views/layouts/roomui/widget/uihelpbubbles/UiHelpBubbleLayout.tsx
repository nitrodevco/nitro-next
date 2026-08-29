import { BoxLayout, Bubble, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1036_ui_help_bubble_xml` (layout "ui_help_bubble", 180x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UiHelpBubbleLayoutProps {
    captionHelpBubbleText?: string;
    layout?: BoxLayout;
    onHelpBubbleBtnOk?: () => void;
    onProfileRegion?: () => void;
    visibleBubble?: boolean;
}

export const UiHelpBubbleLayout = ({ captionHelpBubbleText, layout, onHelpBubbleBtnOk, onProfileRegion, visibleBubble }: UiHelpBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 500, ...layout }}>
            <Region
                name="master_container"
                layout={{ position: 'absolute', right: 0, width: 180, top: 0, height: 500, maxWidth: 180 }}
            >
                {(visibleBubble ?? true) && (
                    <Bubble
                        variant="7"
                        name="bubble"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 200, justifyContent: 'center' }}
                    >
                        <Region
                            name="profile_region"
                            onPointerTap={onProfileRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 2, right: 18, top: 2, bottom: 58, maxWidth: 200 }}
                        >
                            <Region
                                name="help_bubble_text"
                                layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionHelpBubbleText ?? 'Testing Testing!testingdsf'}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true }}
                                />
                            </Region>
                        </Region>
                        <Button
                            variant="5"
                            name="help_bubble_btn_ok"
                            tintColor="#33cc33"
                            onPointerTap={onHelpBubbleBtnOk}
                            layout={{ position: 'absolute', marginLeft: -10.5, marginRight: 10.5, width: 41, top: 441, height: 28 }}
                        >
                            OK
                        </Button>
                    </Bubble>
                )}
            </Region>
        </Region>
    );
};
