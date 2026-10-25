/**
 * The new user flow's store - the state Flash keeps across `HabboLandingView` and
 * `friendbar/onBoardingHc/OnBoardingHcFlow`:
 *
 * - `loginActions` (`HabboCommunicationManager.suggestedLoginActions`): `AuthenticationOK`'s list.
 *   `0` asks for the look and name step, `1` for the starter room; either one shows the flow
 *   (`HabboLandingView.isOnboardingRequired`).
 * - `finished` (`HabboLandingView`'s flag, set by `onNewUserReceptionFinished`): the flow has run
 *   this session and does not show again, whatever the list says.
 * - `step`: `startNameChange` puts up the look and name step, `startRoomPicking` the room picker.
 * - `nameCheck`: the last `CheckUserNameResult` (`NameChangeDialog.checkNameResponse`), which the
 *   name box only takes when it is for the name it holds.
 * - `editor`: the look editor (`onBoardingHcSteps/AvatarEditor`), made when the flow is first drawn
 *   - the figure data has to be there for its grid - and kept while the flow runs.
 * - `starterRoomCamera`: not Flash's - Turbo's starter room camera (`starter.rooms`), opened by the
 *   server for the room the user is in, while it is up.
 * - `noobLobbyOffer` (`nux/HabboNuxDialogs`' `NuxNoobRoomOfferView`): "Enter a room to meet other new
 *   users", up while it is shown.
 * - `giftOffer` (`HabboNuxDialogs`' `NuxGiftSelectionView`): the steps of `NewUserExperienceGiftOffer`
 *   while "Choose gift option" is up; the view walks through them and sends every pick at the end.
 */
import type { INewUserExperienceGiftOfferGiftOption } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { chooseOnboardingGender, clickOnboardingPart, createOnboardingEditor, OnboardingEditorState, OnboardingGender, rollOnboardingFigure, selectOnboardingColor } from '#base/utils';

/** `OnBoardingHcFlow.AVATAR_NAME_CHANGE` / `NEW_ROOM_SELECT`. */
export const ONBOARDING_ACTION_NAME_CHANGE = 0;
export const ONBOARDING_ACTION_ROOM_SELECT = 1;

export type OnboardingStep = 'name' | 'room';

/** Turbo's extension the starter room camera comes with (`TurboStarterRoomCameraMessage`). */
export const TURBO_STARTER_ROOMS_CAPABILITY = 'starter.rooms';

export interface StarterRoomCamera {
    roomId: number;
    /** `taking` once the picture is sent; `failed` when the server could not draw it. */
    status: 'open' | 'taking' | 'failed';
}

export interface OnboardingNameCheck {
    resultCode: number;
    name: string;
}

type State = {
    loginActions: number[];
    finished: boolean;
    step: OnboardingStep;
    nameCheck: OnboardingNameCheck | undefined;
    editor: OnboardingEditorState | undefined;
    starterRoomCamera: StarterRoomCamera | undefined;
    noobLobbyOffer: boolean;
    giftOffer: INewUserExperienceGiftOfferGiftOption[] | undefined;
};

type Actions = {
    /** `AuthenticationOK`: the steps the server suggests; the flow starts on the name step when it lists one. */
    setLoginActions: (loginActions: number[]) => void;
    setStep: (step: OnboardingStep) => void;
    setNameCheck: (nameCheck: OnboardingNameCheck) => void;
    /** `AvatarEditor.onAddedToStage`: a boy with a random look, once. */
    startEditor: () => void;
    /** The dice (`onRandomize`). */
    rollFigure: () => void;
    chooseGender: (gender: OnboardingGender) => void;
    clickPart: (category: string, part: string) => void;
    selectColor: (category: string, colorId: string) => void;
    openStarterRoomCamera: (roomId: number) => void;
    setStarterRoomCameraStatus: (status: StarterRoomCamera['status']) => void;
    closeStarterRoomCamera: () => void;
    /** `createNoobRoomOfferView` / `destroyNoobRoomOfferView`. */
    setNoobLobbyOffer: (noobLobbyOffer: boolean) => void;
    /** `createGiftSelectionView` with the offer's steps / `destroyGiftSelectionView` with none. */
    setGiftOffer: (giftOffer: INewUserExperienceGiftOfferGiftOption[] | undefined) => void;
    /** `onNewUserReceptionFinished`: the flow is done for this session. */
    finish: () => void;
};

export type OnboardingStore = State & Actions;

const INITIAL: State = {
    loginActions: [],
    finished: false,
    step: 'name',
    nameCheck: undefined,
    editor: undefined,
    starterRoomCamera: undefined,
    noobLobbyOffer: false,
    giftOffer: undefined,
};

export const createOnboardingStore = () => createStore<OnboardingStore>()(set => ({
    ...INITIAL,
    setLoginActions: loginActions => set({
        ...INITIAL,
        starterRoomCamera: undefined,
        noobLobbyOffer: false,
        loginActions,
        step: loginActions.includes(ONBOARDING_ACTION_NAME_CHANGE) ? 'name' : 'room',
    }),
    setStep: step => set({ step }),
    setNameCheck: nameCheck => set({ nameCheck }),
    startEditor: () => set(x => (x.editor ? x : { editor: createOnboardingEditor() })),
    rollFigure: () => set(x => (x.editor ? { editor: rollOnboardingFigure(x.editor) } : x)),
    chooseGender: gender => set(x => (x.editor ? { editor: chooseOnboardingGender(x.editor, gender) } : x)),
    clickPart: (category, part) => set(x => (x.editor ? { editor: clickOnboardingPart(x.editor, category, part) } : x)),
    selectColor: (category, colorId) => set(x => (x.editor ? { editor: selectOnboardingColor(x.editor, category, colorId) } : x)),
    finish: () => set({ finished: true, loginActions: [], editor: undefined }),
    openStarterRoomCamera: roomId => set({ starterRoomCamera: { roomId, status: 'open' } }),
    setStarterRoomCameraStatus: status => set(x => (x.starterRoomCamera ? { starterRoomCamera: { ...x.starterRoomCamera, status } } : x)),
    closeStarterRoomCamera: () => set({ starterRoomCamera: undefined }),
    setNoobLobbyOffer: noobLobbyOffer => set({ noobLobbyOffer }),
    setGiftOffer: giftOffer => set({ giftOffer }),
}));

export const onboardingStore = createOnboardingStore();
