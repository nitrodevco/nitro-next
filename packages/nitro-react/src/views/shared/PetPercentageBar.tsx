/**
 * `InfoStandPetView.createPercentageBar` (and `PetTrainingView`'s copy of it): a 162x16 bitmap - a
 * one-pixel border round a dark well, the content colour filled from four pixels down and the
 * highlight over the top four, both `value / max` of the inner width.
 */
import { Region } from '#base/theme';

/** `PET_BAR_WIDTH` / `STATUS_BAR_HEIGTH` / `STATUS_BAR_HIGHLIGHT_HEIGHT`. */
export const PET_BAR_WIDTH = 162;
export const PET_BAR_HEIGHT = 16;
const STATUS_BAR_HIGHLIGHT_HEIGHT = 4;
/** `STATUS_BAR_BORDER_COLOR` / `STATUS_BAR_BG_COLOR`. */
const STATUS_BAR_BORDER_COLOR = '#dadada';
const STATUS_BAR_BG_COLOR = '#3a3a3a';

export interface PetBarColors {
    content: string;
    highlight: string;
}

/** The content and highlight colours `update` hands `updateStateElement` for each bar. */
export const PET_HAPPINESS_BAR_COLORS: PetBarColors = { content: '#009ac0', highlight: '#1fd1f2' };
export const PET_EXPERIENCE_BAR_COLORS: PetBarColors = { content: '#8547be', highlight: '#a06ad2' };
export const PET_ENERGY_BAR_COLORS: PetBarColors = { content: '#5e9d00', highlight: '#8ac51e' };
export const PET_WELLBEING_BAR_COLORS: PetBarColors = { content: '#5e9d00', highlight: '#8ac51e' };

export const PetPercentageBar = ({ value, max, colors }: { value: number; max: number; colors: PetBarColors }) => {
    const total = Math.max(max, 1);
    const ratio = Math.min(Math.max(value, 0), total) / total;
    const innerWidth = PET_BAR_WIDTH - 2;
    // `fillRect` takes the rectangle's width as an integer, dropping the fraction.
    const filled = Math.trunc(ratio * innerWidth);

    return (
        <Region
            backgroundColor={STATUS_BAR_BORDER_COLOR}
            layout={{ position: 'absolute', left: 0, top: 0, width: PET_BAR_WIDTH, height: PET_BAR_HEIGHT }}
        >
            <Region
                backgroundColor={STATUS_BAR_BG_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: innerWidth, height: PET_BAR_HEIGHT - 2 }}
            />
            {(filled > 0) && (
                <>
                    <Region
                        backgroundColor={colors.content}
                        layout={{ position: 'absolute', left: 1, top: 1 + STATUS_BAR_HIGHLIGHT_HEIGHT, width: filled, height: PET_BAR_HEIGHT - 2 - STATUS_BAR_HIGHLIGHT_HEIGHT }}
                    />
                    <Region
                        backgroundColor={colors.highlight}
                        layout={{ position: 'absolute', left: 1, top: 1, width: filled, height: STATUS_BAR_HIGHLIGHT_HEIGHT }}
                    />
                </>
            )}
        </Region>
    );
};
