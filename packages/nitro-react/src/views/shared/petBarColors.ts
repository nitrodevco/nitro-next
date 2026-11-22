/**
 * The colours of the pet infostand's status bars (`PetPercentageBar`): the content and highlight colours
 * `InfoStandPetView.update` hands `updateStateElement` for each bar.
 */
export interface PetBarColors {
    content: string;
    highlight: string;
}

export const PET_HAPPINESS_BAR_COLORS: PetBarColors = { content: '#009ac0', highlight: '#1fd1f2' };
export const PET_EXPERIENCE_BAR_COLORS: PetBarColors = { content: '#8547be', highlight: '#a06ad2' };
export const PET_ENERGY_BAR_COLORS: PetBarColors = { content: '#5e9d00', highlight: '#8ac51e' };
export const PET_WELLBEING_BAR_COLORS: PetBarColors = { content: '#5e9d00', highlight: '#8ac51e' };
