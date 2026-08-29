import { BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `2638_illumina_purple_frame_xml` (layout "illumina_purple_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleFrameLayoutProps {
    captionHeaderTitleText?: string;
    contentArea?: IlluminaPurpleFrameLayoutContentAreaProps;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    titlebar?: IlluminaPurpleFrameLayoutTitlebarProps;
}

export const IlluminaPurpleFrameLayout = ({ captionHeaderTitleText, contentArea, layout, onHeaderButtonClose, titlebar }: IlluminaPurpleFrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', width: 50, height: 50, ...layout }}
        >
            <IlluminaPurpleFrameLayoutContentArea {...contentArea} />
            <IlluminaPurpleFrameLayoutTitlebar {...titlebar} />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-il-frame-title"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <CloseButton
                variant="103"
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

/** Named region `content_area` of IlluminaPurpleFrameLayout - configured through the parent's `contentArea` prop. */
export interface IlluminaPurpleFrameLayoutContentAreaProps {
    layout?: BoxLayout;
}

export const IlluminaPurpleFrameLayoutContentArea = ({ layout }: IlluminaPurpleFrameLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1, ...layout }}
        />
    );
};

/** Named region `titlebar` of IlluminaPurpleFrameLayout - configured through the parent's `titlebar` prop. */
export interface IlluminaPurpleFrameLayoutTitlebarProps {
    layout?: BoxLayout;
    onTitlebar?: () => void;
}

export const IlluminaPurpleFrameLayoutTitlebar = ({ layout, onTitlebar }: IlluminaPurpleFrameLayoutTitlebarProps) => {
    return (
        <Region
            name="titlebar"
            onPointerTap={onTitlebar}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, ...layout }}
        />
    );
};
