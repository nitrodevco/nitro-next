/**
 * Prints a browser expression for repeatable ExtendedProfileWindowCtrl visual checks.
 * Run after opening My Profile in an authenticated Vite client. These are local view
 * fixtures, not packet/server tests; populated uses the user's badge art as group placeholders.
 * Pipe stdout to `agent-browser --session nitro eval --stdin`. Reload also restores real state.
 */
const scenario = process.argv[2] ?? 'populated';

if (![ 'populated', 'empty', 'private', 'blocked', 'restore' ].includes(scenario)) {
    throw new Error('Expected populated, empty, private, blocked or restore');
}

async function preview(scenario) {
    const { profileStore } = await import('/src/context/user-profile/store/ProfileStore.ts');
    const { groupStore } = await import('/src/context/groups/store/GroupStore.ts');
    const { systemStore } = await import('/src/context/system/store/SystemStore.ts');
    const { userStore } = await import('/src/context/user/store/UserStore.ts');
    const system = systemStore.getState();
    const key = '__nitroProfileVisualFixture';

    if (!window[key]) {
        const profile = profileStore.getState();
        if (!profile.profile) throw new Error('Open My Profile first to capture the real response.');
        window[key] = {
            profile, groups: groupStore.getState().detailsById,
            badgeUrl: system.config['badge.asset.group.url'], blockedUserIds: userStore.getState().blockedUserIds,
        };
    }

    const saved = window[key];
    userStore.setState({ blockedUserIds: saved.blockedUserIds });
    profileStore.setState(saved.profile);
    groupStore.setState({ detailsById: saved.groups });
    system.setConfigValue('badge.asset.group.url', saved.badgeUrl);
    let profile = { ...saved.profile.profile };

    if (scenario === 'populated') {
        system.setConfigValue('badge.asset.group.url', system.config['badge.asset.url'].replace('%badgename%', '%badgedata%'));
        const badges = saved.profile.badges;
        const guilds = Array.from({ length: 6 }, (_, index) => ({
            groupId: -1000 - index,
            groupName: `Layout preview ${index + 1}`,
            badgeCode: badges[index % Math.max(1, badges.length)]?.badgeCode ?? '',
            primaryColor: 'ffffff', secondaryColor: 'ffffff', favourite: index === 0,
            ownerId: 0, hasForum: false,
        }));
        for (const guild of guilds) {
            groupStore.getState().setGroupDetails({
                ...guild, isGuild: true, type: 0, roomId: 0, roomName: 'Preview room',
                description: 'A group description long enough to check wrapping and scrolling. '.repeat(4),
                status: 1, totalMembers: 16, creationDate: '12-06-2017',
                isOwner: false, isAdmin: false, ownerName: 'Preview owner', openDetails: false,
                membersCanDecorate: false, pendingMemberCount: 0, hasBoard: false,
            });
        }
        profile = { ...profile, guilds, totalBadges: 192, totalBadgesRank: 3, accountLevel: 20 };
        profileStore.getState().setProfile(profile);
        profileStore.getState().setRelationships(profile.userId, [
            { relationshipStatusType: 2, friendCount: 4, randomFriendId: -1, randomFriendName: 'Example friend', randomFriendFigure: profile.figure },
            { relationshipStatusType: 3, friendCount: 1, randomFriendId: -2, randomFriendName: 'Another friend', randomFriendFigure: profile.figure },
        ]);
    } else if (scenario === 'empty') {
        profile = { ...profile, guilds: [] };
        profileStore.getState().setProfile(profile);
    } else if (scenario === 'private' || scenario === 'blocked') {
        profile = { ...profile, userId: -1000, userName: `${scenario} profile preview`, isHidden: scenario === 'private', isFriend: false };
        profileStore.getState().setProfile(profile);
        if (scenario === 'blocked') userStore.setState({ blockedUserIds: [ ...saved.blockedUserIds, profile.userId ] });
    }

    system.showWindow('user_profile', { userId: profile.userId });
    if (scenario === 'restore') delete window[key];
    return { scenario, userId: profile.userId, groups: profile.guilds.length };
}

const expression = `(${preview.toString()})(${JSON.stringify(scenario)})`;
process.stdout.write(process.argv.includes('--base64') ? Buffer.from(expression).toString('base64') : expression);
