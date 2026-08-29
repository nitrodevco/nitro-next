import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { IssueBrowserLayoutItemPrototypeItem } from './IssueBrowserLayoutItemPrototypeItem';

/** Named region `issue_list` of IssueBrowserLayout - configured through the parent's `issueList` prop. */
export interface IssueBrowserLayoutIssueListProps {
    itemsIssueList?: ReactNode;
    layout?: BoxLayout;
}

export const IssueBrowserLayoutIssueList = ({ itemsIssueList, layout }: IssueBrowserLayoutIssueListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 30, top: 15, bottom: 27, ...layout }}
        >
            <Region
                name="issue_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsIssueList ?? (
                    <IssueBrowserLayoutItemPrototypeItem />
                )}
            </Region>
        </ScrollArea>
    );
};
