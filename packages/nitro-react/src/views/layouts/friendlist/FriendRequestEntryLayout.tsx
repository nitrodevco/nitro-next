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

/** Named region `bg_region` of FriendRequestEntryLayout - configured through the parent's `bgRegion` prop. */
export interface FriendRequestEntryLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const FriendRequestEntryLayoutBgRegion = ({ layout, onBgRegion }: FriendRequestEntryLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            params={145}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `user_info_region` of FriendRequestEntryLayout - configured through the parent's `userInfoRegion` prop. */
export interface FriendRequestEntryLayoutUserInfoRegionProps {
    layout?: BoxLayout;
}

export const FriendRequestEntryLayoutUserInfoRegion = ({ layout }: FriendRequestEntryLayoutUserInfoRegionProps) => {
    return (
        <Region
            name="user_info_region"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 15, top: 5, height: 11, ...layout }}
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
    );
};

/** Named region `accept` of FriendRequestEntryLayout - configured through the parent's `accept` prop. */
export interface FriendRequestEntryLayoutAcceptProps {
    layout?: BoxLayout;
    onAccept?: () => void;
}

export const FriendRequestEntryLayoutAccept = ({ layout, onAccept }: FriendRequestEntryLayoutAcceptProps) => {
    return (
        <Region
            name="accept"
            params={81}
            onPointerTap={onAccept}
            cursor="pointer"
            layout={{ position: 'absolute', right: 25, width: 16, top: 4, height: 14, ...layout }}
        >
            <Icon
                variant="8"
                name="icon"
                params={16}
                tintColor="#33cc00"
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
            />
        </Region>
    );
};

/** Named region `reject` of FriendRequestEntryLayout - configured through the parent's `reject` prop. */
export interface FriendRequestEntryLayoutRejectProps {
    layout?: BoxLayout;
    onReject?: () => void;
}

export const FriendRequestEntryLayoutReject = ({ layout, onReject }: FriendRequestEntryLayoutRejectProps) => {
    return (
        <Region
            name="reject"
            params={81}
            onPointerTap={onReject}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 16, top: 4, height: 14, ...layout }}
        >
            <Icon
                variant="9"
                name="icon"
                params={16}
                tintColor="#ff3333"
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
            />
        </Region>
    );
};

/** Named region `cont_26981` of FriendRequestEntryLayout - configured through the parent's `cont26981` prop. */
export interface FriendRequestEntryLayoutCont26981Props {
    accept?: FriendRequestEntryLayoutAcceptProps;
    bgRegion?: FriendRequestEntryLayoutBgRegionProps;
    captionInfoText?: string;
    captionRequesterNameText?: string;
    layout?: BoxLayout;
    onCont26981?: () => void;
    reject?: FriendRequestEntryLayoutRejectProps;
    userInfoRegion?: FriendRequestEntryLayoutUserInfoRegionProps;
}

export const FriendRequestEntryLayoutCont26981 = ({ accept, bgRegion, captionInfoText, captionRequesterNameText, layout, onCont26981, reject, userInfoRegion }: FriendRequestEntryLayoutCont26981Props) => {
    return (
        <Region
            name="cont_26981"
            params={17}
            backgroundColor="#9a9773"
            onPointerTap={onCont26981}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 20, ...layout }}
        >
            <FriendRequestEntryLayoutBgRegion {...bgRegion} />
            <FriendRequestEntryLayoutUserInfoRegion {...userInfoRegion} />
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
                layout={{ position: 'absolute', right: 13, width: 67, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionInfoText ?? 'PH Info Text'} />
            </Region>
            <FriendRequestEntryLayoutAccept {...accept} />
            <FriendRequestEntryLayoutReject {...reject} />
        </Region>
    );
};
