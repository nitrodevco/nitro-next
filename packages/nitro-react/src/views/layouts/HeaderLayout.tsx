import { BoxLayout, CloseButton, Region } from '#base/theme';

/** Generated from `2664_header_xml` (layout "habbo_window_layout_header", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLayoutProps {
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonMenu?: () => void;
}

export const HeaderLayout = ({ layout, onHeaderButtonClose, onHeaderButtonMenu }: HeaderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 15, ...layout }}>
            <Region
                name="header_container"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 15 }}
            >
                <Region
                    name="header_title_text"
                    tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                    layout={{ position: 'absolute', left: 4, width: 12, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <CloseButton
                    variant="5"
                    name="header_button_menu"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'menu' ]}
                    onPointerTap={onHeaderButtonMenu}
                    layout={{ position: 'absolute', left: 1, width: 15, top: 0, height: 15 }}
                />
                <Region
                    tags={[ '_EXCLUDE', '_INTERNAL', '_COLORIZE', '_CONTROLS' ]}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 85, width: 15, top: 0, height: 15, flexDirection: 'row' }}
                >
                    <CloseButton
                        name="header_button_close"
                        tags={[ '_EXCLUDE', '_INTERNAL', 'close', 'FIT:closeWindow' ]}
                        onPointerTap={onHeaderButtonClose}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
