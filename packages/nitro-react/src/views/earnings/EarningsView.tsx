/**
 * The vault - Flash's `catalog/earnings/EarningsView` on the `vault_view` layout (422 x 536, the
 * style 3 frame tinted `0xff418db0`, content margins 6/35/6/6). `scrolling_earnings_list` is an
 * `itemlist_vertical` of one 404 x 34 row per reward category, 3 apart: a style 5 border with the
 * category's icon and `u_bold` label, a style 3 border tinted `0xbec3c1` with the amounts waiting
 * (the icon-set ducket `32` / credit `34` icons, `vault_icon_present` for products, each count a
 * 14 px `u_bold` caption 25 to the right of its icon), and the row's style 3 claim button. Under the
 * list, `claim_all_btn`, a shiny thick button.
 *
 * What the constructor hides stays hidden for the window's life: `snowstorm_container` without
 * `games_icon_enabled`, `games_container` and `agency_container` without `wired.game_earnings`,
 * and `wiredchest_container` until a status has wired chest rewards in it
 * (`onIncomeRewardDataReceived`). The item list closes the gap a hidden row leaves
 * (`ItemListController.updateScrollAreaRegion` places only the visible items). Elements the layout
 * builds invisible and no code shows (the other currency of a one-currency row) are left out.
 *
 * A category's row carries only its amounts and its claim button: Flash's `windowProcedure`
 * answers nothing else in it, so a click on a row opens no other system.
 */
import { claimEarnings } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { EARNINGS_ALL_CATEGORIES, EARNINGS_CLAIM_ALL_BUTTON, EARNINGS_REWARD_CATEGORIES, EarningsCategoryValues, earningsCategoryValues, earningsClaimButtonName, EarningsRewardCategoryName, useEarningsStore } from '#base/context/earnings';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Button, ButtonThick, Frame, Icon, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `vault_view` - the frame and its `_CONTENT` margins. */
const FRAME_WIDTH = 422;
const FRAME_HEIGHT = 536;
const FRAME_MARGINS = [ 6, 35, 6, 6 ] as const;

/** Where one amount of a row sits in its extended border: its icon's x; the count is 25 further right. */
interface EarningsRowAmount {
    kind: 'duckets' | 'credits' | 'products';
    x: number;
}

/** One `<name>_container` of `scrolling_earnings_list`. */
interface EarningsRow {
    name: EarningsRewardCategoryName;
    /** `<name>_label`'s caption. */
    label: string;
    /** `<name>_bitmap`'s `asset_uri`. */
    icon: string;
    /** `<name>_bitmap`'s y - 1, 2 or 3. */
    iconTop: number;
    /** The amounts the layout builds visible, in its child order. */
    amounts: EarningsRowAmount[];
}

/** The rows in the layout's order. */
const ROWS: EarningsRow[] = [
    { name: 'dailygift', label: 'earnings.dailygift.label', icon: 'vault_earnings_icon_dailygift', iconTop: 1, amounts: [ { kind: 'duckets', x: 15 } ] },
    { name: 'games', label: 'earnings.games.label', icon: 'vault_earnings_icon_games', iconTop: 1, amounts: [ { kind: 'credits', x: 15 } ] },
    { name: 'wiredchest', label: 'earnings.wiredchest.label', icon: 'vault_earnings_icon_chests', iconTop: 2, amounts: [ { kind: 'credits', x: 15 } ] },
    { name: 'achievements', label: 'earnings.achievements.label', icon: 'vault_earnings_icon_achievements', iconTop: 1, amounts: [ { kind: 'duckets', x: 15 }, { kind: 'credits', x: 85 } ] },
    { name: 'marketplace', label: 'earnings.marketplace.label', icon: 'vault_earnings_icon_marketplace', iconTop: 1, amounts: [ { kind: 'credits', x: 15 } ] },
    { name: 'habboclub', label: 'earnings.hc.label', icon: 'vault_earnings_icon_hcpayday', iconTop: 1, amounts: [ { kind: 'credits', x: 15 } ] },
    { name: 'levelprogression', label: 'earnings.levelprogression.label', icon: 'vault_earnings_icon_levelprogression', iconTop: 1, amounts: [ { kind: 'duckets', x: 15 }, { kind: 'credits', x: 85 } ] },
    { name: 'donation', label: 'earnings.donations.label', icon: 'vault_earnings_icon_donations', iconTop: 1, amounts: [ { kind: 'credits', x: 15 } ] },
    { name: 'bonusbag', label: 'earnings.bonusbag.label', icon: 'vault_earnings_icon_bonusbag', iconTop: 1, amounts: [ { kind: 'products', x: 15 } ] },
    { name: 'surprise', label: 'earnings.surpriseboxes.label', icon: 'vault_earnings_icon_surprise', iconTop: 1, amounts: [ { kind: 'duckets', x: 15 }, { kind: 'credits', x: 85 } ] },
    { name: 'snowstorm', label: 'earnings.snowstorm.label', icon: 'vault_earnings_icon_snowstorm', iconTop: 1, amounts: [ { kind: 'duckets', x: 15 }, { kind: 'products', x: 85 } ] },
    { name: 'agency', label: 'earnings.agency.label', icon: 'vault_earnings_icon_rpgs', iconTop: 3, amounts: [ { kind: 'credits', x: 15 } ] },
];

/** `<name>DucketValue` / `CreditValue` / `ProductValue`. */
const VALUE_SUFFIX: Record<EarningsRowAmount['kind'], string> = { duckets: 'DucketValue', credits: 'CreditValue', products: 'ProductValue' };

/** A count caption: `font_size` 14 over `u_bold`, 40 x 30, at y 7. */
const AmountText = ({ name, value, x }: { name: string; value: number; x: number }) => (
    <ThemeText
        text={String(value)}
        textStyle="u_bold"
        textOptions={{ fontSize: 14 }}
        clip
        name={name}
        verticalAlign="top"
        layout={{ position: 'absolute', left: x, top: 7, width: 40, height: 30 }}
    />
);

/**
 * One amount's icon and count, in the layout's child order: the icon-set icon before its count;
 * `bonusbag`'s count before its present, `snowstorm`'s present before its count.
 */
const Amount = ({ row, amount, values }: { row: EarningsRow; amount: EarningsRowAmount; values: EarningsCategoryValues }) => {
    const valueName = `${row.name}${VALUE_SUFFIX[amount.kind]}`;
    const text = (
        <AmountText
            name={valueName}
            value={values[amount.kind]}
            x={amount.x + 25}
        />
    );

    if (amount.kind === 'products') {
        const present = (
            <ThemeImage
                name="productIcon"
                src={LayoutImage('catalog/vault_icon_present.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: amount.x, top: 6, width: 30, height: 30 }}
            />
        );

        if (row.name === 'bonusbag') {
            return (
                <>
                    {text}
                    {present}
                </>
            );
        }

        return (
            <>
                {present}
                {text}
            </>
        );
    }

    return (
        <>
            <Icon
                variant={(amount.kind === 'duckets') ? '32' : '34'}
                name={(amount.kind === 'duckets') ? 'ducketIcon' : 'creditIcon'}
                layout={{ position: 'absolute', left: amount.x, top: 7, width: 30, height: 30 }}
            />
            {text}
        </>
    );
};

interface EarningsRowViewProps {
    row: EarningsRow;
    values: EarningsCategoryValues;
    claimDisabled: boolean;
    onClaim: () => void;
}

/** `<name>_container`: the amounts' border first, the label's border over its left end, the claim button on top. */
const EarningsRowView = ({ row, values, claimDisabled, onClaim }: EarningsRowViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name={`${row.name}_container`}
            layout={{ width: 404, height: 34, flexShrink: 0 }}
        >
            <Border
                variant="3"
                name={`${row.name}_extended_border`}
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, top: 0, width: 223, height: 34, overflow: 'hidden' }}
            >
                {row.amounts.map(amount => (
                    <Amount
                        key={amount.kind}
                        row={row}
                        amount={amount}
                        values={values}
                    />
                ))}
            </Border>
            <Border
                variant="5"
                name={`${row.name}_border`}
                layout={{ position: 'absolute', left: 0, top: 0, width: 185, height: 34, overflow: 'hidden' }}
            >
                <ThemeImage
                    name={`${row.name}_bitmap`}
                    src={LayoutImage(`catalog/${row.icon}.png`)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    dynamicRole="icon"
                    layout={{ position: 'absolute', left: 1, top: row.iconTop, width: 32, height: 32 }}
                />
                <ThemeText
                    text={t(row.label)}
                    textStyle="u_bold"
                    clip
                    name={`${row.name}_label`}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 34, top: 8, width: 160, height: 30 }}
                />
            </Border>
            <Button
                variant="3"
                name={earningsClaimButtonName(row.name)}
                disabled={claimDisabled}
                onPointerTap={onClaim}
                layout={{ position: 'absolute', left: 339, top: 4, width: 60, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

export interface EarningsViewProps {
    onClose: () => void;
}

export const EarningsView = ({ onClose }: EarningsViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const values = useEarningsStore(x => x.values);
    const disabledElements = useEarningsStore(x => x.disabledElements);
    const wiredChestVisible = useEarningsStore(x => x.wiredChestVisible);
    const gamesIconEnabled = useConfigValue<boolean>('games_icon_enabled') === true;
    const gameEarningsEnabled = useConfigValue<boolean>('wired.game_earnings') === true;

    const isRowVisible = (name: EarningsRewardCategoryName) => {
        switch (name) {
            case 'snowstorm': return gamesIconEnabled;
            case 'games':
            case 'agency': return gameEarningsEnabled;
            case 'wiredchest': return wiredChestVisible;
            default: return true;
        }
    };

    return (
        <Frame
            variant="3"
            id="VaultBase"
            name="VaultBase"
            caption={t('earnings.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            centered
            rememberPosition={false}
            margins={FRAME_MARGINS}
            layout={{ width: FRAME_WIDTH, height: FRAME_HEIGHT }}
        >
            <Region
                name="earningsContentArea"
                layout={{ position: 'absolute', left: 1, top: 0, width: 404, bottom: 4, overflow: 'hidden' }}
            >
                <Region
                    name="scrolling_earnings_list"
                    layout={{ position: 'absolute', left: 2, top: 5, width: 404, flexDirection: 'column', gap: 3 }}
                >
                    {ROWS.filter(row => isRowVisible(row.name)).map((row) => {
                        const claimButton = earningsClaimButtonName(row.name);

                        return (
                            <EarningsRowView
                                key={row.name}
                                row={row}
                                values={earningsCategoryValues(values, EARNINGS_REWARD_CATEGORIES.indexOf(row.name))}
                                claimDisabled={disabledElements[claimButton] === true}
                                onClaim={() => claimEarnings(send, claimButton, EARNINGS_REWARD_CATEGORIES.indexOf(row.name))}
                            />
                        );
                    })}
                </Region>
                <ButtonThick
                    variant="3"
                    name={EARNINGS_CLAIM_ALL_BUTTON}
                    disabled={disabledElements[EARNINGS_CLAIM_ALL_BUTTON] === true}
                    onPointerTap={() => claimEarnings(send, EARNINGS_CLAIM_ALL_BUTTON, EARNINGS_ALL_CATEGORIES)}
                    layout={{ position: 'absolute', left: 156, bottom: 4, width: 73, height: 30 }}
                >
                    {t('earning.claim_all')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
