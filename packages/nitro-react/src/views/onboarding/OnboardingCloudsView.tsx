/**
 * The puff of clouds a new look appears in - `onBoardingHcSteps/RandomAvatarCloudsAnimation`.
 *
 * Three clouds start over the figure (`resetAnimation`: down at 75,140, left at 30,115, right at
 * 85,110) and an 80 ms timer moves them on (`onAnimateTimer`): the right one drifts right and the
 * left one left by 10-15 each, both up by the roll's drift, the bottom one down by 1.3 times it;
 * every tick one of the right and bottom clouds shows the fourth set's frame instead of its own.
 * The frames shrink 1, 2, 3, 4 at ticks 3, 5 and 7, and from tick 9 the clouds are gone.
 */
import { useEffect, useState } from 'react';

import { Box, BoxLayout } from '#base/theme';

import { OnboardingImage } from './OnboardingWidgets';

const TICK_MS = 80;

/** `resetAnimation`'s positions. */
const START = {
    down: { x: 75, y: 140 },
    left: { x: 30, y: 115 },
    right: { x: 85, y: 110 },
};

interface CloudsState {
    tick: number;
    frame: number;
    down: { x: number; y: number };
    left: { x: number; y: number };
    right: { x: number; y: number };
    /** Which cloud draws the fourth set's frame this tick; none before the first. */
    alt: 'none' | 'right' | 'down';
}

const initialClouds = (): CloudsState => ({ tick: 0, frame: 0, down: START.down, left: START.left, right: START.right, alt: 'none' });

/** `onAnimateTimer`. */
const stepClouds = (state: CloudsState, drift: number): CloudsState => {
    const tick = state.tick + 1;
    let frame = state.frame;

    if (tick > 2 && tick < 5) frame = 1;
    else if (tick > 4 && tick < 7) frame = 2;
    else if (tick > 6 && tick < 9) frame = 3;

    const alt = ((Math.round(Math.random() * 10) % 2) !== 0) ? 'right' : 'down';

    if (tick > 9) return { ...state, tick, frame, alt };

    return {
        tick,
        frame,
        alt,
        right: { x: state.right.x + 10 + (Math.random() * 5), y: state.right.y - drift },
        left: { x: state.left.x - (10 + (Math.random() * 5)), y: state.left.y - drift },
        down: { x: state.down.x, y: state.down.y + (drift * 1.3) },
    };
};

interface OnboardingCloudsViewProps {
    /** A new roll starts the clouds again. */
    roll: number;
    drift: number;
    layout?: BoxLayout;
}

export const OnboardingCloudsView = ({ roll, drift, layout }: OnboardingCloudsViewProps) => {
    const [ clouds, setClouds ] = useState<{ roll: number; state: CloudsState }>({ roll, state: initialClouds() });

    // A new roll puts the clouds back over the figure (adjusted during render, not in an effect).
    if (clouds.roll !== roll) setClouds({ roll, state: initialClouds() });

    useEffect(() => {
        const timer = setInterval(() => setClouds((current) => {
            if (current.state.tick > 9) return current;

            return { ...current, state: stepClouds(current.state, drift) };
        }), TICK_MS);

        return () => clearInterval(timer);
    }, [ roll, drift ]);

    const { state } = clouds;

    if (state.tick >= 9) return null;

    const frame = state.frame + 1;

    return (
        <Box layout={{ position: 'absolute', ...layout }}>
            <OnboardingImage
                name={(state.alt === 'down') ? `c4_${frame}` : `c3_${frame}`}
                x={state.down.x}
                y={state.down.y}
            />
            <OnboardingImage
                name={`c2_${frame}`}
                x={state.left.x}
                y={state.left.y}
            />
            <OnboardingImage
                name={(state.alt === 'right') ? `c4_${frame}` : `c1_${frame}`}
                x={state.right.x}
                y={state.right.y}
            />
        </Box>
    );
};
