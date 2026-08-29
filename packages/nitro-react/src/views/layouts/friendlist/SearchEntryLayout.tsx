import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1525_search_entry_xml` (layout "search_entry", 190x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchEntryLayoutProps {
    entry?: SearchEntryLayoutEntryProps;
    layout?: BoxLayout;
}

export const SearchEntryLayout = ({ entry, layout }: SearchEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 190, height: 20, ...layout }}>
            <SearchEntryLayoutEntry {...entry} />
        </Region>
    );
};

/** Named region `bg_region` of SearchEntryLayout - configured through the parent's `bgRegion` prop. */
export interface SearchEntryLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const SearchEntryLayoutBgRegion = ({ layout, onBgRegion }: SearchEntryLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `user_info_region` of SearchEntryLayout - configured through the parent's `userInfoRegion` prop. */
export interface SearchEntryLayoutUserInfoRegionProps {
    layout?: BoxLayout;
}

export const SearchEntryLayoutUserInfoRegion = ({ layout }: SearchEntryLayoutUserInfoRegionProps) => {
    return (
        <Region
            name="user_info_region"
            layout={{ position: 'absolute', left: 21, width: 15, top: 5, height: 11, ...layout }}
        >
            <Icon
                variant="21"
                name="icon_eye_off"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
            />
            <Icon
                variant="22"
                name="icon_eye_over"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
            />
        </Region>
    );
};

/** Named region `entry` of SearchEntryLayout - configured through the parent's `entry` prop. */
export interface SearchEntryLayoutEntryProps {
    bgRegion?: SearchEntryLayoutBgRegionProps;
    captionCaption?: string;
    captionName?: string;
    layout?: BoxLayout;
    onEntry?: () => void;
    srcAskForFriend?: string;
    srcFace?: string;
    srcStartChat?: string;
    userInfoRegion?: SearchEntryLayoutUserInfoRegionProps;
}

export const SearchEntryLayoutEntry = ({ bgRegion, captionCaption, captionName, layout, onEntry, srcAskForFriend, srcFace, srcStartChat, userInfoRegion }: SearchEntryLayoutEntryProps) => {
    return (
        <Region
            name="entry"
            backgroundColor="#eeeeff"
            onPointerTap={onEntry}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 20, ...layout }}
        >
            <SearchEntryLayoutBgRegion {...bgRegion} />
            <Region
                name="caption"
                layout={{ position: 'absolute', left: 5, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCaption ?? 'PH CAPTION'} />
            </Region>
            <SearchEntryLayoutUserInfoRegion {...userInfoRegion} />
            <Region
                name="name"
                layout={{ position: 'absolute', left: 37, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionName ?? 'PH Avatar Name'} />
            </Region>
            <ThemeImage
                name="face"
                src={srcFace}
                layout={{ position: 'absolute', left: -2, width: 20, top: 0, height: 20 }}
            />
            <ThemeImage
                name="ask_for_friend"
                src={srcAskForFriend}
                layout={{ position: 'absolute', right: 5, width: 17, top: 2, height: 16 }}
            />
            <ThemeImage
                name="start_chat"
                src={srcStartChat}
                layout={{ position: 'absolute', right: 4, width: 16, top: 3, height: 14 }}
            />
        </Region>
    );
};
