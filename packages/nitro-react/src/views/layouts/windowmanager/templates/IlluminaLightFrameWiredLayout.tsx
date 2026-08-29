import { Border, BoxLayout, CloseButton, Region, Scaler, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2363_illumina_light_frame_wired_xml` (layout "illumina_light_frame_wired", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameWiredLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonMenu?: () => void;
    onTitlebar?: () => void;
    srcBannerLeft?: string;
    srcBannerRight?: string;
}

export const IlluminaLightFrameWiredLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onHeaderButtonMenu, onTitlebar, srcBannerLeft, srcBannerRight }: IlluminaLightFrameWiredLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', width: 50, height: 50, ...layout }}
        >
            <Region
                name="wired_banner"
                layout={{ position: 'absolute', left: 1, right: 1, top: 1, height: 0 }}
            >
                <ThemeImage
                    name="banner_left"
                    src={srcBannerLeft ?? layoutImage('illumina_wired_bg_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 160 }}
                />
                <Border
                    variant="3"
                    name="banner_darkening"
                    tintColor="#000000"
                    blend={0.1}
                    layout={{ position: 'absolute', left: 0, right: -236, top: 0, height: 138 }}
                />
                <ThemeImage
                    name="banner_right"
                    src={srcBannerRight ?? layoutImage('illumina_wired_bg_right.png')}
                    layout={{ position: 'absolute', right: 0, width: 240, top: -19, height: 160 }}
                />
            </Region>
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1 }}
            />
            <Region
                name="titlebar"
                onPointerTap={onTitlebar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-il-frame-title"
                />
            </Region>
            <CloseButton
                variant="101"
                name="header_button_menu"
                onPointerTap={onHeaderButtonMenu}
                layout={{ position: 'absolute', left: 8, width: 20, top: 9, height: 20 }}
            />
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 9, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10 }}
            />
        </Region>
    );
};
