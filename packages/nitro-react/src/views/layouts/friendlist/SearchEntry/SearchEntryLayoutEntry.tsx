import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Named region `entry` of SearchEntryLayout - configured through the parent's `entry` prop. */
export interface SearchEntryLayoutEntryProps {
    bgRegion?: ReactNode;
    captionCaption?: string;
    captionName?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onEntry?: () => void;
    srcAskForFriend?: string;
    srcFace?: string;
    srcStartChat?: string;
    tintAskForFriend?: string;
    tintFace?: string;
    tintStartChat?: string;
}

export const SearchEntryLayoutEntry = ({ bgRegion, captionCaption, captionName, layout, onBgRegion, onEntry, srcAskForFriend, srcFace, srcStartChat, tintAskForFriend, tintFace, tintStartChat }: SearchEntryLayoutEntryProps) => {
    return (
        <Region
            name="entry"
            backgroundColor="#eeeeff"
            onPointerTap={onEntry}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="bg_region"
                onPointerTap={onBgRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {bgRegion}
            </Region>
            <Region
                name="caption"
                layout={{ position: 'absolute', left: 5, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCaption ?? 'PH CAPTION'}
            </Region>
            <Region
                name="user_info_region"
                layout={{ position: 'absolute', left: 21, width: 15, top: 5, height: 11 }}
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
                name="name"
                layout={{ position: 'absolute', left: 37, width: 200, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionName ?? 'PH Avatar Name'}
            </Region>
            <ThemeImage
                name="face"
                src={srcFace}
                tint={tintFace}
                layout={{ position: 'absolute', left: -2, width: 20, top: 0, height: 20 }}
            />
            <ThemeImage
                name="ask_for_friend"
                src={srcAskForFriend}
                tint={tintAskForFriend}
                layout={{ position: 'absolute', right: 5, width: 17, top: 2, height: 16 }}
            />
            <ThemeImage
                name="start_chat"
                src={srcStartChat}
                tint={tintStartChat}
                layout={{ position: 'absolute', right: 4, width: 16, top: 3, height: 14 }}
            />
        </Region>
    );
};
