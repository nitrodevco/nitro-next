import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `1743_header_7_xml` (layout "habbo_window_layout_header_7", 64x33) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Header7LayoutProps {
    headerContainer?: Header7LayoutHeaderContainerProps;
    layout?: BoxLayout;
}

export const Header7Layout = ({ headerContainer, layout }: Header7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 64, height: 33, ...layout }}>
            <Header7LayoutHeaderContainer {...headerContainer} />
        </Region>
    );
};

/** Named region `header_container` of Header7Layout - configured through the parent's `headerContainer` prop. */
export interface Header7LayoutHeaderContainerProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onHeaderButtonHelp?: () => void;
}

export const Header7LayoutHeaderContainer = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onHeaderButtonHelp }: Header7LayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 33, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', marginLeft: -22, marginRight: 22, width: 12, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-u-frame-title"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', right: -1, width: 45, top: 2, height: 20, flexDirection: 'row', gap: 5 }}>
                <CloseButton
                    variant="4"
                    name="header_button_help"
                    onPointerTap={onHeaderButtonHelp}
                    layout={{ width: 19, height: 20, flexShrink: 0 }}
                />
                <CloseButton
                    variant="3"
                    name="header_button_close"
                    onPointerTap={onHeaderButtonClose}
                    layout={{ width: 21, height: 20, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
