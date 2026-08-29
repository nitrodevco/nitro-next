import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

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
            params={98305}
            caption="Issue browser"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 585, height: 273, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TabContext
                    variant="0"
                    name="tab_context"
                    params={12585104}
                    layout={{ position: 'absolute', left: 3, right: 16, top: 5, bottom: 64 }}
                >
                    <TabButton
                        variant="0"
                        name="open_issues"
                        params={131089}
                        onPointerTap={onOpenIssues}
                        layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 22 }}
                    >
                        Open Issues
                    </TabButton>
                    <TabButton
                        variant="0"
                        name="my_issues"
                        params={131089}
                        onPointerTap={onMyIssues}
                        layout={{ position: 'absolute', left: 81, width: 68, top: 0, height: 22 }}
                    >
                        My issues
                    </TabButton>
                    <TabButton
                        variant="0"
                        name="picked_issues"
                        params={131089}
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
                    params={394257}
                    onPointerTap={onAutoPick}
                    layout={{ position: 'absolute', right: 406, width: 175, bottom: 36, height: 22 }}
                >
                    Give me the next priority issue
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `list_header` of IssueBrowserLayout - configured through the parent's `listHeader` prop. */
export interface IssueBrowserLayoutListHeaderProps {
    layout?: BoxLayout;
}

export const IssueBrowserLayoutListHeader = ({ layout }: IssueBrowserLayoutListHeaderProps) => {
    return (
        <Region
            name="list_header"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Score" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 40, width: 140, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Category" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 180, width: 90, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Type" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 270, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Player" />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 77, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Open" />
            </Region>
        </Region>
    );
};

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainerProps {
    captionCategory?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutTextsContainer = ({ captionCategory, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            params={145}
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionScore ?? 'xx'} />
            </Region>
            <Region
                name="category"
                params={16}
                layout={{ position: 'absolute', left: 40, width: 140, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCategory ?? 'Sharing personal info'} />
            </Region>
            <Region
                name="source"
                params={144}
                layout={{ position: 'absolute', left: 180, right: 185, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSource ?? 'source'} />
            </Region>
            <Region
                name="target_name"
                params={144}
                layout={{ position: 'absolute', left: 270, right: 65, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTargetName ?? 'target'} />
            </Region>
            <ThemeImage
                name="target_icon"
                params={80}
                src={srcTargetIcon}
                layout={{ position: 'absolute', right: 45, width: 20, top: 0, height: 19 }}
            />
            <Region
                name="time"
                params={80}
                layout={{ position: 'absolute', right: 0, width: 45, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTime ?? 'mm:ss'} />
            </Region>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItemProps {
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    onPickButton?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainerProps;
}

export const IssueBrowserLayoutItemPrototypeItem = ({ layout, onItemPrototype, onPickButton, textsContainer }: IssueBrowserLayoutItemPrototypeItemProps) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <IssueBrowserLayoutTextsContainer {...textsContainer} />
            <Button
                variant="0"
                name="pick_button"
                params={131153}
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
                params={2193}
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
    listHeader?: IssueBrowserLayoutListHeaderProps;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutOpenIssuesPrototype = ({ issueList, layout, listHeader, visibleOpenIssuesPrototype }: IssueBrowserLayoutOpenIssuesPrototypeProps) => {
    return (
        <Region
            name="open_issues_prototype"
            params={2192}
            visible={visibleOpenIssuesPrototype ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}
            >
                <IssueBrowserLayoutListHeader {...listHeader} />
                <IssueBrowserLayoutIssueList {...issueList} />
                {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};

/** Named region `list_header` of IssueBrowserLayout - configured through the parent's `listHeader` prop. */
export interface IssueBrowserLayoutListHeader2Props {
    layout?: BoxLayout;
}

export const IssueBrowserLayoutListHeader2 = ({ layout }: IssueBrowserLayoutListHeader2Props) => {
    return (
        <Region
            name="list_header"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Score" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Category" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 151, width: 170, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Type" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 221, width: 90, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Player" />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 146, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Open" />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 111, width: 35, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Msgs" />
            </Region>
        </Region>
    );
};

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainer2Props {
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

export const IssueBrowserLayoutTextsContainer2 = ({ captionCategory, captionMsgs, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutTextsContainer2Props) => {
    return (
        <Region
            name="texts_container"
            params={145}
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionScore ?? 'xx'} />
            </Region>
            <Region
                name="category"
                params={16}
                layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCategory ?? 'Sharing personal info'} />
            </Region>
            <Region
                name="source"
                params={144}
                layout={{ position: 'absolute', left: 151, right: 234, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSource ?? 'source'} />
            </Region>
            <Region
                name="target_name"
                params={144}
                layout={{ position: 'absolute', left: 221, right: 144, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTargetName ?? 'target'} />
            </Region>
            <ThemeImage
                name="target_icon"
                params={80}
                src={srcTargetIcon}
                layout={{ position: 'absolute', right: 124, width: 20, top: 0, height: 19 }}
            />
            <Region
                name="time"
                params={80}
                layout={{ position: 'absolute', right: 84, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTime ?? 'mm:ss'} />
            </Region>
            <Region
                name="msgs"
                params={80}
                layout={{ position: 'absolute', right: 59, width: 25, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionMsgs ?? 'yy'} />
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
    textsContainer?: IssueBrowserLayoutTextsContainer2Props;
}

export const IssueBrowserLayoutItemPrototypeItem2 = ({ layout, onHandleButton, onItemPrototype, onReleaseButton, textsContainer }: IssueBrowserLayoutItemPrototypeItem2Props) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <IssueBrowserLayoutTextsContainer2 {...textsContainer} />
            <Button
                variant="0"
                name="handle_button"
                params={131153}
                onPointerTap={onHandleButton}
                layout={{ position: 'absolute', right: 61, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                handle
            </Button>
            <Button
                variant="0"
                name="release_button"
                params={131153}
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
                params={2193}
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
    listHeader?: IssueBrowserLayoutListHeader2Props;
    onReleaseAll?: () => void;
    visibleMyIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutMyIssuesPrototype = ({ issueList, layout, listHeader, onReleaseAll, visibleMyIssuesPrototype }: IssueBrowserLayoutMyIssuesPrototypeProps) => {
    return (
        <Region
            name="my_issues_prototype"
            params={2192}
            visible={visibleMyIssuesPrototype ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}
            >
                <IssueBrowserLayoutListHeader2 {...listHeader} />
                <IssueBrowserLayoutIssueList2 {...issueList} />
                {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
                <Button
                    variant="0"
                    name="release_all"
                    params={394321}
                    onPointerTap={onReleaseAll}
                    layout={{ position: 'absolute', right: 30, width: 70, bottom: 4, height: 22 }}
                >
                    release all
                </Button>
            </Region>
        </Region>
    );
};

/** Named region `list_header` of IssueBrowserLayout - configured through the parent's `listHeader` prop. */
export interface IssueBrowserLayoutListHeader3Props {
    layout?: BoxLayout;
}

export const IssueBrowserLayoutListHeader3 = ({ layout }: IssueBrowserLayoutListHeader3Props) => {
    return (
        <Region
            name="list_header"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Score" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Category" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 160, width: 70, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Type" />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 230, width: 120, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Player" />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 107, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Open" />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text="Picker" />
            </Region>
        </Region>
    );
};

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainer3Props {
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

export const IssueBrowserLayoutTextsContainer3 = ({ captionCategory, captionPicker, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon }: IssueBrowserLayoutTextsContainer3Props) => {
    return (
        <Region
            name="texts_container"
            params={145}
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionScore ?? 'xx'} />
            </Region>
            <Region
                name="category"
                params={16}
                layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCategory ?? 'category'} />
            </Region>
            <Region
                name="source"
                params={144}
                layout={{ position: 'absolute', left: 160, right: 287, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSource ?? 'source'} />
            </Region>
            <Region
                name="target_name"
                params={144}
                layout={{ position: 'absolute', left: 230, right: 167, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTargetName ?? 'target'} />
            </Region>
            <ThemeImage
                name="target_icon"
                params={80}
                src={srcTargetIcon}
                layout={{ position: 'absolute', right: 147, width: 20, top: 1, height: 19 }}
            />
            <Region
                name="time"
                params={80}
                layout={{ position: 'absolute', right: 107, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTime ?? 'mm:ss'} />
            </Region>
            <Region
                name="picker"
                params={80}
                layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionPicker ?? 'picker'} />
            </Region>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem3Props {
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainer3Props;
}

export const IssueBrowserLayoutItemPrototypeItem3 = ({ layout, onItemPrototype, textsContainer }: IssueBrowserLayoutItemPrototypeItem3Props) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <IssueBrowserLayoutTextsContainer3 {...textsContainer} />
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
                params={2192}
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
    listHeader?: IssueBrowserLayoutListHeader3Props;
}

export const IssueBrowserLayoutPickedIssuesPrototype = ({ issueList, layout, listHeader }: IssueBrowserLayoutPickedIssuesPrototypeProps) => {
    return (
        <Region
            name="picked_issues_prototype"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}
            >
                <IssueBrowserLayoutListHeader3 {...listHeader} />
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
}

export const IssueBrowserLayoutTabContent = ({ layout, myIssuesPrototype, openIssuesPrototype, pickedIssuesPrototype }: IssueBrowserLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={2192}
            layout={{ position: 'absolute', left: 10, right: 18, top: 30, bottom: 66, ...layout }}
        >
            <IssueBrowserLayoutOpenIssuesPrototype {...openIssuesPrototype} />
            <IssueBrowserLayoutMyIssuesPrototype {...myIssuesPrototype} />
            <IssueBrowserLayoutPickedIssuesPrototype {...pickedIssuesPrototype} />
        </Region>
    );
};
