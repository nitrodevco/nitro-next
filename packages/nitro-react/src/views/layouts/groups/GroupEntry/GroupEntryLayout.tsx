import { BoxLayout, Region } from '#base/theme';

import { GroupEntryLayoutGroupEntryContainer, GroupEntryLayoutGroupEntryContainerProps } from './GroupEntryLayoutGroupEntryContainer';

/** Generated from `1197_group_entry_xml` (layout "Group Entry", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupEntryLayoutProps {
    groupEntryContainer?: GroupEntryLayoutGroupEntryContainerProps;
    layout?: BoxLayout;
}

export const GroupEntryLayout = ({ groupEntryContainer, layout }: GroupEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <GroupEntryLayoutGroupEntryContainer {...groupEntryContainer} />
        </Region>
    );
};
