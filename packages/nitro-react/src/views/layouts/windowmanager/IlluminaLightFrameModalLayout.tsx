import { Border, BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2792_illumina_light_frame_modal_xml` (layout "illumina_light_frame_modal", 50x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameModalLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const IlluminaLightFrameModalLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: IlluminaLightFrameModalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 80, ...layout }}>
            <Border
                variant="101"
                tags={[ '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 40 }}
            />
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 1, width: 48, top: 70, height: 19 }}
            />
            <Region
                name="titlebar"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 30 }}
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
                layout={{ position: 'absolute', left: 22, width: 20, top: 49, height: 20 }}
            />
        </Region>
    );
};
