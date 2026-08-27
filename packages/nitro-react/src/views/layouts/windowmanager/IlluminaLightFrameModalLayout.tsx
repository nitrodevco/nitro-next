import { Border, BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `2792_illumina_light_frame_modal_xml` (layout "illumina_light_frame_modal", 50x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameModalLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onTitlebar?: () => void;
}

export const IlluminaLightFrameModalLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onTitlebar }: IlluminaLightFrameModalLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.75, blur: 80 }}
            layout={{ position: 'relative', width: 50, height: 80, ...layout }}
        >
            <Border
                variant="101"
                tags={[ '_INTERNAL', '_EXCLUDE' ]}
                params={2192}
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 0 }}
            />
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                params={12585104}
                layout={{ position: 'absolute', left: 1, right: 1, top: 70, bottom: -9 }}
            />
            <Region
                name="titlebar"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={401}
                onPointerTap={onTitlebar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, height: 30 }}
            />
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                params={2147483664}
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
                params={81}
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 49, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                tags={[ '_SCALER', '_EXCLUDE', '_INTERNAL' ]}
                params={1200}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10 }}
            />
        </Region>
    );
};
