import { Border, BoxLayout, CloseButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2363_illumina_light_frame_wired_xml` (layout "illumina_light_frame_wired", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameWiredLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonMenu?: () => void;
    srcBannerLeft?: string;
    srcBannerRight?: string;
}

export const IlluminaLightFrameWiredLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onHeaderButtonMenu, srcBannerLeft, srcBannerRight }: IlluminaLightFrameWiredLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
            <Region
                name="wired_banner"
                tags={[ '_EXCLUDE', '_INTERNAL', 'wired_header_bg' ]}
                params={144}
                layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 0 }}
            >
                <ThemeImage
                    name="banner_left"
                    params={16}
                    src={srcBannerLeft ?? layoutImage('illumina_wired_bg_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 160 }}
                />
                <Border
                    variant="3"
                    name="banner_darkening"
                    params={2192}
                    tintColor="#000000"
                    blend={0.1}
                    layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 138 }}
                />
                <ThemeImage
                    name="banner_right"
                    params={80}
                    src={srcBannerRight ?? layoutImage('illumina_wired_bg_right.png')}
                    layout={{ position: 'absolute', left: -192, width: 240, top: -19, height: 160 }}
                />
            </Region>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 1, width: 48, top: 30, height: 19 }}
            />
            <Region
                name="titlebar"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 30 }}
            />
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 8, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-il-frame-title"
                />
            </Region>
            <CloseButton
                variant="101"
                name="header_button_menu"
                tags={[ '_EXCLUDE', '_INTERNAL', 'menu' ]}
                onPointerTap={onHeaderButtonMenu}
                layout={{ position: 'absolute', left: 8, width: 20, top: 9, height: 20 }}
            />
            <CloseButton
                variant="100"
                name="header_button_close"
                tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', left: 22, width: 20, top: 9, height: 20 }}
            />
        </Region>
    );
};
