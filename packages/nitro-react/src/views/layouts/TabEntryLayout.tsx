import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3098_tab_entry_xml` (layout "tab_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabEntryLayoutProps {
    layout?: BoxLayout;
}

export const TabEntryLayout = ({ layout }: TabEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="tab"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="tab_bg_sel"
                    params={145}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="tab_bg_unsel"
                    params={145}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="tab_bg_hilite"
                    params={145}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="tab_bg_next"
                    params={145}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="prev"
                    params={208}
                    src={undefined}
                    layout={{ position: 'absolute', left: 11, width: 10, top: 7, height: 10 }}
                />
                <ThemeImage
                    name="next"
                    params={208}
                    src={undefined}
                    layout={{ position: 'absolute', left: 11, width: 10, top: 7, height: 10 }}
                />
                <ThemeImage
                    name="face"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 32, top: -19, height: 72 }}
                />
            </Region>
        </Region>
    );
};
