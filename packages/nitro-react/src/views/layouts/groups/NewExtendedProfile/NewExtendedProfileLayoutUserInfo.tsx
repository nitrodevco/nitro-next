import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NewExtendedProfileLayoutMottoTxtItem } from './NewExtendedProfileLayoutMottoTxtItem';
import { NewExtendedProfileLayoutStatusItem } from './NewExtendedProfileLayoutStatusItem';
import { NewExtendedProfileLayoutUserActivityPointsItem } from './NewExtendedProfileLayoutUserActivityPointsItem';
import { NewExtendedProfileLayoutUserCreatedItem } from './NewExtendedProfileLayoutUserCreatedItem';
import { NewExtendedProfileLayoutUserLastLoginItem } from './NewExtendedProfileLayoutUserLastLoginItem';
import { NewExtendedProfileLayoutUserNameItem } from './NewExtendedProfileLayoutUserNameItem';

/** Named region `user_info` of NewExtendedProfileLayout - configured through the parent's `userInfo` prop. */
export interface NewExtendedProfileLayoutUserInfoProps {
    itemsUserInfo?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserInfo = ({ itemsUserInfo, layout }: NewExtendedProfileLayoutUserInfoProps) => {
    return (
        <Region
            name="user_info"
            layout={{ position: 'absolute', left: 56, width: 200, top: -4, height: 118, flexDirection: 'column', ...layout }}
        >
            {itemsUserInfo ?? (
                <>
                    <NewExtendedProfileLayoutUserNameItem />
                    <NewExtendedProfileLayoutMottoTxtItem />
                    <NewExtendedProfileLayoutUserCreatedItem />
                    <NewExtendedProfileLayoutUserActivityPointsItem />
                    <NewExtendedProfileLayoutUserLastLoginItem />
                    <NewExtendedProfileLayoutStatusItem />
                </>
            )}
            <Region layout={{ width: 200, height: 1, flexShrink: 0 }} />
        </Region>
    );
};
