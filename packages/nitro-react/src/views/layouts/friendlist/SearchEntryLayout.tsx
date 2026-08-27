import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1525_search_entry_xml` (layout "search_entry", 190x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchEntryLayoutProps {
    captionCaption?: string;
    captionName?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    srcAskForFriend?: string;
    srcFace?: string;
    srcStartChat?: string;
}

export const SearchEntryLayout = ({ captionCaption, captionName, layout, onBgRegion, srcAskForFriend, srcFace, srcStartChat }: SearchEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 190, height: 20, ...layout }}>
            <Region
                name="entry"
                params={17}
                backgroundColor="#eeeeff"
                layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 20 }}
            >
                <Region
                    name="bg_region"
                    params={145}
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 20 }}
                />
                <Region
                    name="caption"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionCaption ?? 'PH CAPTION'} />
                </Region>
                <Region
                    name="user_info_region"
                    params={16}
                    layout={{ position: 'absolute', left: 21, width: 15, top: 5, height: 11 }}
                >
                    <Icon
                        variant="21"
                        name="icon_eye_off"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
                    />
                    <Icon
                        variant="22"
                        name="icon_eye_over"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
                    />
                </Region>
                <Region
                    name="name"
                    params={16}
                    layout={{ position: 'absolute', left: 37, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionName ?? 'PH Avatar Name'} />
                </Region>
                <ThemeImage
                    name="face"
                    params={16}
                    src={srcFace}
                    layout={{ position: 'absolute', left: -2, width: 20, top: 0, height: 20 }}
                />
                <ThemeImage
                    name="ask_for_friend"
                    params={81}
                    src={srcAskForFriend}
                    layout={{ position: 'absolute', left: 168, width: 17, top: 2, height: 16 }}
                />
                <ThemeImage
                    name="start_chat"
                    params={81}
                    src={srcStartChat}
                    layout={{ position: 'absolute', left: 170, width: 16, top: 3, height: 14 }}
                />
            </Region>
        </Region>
    );
};
