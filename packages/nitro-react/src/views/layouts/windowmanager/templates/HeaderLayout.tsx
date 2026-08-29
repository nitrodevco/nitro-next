import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2664_header_xml` (layout "habbo_window_layout_header", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLayoutProps {
    caption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderButtonMenu?: () => void;
}

export const HeaderLayout = ({ caption, layout, onClose, onHeaderButtonMenu }: HeaderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', minWidth: 100, minHeight: 15, ...layout }}>
            <Region
                name="header_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="header_title_text"
                    layout={{ position: 'absolute', marginLeft: -40, marginRight: 40, width: 12, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={caption ?? ''}
                        textStyle="text-style-frame-title"
                    />
                </Region>
                <CloseButton
                    variant="5"
                    name="header_button_menu"
                    onPointerTap={onHeaderButtonMenu}
                    layout={{ position: 'absolute', left: 1, width: 15, top: 0, height: 15 }}
                />
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
