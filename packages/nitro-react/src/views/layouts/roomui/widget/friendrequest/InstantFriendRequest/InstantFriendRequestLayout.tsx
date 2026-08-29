import { BoxLayout, Region } from '#base/theme';

import { InstantFriendRequestLayoutMasterContainer, InstantFriendRequestLayoutMasterContainerProps } from './InstantFriendRequestLayoutMasterContainer';

/** Generated from `984_instant_friend_request_xml` (layout "instant_friend_request", 197x83) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InstantFriendRequestLayoutProps {
    layout?: BoxLayout;
    masterContainer?: InstantFriendRequestLayoutMasterContainerProps;
}

export const InstantFriendRequestLayout = ({ layout, masterContainer }: InstantFriendRequestLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 197, height: 83, ...layout }}>
            <InstantFriendRequestLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};
