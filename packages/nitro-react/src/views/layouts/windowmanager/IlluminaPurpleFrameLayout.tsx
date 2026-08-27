import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2638_illumina_purple_frame_xml` (layout "illumina_purple_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleFrameLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const IlluminaPurpleFrameLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: IlluminaPurpleFrameLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
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
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <CloseButton
                variant="103"
                name="header_button_close"
                tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', left: 22, width: 20, top: 9, height: 20 }}
            />
        </Region>
    );
};
