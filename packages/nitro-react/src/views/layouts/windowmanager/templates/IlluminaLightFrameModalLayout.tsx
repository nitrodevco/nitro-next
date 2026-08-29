import { Border, BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `2792_illumina_light_frame_modal_xml` (layout "illumina_light_frame_modal", 50x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameModalLayoutProps {
    captionHeaderTitleText?: string;
    contentArea?: IlluminaLightFrameModalLayoutContentAreaProps;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    titlebar?: IlluminaLightFrameModalLayoutTitlebarProps;
}

export const IlluminaLightFrameModalLayout = ({ captionHeaderTitleText, contentArea, layout, onHeaderButtonClose, titlebar }: IlluminaLightFrameModalLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.75, blur: 80 }}
            layout={{ position: 'relative', width: 50, height: 80, ...layout }}
        >
            <Border
                variant="101"
                tags={[ '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 0 }}
            />
            <IlluminaLightFrameModalLayoutContentArea
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                {...contentArea}
            />
            <IlluminaLightFrameModalLayoutTitlebar
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...titlebar}
            />
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 8, width: 20, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-il-frame-modal-title"
                />
            </Region>
            <CloseButton
                variant="100"
                name="header_button_close"
                tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 49, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                tags={[ '_SCALER', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `content_area` of IlluminaLightFrameModalLayout - configured through the parent's `contentArea` prop. */
export interface IlluminaLightFrameModalLayoutContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaLightFrameModalLayoutContentArea = ({ layout, tags }: IlluminaLightFrameModalLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={tags}
            layout={{ position: 'absolute', left: 1, right: 1, top: 70, bottom: -9, ...layout }}
        />
    );
};

/** Named region `titlebar` of IlluminaLightFrameModalLayout - configured through the parent's `titlebar` prop. */
export interface IlluminaLightFrameModalLayoutTitlebarProps {
    layout?: BoxLayout;
    onTitlebar?: () => void;
    tags?: string[];
}

export const IlluminaLightFrameModalLayoutTitlebar = ({ layout, onTitlebar, tags }: IlluminaLightFrameModalLayoutTitlebarProps) => {
    return (
        <Region
            name="titlebar"
            tags={tags}
            onPointerTap={onTitlebar}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 40, height: 30, ...layout }}
        />
    );
};
