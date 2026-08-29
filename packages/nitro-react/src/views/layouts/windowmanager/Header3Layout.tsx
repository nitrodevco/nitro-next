import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `2611_header_3_xml` (layout "habbo_window_layout_header_3", 64x33) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Header3LayoutProps {
    headerContainer?: Header3LayoutHeaderContainerProps;
    layout?: BoxLayout;
}

export const Header3Layout = ({ headerContainer, layout }: Header3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 64, height: 33, ...layout }}>
            <Header3LayoutHeaderContainer {...headerContainer} />
        </Region>
    );
};

/** Named region `header_container` of Header3Layout - configured through the parent's `headerContainer` prop. */
export interface Header3LayoutHeaderContainerProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonHelp?: () => void;
}

export const Header3LayoutHeaderContainer = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onHeaderButtonHelp }: Header3LayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            tags={[ '_EXCLUDE', '_INTERNAL' ]}
            params={2147483824}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 33, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_title_text"
                tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                params={2147483856}
                layout={{ position: 'absolute', marginLeft: -22, marginRight: 22, width: 12, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-u-frame-title"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                tags={[ '_EXCLUDE', '_INTERNAL', '_COLORIZE', '_CONTROLS' ]}
                params={262224}
                layout={{ position: 'absolute', right: -1, width: 45, top: 2, height: 20, flexDirection: 'row', gap: 5 }}
            >
                <CloseButton
                    variant="4"
                    name="header_button_help"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'help' ]}
                    params={17}
                    onPointerTap={onHeaderButtonHelp}
                    layout={{ width: 19, height: 20, flexShrink: 0 }}
                />
                <CloseButton
                    variant="3"
                    name="header_button_close"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                    params={17}
                    onPointerTap={onHeaderButtonClose}
                    layout={{ width: 21, height: 20, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
