import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

/** Row template `group_details` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutGroupDetailsItemProps {
    groupCont?: ReactNode;
    layout?: BoxLayout;
    visibleGroupCont?: boolean;
}

export const NewExtendedProfileLayoutGroupDetailsItem = ({ groupCont, layout, visibleGroupCont }: NewExtendedProfileLayoutGroupDetailsItemProps) => {
    return (
        <Border
            variant="2"
            name="group_details"
            tintColor="#afafaf"
            layout={{ width: 410, height: 224, flexShrink: 0, ...layout }}
        >
            {(visibleGroupCont ?? true) && (
                <Region
                    name="group_cont"
                    layout={{ position: 'absolute', left: 33, width: 343, top: 5, height: 214 }}
                >
                    {groupCont}
                </Region>
            )}
        </Border>
    );
};
