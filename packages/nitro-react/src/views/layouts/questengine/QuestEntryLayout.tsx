import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `110_QuestEntry_xml` (layout "QuestEntry", 135x122) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestEntryLayoutProps {
    entryContainer?: ReactNode;
    layout?: BoxLayout;
}

export const QuestEntryLayout = ({ entryContainer, layout }: QuestEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 135, height: 122, ...layout }}>
            <Region
                name="entry_container"
                layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 122 }}
            >
                {entryContainer}
            </Region>
        </Region>
    );
};
