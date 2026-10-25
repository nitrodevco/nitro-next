/**
 * The coin chest's contents - Flash `chests/subcontrollers/CoinChestSubController` on
 * `coins_chest_contents_xml` (413x263): a picture of the chest whose fill follows the balance,
 * the balance on its plaque, and a withdraw row.
 *
 * The view is the Flash template itself, set up as the controller sets it:
 *
 * - `CHEST_STATES`: the picture (`bg_img`) is `zero` below 1 coin, `low` from 1, `medium` from 20,
 *   `high` from 100; `DARK_THEME_CHEST_NAMES` (`wf_storage_coins1`) get the dark pictures.
 * - `onCoinsMessage`: the amount in `coins_amount_txt`, and `balance_container` (the amount and its
 *   coin icon) centred on the plaque.
 * - `updateUI`: withdraw is disabled unless the viewer `canWithdraw` and the chest has coins.
 */
import { useState } from 'react';

import { withdrawWiredChestCoins } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { LayoutImage, TemplateWindow, TemplateWindows } from '#base/theme';

/** `CoinChestSubController.DARK_THEME_CHEST_NAMES`. */
const DARK_THEME_CHEST_NAMES = [ 'wf_storage_coins1' ];

/** `CHEST_STATES`, highest threshold last. */
const CHEST_STATES: [number, string][] = [ [ 0, 'zero' ], [ 1, 'low' ], [ 20, 'medium' ], [ 100, 'high' ] ];

export const WIRED_COIN_CHEST_WIDTH = 413;
export const WIRED_COIN_CHEST_HEIGHT = 263;

const chestState = (coins: number): string => {
    let state = CHEST_STATES[0][1];

    for (const [ threshold, name ] of CHEST_STATES) if (coins >= threshold) state = name;

    return state;
};

/** `onCoinsMessage`: `balanceContainerList.x = parent.width / 2 - width / 2`. */
const arrange = ({ find }: TemplateWindows) => {
    const balance = find('balance_container');
    const parent = find('balance_cont');

    if (balance && parent) balance.setX(Math.trunc((parent.width / 2) - (balance.width / 2)));
};

export interface WiredChestCoinContentsViewProps {
    chestId: number;
    /** The chest furni's class name, for the dark or light picture. */
    className: string;
    canWithdraw: boolean;
}

export const WiredChestCoinContentsView = ({ chestId, className, canWithdraw }: WiredChestCoinContentsViewProps) => {
    const { send } = useWebSocketContext();
    const coins = useWiredTradingStore(x => x.chestCoins);
    const [ withdrawAmount, setWithdrawAmount ] = useState('1');
    const theme = DARK_THEME_CHEST_NAMES.includes(className) ? 'dark' : 'light';
    const isEmpty = (coins <= 0);

    const onWithdraw = () => {
        const amount = parseInt(withdrawAmount, 10);

        if (Number.isNaN(amount)) return;

        withdrawWiredChestCoins(send, chestId, amount);
    };

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/coins_chest_contents_xml"
            arrange={arrange}
            bindings={{
                bg_img: { asset: LayoutImage(`habbo-window-manager-com/wired_chests_images_${theme}_coins_chest_balance_${chestState(coins)}.png`) },
                coins_amount_txt: { caption: String(coins) },
                withdraw_input: {
                    caption: withdrawAmount,
                    restrict: '0-9',
                    onChange: setWithdrawAmount,
                    onEnter: onWithdraw,
                },
                withdraw_btn: { disabled: !canWithdraw || isEmpty, onPointerTap: onWithdraw },
            }}
        />
    );
};
