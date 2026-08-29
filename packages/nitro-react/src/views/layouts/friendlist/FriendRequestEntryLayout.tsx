import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1509_friend_request_entry_xml` (layout "friend_request_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestEntryLayoutProps {
    cont26981?: FriendRequestEntryLayoutCont26981Props;
    layout?: BoxLayout;
}

export const FriendRequestEntryLayout = ({ cont26981, layout }: FriendRequestEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <FriendRequestEntryLayoutCont26981 {...cont26981} />
        </Region>
    );
};

/** Named region `cont_26981` of FriendRequestEntryLayout - configured through the parent's `cont26981` prop. */
export interface FriendRequestEntryLayoutCont26981Props {
    captionInfoText?: string;
    captionRequesterNameText?: string;
    layout?: BoxLayout;
    onAccept?: () => void;
    onBgRegion?: () => void;
    onCont26981?: () => void;
    onReject?: () => void;
}

export const FriendRequestEntryLayoutCont26981 = ({ captionInfoText, captionRequesterNameText, layout, onAccept, onBgRegion, onCont26981, onReject }: FriendRequestEntryLayoutCont26981Props) => {
    return (
        <Region
            name="cont_26981"
            backgroundColor="#9a9773"
            onPointerTap={onCont26981}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 20, ...layout }}
        >
            <Region
                name="bg_region"
                onPointerTap={onBgRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
            />
            <Region
                name="user_info_region"
                layout={{ position: 'absolute', left: 0, width: 15, top: 5, height: 11 }}
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
            <Region
                name="requester_name_text"
                layout={{ position: 'absolute', left: 17, width: 101, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRequesterNameText ?? 'PH Requester Name'} />
            </Region>
            <Region
                name="info_text"
                layout={{ position: 'absolute', right: 13, width: 67, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionInfoText ?? 'PH Info Text'} />
            </Region>
            <Region
                name="accept"
                onPointerTap={onAccept}
                cursor="pointer"
                layout={{ position: 'absolute', right: 25, width: 16, top: 4, height: 14 }}
            >
                <Icon
                    variant="8"
                    name="icon"
                    tintColor="#33cc00"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                />
            </Region>
            <Region
                name="reject"
                onPointerTap={onReject}
                cursor="pointer"
                layout={{ position: 'absolute', right: 0, width: 16, top: 4, height: 14 }}
            >
                <Icon
                    variant="9"
                    name="icon"
                    tintColor="#ff3333"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                />
            </Region>
        </Region>
    );
};
