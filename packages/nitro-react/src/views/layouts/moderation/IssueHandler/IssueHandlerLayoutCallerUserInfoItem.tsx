import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `caller_user_info` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutCallerUserInfoItemProps {
    callerUserInfo?: ReactNode;
    layout?: BoxLayout;
}

export const IssueHandlerLayoutCallerUserInfoItem = ({ callerUserInfo, layout }: IssueHandlerLayoutCallerUserInfoItemProps) => {
    return (
        <Region
            name="caller_user_info"
            layout={{ width: 280, height: 207, flexShrink: 0, ...layout }}
        >
            {callerUserInfo}
        </Region>
    );
};
