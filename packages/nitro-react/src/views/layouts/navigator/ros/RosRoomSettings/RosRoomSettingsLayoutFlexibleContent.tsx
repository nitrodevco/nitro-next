import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RosRoomSettingsLayoutAdvancedContainerItem } from './RosRoomSettingsLayoutAdvancedContainerItem';
import { RosRoomSettingsLayoutGuildAccessDisclaimerItem } from './RosRoomSettingsLayoutGuildAccessDisclaimerItem';

/** Named region `flexible_content` of RosRoomSettingsLayout - configured through the parent's `flexibleContent` prop. */
export interface RosRoomSettingsLayoutFlexibleContentProps {
    itemsFlexibleContent?: ReactNode;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutFlexibleContent = ({ itemsFlexibleContent, layout }: RosRoomSettingsLayoutFlexibleContentProps) => {
    return (
        <Region
            name="flexible_content"
            layout={{ position: 'absolute', left: 0, width: 277, top: 260, height: 117, flexDirection: 'column', ...layout }}
        >
            {itemsFlexibleContent ?? (
                <>
                    <RosRoomSettingsLayoutGuildAccessDisclaimerItem />
                    <RosRoomSettingsLayoutAdvancedContainerItem />
                </>
            )}
        </Region>
    );
};
