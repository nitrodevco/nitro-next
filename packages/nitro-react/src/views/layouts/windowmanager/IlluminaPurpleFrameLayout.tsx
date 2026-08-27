import { BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `2638_illumina_purple_frame_xml` (layout "illumina_purple_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleFrameLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const IlluminaPurpleFrameLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: IlluminaPurpleFrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', width: 50, height: 50, ...layout }}
        >
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                params={12585104}
                layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1 }}
            />
            <Region
                name="titlebar"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={401}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                params={2147483664}
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
                tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                params={81}
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 9, height: 20 }}
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
