/** The extended profile and its selected badges / relationship data from `ExtendedProfileWindowCtrl`. */
import { ExtendedProfileMessageType, IHabboUserBadge, IRelationshipStatusInfo } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    profile: ExtendedProfileMessageType | undefined;
    badges: IHabboUserBadge[];
    relationships: IRelationshipStatusInfo[];
};

type Actions = {
    setProfile: (profile: ExtendedProfileMessageType) => void;
    setBadges: (userId: number, badges: IHabboUserBadge[]) => void;
    setRelationships: (userId: number, relationships: IRelationshipStatusInfo[]) => void;
    clearProfile: () => void;
};

export type ProfileSlice = State & Actions;

export const ProfileSliceInitialState: State = {
    profile: undefined,
    badges: [],
    relationships: [],
};

export const createProfileSlice: StateCreator<ProfileSlice, [], [], ProfileSlice> = set => ({
    ...ProfileSliceInitialState,
    setProfile: profile => set(state => ({
        profile,
        badges: state.profile?.userId === profile.userId ? state.badges : [],
        relationships: state.profile?.userId === profile.userId ? state.relationships : [],
    })),
    setBadges: (userId, badges) => set(state => (state.profile?.userId === userId ? { badges } : state)),
    setRelationships: (userId, relationships) => set(state => (state.profile?.userId === userId ? { relationships } : state)),
    clearProfile: () => set(ProfileSliceInitialState),
});
