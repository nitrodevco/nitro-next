import { BoxLayout, CloseButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2896_welcome_screen_xml` (layout "navigator_highlighter", 251x87) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeScreenLayoutProps {
    captionText?: string;
    layout?: BoxLayout;
    onClick?: () => void;
    onClose?: () => void;
    onFrame?: () => void;
    srcArrow?: string;
    srcArrowRight?: string;
}

export const WelcomeScreenLayout = ({ captionText, layout, onClick, onClose, onFrame, srcArrow, srcArrowRight }: WelcomeScreenLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 251, height: 87, ...layout }}>
            <Region
                name="welcome_screen"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Frame
                    variant="0"
                    id="frame"
                    name="frame"
                    caption="title"
                    tintColor="#418db0"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 9, right: 12, top: 0, bottom: 0 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <CloseButton
                            variant="0"
                            name="close"
                            onPointerTap={onClose}
                            layout={{ position: 'absolute', right: 0, width: 18, top: 4, height: 18 }}
                        />
                        <Region
                            name="click"
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 189, top: 8, bottom: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            onPointerTap={onClick}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionText ?? 'welcome.scjkh kjh kjh kjh kjh kjh kjh kjhkjh kj hkj hkjhreen.message'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 189 }}
                            />
                        </Region>
                    </Region>
                </Frame>
                <ThemeImage
                    name="arrow"
                    src={srcArrow ?? layoutImage('common_welcome_screen_arrow.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 14, height: 20 }}
                />
                <ThemeImage
                    name="arrow_right"
                    src={srcArrowRight ?? layoutImage('common_welcome_screen_arrow.png')}
                    layout={{ position: 'absolute', right: 3, width: 12, top: 14, height: 20 }}
                />
            </Region>
        </Region>
    );
};
