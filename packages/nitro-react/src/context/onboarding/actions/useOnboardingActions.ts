/**
 * The new user flow's actions. Zustand actions are created once and never change, so they are read
 * off the store a single time here rather than subscribed to: a component using these re-renders
 * for nothing.
 */
import { onboardingStore } from '../store/OnboardingStore';

const state = onboardingStore.getState();

const actions = {
    setStep: state.setStep,
    finish: state.finish,
    startEditor: state.startEditor,
    rollFigure: state.rollFigure,
    chooseGender: state.chooseGender,
    clickPart: state.clickPart,
    selectColor: state.selectColor,
    setStarterRoomCameraStatus: state.setStarterRoomCameraStatus,
    closeStarterRoomCamera: state.closeStarterRoomCamera,
    setNoobLobbyOffer: state.setNoobLobbyOffer,
};

export const useOnboardingActions = () => actions;
