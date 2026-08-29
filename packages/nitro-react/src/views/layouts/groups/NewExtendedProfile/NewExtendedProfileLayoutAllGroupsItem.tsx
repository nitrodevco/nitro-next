import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea } from '#base/theme';

/** Row template `all_groups` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutAllGroupsItemProps {
    captionTotalGroupCount?: string;
    itemsGroupsList?: ReactNode;
    layout?: BoxLayout;
    visibleGroupsList?: boolean;
    visibleTotalGroupCount?: boolean;
}

export const NewExtendedProfileLayoutAllGroupsItem = ({ captionTotalGroupCount, itemsGroupsList, layout, visibleGroupsList, visibleTotalGroupCount }: NewExtendedProfileLayoutAllGroupsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="all_groups"
            layout={{ width: 83, height: 227, flexShrink: 0, ...layout }}
        >
            {(visibleTotalGroupCount ?? true) && (
                <Region
                    name="total_group_count"
                    layout={{ position: 'absolute', left: 0, width: 159, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTotalGroupCount ?? t('extendedprofile.groups.count')}
                </Region>
            )}
            {(visibleGroupsList ?? true) && (
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 3, width: 74, top: 27, height: 195 }}
                >
                    <Region
                        name="groups_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsGroupsList}
                    </Region>
                </ScrollArea>
            )}
        </Region>
    );
};
