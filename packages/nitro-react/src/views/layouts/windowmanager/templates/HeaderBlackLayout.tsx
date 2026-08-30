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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="header_title_text"
                    layout={{ position: 'absolute', marginLeft: -40, marginRight: 40, width: 12, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#4b4b4b"
                >
                    <ThemeText
                        text={captionHeaderTitleText ?? ''}
                        textStyle="text-style-frame-title"
                    />
                </Region>
                <Region
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', right: 0, width: 15, top: 0, bottom: 0, flexDirection: 'row' }}
                >
                    <CloseButton
                        name="header_button_close"
                        onPointerTap={onHeaderButtonClose}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
