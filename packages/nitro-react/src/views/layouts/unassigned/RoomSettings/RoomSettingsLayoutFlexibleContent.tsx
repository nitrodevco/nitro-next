import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomSettingsLayoutAdvancedContainerItem } from './RoomSettingsLayoutAdvancedContainerItem';
import { RoomSettingsLayoutGuildAccessDisclaimerItem } from './RoomSettingsLayoutGuildAccessDisclaimerItem';

/** Named region `flexible_content` of RoomSettingsLayout - configured through the parent's `flexibleContent` prop. */
export interface RoomSettingsLayoutFlexibleContentProps {
    itemsFlexibleContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutFlexibleContent = ({ itemsFlexibleContent, layout }: RoomSettingsLayoutFlexibleContentProps) => {
    return (
        <Region
            name="flexible_content"
            layout={{ position: 'absolute', left: 0, width: 315, top: 260, height: 117, flexDirection: 'column', ...layout }}
        >
            {itemsFlexibleContent ?? (
                <>
                    <RoomSettingsLayoutGuildAccessDisclaimerItem />
                    <RoomSettingsLayoutAdvancedContainerItem />
                </>
            )}
        </Region>
    );
};
