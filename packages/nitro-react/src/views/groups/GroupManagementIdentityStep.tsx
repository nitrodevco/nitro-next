import { GROUP_MAX_DESCRIPTION_LENGTH, GROUP_MAX_NAME_LENGTH, GroupManagementSession } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { Border, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

import { GroupBadgeImage } from './GroupBadgeImage';

export interface GroupManagementIdentityStepProps {
    session: GroupManagementSession;
    onName: (name: string) => void;
    onDescription: (description: string) => void;
    onBaseRoom: (roomId: number) => void;
    onMembers: () => void;
}

/**
 * The identity step - `step_cont_1`. A group that exists shows its badge and member count in the
 * left column; a group being created chooses its base room there instead.
 *
 * The layout's `create_room_link` is not offered: it calls `startRoomCreation`, which opens the
 * navigator's room-creation view, and that view is not ported.
 */
export const GroupManagementIdentityStep = ({ session, onName, onDescription, onBaseRoom, onMembers }: GroupManagementIdentityStepProps) => {
    const t = useTranslation();

    // `prepareRoomSelection`: the prompt is option 0, and the rooms follow it in the order they came.
    const roomOptions = [
        { key: 0, label: t('group.edit.base.select.room'), selected: session.baseRoomId === 0, onSelect: () => onBaseRoom(0) },
        ...session.ownedRooms.map(room => ({
            key: room.roomId,
            label: room.roomName,
            selected: room.roomId === session.baseRoomId,
            onSelect: () => onBaseRoom(room.roomId),
        })),
    ];

    const selectedRoom = session.ownedRooms.find(room => room.roomId === session.baseRoomId);

    return (
        <Region
            name="step_cont_1"
            layout={{ position: 'absolute', left: 0, right: 19, top: 128, height: 310 }}
        >
            {session.exists && (
                <Border
                    variant="0"
                    name="step_1_badge"
                    layout={{ position: 'absolute', left: 17, width: 94, top: 11, height: 94 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                    />
                    <GroupBadgeImage
                        badgeCode={session.badgeCode}
                        layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                    />
                </Border>
            )}
            {session.exists && (
                <Region
                    name="step_1_members_region"
                    onPointerTap={onMembers}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 17, width: 94, top: 110, height: 18, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('group.membercount', '', { totalMembers: `${session.membershipCount}` })}
                        textStyle="u_bold"
                        flashFormat={{ underline: true }}
                        name="step_1_members_txt"
                        verticalAlign="top"
                        layout={{ position: 'absolute', top: 0 }}
                    />
                </Region>
            )}
            <ThemeText
                text={t('group.edit.name')}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 13 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                name="name_label"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 126, top: -8 }}
            />
            <TextInput
                value={session.name}
                onChange={onName}
                maxLength={GROUP_MAX_NAME_LENGTH - 1}
                fontFamily="Ubuntu"
                fontSize={13}
                flashPlacement
                border="#000000"
                backgroundColor="#ffffff"
                focusedBackgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 126, right: 0, top: 14, height: 26 }}
            />
            <ThemeText
                text={t('group.edit.desc')}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 13 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                name="desc_label"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 126, top: 52 }}
            />
            <TextInput
                value={session.description}
                onChange={onDescription}
                maxLength={GROUP_MAX_DESCRIPTION_LENGTH - 1}
                multiline
                fontFamily="Ubuntu"
                fontSize={13}
                flashPlacement
                border="#000000"
                backgroundColor="#ffffff"
                focusedBackgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 126, right: 0, top: 74, height: 80 }}
            />
            {!session.exists && (
                <ThemeText
                    text={t('group.edit.base')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 13 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    name="base_label"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 126, top: 166 }}
                />
            )}
            {!session.exists && (
                <Dropmenu
                    variant="0"
                    caption={selectedRoom?.roomName ?? t('group.edit.base.select.room')}
                    options={roomOptions}
                    layout={{ position: 'absolute', left: 126, right: 0, top: 188, height: 26 }}
                />
            )}
            {!session.exists && (
                <ThemeText
                    text={t('group.edit.base.warning')}
                    textStyle="u_regular"
                    textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 243 }}
                    flashFormat={{ italic: true }}
                    clip
                    name="base_warning"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 126, right: 0, top: 214, height: 38 }}
                />
            )}
        </Region>
    );
};
