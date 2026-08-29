import { ReactNode } from 'react';

import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2983_feed_entity_xml` (layout "feed_entity", 229x172) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedEntityLayoutProps {
    contentList?: FeedEntityLayoutContentListProps;
    layout?: BoxLayout;
    srcIcon?: string;
}

export const FeedEntityLayout = ({ contentList, layout, srcIcon }: FeedEntityLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 172, ...layout }}>
            <Border
                variant="3"
                name="item"
                tintColor="#f9f9f9"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 172 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    layout={{ position: 'absolute', left: 4, width: 50, top: 5, height: 60 }}
                />
                <FeedEntityLayoutContentList {...contentList} />
            </Border>
        </Region>
    );
};

/** Row template `title` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutTitleItem = ({ captionTitle, layout }: FeedEntityLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ width: 170, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? '001_lorem_idflgkjdl%20fkgjdf%20gdf%20gdfd%F6%20lgk%F6lkfggd%20'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `time` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutTimeItemProps {
    captionTime?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutTimeItem = ({ captionTime, layout }: FeedEntityLayoutTimeItemProps) => {
    return (
        <Region
            name="time"
            layout={{ width: 100, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTime ?? '_time'}
                textStyle="text-style-u-small"
                textOptions={{ fill: '#999999' }}
            />
        </Region>
    );
};

/** Row template `message` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutMessageItem = ({ captionMessage, layout }: FeedEntityLayoutMessageItemProps) => {
    return (
        <Region
            name="message"
            layout={{ width: 168, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessage ?? '_multiline message, whoop whoop whoop whoop whoop whoop dfgdfg dfgdfg dfgdf'}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 168 }}
            />
        </Region>
    );
};

/** Row template `decoration` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutDecorationItemProps {
    layout?: BoxLayout;
    srcDecoration?: string;
}

export const FeedEntityLayoutDecorationItem = ({ layout, srcDecoration }: FeedEntityLayoutDecorationItemProps) => {
    return (
        <ThemeImage
            name="decoration"
            src={srcDecoration}
            layout={{ width: 178, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `action_button` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutActionButtonItemProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const FeedEntityLayoutActionButtonItem = ({ layout, onActionButton }: FeedEntityLayoutActionButtonItemProps) => {
    return (
        <Button
            variant="3"
            name="action_button"
            onPointerTap={onActionButton}
            layout={{ width: 65, height: 22, flexShrink: 0, ...layout }}
        >
            _button
        </Button>
    );
};

/** Named region `content_list` of FeedEntityLayout - configured through the parent's `contentList` prop. */
export interface FeedEntityLayoutContentListProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
}

export const FeedEntityLayoutContentList = ({ itemsContentList, layout }: FeedEntityLayoutContentListProps) => {
    return (
        <Region
            name="content_list"
            layout={{ position: 'absolute', left: 50, right: 1, top: 4, bottom: 6, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsContentList ?? (
                <>
                    <FeedEntityLayoutTitleItem />
                    <FeedEntityLayoutTimeItem />
                    <FeedEntityLayoutMessageItem />
                    <FeedEntityLayoutDecorationItem />
                    <FeedEntityLayoutActionButtonItem />
                </>
            )}
        </Region>
    );
};
