import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2833_header_black_xml` (layout "habbo_window_layout_header_black", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderBlackLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const HeaderBlackLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: HeaderBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 15, ...layout }}>
            <Region
                name="header_container"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={2147483824}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15 }}
            >
                <Region
                    name="header_title_text"
                    tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                    params={2147483856}
                    layout={{ position: 'absolute', left: 4, width: 12, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#4b4b4b"
                >
                    <ThemeText
                        text={captionHeaderTitleText ?? ''}
                        textStyle="text-style-frame-title"
                    />
                </Region>
                <Region
                    tags={[ '_EXCLUDE', '_INTERNAL', '_COLORIZE', '_CONTROLS' ]}
                    params={80}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', right: 0, width: 15, top: 0, height: 15, flexDirection: 'row' }}
                >
                    <CloseButton
                        name="header_button_close"
                        tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                        params={17}
                        onPointerTap={onHeaderButtonClose}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
