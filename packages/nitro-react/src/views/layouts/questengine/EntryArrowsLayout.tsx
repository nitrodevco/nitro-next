import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `119_EntryArrows_xml` (layout "EntryArrows", 15x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EntryArrowsLayoutProps {
    entryArrowsCont?: EntryArrowsLayoutEntryArrowsContProps;
    layout?: BoxLayout;
}

export const EntryArrowsLayout = ({ entryArrowsCont, layout }: EntryArrowsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 15, height: 25, ...layout }}>
            <EntryArrowsLayoutEntryArrowsCont {...entryArrowsCont} />
        </Region>
    );
};

/** Named region `entry_arrows_cont` of EntryArrowsLayout - configured through the parent's `entryArrowsCont` prop. */
export interface EntryArrowsLayoutEntryArrowsContProps {
    layout?: BoxLayout;
    srcArrow0?: string;
    srcArrow1?: string;
}

export const EntryArrowsLayoutEntryArrowsCont = ({ layout, srcArrow0, srcArrow1 }: EntryArrowsLayoutEntryArrowsContProps) => {
    return (
        <Region
            name="entry_arrows_cont"
            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 25, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="arrow_0"
                src={srcArrow0 ?? '${image.library.questing.url}quest_arrow1.png'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="arrow_1"
                src={srcArrow1 ?? '${image.library.questing.url}quest_arrow2.png'}
                layout={{ position: 'absolute', width: 15, alignSelf: 'center', height: 25 }}
            />
        </Region>
    );
};
