import { IGuildMemberData, IMemberData } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { groupMemberPageCount } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

import { GroupBadgeImage } from './GroupBadgeImage';
import { GroupMemberEntry } from './GroupMemberEntry';

export interface GroupMembersViewProps {
    members: IGuildMemberData;
    /** The filter box's live text, which the window owns until the search timer fires. */
    filterText: string;
    searching: boolean;
    /** The viewer's own id - their row carries no actions. */
    ownUserId: number;
    /** `populateSearchTypes`: the blocked option is only offered where blocking is on. */
    blockingEnabled: boolean;
    onClose: () => void;
    onFilterTextChange: (filterText: string) => void;
    onSearchType: (searchType: number) => void;
    onPage: (pageIndex: number) => void;
    onProfile: (member: IMemberData) => void;
    onAction: (member: IMemberData) => void;
    onRemove: (member: IMemberData) => void;
    onBlock: (member: IMemberData) => void;
}

/** `GuildMembersWindowCtrl.MEMBER_SPACING`, and the `member_entry` layout's own size. */
const MEMBER_SPACING_X = 5;
const MEMBER_SPACING_Y = 5;
const MEMBER_WIDTH = 164;
const MEMBER_HEIGHT = 35;

/**
 * The members window - `guild_members_window`, drawn by `GuildMembersWindowCtrl`. The server owns
 * the paging: every filter, type and page change asks for a page and the answer replaces the grid,
 * so the window draws exactly `pageSize` slots and hides the ones the answer did not fill.
 *
 * There is no accept-all button: `GuildMembersWindowCtrl.onAcceptAll` is written but never bound,
 * and `guild_members_window` has no control to bind it to.
 */
export const GroupMembersView = ({
    members, filterText, searching, ownUserId, blockingEnabled, onClose, onFilterTextChange, onSearchType, onPage, onProfile, onAction, onRemove, onBlock,
}: GroupMembersViewProps) => {
    const t = useTranslation();
    const [ pageInput, setPageInput ] = useState('');

    const totalPages = groupMemberPageCount(members);
    const pageNumber = members.pageIndex + 1;

    // `populateSearchTypes`: the last two options only exist for someone who may manage the group.
    const searchOptions = [ t('group.members.search.all'), t('group.members.search.admins') ];

    if (members.allowedToManage) {
        searchOptions.push(t('group.members.search.pending'));

        if (blockingEnabled) searchOptions.push(t('group.members.search.blocked'));
    }

    /*
     * `populateSearchTypes`: someone who may not manage the group has only the first two options,
     * so a search type past them - one the server echoed back - shows as the second.
     */
    const selectedSearchType = members.allowedToManage ? Number(members.searchType) : Math.min(Number(members.searchType), 1);

    // `group.members.pageinfo` is one string with the page input sitting inside it, at `%page%`.
    const [ pageTextStart = '', pageTextEnd = '' ] = t('group.members.pageinfo', '', {
        amount: `${members.totalEntries}`,
        totalPages: `${totalPages}`,
    }).split('%page%');

    /** `navigateToInputPage`: what was typed, clamped, and put back into the box when it was out of range. */
    const goToTypedPage = () => {
        const typed = parseInt(pageInput, 10) || 0;
        const limited = Math.max(1, Math.min(typed, totalPages));

        setPageInput('');
        onPage(limited - 1);
    };

    return (
        <Frame
            variant="3"
            name="groups_members_window"
            caption={t('group.members.title', '', { groupName: members.groupName })}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 352, height: 431 }}
            margins={[ 0, 33, 0, 3 ]}
        >
            <Region
                name="header_cont"
                layout={{ position: 'absolute', left: 10, right: 9, top: 0, height: 77 }}
            >
                <GroupBadgeImage
                    badgeCode={members.badgeCode}
                    layout={{ position: 'absolute', left: 17, width: 39, top: 22, height: 39 }}
                />
                <TextInput
                    value={filterText}
                    onChange={onFilterTextChange}
                    placeholder={t('group.members.searchinfo')}
                    fontFamily="Ubuntu"
                    fontSize={13}
                    flashPlacement
                    border="#000000"
                    backgroundColor="#ffffff"
                    focusedBackgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 78, right: 41, top: 14, height: 25 }}
                />
                {searching && (
                    <Icon
                        variant="23"
                        name="searching_icon"
                        layout={{ position: 'absolute', left: 300, width: 15, top: 18, height: 15 }}
                    />
                )}
                <Dropmenu
                    variant="3"
                    caption={searchOptions[selectedSearchType] ?? searchOptions[0]}
                    options={searchOptions.map((label, index) => ({ key: index, label, selected: index === selectedSearchType, onSelect: () => onSearchType(index) }))}
                    layout={{ position: 'absolute', left: 78, right: 12, top: 48, height: 25 }}
                />
            </Region>
            <Region
                name="members_cont"
                layout={{ position: 'absolute', left: 10, right: 9, top: 82, bottom: 36 }}
            >
                {Array.from({ length: members.pageSize }, (unused, index) => members.entries[index]).map((member, index) => (member
                    ? (
                            <Region
                                key={member.userId}
                                layout={{
                                    position: 'absolute',
                                    left: ((index % 2) === 0) ? 0 : (MEMBER_WIDTH + MEMBER_SPACING_X),
                                    top: Math.floor(index / 2) * (MEMBER_HEIGHT + MEMBER_SPACING_Y),
                                    width: MEMBER_WIDTH,
                                    height: MEMBER_HEIGHT,
                                }}
                            >
                                <GroupMemberEntry
                                    member={member}
                                    allowedToManage={members.allowedToManage}
                                    isSelf={member.userId === ownUserId}
                                    onProfile={() => onProfile(member)}
                                    onAction={() => onAction(member)}
                                    onRemove={() => onRemove(member)}
                                    onBlock={() => onBlock(member)}
                                />
                            </Region>
                        )
                    : null))}
            </Region>
            <Region
                name="footer_cont"
                layout={{ position: 'absolute', left: 10, right: 9, bottom: 7, height: 25, overflow: 'hidden', justifyContent: 'center' }}
            >
                {(members.pageIndex > 0) && (
                    <ContainerButton
                        variant="3"
                        name="previous_page_button"
                        onPointerTap={() => onPage(members.pageIndex - 1)}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 25, minWidth: 50, maxWidth: 50 }}
                    >
                        <Icon
                            variant="4"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 21, width: 16, top: 7, height: 16 }}
                        />
                    </ContainerButton>
                )}
                {(members.pageIndex < (totalPages - 1)) && (
                    <ContainerButton
                        variant="3"
                        name="next_page_button"
                        onPointerTap={() => onPage(members.pageIndex + 1)}
                        layout={{ position: 'absolute', right: 0, width: 50, top: 0, height: 25, minWidth: 50, maxWidth: 50 }}
                    >
                        <Icon
                            variant="5"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 24, width: 17, top: 7, height: 16 }}
                        />
                    </ContainerButton>
                )}
                <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                    <Region
                        name="pagina_text_start"
                        alpha={0.7}
                        layout={{ flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={pageTextStart}
                            textStyle="u_regular"
                        />
                    </Region>
                    <TextInput
                        value={pageInput.length ? pageInput : `${pageNumber}`}
                        onChange={value => setPageInput(value.replace(/\D/g, ''))}
                        onEnter={goToTypedPage}
                        onFocusChange={focused => !focused && pageInput.length && goToTypedPage()}
                        textStyle="u_regular"
                        flashPlacement
                        border="#000000"
                        backgroundColor="#ffffff"
                        focusedBackgroundColor="#ffffff"
                        layout={{ width: 21, height: 17, flexShrink: 0 }}
                    />
                    <Region
                        name="pagina_text_end"
                        alpha={0.7}
                        layout={{ flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={pageTextEnd}
                            textStyle="u_regular"
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
