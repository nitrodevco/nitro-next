import { BoxLayout, Region } from '#base/theme';

/** Generated from `110_QuestEntry_xml` (layout "QuestEntry", 135x122) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestEntryLayoutProps {
    entryContainer?: QuestEntryLayoutEntryContainerProps;
    layout?: BoxLayout;
}

export const QuestEntryLayout = ({ entryContainer, layout }: QuestEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 135, height: 122, ...layout }}>
            <QuestEntryLayoutEntryContainer {...entryContainer} />
        </Region>
    );
};

/** Named region `entry_container` of QuestEntryLayout - configured through the parent's `entryContainer` prop. */
export interface QuestEntryLayoutEntryContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const QuestEntryLayoutEntryContainer = ({ layout, tags }: QuestEntryLayoutEntryContainerProps) => {
    return (
        <Region
            name="entry_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 122, ...layout }}
        />
    );
};
