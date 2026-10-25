/** The extended profile and its selected badges / relationship data from `ExtendedProfileWindowCtrl`. */
import { ExtendedProfileMessageType, IHabboUserBadge, IRelationshipStatusInfo } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    profile: ExtendedProfileMessageType | undefined;
    badges: IHabboUserBadge[];
    relationships: IRelationshipStatusInfo[];
    /** `_selectedGroupId`: the controller's, so it outlives a refresh and carries over to the next profile that has it. */
    selectedGroupId: number;
};

type Actions = {
    setProfile: (profile: ExtendedProfileMessageType) => void;
    setBadges: (userId: number, badges: IHabboUserBadge[]) => void;
    setRelationships: (userId: number, relationships: IRelationshipStatusInfo[]) => void;
    /** `ExtendedProfileWindowCtrl.onAddAsFriend`: the shown profile's `isFriendRequestSent`, once the request is out. */
    markFriendRequestSent: (userId: number) => void;
    /** `onSelectGroup` / `onMakeFavourite` / `onClearFavourite`. */
    selectGroup: (groupId: number) => void;
    clearProfile: () => void;
};

export type ProfileSlice = State & Actions;

export const ProfileSliceInitialState: State = {
    profile: undefined,
    badges: [],
    relationships: [],
    selectedGroupId: 0,
};

export const createProfileSlice: StateCreator<ProfileSlice, [], [], ProfileSlice> = set => ({
    ...ProfileSliceInitialState,
    // `onProfile` -> `getSelectedGroup`: the selected group while the profile still has it, else the first, else none.
    setProfile: profile => set(state => ({
        profile,
        selectedGroupId: profile.guilds.some(group => group.groupId === state.selectedGroupId) ? state.selectedGroupId : (profile.guilds[0]?.groupId ?? 0),
        badges: state.profile?.userId === profile.userId ? state.badges : [],
        relationships: state.profile?.userId === profile.userId ? state.relationships : [],
    })),
    setBadges: (userId, badges) => set(state => (state.profile?.userId === userId ? { badges } : state)),
    setRelationships: (userId, relationships) => set(state => (state.profile?.userId === userId ? { relationships } : state)),
    markFriendRequestSent: userId => set(state => (state.profile?.userId === userId ? { profile: { ...state.profile, isFriendRequestSent: true } } : state)),
    selectGroup: groupId => set({ selectedGroupId: groupId }),
    clearProfile: () => set(ProfileSliceInitialState),
});
