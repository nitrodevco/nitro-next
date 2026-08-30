import { BoxLayout, Region, ThemeText } from '#base/theme';

import { IssueBrowserLayoutIssueList3, IssueBrowserLayoutIssueList3Props } from './IssueBrowserLayoutIssueList3';

/** Named region `picked_issues_prototype` of IssueBrowserLayout - configured through the parent's `pickedIssuesPrototype` prop. */
export interface IssueBrowserLayoutPickedIssuesPrototypeProps {
    issueList?: IssueBrowserLayoutIssueList3Props;
    layout?: BoxLayout;
}

export const IssueBrowserLayoutPickedIssuesPrototype = ({ issueList, layout }: IssueBrowserLayoutPickedIssuesPrototypeProps) => {
    return (
        <Region
            name="picked_issues_prototype"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}>
                <Region
                    name="list_header"
                    layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15 }}
                >
                    <ThemeText
                        text="Score"
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text="Category"
                        layout={{ position: 'absolute', left: 40, width: 120, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text="Type"
                        layout={{ position: 'absolute', left: 160, width: 70, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text="Player"
                        layout={{ position: 'absolute', left: 230, width: 120, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text="Open"
                        layout={{ position: 'absolute', right: 107, width: 60, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text="Picker"
                        layout={{ position: 'absolute', right: 0, width: 107, top: 0, bottom: 0 }}
                    />
                </Region>
                <IssueBrowserLayoutIssueList3 {...issueList} />
                {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};
