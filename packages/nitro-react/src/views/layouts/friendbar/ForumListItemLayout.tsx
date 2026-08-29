import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `83_forum_list_item_xml` (layout "forum_list_item", 500x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ForumListItemLayoutProps {
    layout?: BoxLayout;
    mainBox?: ForumListItemLayoutMainBoxProps;
}

export const ForumListItemLayout = ({ layout, mainBox }: ForumListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 41, ...layout }}>
            <ForumListItemLayoutMainBox {...mainBox} />
        </Region>
    );
};

/** Named region `left_button_container` of ForumListItemLayout - configured through the parent's `leftButtonContainer` prop. */
export interface ForumListItemLayoutLeftButtonContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ForumListItemLayoutLeftButtonContainer = ({ layout, tags }: ForumListItemLayoutLeftButtonContainerProps) => {
    return (
        <Region
            name="left_button_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="group_icon"
                options={{ 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 1, width: 39, top: 1, height: 39 }}
            />
        </Region>
    );
};

/** Named region `header_region` of ForumListItemLayout - configured through the parent's `headerRegion` prop. */
export interface ForumListItemLayoutHeaderRegionProps {
    captionHeader?: string;
    layout?: BoxLayout;
    onHeaderRegion?: () => void;
    tags?: string[];
}

export const ForumListItemLayoutHeaderRegion = ({ captionHeader, layout, onHeaderRegion, tags }: ForumListItemLayoutHeaderRegionProps) => {
    return (
        <Region
            name="header_region"
            tags={tags}
            onPointerTap={onHeaderRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17, ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHeader ?? 'Some group header'} />
            </Region>
        </Region>
    );
};

/** Named region `texts_container` of ForumListItemLayout - configured through the parent's `textsContainer` prop. */
export interface ForumListItemLayoutTextsContainerProps {
    captionDetails?: string;
    headerRegion?: ForumListItemLayoutHeaderRegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const ForumListItemLayoutTextsContainer = ({ captionDetails, headerRegion, layout, tags }: ForumListItemLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            tags={tags}
            layout={{ position: 'absolute', left: 42, width: 357, top: 0, height: 40, ...layout }}
        >
            <ForumListItemLayoutHeaderRegion {...headerRegion} />
            <Region
                name="details"
                layout={{ position: 'absolute', left: 0, width: 459, top: 16, height: 16, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionDetails ?? 'Rating 1000, last message by LongLongLongName 30 seconds ago'} />
            </Region>
        </Region>
    );
};

/** Named region `unread_region` of ForumListItemLayout - configured through the parent's `unreadRegion` prop. */
export interface ForumListItemLayoutUnreadRegionProps {
    layout?: BoxLayout;
    onUnreadRegion?: () => void;
    tags?: string[];
}

export const ForumListItemLayoutUnreadRegion = ({ layout, onUnreadRegion, tags }: ForumListItemLayoutUnreadRegionProps) => {
    return (
        <Region
            name="unread_region"
            tags={tags}
            onPointerTap={onUnreadRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 40, ...layout }}
        />
    );
};

/** Named region `unread_texts_container` of ForumListItemLayout - configured through the parent's `unreadTextsContainer` prop. */
export interface ForumListItemLayoutUnreadTextsContainerProps {
    captionMessages1?: string;
    captionMessages2?: string;
    layout?: BoxLayout;
    tags?: string[];
    unreadRegion?: ForumListItemLayoutUnreadRegionProps;
}

export const ForumListItemLayoutUnreadTextsContainer = ({ captionMessages1, captionMessages2, layout, tags, unreadRegion }: ForumListItemLayoutUnreadTextsContainerProps) => {
    return (
        <Region
            name="unread_texts_container"
            tags={tags}
            layout={{ position: 'absolute', left: 400, width: 100, top: 0, height: 40, ...layout }}
        >
            <ForumListItemLayoutUnreadRegion {...unreadRegion} />
            <Region
                name="messages1"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessages1 ?? '100 messages'}
                    textStyle="text-style-regular"
                />
            </Region>
            <Region
                name="messages2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessages2 ?? '12 new'}
                    textStyle="text-style-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `main_box` of ForumListItemLayout - configured through the parent's `mainBox` prop. */
export interface ForumListItemLayoutMainBoxProps {
    layout?: BoxLayout;
    leftButtonContainer?: ForumListItemLayoutLeftButtonContainerProps;
    tags?: string[];
    textsContainer?: ForumListItemLayoutTextsContainerProps;
    unreadTextsContainer?: ForumListItemLayoutUnreadTextsContainerProps;
}

export const ForumListItemLayoutMainBox = ({ layout, leftButtonContainer, tags, textsContainer, unreadTextsContainer }: ForumListItemLayoutMainBoxProps) => {
    return (
        <Region
            name="main_box"
            tags={tags}
            backgroundColor="#eefeff"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 41, ...layout }}
        >
            <ForumListItemLayoutLeftButtonContainer {...leftButtonContainer} />
            <ForumListItemLayoutTextsContainer
                tags={[ 'relative(1)' ]}
                {...textsContainer}
            />
            <ForumListItemLayoutUnreadTextsContainer {...unreadTextsContainer} />
        </Region>
    );
};
