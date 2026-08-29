import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2833_header_black_xml` (layout "habbo_window_layout_header_black", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderBlackLayoutProps {
    caption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HeaderBlackLayout = ({ caption, layout, onClose }: HeaderBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', minWidth: 100, minHeight: 15, ...layout }}>
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
                        text={caption ?? ''}
                        textStyle="text-style-frame-title"
                    />
                </Region>
                <Region
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', right: 0, width: 15, top: 0, bottom: 0, flexDirection: 'row' }}
                >
                    <CloseButton
                        name="header_button_close"
                        onPointerTap={onClose}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
