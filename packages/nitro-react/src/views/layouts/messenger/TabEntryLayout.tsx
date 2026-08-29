import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3098_tab_entry_xml` (layout "tab_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabEntryLayoutProps {
    layout?: BoxLayout;
    tab?: TabEntryLayoutTabProps;
}

export const TabEntryLayout = ({ layout, tab }: TabEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <TabEntryLayoutTab {...tab} />
        </Region>
    );
};

/** Named region `tab` of TabEntryLayout - configured through the parent's `tab` prop. */
export interface TabEntryLayoutTabProps {
    layout?: BoxLayout;
    onTab?: () => void;
    srcFace?: string;
    srcNext?: string;
    srcPrev?: string;
    srcTabBgHilite?: string;
    srcTabBgNext?: string;
    srcTabBgSel?: string;
    srcTabBgUnsel?: string;
}

export const TabEntryLayoutTab = ({ layout, onTab, srcFace, srcNext, srcPrev, srcTabBgHilite, srcTabBgNext, srcTabBgSel, srcTabBgUnsel }: TabEntryLayoutTabProps) => {
    return (
        <Region
            name="tab"
            params={17}
            onPointerTap={onTab}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="tab_bg_sel"
                params={145}
                src={srcTabBgSel}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_unsel"
                params={145}
                src={srcTabBgUnsel}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_hilite"
                params={145}
                src={srcTabBgHilite}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_next"
                params={145}
                src={srcTabBgNext}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="prev"
                params={208}
                src={srcPrev}
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 10, top: 7, height: 10 }}
            />
            <ThemeImage
                name="next"
                params={208}
                src={srcNext}
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 10, top: 7, height: 10 }}
            />
            <ThemeImage
                name="face"
                params={16}
                src={srcFace}
                layout={{ position: 'absolute', left: 0, width: 32, top: -19, height: 72 }}
            />
        </Region>
    );
};
