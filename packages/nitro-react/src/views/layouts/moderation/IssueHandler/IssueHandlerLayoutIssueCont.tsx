import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { IssueHandlerLayoutCallerUserInfoItem } from './IssueHandlerLayoutCallerUserInfoItem';
import { IssueHandlerLayoutIssuesHeaderItem } from './IssueHandlerLayoutIssuesHeaderItem';
import { IssueHandlerLayoutIssuesItemListItem } from './IssueHandlerLayoutIssuesItemListItem';
import { IssueHandlerLayoutMsgItemListItem } from './IssueHandlerLayoutMsgItemListItem';
import { IssueHandlerLayoutReportedUserInfoCaptionItem } from './IssueHandlerLayoutReportedUserInfoCaptionItem';
import { IssueHandlerLayoutReportedUserInfoItem } from './IssueHandlerLayoutReportedUserInfoItem';

/** Named region `issue_cont` of IssueHandlerLayout - configured through the parent's `issueCont` prop. */
export interface IssueHandlerLayoutIssueContProps {
    itemsIssueCont?: ReactNode;
    layout?: BoxLayout;
}

export const IssueHandlerLayoutIssueCont = ({ itemsIssueCont, layout }: IssueHandlerLayoutIssueContProps) => {
    return (
        <Region
            name="issue_cont"
            layout={{ position: 'absolute', left: 0, right: 465, top: 0, bottom: 26, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsIssueCont ?? (
                <>
                    <IssueHandlerLayoutIssuesHeaderItem />
                    <IssueHandlerLayoutIssuesItemListItem />
                    <IssueHandlerLayoutCallerUserInfoItem />
                    <IssueHandlerLayoutMsgItemListItem />
                    <IssueHandlerLayoutReportedUserInfoCaptionItem />
                    <IssueHandlerLayoutReportedUserInfoItem />
                </>
            )}
            <Region layout={{ width: 100, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Caller User Info"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ width: 60, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Messages"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
