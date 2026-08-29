import { BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `1803_illumina_dark_frame_xml` (layout "illumina_dark_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkFrameLayoutProps {
    captionHeaderTitleText?: string;
    contentArea?: IlluminaDarkFrameLayoutContentAreaProps;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    titlebar?: IlluminaDarkFrameLayoutTitlebarProps;
}

export const IlluminaDarkFrameLayout = ({ captionHeaderTitleText, contentArea, layout, onHeaderButtonClose, titlebar }: IlluminaDarkFrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', width: 50, height: 50, ...layout }}
        >
            <IlluminaDarkFrameLayoutContentArea {...contentArea} />
            <IlluminaDarkFrameLayoutTitlebar {...titlebar} />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-id-frame-title"
                />
            </Region>
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 9, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', right: -5, width: 20, bottom: 5, height: 10 }}
            />
        </Region>
    );
};

/** Named region `content_area` of IlluminaDarkFrameLayout - configured through the parent's `contentArea` prop. */
export interface IlluminaDarkFrameLayoutContentAreaProps {
    layout?: BoxLayout;
}

export const IlluminaDarkFrameLayoutContentArea = ({ layout }: IlluminaDarkFrameLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1, ...layout }}
        />
    );
};

/** Named region `titlebar` of IlluminaDarkFrameLayout - configured through the parent's `titlebar` prop. */
export interface IlluminaDarkFrameLayoutTitlebarProps {
    layout?: BoxLayout;
    onTitlebar?: () => void;
}

export const IlluminaDarkFrameLayoutTitlebar = ({ layout, onTitlebar }: IlluminaDarkFrameLayoutTitlebarProps) => {
    return (
        <Region
            name="titlebar"
            onPointerTap={onTitlebar}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, ...layout }}
        />
    );
};
