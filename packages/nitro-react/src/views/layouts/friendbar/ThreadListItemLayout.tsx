import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `19_thread_list_item_xml` (layout "thread_list_item", 600x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ThreadListItemLayoutProps {
    layout?: BoxLayout;
    mainBox?: ThreadListItemLayoutMainBoxProps;
}

export const ThreadListItemLayout = ({ layout, mainBox }: ThreadListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 600, height: 40, ...layout }}>
            <ThreadListItemLayoutMainBox {...mainBox} />
        </Region>
    );
};

/** Row template `thread_lock` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutThreadLockItemProps {
    layout?: BoxLayout;
    onThreadLock?: () => void;
    srcIcon?: string;
}

export const ThreadListItemLayoutThreadLockItem = ({ layout, onThreadLock, srcIcon }: ThreadListItemLayoutThreadLockItemProps) => {
    return (
        <Region
            name="thread_lock"
            onPointerTap={onThreadLock}
            cursor="pointer"
            layout={{ width: 20, height: 20, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('forum_forum_locked.png')}
                layout={{ position: 'absolute', left: 3, right: 4, top: 1, bottom: 1 }}
            />
        </Region>
    );
};

/** Row template `thread_pin` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutThreadPinItemProps {
    layout?: BoxLayout;
    onThreadPin?: () => void;
    srcIcon?: string;
}

export const ThreadListItemLayoutThreadPinItem = ({ layout, onThreadPin, srcIcon }: ThreadListItemLayoutThreadPinItemProps) => {
    return (
        <Region
            name="thread_pin"
            onPointerTap={onThreadPin}
            cursor="pointer"
            layout={{ width: 20, height: 20, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('forum_forum_pinned.png')}
                layout={{ position: 'absolute', left: 3, right: 4, top: 2, bottom: 3 }}
            />
        </Region>
    );
};

/** Named region `info_buttons` of ThreadListItemLayout - configured through the parent's `infoButtons` prop. */
export interface ThreadListItemLayoutInfoButtonsProps {
    itemsInfoButtons?: ReactNode;
    layout?: BoxLayout;
}

export const ThreadListItemLayoutInfoButtons = ({ itemsInfoButtons, layout }: ThreadListItemLayoutInfoButtonsProps) => {
    return (
        <Region
            name="info_buttons"
            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40, flexDirection: 'column', ...layout }}
        >
            {itemsInfoButtons ?? (
                <>
                    <ThreadListItemLayoutThreadLockItem />
                    <ThreadListItemLayoutThreadPinItem />
                </>
            )}
        </Region>
    );
};

/** Named region `left_button_container` of ThreadListItemLayout - configured through the parent's `leftButtonContainer` prop. */
export interface ThreadListItemLayoutLeftButtonContainerProps {
    infoButtons?: ThreadListItemLayoutInfoButtonsProps;
    layout?: BoxLayout;
}

export const ThreadListItemLayoutLeftButtonContainer = ({ infoButtons, layout }: ThreadListItemLayoutLeftButtonContainerProps) => {
    return (
        <Region
            name="left_button_container"
            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40, ...layout }}
        >
            <ThreadListItemLayoutInfoButtons {...infoButtons} />
        </Region>
    );
};

/** Named region `header_region` of ThreadListItemLayout - configured through the parent's `headerRegion` prop. */
export interface ThreadListItemLayoutHeaderRegionProps {
    captionHeader?: string;
    layout?: BoxLayout;
    onHeaderRegion?: () => void;
}

export const ThreadListItemLayoutHeaderRegion = ({ captionHeader, layout, onHeaderRegion }: ThreadListItemLayoutHeaderRegionProps) => {
    return (
        <Region
            name="header_region"
            onPointerTap={onHeaderRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17, ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', left: 0, width: 117, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHeader ?? 'Some thread header'} />
            </Region>
        </Region>
    );
};

/** Named region `texts_container` of ThreadListItemLayout - configured through the parent's `textsContainer` prop. */
export interface ThreadListItemLayoutTextsContainerProps {
    captionDetails?: string;
    headerRegion?: ThreadListItemLayoutHeaderRegionProps;
    layout?: BoxLayout;
}

export const ThreadListItemLayoutTextsContainer = ({ captionDetails, headerRegion, layout }: ThreadListItemLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            backgroundColor="#eefeff"
            layout={{ position: 'absolute', left: 21, width: 387, top: 0, height: 40, ...layout }}
        >
            <ThreadListItemLayoutHeaderRegion {...headerRegion} />
            <Region
                name="details"
                layout={{ position: 'absolute', left: 0, width: 460, top: 16, height: 16, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionDetails ?? 'By author LongLongLongName 7 days ago, last message by LongLongLongName 30 seconds ago'} />
            </Region>
        </Region>
    );
};

/** Named region `unread_region` of ThreadListItemLayout - configured through the parent's `unreadRegion` prop. */
export interface ThreadListItemLayoutUnreadRegionProps {
    layout?: BoxLayout;
    onUnreadRegion?: () => void;
}

export const ThreadListItemLayoutUnreadRegion = ({ layout, onUnreadRegion }: ThreadListItemLayoutUnreadRegionProps) => {
    return (
        <Region
            name="unread_region"
            onPointerTap={onUnreadRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 40, ...layout }}
        />
    );
};

/** Named region `unread_texts_container` of ThreadListItemLayout - configured through the parent's `unreadTextsContainer` prop. */
export interface ThreadListItemLayoutUnreadTextsContainerProps {
    captionMessages1?: string;
    captionMessages2?: string;
    layout?: BoxLayout;
    unreadRegion?: ThreadListItemLayoutUnreadRegionProps;
}

export const ThreadListItemLayoutUnreadTextsContainer = ({ captionMessages1, captionMessages2, layout, unreadRegion }: ThreadListItemLayoutUnreadTextsContainerProps) => {
    return (
        <Region
            name="unread_texts_container"
            layout={{ position: 'absolute', left: 409, width: 140, top: 0, height: 40, ...layout }}
        >
            <ThreadListItemLayoutUnreadRegion {...unreadRegion} />
            <Region
                name="messages1"
                layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessages1 ?? '100 messages'}
                    textStyle="text-style-regular"
                />
            </Region>
            <Region
                name="messages2"
                layout={{ position: 'absolute', left: 0, width: 140, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessages2 ?? '12 new'}
                    textStyle="text-style-regular"
                />
            </Region>
        </Region>
    );
};

/** Row template `delete_thread` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutDeleteThreadItemProps {
    layout?: BoxLayout;
    onDeleteThread?: () => void;
    srcIcon?: string;
}

export const ThreadListItemLayoutDeleteThreadItem = ({ layout, onDeleteThread, srcIcon }: ThreadListItemLayoutDeleteThreadItemProps) => {
    return (
        <Region
            name="delete_thread"
            backgroundColor="#de4537"
            onPointerTap={onDeleteThread}
            cursor="pointer"
            layout={{ width: 25, height: 40, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('forum_forum_hide.png')}
                layout={{ position: 'absolute', left: 5, right: 4, top: 11, bottom: 13 }}
            />
        </Region>
    );
};

/** Row template `report_thread` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutReportThreadItemProps {
    layout?: BoxLayout;
    onReportThread?: () => void;
    srcIcon?: string;
}

export const ThreadListItemLayoutReportThreadItem = ({ layout, onReportThread, srcIcon }: ThreadListItemLayoutReportThreadItemProps) => {
    return (
        <Region
            name="report_thread"
            backgroundColor="#ff9c65"
            onPointerTap={onReportThread}
            cursor="pointer"
            layout={{ width: 25, height: 40, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('forum_forum_report.png')}
                layout={{ position: 'absolute', left: 4, right: 4, top: 12, bottom: 13 }}
            />
        </Region>
    );
};

/** Named region `mod_buttons` of ThreadListItemLayout - configured through the parent's `modButtons` prop. */
export interface ThreadListItemLayoutModButtonsProps {
    itemsModButtons?: ReactNode;
    layout?: BoxLayout;
}

export const ThreadListItemLayoutModButtons = ({ itemsModButtons, layout }: ThreadListItemLayoutModButtonsProps) => {
    return (
        <Region
            name="mod_buttons"
            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 40, flexDirection: 'row', ...layout }}
        >
            {itemsModButtons ?? (
                <>
                    <ThreadListItemLayoutDeleteThreadItem />
                    <ThreadListItemLayoutReportThreadItem />
                </>
            )}
        </Region>
    );
};

/** Named region `button_container` of ThreadListItemLayout - configured through the parent's `buttonContainer` prop. */
export interface ThreadListItemLayoutButtonContainerProps {
    layout?: BoxLayout;
    modButtons?: ThreadListItemLayoutModButtonsProps;
    onButtonContainer?: () => void;
}

export const ThreadListItemLayoutButtonContainer = ({ layout, modButtons, onButtonContainer }: ThreadListItemLayoutButtonContainerProps) => {
    return (
        <Region
            name="button_container"
            onPointerTap={onButtonContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 550, width: 50, top: 0, height: 40, ...layout }}
        >
            <ThreadListItemLayoutModButtons {...modButtons} />
        </Region>
    );
};

/** Named region `main_box` of ThreadListItemLayout - configured through the parent's `mainBox` prop. */
export interface ThreadListItemLayoutMainBoxProps {
    buttonContainer?: ThreadListItemLayoutButtonContainerProps;
    layout?: BoxLayout;
    leftButtonContainer?: ThreadListItemLayoutLeftButtonContainerProps;
    textsContainer?: ThreadListItemLayoutTextsContainerProps;
    unreadTextsContainer?: ThreadListItemLayoutUnreadTextsContainerProps;
}

export const ThreadListItemLayoutMainBox = ({ buttonContainer, layout, leftButtonContainer, textsContainer, unreadTextsContainer }: ThreadListItemLayoutMainBoxProps) => {
    return (
        <Region
            name="main_box"
            layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 40, ...layout }}
        >
            <ThreadListItemLayoutLeftButtonContainer {...leftButtonContainer} />
            <ThreadListItemLayoutTextsContainer {...textsContainer} />
            <ThreadListItemLayoutUnreadTextsContainer {...unreadTextsContainer} />
            <ThreadListItemLayoutButtonContainer {...buttonContainer} />
        </Region>
    );
};
