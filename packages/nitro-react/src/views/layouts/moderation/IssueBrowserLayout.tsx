import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ScrollArea, TabButton, TabContext, ThemeImage } from '#base/theme';

/** Generated from `1118_issue_browser_xml` (layout "issue_browser", 585x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueBrowserLayoutProps {
    layout?: BoxLayout;
    onAutoPick?: () => void;
    onClose?: () => void;
    onMyIssues?: () => void;
    onOpenIssues?: () => void;
    onPickedIssues?: () => void;
    tabContent?: IssueBrowserLayoutTabContentProps;
}

export const IssueBrowserLayout = ({ layout, onAutoPick, onClose, onMyIssues, onOpenIssues, onPickedIssues, tabContent }: IssueBrowserLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Issue browser"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 585, height: 273, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                layout={{ position: 'absolute', left: 3, right: 16, top: 5, bottom: 64 }}
            >
                <TabButton
                    variant="0"
                    name="open_issues"
                    onPointerTap={onOpenIssues}
                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 22 }}
                >
                    Open Issues
                </TabButton>
                <TabButton
                    variant="0"
                    name="my_issues"
                    onPointerTap={onMyIssues}
                    layout={{ position: 'absolute', left: 81, width: 68, top: 0, height: 22 }}
                >
                    My issues
                </TabButton>
                <TabButton
                    variant="0"
                    name="picked_issues"
                    onPointerTap={onPickedIssues}
                    layout={{ position: 'absolute', left: 149, width: 88, top: 0, height: 22 }}
                >
                    Picked Issues
                </TabButton>
            </TabContext>
            <IssueBrowserLayoutTabContent {...tabContent} />
            <Button
                variant="0"
                name="auto_pick"
                onPointerTap={onAutoPick}
                layout={{ position: 'absolute', right: 406, width: 175, bottom: 36, height: 22 }}
            >
                Give me the next priority issue
            </Button>
        </Frame>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItemProps {
    captionCategory?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    onPickButton?: () => void;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutItemPrototypeItem = ({ captionCategory, captionScore, captionSource, captionTargetName, captionTime, layout, onItemPrototype, onPickButton, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutItemPrototypeItemProps) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <Region
                name="texts_container"
                onPointerTap={onTextsContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16 }}
            >
                <Region
                    name="score"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionScore ?? 'xx'}
                </Region>
                <Region
                    name="category"
                    layout={{ position: 'absolute', left: 40, width: 140, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionCategory ?? 'Sharing personal info'}
                </Region>
                <Region
                    name="source"
                    layout={{ position: 'absolute', left: 180, right: 185, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionSource ?? 'source'}
                </Region>
                <Region
                    name="target_name"
                    layout={{ position: 'absolute', left: 270, right: 65, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTargetName ?? 'target'}
                </Region>
                <ThemeImage
                    name="target_icon"
                    src={srcTargetIcon}
                    layout={{ position: 'absolute', right: 45, width: 20, top: 0, height: 19 }}
                />
                <Region
                    name="time"
                    layout={{ position: 'absolute', right: 0, width: 45, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTime ?? 'mm:ss'}
                </Region>
            </Region>
            <Button
                variant="0"
                name="pick_button"
                onPointerTap={onPickButton}
                layout={{ position: 'absolute', right: 2, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                pick
            </Button>
        </Region>
    );
};

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

/** Named region `open_issues_prototype` of IssueBrowserLayout - configured through the parent's `openIssuesPrototype` prop. */
export interface IssueBrowserLayoutOpenIssuesPrototypeProps {
    issueList?: IssueBrowserLayoutIssueListProps;
    layout?: BoxLayout;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutOpenIssuesPrototype = ({ issueList, layout, visibleOpenIssuesPrototype }: IssueBrowserLayoutOpenIssuesPrototypeProps) => {
    return (
        (visibleOpenIssuesPrototype ?? false) && (
            <Region
                name="open_issues_prototype"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}>
                    <Region
                        name="list_header"
                        layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Score
                        </Region>
                        <Region layout={{ position: 'absolute', left: 40, width: 140, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Category
                        </Region>
                        <Region layout={{ position: 'absolute', left: 180, width: 90, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Type
                        </Region>
                        <Region layout={{ position: 'absolute', left: 270, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Player
                        </Region>
                        <Region layout={{ position: 'absolute', right: 77, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Open
                        </Region>
                    </Region>
                    <IssueBrowserLayoutIssueList {...issueList} />
                    {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
                </Region>
            </Region>
        )
    );
};

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainerProps {
    captionCategory?: string;
    captionMsgs?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutTextsContainer = ({ captionCategory, captionMsgs, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionScore ?? 'xx'}
            </Region>
            <Region
                name="category"
                layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCategory ?? 'Sharing personal info'}
            </Region>
            <Region
                name="source"
                layout={{ position: 'absolute', left: 151, right: 234, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionSource ?? 'source'}
            </Region>
            <Region
                name="target_name"
                layout={{ position: 'absolute', left: 221, right: 144, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTargetName ?? 'target'}
            </Region>
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                layout={{ position: 'absolute', right: 124, width: 20, top: 0, height: 19 }}
            />
            <Region
                name="time"
                layout={{ position: 'absolute', right: 84, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTime ?? 'mm:ss'}
            </Region>
            <Region
                name="msgs"
                layout={{ position: 'absolute', right: 59, width: 25, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionMsgs ?? 'yy'}
            </Region>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem2Props {
    layout?: BoxLayout;
    onHandleButton?: () => void;
    onItemPrototype?: () => void;
    onReleaseButton?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainerProps;
}

export const IssueBrowserLayoutItemPrototypeItem2 = ({ layout, onHandleButton, onItemPrototype, onReleaseButton, textsContainer }: IssueBrowserLayoutItemPrototypeItem2Props) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <IssueBrowserLayoutTextsContainer {...textsContainer} />
            <Button
                variant="0"
                name="handle_button"
                onPointerTap={onHandleButton}
                layout={{ position: 'absolute', right: 61, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                handle
            </Button>
            <Button
                variant="0"
                name="release_button"
                onPointerTap={onReleaseButton}
                layout={{ position: 'absolute', right: 0, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                release
            </Button>
        </Region>
    );
};

/** Named region `issue_list` of IssueBrowserLayout - configured through the parent's `issueList` prop. */
export interface IssueBrowserLayoutIssueList2Props {
    itemsIssueList?: ReactNode;
    layout?: BoxLayout;
}

export const IssueBrowserLayoutIssueList2 = ({ itemsIssueList, layout }: IssueBrowserLayoutIssueList2Props) => {
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
                    <IssueBrowserLayoutItemPrototypeItem2 />
                )}
            </Region>
        </ScrollArea>
    );
};

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
                        <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Score
                        </Region>
                        <Region layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Category
                        </Region>
                        <Region layout={{ position: 'absolute', left: 151, width: 170, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Type
                        </Region>
                        <Region layout={{ position: 'absolute', left: 221, width: 90, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Player
                        </Region>
                        <Region layout={{ position: 'absolute', right: 146, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Open
                        </Region>
                        <Region layout={{ position: 'absolute', right: 111, width: 35, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainer2Props {
    captionCategory?: string;
    captionPicker?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutTextsContainer2 = ({ captionCategory, captionPicker, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutTextsContainer2Props) => {
    return (
        <Region
            name="texts_container"
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionScore ?? 'xx'}
            </Region>
            <Region
                name="category"
                layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCategory ?? 'category'}
            </Region>
            <Region
                name="source"
                layout={{ position: 'absolute', left: 160, right: 287, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionSource ?? 'source'}
            </Region>
            <Region
                name="target_name"
                layout={{ position: 'absolute', left: 230, right: 167, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTargetName ?? 'target'}
            </Region>
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                layout={{ position: 'absolute', right: 147, width: 20, top: 1, height: 19 }}
            />
            <Region
                name="time"
                layout={{ position: 'absolute', right: 107, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTime ?? 'mm:ss'}
            </Region>
            <Region
                name="picker"
                layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionPicker ?? 'picker'}
            </Region>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem3Props {
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainer2Props;
}

export const IssueBrowserLayoutItemPrototypeItem3 = ({ layout, onItemPrototype, textsContainer }: IssueBrowserLayoutItemPrototypeItem3Props) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <IssueBrowserLayoutTextsContainer2 {...textsContainer} />
        </Region>
    );
};

/** Named region `issue_list` of IssueBrowserLayout - configured through the parent's `issueList` prop. */
export interface IssueBrowserLayoutIssueList3Props {
    itemsIssueList?: ReactNode;
    layout?: BoxLayout;
}

export const IssueBrowserLayoutIssueList3 = ({ itemsIssueList, layout }: IssueBrowserLayoutIssueList3Props) => {
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
                    <IssueBrowserLayoutItemPrototypeItem3 />
                )}
            </Region>
        </ScrollArea>
    );
};

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
                    <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Score
                    </Region>
                    <Region layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Category
                    </Region>
                    <Region layout={{ position: 'absolute', left: 160, width: 70, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Type
                    </Region>
                    <Region layout={{ position: 'absolute', left: 230, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Player
                    </Region>
                    <Region layout={{ position: 'absolute', right: 107, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Open
                    </Region>
                    <Region layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        Picker
                    </Region>
                </Region>
                <IssueBrowserLayoutIssueList3 {...issueList} />
                {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};

/** Named region `tab_content` of IssueBrowserLayout - configured through the parent's `tabContent` prop. */
export interface IssueBrowserLayoutTabContentProps {
    layout?: BoxLayout;
    myIssuesPrototype?: IssueBrowserLayoutMyIssuesPrototypeProps;
    openIssuesPrototype?: IssueBrowserLayoutOpenIssuesPrototypeProps;
    pickedIssuesPrototype?: IssueBrowserLayoutPickedIssuesPrototypeProps;
    visibleMyIssuesPrototype?: boolean;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutTabContent = ({ layout, myIssuesPrototype, openIssuesPrototype, pickedIssuesPrototype, visibleMyIssuesPrototype, visibleOpenIssuesPrototype }: IssueBrowserLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', left: 10, right: 18, top: 30, bottom: 66, ...layout }}
        >
            {(visibleOpenIssuesPrototype ?? false) && (
                <IssueBrowserLayoutOpenIssuesPrototype {...openIssuesPrototype} />
            )}
            {(visibleMyIssuesPrototype ?? false) && (
                <IssueBrowserLayoutMyIssuesPrototype {...myIssuesPrototype} />
            )}
            <IssueBrowserLayoutPickedIssuesPrototype {...pickedIssuesPrototype} />
        </Region>
    );
};
