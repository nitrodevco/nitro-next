/**
 * The two variable management windows the overview tab's "manage" button leads to -
 * `VariableManagementOverviewController` (every holder of a permanent user variable, a page at a
 * time, `variables_management_overview_xml`) and `VariableManagementDetailController` (every
 * permanent variable one user, pet or bot holds, `variables_management_detail_xml`).
 *
 * Both windows open when their data arrives. Flash hides them on `REE_DISPOSED`; here the slice
 * goes with the room. The reference server (turbo-cloud) implements none of these packets, so
 * outside a replay neither window opens.
 */
import type { IWiredUserPermanentVariablesList, IWiredUserVariablesPage, IWiredVariable } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `VariableManagementConfig.PAGE_SIZE` - a page of any other size is not for the overview window. */
export const WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE = 50;

type State = {
    /** `VariableManagementOverviewController._-47` / `_-XX`. */
    variableOwnersPage: IWiredUserVariablesPage | undefined;
    variableOwnersVariable: IWiredVariable | undefined;
    variableOwnersVisible: boolean;
    /** `VariableManagementDetailController._-52l` / `_-Q16`. */
    variableHolder: IWiredUserPermanentVariablesList | undefined;
    variableHolderVariablesById: Record<string, IWiredVariable>;
    variableHolderVisible: boolean;
    /** The detail window's `searching_icon`: a refresh or a change is waiting for the fresh list. */
    variableHolderLoading: boolean;
    /** The detail window's table selection and "add variable" bubble. */
    variableHolderSelectedId: string | null;
    variableHolderCreateBubble: boolean;
    variableHolderCreateVariables: IWiredVariable[];
};

type Actions = {
    patchWiredVariableManagement: (patch: Partial<State>) => void;
};

export const WiredVariableManagementSliceInitialState: State = {
    variableOwnersPage: undefined,
    variableOwnersVariable: undefined,
    variableOwnersVisible: false,
    variableHolder: undefined,
    variableHolderVariablesById: {},
    variableHolderVisible: false,
    variableHolderLoading: false,
    variableHolderSelectedId: null,
    variableHolderCreateBubble: false,
    variableHolderCreateVariables: [],
};

export type WiredVariableManagementSlice = State & Actions;

export const createWiredVariableManagementSlice: StateCreator<WiredVariableManagementSlice, [], [], WiredVariableManagementSlice> = set => ({
    ...WiredVariableManagementSliceInitialState,
    patchWiredVariableManagement: patch => set(patch),
});
