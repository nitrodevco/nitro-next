import { BoxLayout, Button, Region } from '#base/theme';

import { IssueBrowserLayoutIssueList2, IssueBrowserLayoutIssueList2Props } from './IssueBrowserLayoutIssueList2';

/** Named region `my_issues_prototype` of IssueBrowserLayout - configured through the parent's `myIssuesPrototype` prop. */
export interface IssueBrowserLayoutMyIssuesPrototypeProps {
    issueList?: IssueBrowserLayoutIssueList2Props;
    layout?: BoxLayout;
    onReleaseAll?: () => void;
    visibleMyIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutMyIssuesPrototype = ({ issueList, layout, onReleaseAll, visibleMyIssuesPrototype }: IssueBrowserLayoutMyIssuesPrototypeProps) => {
    return (
        (visibleMyIssuesPrototype ?? false) && (
            <Region
                name="my_issues_prototype"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}>
                    <Region
                        name="list_header"
                        layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Score
                        </Region>
                        <Region layout={{ position: 'absolute', left: 40, width: 111, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Category
                        </Region>
                        <Region layout={{ position: 'absolute', left: 151, width: 170, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Type
                        </Region>
                        <Region layout={{ position: 'absolute', left: 221, width: 90, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Player
                        </Region>
                        <Region layout={{ position: 'absolute', right: 146, width: 60, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Open
                        </Region>
                        <Region layout={{ position: 'absolute', right: 111, width: 35, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Msgs
                        </Region>
                    </Region>
                    <IssueBrowserLayoutIssueList2 {...issueList} />
                    {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
                    <Button
                        variant="0"
                        name="release_all"
                        onPointerTap={onReleaseAll}
                        layout={{ position: 'absolute', right: 30, width: 70, bottom: 4, height: 22 }}
                    >
                        release all
                    </Button>
                </Region>
            </Region>
        )
    );
};
