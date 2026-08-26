import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `119_EntryArrows_xml` (layout "EntryArrows", 15x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EntryArrowsLayoutProps {
    layout?: BoxLayout;
}

export const EntryArrowsLayout = ({ layout }: EntryArrowsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 15, height: 25, ...layout }}>
            <Region
                name="entry_arrows_cont"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 25 }}
            >
                <ThemeImage
                    name="arrow_0"
                    params={2192}
                    src="${image.library.questing.url}quest_arrow1.png"
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 25 }}
                />
                <ThemeImage
                    name="arrow_1"
                    params={3280}
                    src="${image.library.questing.url}quest_arrow2.png"
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 25 }}
                />
            </Region>
        </Region>
    );
};
