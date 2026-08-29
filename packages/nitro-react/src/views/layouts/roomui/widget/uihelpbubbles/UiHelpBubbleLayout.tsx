import { BoxLayout, Bubble, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1036_ui_help_bubble_xml` (layout "ui_help_bubble", 180x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UiHelpBubbleLayoutProps {
    layout?: BoxLayout;
    masterContainer?: UiHelpBubbleLayoutMasterContainerProps;
}

export const UiHelpBubbleLayout = ({ layout, masterContainer }: UiHelpBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 500, ...layout }}>
            <UiHelpBubbleLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};

/** Named region `profile_region` of UiHelpBubbleLayout - configured through the parent's `profileRegion` prop. */
export interface UiHelpBubbleLayoutProfileRegionProps {
    captionHelpBubbleText?: string;
    layout?: BoxLayout;
    onProfileRegion?: () => void;
}

export const UiHelpBubbleLayoutProfileRegion = ({ captionHelpBubbleText, layout, onProfileRegion }: UiHelpBubbleLayoutProfileRegionProps) => {
    return (
        <Region
            name="profile_region"
            onPointerTap={onProfileRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: 18, top: 2, bottom: 58, maxWidth: 200, ...layout }}
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
    );
};

/** Named region `master_container` of UiHelpBubbleLayout - configured through the parent's `masterContainer` prop. */
export interface UiHelpBubbleLayoutMasterContainerProps {
    layout?: BoxLayout;
    onHelpBubbleBtnOk?: () => void;
    profileRegion?: UiHelpBubbleLayoutProfileRegionProps;
    visibleBubble?: boolean;
}

export const UiHelpBubbleLayoutMasterContainer = ({ layout, onHelpBubbleBtnOk, profileRegion, visibleBubble }: UiHelpBubbleLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            layout={{ position: 'absolute', right: 0, width: 180, top: 0, height: 500, maxWidth: 180, ...layout }}
        >
            <Bubble
                variant="7"
                name="bubble"
                visible={visibleBubble ?? true}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 200, justifyContent: 'center' }}
            >
                <UiHelpBubbleLayoutProfileRegion {...profileRegion} />
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
        </Region>
    );
};
