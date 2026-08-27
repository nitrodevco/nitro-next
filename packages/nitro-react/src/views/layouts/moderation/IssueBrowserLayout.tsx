import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1118_issue_browser_xml` (layout "issue_browser", 585x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueBrowserLayoutProps {
    itemsIssueList?: ReactNode;
    itemsIssueList2?: ReactNode;
    itemsIssueList3?: ReactNode;
    layout?: BoxLayout;
    onAutoPick?: () => void;
    onClose?: () => void;
    onMyIssues?: () => void;
    onOpenIssues?: () => void;
    onPickedIssues?: () => void;
    onReleaseAll?: () => void;
    visibleMyIssuesPrototype?: boolean;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayout = ({ itemsIssueList, itemsIssueList2, itemsIssueList3, layout, onAutoPick, onClose, onMyIssues, onOpenIssues, onPickedIssues, onReleaseAll, visibleMyIssuesPrototype, visibleOpenIssuesPrototype }: IssueBrowserLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 3, width: 566, top: 5, height: 204 }}
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
                <Region
                    name="tab_content"
                    params={2192}
                    layout={{ position: 'absolute', left: 10, width: 557, top: 30, height: 177 }}
                >
                    <Region
                        name="open_issues_prototype"
                        params={2192}
                        visible={visibleOpenIssuesPrototype ?? false}
                        layout={{ position: 'absolute', left: 0, width: 557, top: 0, height: 177 }}
                    >
                        <Region
                            params={2192}
                            layout={{ position: 'absolute', left: 10, width: 547, top: 10, height: 167 }}
                        >
                            <Region
                                name="list_header"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 517, top: 0, height: 15 }}
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
                                    layout={{ position: 'absolute', left: 390, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Open" />
                                </Region>
                            </Region>
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 517, top: 15, height: 125 }}
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
                        </Region>
                    </Region>
                    <Region
                        name="my_issues_prototype"
                        params={2192}
                        visible={visibleMyIssuesPrototype ?? false}
                        layout={{ position: 'absolute', left: 0, width: 557, top: 0, height: 177 }}
                    >
                        <Region
                            params={2192}
                            layout={{ position: 'absolute', left: 10, width: 547, top: 10, height: 167 }}
                        >
                            <Region
                                name="list_header"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 517, top: 0, height: 15 }}
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
                                    layout={{ position: 'absolute', left: 311, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Open" />
                                </Region>
                                <Region
                                    params={80}
                                    layout={{ position: 'absolute', left: 371, width: 35, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Msgs" />
                                </Region>
                            </Region>
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 517, top: 15, height: 125 }}
                            >
                                <Region
                                    name="issue_list"
                                    params={2193}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    {itemsIssueList2 ?? (
                                        <IssueBrowserLayoutItemPrototypeItem2 />
                                    )}
                                </Region>
                            </ScrollArea>
                            <Button
                                variant="0"
                                name="release_all"
                                params={394321}
                                onPointerTap={onReleaseAll}
                                layout={{ position: 'absolute', left: 447, width: 70, top: 141, height: 22 }}
                            >
                                release all
                            </Button>
                        </Region>
                    </Region>
                    <Region
                        name="picked_issues_prototype"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 557, top: 0, height: 177 }}
                    >
                        <Region
                            params={2192}
                            layout={{ position: 'absolute', left: 10, width: 547, top: 10, height: 167 }}
                        >
                            <Region
                                name="list_header"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 517, top: 0, height: 15 }}
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
                                    layout={{ position: 'absolute', left: 350, width: 60, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Open" />
                                </Region>
                                <Region
                                    params={80}
                                    layout={{ position: 'absolute', left: 410, width: 107, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Picker" />
                                </Region>
                            </Region>
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 517, top: 15, height: 125 }}
                            >
                                <Region
                                    name="issue_list"
                                    params={2192}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    {itemsIssueList3 ?? (
                                        <IssueBrowserLayoutItemPrototypeItem3 />
                                    )}
                                </Region>
                            </ScrollArea>
                        </Region>
                    </Region>
                </Region>
                <Button
                    variant="0"
                    name="auto_pick"
                    params={394257}
                    onPointerTap={onAutoPick}
                    layout={{ position: 'absolute', left: 4, width: 175, top: 215, height: 22 }}
                >
                    Give me the next priority issue
                </Button>
            </Region>
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
    onPickButton?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutItemPrototypeItem = ({ captionCategory, captionScore, captionSource, captionTargetName, captionTime, layout, onPickButton, srcTargetIcon }: IssueBrowserLayoutItemPrototypeItemProps) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <Region
                name="texts_container"
                params={145}
                layout={{ position: 'absolute', left: 0, width: 455, top: 4, height: 16 }}
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
                    layout={{ position: 'absolute', left: 180, width: 90, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSource ?? 'source'} />
                </Region>
                <Region
                    name="target_name"
                    params={144}
                    layout={{ position: 'absolute', left: 270, width: 120, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTargetName ?? 'target'} />
                </Region>
                <ThemeImage
                    name="target_icon"
                    params={80}
                    src={srcTargetIcon}
                    layout={{ position: 'absolute', left: 390, width: 20, top: 0, height: 19 }}
                />
                <Region
                    name="time"
                    params={80}
                    layout={{ position: 'absolute', left: 410, width: 45, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTime ?? 'mm:ss'} />
                </Region>
            </Region>
            <Button
                variant="0"
                name="pick_button"
                params={131153}
                onPointerTap={onPickButton}
                layout={{ position: 'absolute', left: 455, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                pick
            </Button>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem2Props {
    captionCategory?: string;
    captionMsgs?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onHandleButton?: () => void;
    onReleaseButton?: () => void;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutItemPrototypeItem2 = ({ captionCategory, captionMsgs, captionScore, captionSource, captionTargetName, captionTime, layout, onHandleButton, onReleaseButton, srcTargetIcon }: IssueBrowserLayoutItemPrototypeItem2Props) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <Region
                name="texts_container"
                params={145}
                layout={{ position: 'absolute', left: 0, width: 455, top: 4, height: 16 }}
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
                    layout={{ position: 'absolute', left: 151, width: 70, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSource ?? 'source'} />
                </Region>
                <Region
                    name="target_name"
                    params={144}
                    layout={{ position: 'absolute', left: 221, width: 90, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTargetName ?? 'target'} />
                </Region>
                <ThemeImage
                    name="target_icon"
                    params={80}
                    src={srcTargetIcon}
                    layout={{ position: 'absolute', left: 311, width: 20, top: 0, height: 19 }}
                />
                <Region
                    name="time"
                    params={80}
                    layout={{ position: 'absolute', left: 331, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTime ?? 'mm:ss'} />
                </Region>
                <Region
                    name="msgs"
                    params={80}
                    layout={{ position: 'absolute', left: 371, width: 25, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionMsgs ?? 'yy'} />
                </Region>
            </Region>
            <Button
                variant="0"
                name="handle_button"
                params={131153}
                onPointerTap={onHandleButton}
                layout={{ position: 'absolute', left: 396, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                handle
            </Button>
            <Button
                variant="0"
                name="release_button"
                params={131153}
                onPointerTap={onReleaseButton}
                layout={{ position: 'absolute', left: 457, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                release
            </Button>
        </Region>
    );
};

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem3Props {
    captionCategory?: string;
    captionPicker?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    srcTargetIcon?: string;
}

export const IssueBrowserLayoutItemPrototypeItem3 = ({ captionCategory, captionPicker, captionScore, captionSource, captionTargetName, captionTime, layout, srcTargetIcon }: IssueBrowserLayoutItemPrototypeItem3Props) => {
    return (
        <Region
            name="item_prototype"
            params={145}
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            <Region
                name="texts_container"
                params={145}
                layout={{ position: 'absolute', left: 0, width: 517, top: 4, height: 16 }}
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
                    layout={{ position: 'absolute', left: 160, width: 70, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSource ?? 'source'} />
                </Region>
                <Region
                    name="target_name"
                    params={144}
                    layout={{ position: 'absolute', left: 230, width: 120, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTargetName ?? 'target'} />
                </Region>
                <ThemeImage
                    name="target_icon"
                    params={80}
                    src={srcTargetIcon}
                    layout={{ position: 'absolute', left: 350, width: 20, top: 1, height: 19 }}
                />
                <Region
                    name="time"
                    params={80}
                    layout={{ position: 'absolute', left: 370, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTime ?? 'mm:ss'} />
                </Region>
                <Region
                    name="picker"
                    params={80}
                    layout={{ position: 'absolute', left: 410, width: 107, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPicker ?? 'picker'} />
                </Region>
            </Region>
        </Region>
    );
};
