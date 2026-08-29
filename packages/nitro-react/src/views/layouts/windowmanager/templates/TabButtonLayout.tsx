import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1793_tab_button_xml` (layout "habbo_window_layout_tab_button", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButtonLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TabButtonLayout = ({ captionTitle, layout }: TabButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 22 }}
            />
            <Region
                name="title"
                tags={[ 'title', 'TAB_BUTTON_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? ''}
                    textStyle="text-style-button-tab"
                    textOptions={{ fill: '#000000' }}
                />
            </Region>
        </Region>
    );
};
