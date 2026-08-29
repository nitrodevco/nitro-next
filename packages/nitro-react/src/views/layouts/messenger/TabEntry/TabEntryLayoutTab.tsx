import { BoxLayout, Region, ThemeImage } from '#base/theme';

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
    tintFace?: string;
    tintNext?: string;
    tintPrev?: string;
    tintTabBgHilite?: string;
    tintTabBgNext?: string;
    tintTabBgSel?: string;
    tintTabBgUnsel?: string;
}

export const TabEntryLayoutTab = ({ layout, onTab, srcFace, srcNext, srcPrev, srcTabBgHilite, srcTabBgNext, srcTabBgSel, srcTabBgUnsel, tintFace, tintNext, tintPrev, tintTabBgHilite, tintTabBgNext, tintTabBgSel, tintTabBgUnsel }: TabEntryLayoutTabProps) => {
    return (
        <Region
            name="tab"
            onPointerTap={onTab}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="tab_bg_sel"
                src={srcTabBgSel}
                tint={tintTabBgSel}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_unsel"
                src={srcTabBgUnsel}
                tint={tintTabBgUnsel}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_hilite"
                src={srcTabBgHilite}
                tint={tintTabBgHilite}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="tab_bg_next"
                src={srcTabBgNext}
                tint={tintTabBgNext}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <ThemeImage
                name="prev"
                src={srcPrev}
                tint={tintPrev}
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 10, top: 7, height: 10 }}
            />
            <ThemeImage
                name="next"
                src={srcNext}
                tint={tintNext}
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 10, top: 7, height: 10 }}
            />
            <ThemeImage
                name="face"
                src={srcFace}
                tint={tintFace}
                layout={{ position: 'absolute', left: 0, width: 32, top: -19, height: 72 }}
            />
        </Region>
    );
};
