import { BoxLayout, CloseButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2896_welcome_screen_xml` (layout "navigator_highlighter", 251x87) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeScreenLayoutProps {
    layout?: BoxLayout;
    welcomeScreen?: WelcomeScreenLayoutWelcomeScreenProps;
}

export const WelcomeScreenLayout = ({ layout, welcomeScreen }: WelcomeScreenLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 251, height: 87, ...layout }}>
            <WelcomeScreenLayoutWelcomeScreen {...welcomeScreen} />
        </Region>
    );
};

/** Named region `click` of WelcomeScreenLayout - configured through the parent's `click` prop. */
export interface WelcomeScreenLayoutClickProps {
    captionText?: string;
    layout?: BoxLayout;
    onClick?: () => void;
}

export const WelcomeScreenLayoutClick = ({ captionText, layout, onClick }: WelcomeScreenLayoutClickProps) => {
    return (
        <Region
            name="click"
            layout={{ position: 'absolute', left: 14, width: 189, top: 8, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onClick}
            cursor="pointer"
        >
            <ThemeText
                text={captionText ?? 'welcome.scjkh kjh kjh kjh kjh kjh kjh kjhkjh kj hkj hkjhreen.message'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 189 }}
            />
        </Region>
    );
};

/** Named region `welcome_screen` of WelcomeScreenLayout - configured through the parent's `welcomeScreen` prop. */
export interface WelcomeScreenLayoutWelcomeScreenProps {
    click?: WelcomeScreenLayoutClickProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onFrame?: () => void;
    srcArrow?: string;
    srcArrowRight?: string;
}

export const WelcomeScreenLayoutWelcomeScreen = ({ click, layout, onClose, onFrame, srcArrow, srcArrowRight }: WelcomeScreenLayoutWelcomeScreenProps) => {
    return (
        <Region
            name="welcome_screen"
            layout={{ position: 'absolute', left: 0, width: 251, top: 0, height: 87, ...layout }}
        >
            <Frame
                variant="0"
                id="frame"
                name="frame"
                caption="title"
                tintColor="#418db0"
                onClose={onFrame}
                layout={{ position: 'absolute', left: 9, width: 230, top: 0, height: 87 }}
            >
                <CloseButton
                    variant="0"
                    name="close"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 200, width: 18, top: 4, height: 18 }}
                />
                <WelcomeScreenLayoutClick {...click} />
            </Frame>
            <ThemeImage
                name="arrow"
                src={srcArrow ?? layoutImage('common_welcome_screen_arrow.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 14, height: 20 }}
            />
            <ThemeImage
                name="arrow_right"
                src={srcArrowRight ?? layoutImage('common_welcome_screen_arrow.png')}
                layout={{ position: 'absolute', left: 236, width: 12, top: 14, height: 20 }}
            />
        </Region>
    );
};
