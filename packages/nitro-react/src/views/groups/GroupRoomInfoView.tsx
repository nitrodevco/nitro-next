import { IHabboGroupDetails, isGuildJoiningAllowed, isGuildMembershipRequestAllowed } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

import { GroupBadgeImage } from './GroupBadgeImage';

export interface GroupRoomInfoViewProps {
    details: IHabboGroupDetails;
    /** `_expanded`: the whole card, or the title bar alone. */
    expanded: boolean;
    onToggle: () => void;
    onInfo: () => void;
    onJoin: () => void;
    onManage: () => void;
}

/** `group_room_info`'s two backgrounds - the card and the collapsed title bar. */
const EXPANDED_HEIGHT = 119;
const CONTRACTED_HEIGHT = 25;

/**
 * The banner a group's base room shows - `group_room_info`, drawn by `GroupRoomInfoCtrl`. Flash
 * docks it in the toolbar's extension column, under the quest tracker and the event card; here it
 * is a child of that same column.
 */
export const GroupRoomInfoView = ({ details, expanded, onToggle, onInfo, onJoin, onManage }: GroupRoomInfoViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    // `onJoin` disables the button and every `refresh` enables it, so a new details answer brings it back.
    const [ joinSentFor, setJoinSentFor ] = useState<IHabboGroupDetails | undefined>(undefined);

    if (joinSentFor && (joinSentFor !== details)) setJoinSentFor(undefined);

    return (
        <Region layout={{ width: 195, height: expanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT }}>
            <ThemeImage
                name={expanded ? 'bg_expanded' : 'bg_contracted'}
                src={expanded ? `${imageLibraryUrl}guilds/group_bg.png` : `${imageLibraryUrl}Events/event_bg_contracted.png`}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: expanded ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT }}
            />
            <ThemeImage
                name="group_base_icon"
                src={`${imageLibraryUrl}guilds/group_base_icon.png`}
                layout={{ position: 'absolute', left: 5, width: 21, top: 3, height: 16 }}
            />
            <ThemeText
                text={t('group.homeroominfo.title')}
                textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 13 }}
                flashFormat={{ bold: true, letterSpacing: -0.4, antiAliasType: 'advanced' }}
                name="header_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', marginLeft: -4.5, marginRight: 4.5, top: 2 }}
            />
            <Region
                name="title_region"
                onPointerTap={onToggle}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: CONTRACTED_HEIGHT }}
            />
            {expanded && (
                <Region
                    name="info_region"
                    onPointerTap={onInfo}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 28, height: 47 }}
                />
            )}
            {expanded && (
                <GroupBadgeImage
                    badgeCode={details.badgeCode}
                    layout={{ position: 'absolute', left: 12, width: 39, top: 32, height: 39 }}
                />
            )}
            {expanded && (
                <ThemeText
                    text={details.groupName}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff', fontSize: 13, wordWrap: true, wordWrapWidth: 121 }}
                    clip
                    name="group_name_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 59, width: 125, top: 27, height: 50 }}
                />
            )}
            {expanded && isGuildJoiningAllowed(details) && (
                <ButtonThick
                    variant="3"
                    name="join_button"
                    disabled={joinSentFor === details}
                    onPointerTap={() => {
                        setJoinSentFor(details);
                        onJoin();
                    }}
                    layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                >
                    {t('group.join')}
                </ButtonThick>
            )}
            {expanded && isGuildMembershipRequestAllowed(details) && (
                <ButtonThick
                    variant="3"
                    name="request_membership_button"
                    onPointerTap={onJoin}
                    layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                >
                    {t('group.requestmembership')}
                </ButtonThick>
            )}
            {expanded && details.isOwner && (
                <ButtonThick
                    variant="3"
                    name="manage_button"
                    onPointerTap={onManage}
                    layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                >
                    {t('group.manage')}
                </ButtonThick>
            )}
        </Region>
    );
};
