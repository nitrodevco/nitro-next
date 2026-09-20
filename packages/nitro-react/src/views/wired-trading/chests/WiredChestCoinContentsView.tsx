/**
 * The coin chest's contents - Flash `chests/subcontrollers/CoinChestSubController` on
 * `coins_chest_contents_xml` (413x263): a picture of the chest whose fill follows the balance,
 * the balance on its plaque, and a withdraw row.
 *
 * - `CHEST_STATES`: the picture is `zero` below 1 coin, `low` from 1, `medium` from 20, `high`
 *   from 100; `DARK_THEME_CHEST_NAMES` (`wf_storage_coins1`) get the dark pictures.
 * - The amount and the coin icon (`<icon style="35">`) are centred on the plaque.
 * - `updateUI`: withdraw is disabled unless the viewer `canWithdraw` and the chest has coins.
 */
import { useState } from 'react';

import { withdrawWiredChestCoins } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { Border, Box, Button, Icon, LayoutImage, TextInput, ThemeImage, ThemeText } from '#base/theme';

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

export interface WiredChestCoinContentsViewProps {
    chestId: number;
    /** The chest furni's class name, for the dark or light picture. */
    className: string;
    canWithdraw: boolean;
}

export const WiredChestCoinContentsView = ({ chestId, className, canWithdraw }: WiredChestCoinContentsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
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
        <Box layout={{ position: 'relative', width: WIRED_COIN_CHEST_WIDTH, height: WIRED_COIN_CHEST_HEIGHT, flexShrink: 0 }}>
            <Box layout={{ position: 'absolute', left: 44, top: 24, width: 324, height: 228 }}>
                <ThemeImage
                    src={LayoutImage(`wired/wired_chests_images_${theme}_coins_chest_balance_${chestState(coins)}.png`)}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
                <Box layout={{ position: 'absolute', left: 9, top: 68, width: 54, height: 47 }}>
                    <ThemeText
                        text={t('wiredchests.coin_chest.balance')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fontSize: 11, align: 'center' }}
                        layout={{ position: 'absolute', left: 2, top: 7, width: 45, height: 16 }}
                    />
                    <Box layout={{ position: 'absolute', left: 0, top: 22, width: 54, flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
                        <ThemeText
                            text={String(coins)}
                            textStyle="text-style-u-bold"
                        />
                        <Icon
                            variant={35}
                            layout={{ marginTop: 2 }}
                        />
                    </Box>
                </Box>
                <Box layout={{ position: 'absolute', left: 160, top: 18, height: 28, flexDirection: 'row', gap: 5 }}>
                    <Border
                        variant="4"
                        layout={{ width: 27, height: 19, marginTop: 1 }}
                    >
                        <TextInput
                            value={withdrawAmount}
                            onChange={value => setWithdrawAmount(value.replace(/[^0-9]/g, ''))}
                            onEnter={onWithdraw}
                            textStyle="text-style-u-regular"
                            layout={{ width: 25, height: 17, marginLeft: 1, marginTop: 1 }}
                        />
                    </Border>
                    <Button
                        variant="3"
                        disabled={!canWithdraw || isEmpty}
                        onPointerTap={onWithdraw}
                        layout={{ minWidth: 60, width: 73, height: 22 }}
                    >
                        {t('wiredchests.withdraw')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
