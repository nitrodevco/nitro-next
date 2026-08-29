import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2664_header_xml` (layout "habbo_window_layout_header", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLayoutProps {
    headerContainer?: HeaderLayoutHeaderContainerProps;
    layout?: BoxLayout;
}

export const HeaderLayout = ({ headerContainer, layout }: HeaderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 15, ...layout }}>
            <HeaderLayoutHeaderContainer
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...headerContainer}
            />
        </Region>
    );
};

/** Named region `header_container` of HeaderLayout - configured through the parent's `headerContainer` prop. */
export interface HeaderLayoutHeaderContainerProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonMenu?: () => void;
    tags?: string[];
}

export const HeaderLayoutHeaderContainer = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onHeaderButtonMenu, tags }: HeaderLayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                layout={{ position: 'absolute', marginLeft: -40, marginRight: 40, width: 12, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-frame-title"
                />
            </Region>
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
                layout={{ position: 'absolute', right: 0, width: 15, top: 0, height: 15, flexDirection: 'row' }}
            >
                <CloseButton
                    name="header_button_close"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'close', 'FIT:closeWindow' ]}
                    onPointerTap={onHeaderButtonClose}
                    layout={{ width: 15, height: 15, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
