/**
 * The vault - Flash's `catalog/earnings/EarningsView` over `habbo-catalog-com/vault_view_xml`: one
 * `<name>_container` row of `scrolling_earnings_list` per reward category, its amounts in
 * `<name>DucketValue` / `CreditValue` / `ProductValue` and its `<name>_claim_button`, and
 * `claim_all_btn` under the list. A claim button is disabled while its claim is out
 * (`EarningsViewSlice.disabledElements`).
 *
 * What the constructor hides stays hidden for the window's life: `snowstorm_container` without
 * `games_icon_enabled`, `games_container` and `agency_container` without `wired.game_earnings`,
 * and `wiredchest_container` until a status has wired chest rewards in it
 * (`onIncomeRewardDataReceived`). The item list closes the gap a hidden row leaves and, with
 * `resize_on_item_update` and `reflectToParent`, gets shorter by each hidden row, the frame with it.
 * The constructor centres the window first, at the layout's full height, so the shorter window
 * keeps that top.
 *
 * A category's row carries only its amounts and its claim button: Flash's `windowProcedure`
 * answers nothing else in it, so a click on a row opens no other system.
 */
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { useState } from 'react';

import { claimEarnings } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { EARNINGS_ALL_CATEGORIES, EARNINGS_CLAIM_ALL_BUTTON, EARNINGS_REWARD_CATEGORIES, earningsCategoryValues, earningsClaimButtonName, useEarningsStore } from '#base/context/earnings';
import { useConfigValue } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';

/** `vault_view`'s frame as built, which `_window.center()` centres before any row is hidden. */
const FRAME_WIDTH = 422;
const FRAME_HEIGHT = 536;

/** `<name>DucketValue` / `CreditValue` / `ProductValue`, each set from the category's amounts. */
const VALUE_SUFFIXES = { duckets: 'DucketValue', credits: 'CreditValue', products: 'ProductValue' } as const;

/** The categories `vault_view` has a row for; `tutorial` and `roombundlesales` have none. */
const LAYOUT_ROWS: ReadonlySet<string> = new Set([ 'dailygift', 'games', 'wiredchest', 'achievements', 'marketplace', 'habboclub', 'levelprogression', 'donation', 'bonusbag', 'surprise', 'snowstorm', 'agency' ]);

/** The rows with a `<name>ProductValue`. */
const PRODUCT_ROWS: ReadonlySet<string> = new Set([ 'bonusbag', 'snowstorm' ]);

export interface EarningsViewProps {
    onClose: () => void;
}

export const EarningsView = ({ onClose }: EarningsViewProps) => {
    const { send } = useWebSocketContext();
    const values = useEarningsStore(x => x.values);
    const disabledElements = useEarningsStore(x => x.disabledElements);
    const wiredChestVisible = useEarningsStore(x => x.wiredChestVisible);
    const gamesIconEnabled = useConfigValue<boolean>('games_icon_enabled') === true;
    const gameEarningsEnabled = useConfigValue<boolean>('wired.game_earnings') === true;

    // `_window.center()`, before any row is hidden: centred at the layout's full size.
    const [ position ] = useState(() => {
        const { width, height } = GetRenderer().screen;

        return { x: Math.trunc((width - FRAME_WIDTH) / 2), y: Math.trunc((height - FRAME_HEIGHT) / 2) };
    });
    const frame = useTemplateFrame({ id: 'VaultBase', defaultPosition: position, rememberPosition: false, onClose });

    const bindings: TemplateBindings = {
        snowstorm_container: { visible: gamesIconEnabled },
        games_container: { visible: gameEarningsEnabled },
        agency_container: { visible: gameEarningsEnabled },
        wiredchest_container: { visible: wiredChestVisible },
        [EARNINGS_CLAIM_ALL_BUTTON]: {
            disabled: disabledElements[EARNINGS_CLAIM_ALL_BUTTON] === true,
            onPointerTap: () => claimEarnings(send, EARNINGS_CLAIM_ALL_BUTTON, EARNINGS_ALL_CATEGORIES),
        },
    };

    EARNINGS_REWARD_CATEGORIES.forEach((name, category) => {
        if (!LAYOUT_ROWS.has(name)) return;

        const amounts = earningsCategoryValues(values, category);
        const claimButton = earningsClaimButtonName(name);

        for (const [ kind, suffix ] of Object.entries(VALUE_SUFFIXES) as [ keyof typeof VALUE_SUFFIXES, string ][]) {
            // Only the bonus bag and snowstorm rows have a product count.
            if ((kind === 'products') && !PRODUCT_ROWS.has(name)) continue;

            bindings[`${name}${suffix}`] = { caption: String(amounts[kind]) };
        }

        bindings[claimButton] = {
            disabled: disabledElements[claimButton] === true,
            onPointerTap: () => claimEarnings(send, claimButton, category),
        };
    });

    return (
        <TemplateWindow
            id="habbo-catalog-com/vault_view_xml"
            frame={frame}
            bindings={bindings}
        />
    );
};
