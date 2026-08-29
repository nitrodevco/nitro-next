import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `71_message_xml` (layout "message", 121x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageLayoutProps {
    layout?: BoxLayout;
    message?: MessageLayoutMessageProps;
}

export const MessageLayout = ({ layout, message }: MessageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 37, ...layout }}>
            <MessageLayoutMessage {...message} />
        </Region>
    );
};

/** Row template `title` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const MessageLayoutTitleItem = ({ captionTitle, layout }: MessageLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ width: 120, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? 'Title'}
                textStyle="text-style-u-italic"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 120 }}
            />
        </Region>
    );
};

/** Row template `message` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const MessageLayoutMessageItem = ({ captionMessage, layout }: MessageLayoutMessageItemProps) => {
    return (
        <Region
            name="message"
            layout={{ width: 121, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessage ?? 'Message'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 121 }}
            />
        </Region>
    );
};

/** Named region `items` of MessageLayout - configured through the parent's `items` prop. */
export interface MessageLayoutItemsProps {
    itemsItems?: ReactNode;
    layout?: BoxLayout;
}

export const MessageLayoutItems = ({ itemsItems, layout }: MessageLayoutItemsProps) => {
    return (
        <Region
            name="items"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 31, flexDirection: 'column', gap: -1, ...layout }}
        >
            {itemsItems ?? (
                <>
                    <MessageLayoutTitleItem />
                    <MessageLayoutMessageItem />
                </>
            )}
        </Region>
    );
};

/** Named region `message` of MessageLayout - configured through the parent's `message` prop. */
export interface MessageLayoutMessageProps {
    items?: MessageLayoutItemsProps;
    layout?: BoxLayout;
}

export const MessageLayoutMessage = ({ items, layout }: MessageLayoutMessageProps) => {
    return (
        <Region
            name="message"
            backgroundColor="#4c5832"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37, ...layout }}
        >
            <MessageLayoutItems {...items} />
        </Region>
    );
};
