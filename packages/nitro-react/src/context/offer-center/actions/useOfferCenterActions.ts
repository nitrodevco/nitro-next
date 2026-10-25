/**
 * The offer centre store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { offerCenterStore } from '../store';

const state = offerCenterStore.getState();

const actions = {
    addOfferReward: state.addOfferReward,
    stampOfferRewards: state.stampOfferRewards,
    setSupersonic: state.setSupersonic,
    setSponsorPay: state.setSponsorPay,
    setVideoStatus: state.setVideoStatus,
    resetOfferCenter: state.resetOfferCenter,
};

export const useOfferCenterActions = () => actions;
