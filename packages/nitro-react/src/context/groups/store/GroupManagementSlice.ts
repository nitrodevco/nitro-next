import { ColorConverter } from '@nitrodevco/nitro-api';
import { GUILD_TYPE_REGULAR, IGuildBadgeSettings, IGuildColorData, IGuildCreationData, IGuildEditData, IGuildEditorData, IRoomEntryData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { BadgeLayerOptions, badgeLayersFromSettings, badgePrimaryColorIndex, badgeSecondaryColorIndex } from './badgeLayerOptions';

/** `GuildManagementWindowCtrl.VIEW_*` - the wizard's steps, and the edit window's tabs. */
export const GROUP_MANAGEMENT_VIEW_IDENTITY = 1;
export const GROUP_MANAGEMENT_VIEW_BADGE = 2;
export const GROUP_MANAGEMENT_VIEW_COLORS = 3;
export const GROUP_MANAGEMENT_VIEW_CONFIRM = 4;
export const GROUP_MANAGEMENT_VIEW_SETTINGS = 5;

/** `GuildManagementWindowCtrl.MAX_NAME_LENGTH` / `MAX_DESCRIPTION_LENGTH`. */
export const GROUP_MAX_NAME_LENGTH = 30;
export const GROUP_MAX_DESCRIPTION_LENGTH = 255;

/** `GuildSettingsData.RIGHTS_MEMBERS`, and the level Flash falls back to when no box is ticked. */
export const GUILD_RIGHTS_MEMBERS = 0;
export const GUILD_RIGHTS_ADMINS = 1;

/**
 * The management window's session - `GuildManagementWindowCtrl`'s data object together with the
 * form it edits. Flash keeps the form in the windows themselves and reads it back on every step
 * change; here the form is the state and the views are its inputs, which is the same thing said
 * once.
 *
 * `exists` is `GuildCreationData.exists` / `GuildEditData.exists`: false is the four-step creation
 * wizard, true the four-tab editor of a group that is already there.
 */
export interface GroupManagementSession {
    exists: boolean;
    isOwner: boolean;
    groupId: number;
    ownedRooms: IRoomEntryData[];
    /** Creation only - `GuildCreationData.costInCredits`, named in the buy panel. */
    costInCredits: number;
    /** Editing only - the badge the group wears, and how many members it has. */
    badgeCode: string;
    membershipCount: number;
    /** The badge the server sent, which the badge step's reset link goes back to. */
    badgeSettings: IGuildBadgeSettings[];
    /** The colours the server sent, which the colour step's reset link goes back to. */
    originalPrimaryColorId: number;
    originalSecondaryColorId: number;
    name: string;
    description: string;
    baseRoomId: number;
    layers: BadgeLayerOptions[];
    primaryColorId: number;
    secondaryColorId: number;
    guildType: number;
    rightsLevel: number;
    /**
     * The base room the user has already been warned carries room controllers - `validateView`
     * keeps it so warning about the same room twice does not stop them leaving step one.
     */
    warnedControllersRoomId: number;
    /** Whether the colour step has been seeded from the badge yet - Flash's `ColorGridCtrl.isInitialized`. */
    colorsSeeded: boolean;
}

type State = {
    session: GroupManagementSession | undefined;
    /** The step or tab being shown - one of the `GROUP_MANAGEMENT_VIEW_*` values. */
    step: number;
    /**
     * The badge layer whose symbol is being picked, which replaces the layer list while it is set
     * (`BadgeEditorCtrl.onShowSelectPart` swaps `part_edit` for `part_select`).
     */
    pickingLayerIndex: number | undefined;
    /** `HabboGroupsManager.guildEditorData` - the badge parts and palettes, asked for once a session. */
    editorData: IGuildEditorData | undefined;
    /** The group just created, which the welcome window names; 0 when that window is closed. */
    createdGroupId: number;
    /**
     * Which club-required window to show: Flash's `HcRequiredWindowCtrl.show`, whose flag picks
     * between the join and the manage wording.
     */
    hcRequiredFor: 'join' | 'manage' | undefined;
};

type Actions = {
    /** `onGuildCreationInfo`. */
    openGroupCreation: (data: IGuildCreationData) => void;
    /** `onGuildEditInfo`. */
    openGroupEdit: (data: IGuildEditData) => void;
    /** `GuildManagementWindowCtrl.close`. */
    closeGroupManagement: () => void;
    setGroupManagementStep: (step: number) => void;
    setGroupManagementName: (name: string) => void;
    setGroupManagementDescription: (description: string) => void;
    setGroupManagementBaseRoom: (baseRoomId: number) => void;
    /** `onFlatCreated`: a room made from the wizard's link goes to the top of the list and is selected. */
    addGroupManagementRoom: (roomId: number, roomName: string) => void;
    setGroupBadgeLayer: (layerIndex: number, layer: BadgeLayerOptions) => void;
    /** `onBadgeReset`. */
    resetGroupBadge: () => void;
    /** `onColorReset`. */
    resetGroupColors: () => void;
    setGroupPrimaryColor: (primaryColorId: number) => void;
    setGroupSecondaryColor: (secondaryColorId: number) => void;
    setGroupType: (guildType: number) => void;
    setGroupRightsLevel: (rightsLevel: number) => void;
    setGroupWarnedControllersRoom: (roomId: number) => void;
    /**
     * `refresh`'s colour step: a new group's guild colours start as the badge's own, matched into
     * the guild palettes. Does nothing once the step has been seeded, or while editing.
     */
    seedGroupColorsFromBadge: () => void;
    /** `BadgeEditorCtrl.onShowSelectPart`. */
    openBadgePartPicker: (layerIndex: number) => void;
    /** `onPartSelected`, and `onViewChange` when the step is left with the picker open. */
    closeBadgePartPicker: () => void;
    /** `onGuildEditorData`. */
    setGuildEditorData: (editorData: IGuildEditorData) => void;
    /** `GroupCreatedWindowCtrl.show` / `close`. */
    setCreatedGroupId: (createdGroupId: number) => void;
    /** `HcRequiredWindowCtrl.show` / `close`. */
    setHcRequiredFor: (hcRequiredFor: 'join' | 'manage' | undefined) => void;
};

export const GroupManagementSliceInitialState: State = {
    session: undefined,
    step: GROUP_MANAGEMENT_VIEW_IDENTITY,
    pickingLayerIndex: undefined,
    editorData: undefined,
    createdGroupId: 0,
    hcRequiredFor: undefined,
};

export type GroupManagementSlice = State & Actions;

/** `GuildManagementWindowCtrl.limitStep` - the wizard runs from identity to confirm, settings being a tab only. */
export const limitGroupManagementStep = (step: number): number =>
    Math.max(GROUP_MANAGEMENT_VIEW_IDENTITY, Math.min(step, GROUP_MANAGEMENT_VIEW_CONFIRM));

/** `GuildEditorData.findClosestColor`: the palette entry nearest a badge colour in CIE Lab space. */
const findClosestColorId = (color: IGuildColorData, palette: IGuildColorData[]): number => {
    const target = ColorConverter.rgb2CieLab(color.color);

    let best = 0;
    let bestDistance = Number.MAX_VALUE;

    for (let i = 0; i < palette.length; i++) {
        const candidate = ColorConverter.rgb2CieLab(palette[i].color);
        const distance = Math.pow(target.x - candidate.x, 2) + Math.pow(target.y - candidate.y, 2) + Math.pow(target.z - candidate.z, 2);

        if (distance >= bestDistance) continue;

        bestDistance = distance;
        best = i;
    }

    return palette[best]?.id ?? 0;
};

/** `GuildEditorData.findMatchingPrimaryColorId` / `findMatchingSecondaryColorId`. */
const matchGuildColorId = (badgeColorIndex: number, editorData: IGuildEditorData, palette: IGuildColorData[]): number => {
    if ((badgeColorIndex < 0) || !editorData.badgeColors.length || (badgeColorIndex >= editorData.badgeColors.length) || !palette.length) return 0;

    return findClosestColorId(editorData.badgeColors[badgeColorIndex], palette);
};

export const createGroupManagementSlice: StateCreator<GroupManagementSlice, [], [], GroupManagementSlice> = (set, get) => {
    /** Every action that edits the form leaves the session alone when there is none open. */
    const editSession = (change: (session: GroupManagementSession) => Partial<GroupManagementSession>) => set((x) => {
        if (!x.session) return x;

        return { session: { ...x.session, ...change(x.session) } };
    });

    return {
        ...GroupManagementSliceInitialState,
        openGroupCreation: data => set(x => ({
            step: GROUP_MANAGEMENT_VIEW_IDENTITY,
            pickingLayerIndex: undefined,
            session: {
                exists: false,
                isOwner: true,
                groupId: 0,
                ownedRooms: data.ownedRooms,
                costInCredits: data.costInCredits,
                badgeCode: '',
                membershipCount: 0,
                badgeSettings: data.badgeSettings,
                originalPrimaryColorId: 0,
                originalSecondaryColorId: 0,
                name: '',
                description: '',
                baseRoomId: 0,
                layers: badgeLayersFromSettings(data.badgeSettings, x.editorData),
                primaryColorId: 0,
                secondaryColorId: 0,
                guildType: GUILD_TYPE_REGULAR,
                rightsLevel: GUILD_RIGHTS_MEMBERS,
                warnedControllersRoomId: 0,
                colorsSeeded: false,
            },
        })),
        openGroupEdit: data => set(x => ({
            step: GROUP_MANAGEMENT_VIEW_IDENTITY,
            pickingLayerIndex: undefined,
            session: {
                exists: true,
                isOwner: data.isOwner,
                groupId: data.groupId,
                ownedRooms: data.ownedRooms,
                costInCredits: 0,
                badgeCode: data.badgeCode,
                membershipCount: data.membershipCount,
                badgeSettings: data.badgeSettings,
                originalPrimaryColorId: data.primaryColorId,
                originalSecondaryColorId: data.secondaryColorId,
                name: data.groupName,
                description: data.groupDescription,
                baseRoomId: data.baseRoomId,
                layers: badgeLayersFromSettings(data.badgeSettings, x.editorData),
                primaryColorId: data.primaryColorId,
                secondaryColorId: data.secondaryColorId,
                guildType: data.guildType,
                rightsLevel: data.rightsLevel,
                warnedControllersRoomId: 0,
                colorsSeeded: true,
            },
        })),
        closeGroupManagement: () => set({ session: undefined, pickingLayerIndex: undefined, step: GROUP_MANAGEMENT_VIEW_IDENTITY }),
        setGroupManagementStep: step => set({ step, pickingLayerIndex: undefined }),
        setGroupManagementName: name => editSession(() => ({ name })),
        setGroupManagementDescription: description => editSession(() => ({ description })),
        setGroupManagementBaseRoom: baseRoomId => editSession(() => ({ baseRoomId })),
        addGroupManagementRoom: (roomId, roomName) => editSession(session => ({
            ownedRooms: [ { roomId, roomName, hasControllers: false }, ...session.ownedRooms ],
            baseRoomId: roomId,
        })),
        setGroupBadgeLayer: (layerIndex, layer) => editSession(session => ({
            layers: session.layers.map(existing => ((existing.layerIndex === layerIndex) ? layer : existing)),
        })),
        resetGroupBadge: () => editSession(session => ({ layers: badgeLayersFromSettings(session.badgeSettings, get().editorData) })),
        resetGroupColors: () => editSession(session => ({
            primaryColorId: session.originalPrimaryColorId,
            secondaryColorId: session.originalSecondaryColorId,
        })),
        setGroupPrimaryColor: primaryColorId => editSession(() => ({ primaryColorId })),
        setGroupSecondaryColor: secondaryColorId => editSession(() => ({ secondaryColorId })),
        setGroupType: guildType => editSession(() => ({ guildType })),
        setGroupRightsLevel: rightsLevel => editSession(() => ({ rightsLevel })),
        setGroupWarnedControllersRoom: warnedControllersRoomId => editSession(() => ({ warnedControllersRoomId })),
        seedGroupColorsFromBadge: () => {
            const { editorData } = get();

            if (!editorData) return;

            editSession((session) => {
                if (session.colorsSeeded) return {};

                return {
                    colorsSeeded: true,
                    primaryColorId: matchGuildColorId(badgePrimaryColorIndex(session.layers, editorData), editorData, editorData.guildPrimaryColors),
                    secondaryColorId: matchGuildColorId(badgeSecondaryColorIndex(session.layers), editorData, editorData.guildSecondaryColors),
                };
            });
        },
        openBadgePartPicker: pickingLayerIndex => set({ pickingLayerIndex }),
        closeBadgePartPicker: () => set({ pickingLayerIndex: undefined }),
        setGuildEditorData: editorData => set((x) => {
            // A session opened before the parts arrived can only read its badge back once they have.
            if (!x.session) return { editorData };

            return { editorData, session: { ...x.session, layers: badgeLayersFromSettings(x.session.badgeSettings, editorData) } };
        }),
        setCreatedGroupId: createdGroupId => set({ createdGroupId }),
        setHcRequiredFor: hcRequiredFor => set({ hcRequiredFor }),
    };
};
