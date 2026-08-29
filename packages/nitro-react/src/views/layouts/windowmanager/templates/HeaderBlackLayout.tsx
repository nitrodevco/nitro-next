import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2833_header_black_xml` (layout "habbo_window_layout_header_black", 100x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderBlackLayoutProps {
    headerContainer?: HeaderBlackLayoutHeaderContainerProps;
    layout?: BoxLayout;
}

export const HeaderBlackLayout = ({ headerContainer, layout }: HeaderBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 15, ...layout }}>
            <HeaderBlackLayoutHeaderContainer
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...headerContainer}
            />
        </Region>
    );
};

/** Named region `header_container` of HeaderBlackLayout - configured through the parent's `headerContainer` prop. */
export interface HeaderBlackLayoutHeaderContainerProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    tags?: string[];
}

export const HeaderBlackLayoutHeaderContainer = ({ captionHeaderTitleText, layout, onHeaderButtonClose, tags }: HeaderBlackLayoutHeaderContainerProps) => {
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
                backgroundColor="#4b4b4b"
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-frame-title"
                />
            </Region>
            <Region
                tags={[ '_EXCLUDE', '_INTERNAL', '_COLORIZE', '_CONTROLS' ]}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', right: 0, width: 15, top: 0, height: 15, flexDirection: 'row' }}
            >
                <CloseButton
                    name="header_button_close"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                    onPointerTap={onHeaderButtonClose}
                    layout={{ width: 15, height: 15, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
