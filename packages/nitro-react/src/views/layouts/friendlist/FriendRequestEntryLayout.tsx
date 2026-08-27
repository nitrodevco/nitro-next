import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1509_friend_request_entry_xml` (layout "friend_request_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestEntryLayoutProps {
    captionInfoText?: string;
    captionRequesterNameText?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const FriendRequestEntryLayout = ({ captionInfoText, captionRequesterNameText, layout, onBgRegion }: FriendRequestEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="cont_26981"
                params={17}
                backgroundColor="#9a9773"
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
                    name="user_info_region"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 5, height: 11 }}
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
                    name="requester_name_text"
                    params={16}
                    layout={{ position: 'absolute', left: 17, width: 101, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRequesterNameText ?? 'PH Requester Name'} />
                </Region>
                <Region
                    name="info_text"
                    params={80}
                    layout={{ position: 'absolute', left: 110, width: 67, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionInfoText ?? 'PH Info Text'} />
                </Region>
                <Region
                    name="accept"
                    params={81}
                    layout={{ position: 'absolute', left: 149, width: 16, top: 4, height: 14 }}
                >
                    <Icon
                        variant="8"
                        name="icon"
                        params={16}
                        tintColor="#33cc00"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                    />
                </Region>
                <Region
                    name="reject"
                    params={81}
                    layout={{ position: 'absolute', left: 174, width: 16, top: 4, height: 14 }}
                >
                    <Icon
                        variant="9"
                        name="icon"
                        params={16}
                        tintColor="#ff3333"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
