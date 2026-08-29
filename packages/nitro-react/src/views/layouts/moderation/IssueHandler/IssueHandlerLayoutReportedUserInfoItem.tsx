import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `reported_user_info` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutReportedUserInfoItemProps {
    layout?: BoxLayout;
    reportedUserInfo?: ReactNode;
}

export const IssueHandlerLayoutReportedUserInfoItem = ({ layout, reportedUserInfo }: IssueHandlerLayoutReportedUserInfoItemProps) => {
    return (
        <Region
            name="reported_user_info"
            layout={{ width: 280, height: 207, flexShrink: 0, ...layout }}
        >
            {reportedUserInfo}
        </Region>
    );
};
