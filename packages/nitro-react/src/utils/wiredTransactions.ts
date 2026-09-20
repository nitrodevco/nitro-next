/**
 * Small readings of wired trading data the views share:
 *
 * - `summarizeWiredTransaction` - `TransactionTableObject.summarize` (Flash
 *   `wired_trading/transactions/overview`): what one transaction moved, as the log's "withdraws"
 *   and "deposits" columns say it - furni, coins, both, or `-` for nothing. The wired menu's
 *   chests tab shows the same summaries.
 * - `isWiredTradePaymentOnly` - `TradeRequirement.isPaymentOnly`: nothing comes back.
 */
import type { ITradeRequirement } from '@nitrodevco/nitro-packets';

type Translate = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

export const summarizeWiredTransaction = (t: Translate, furniCount: number, coinCount: number): string => {
    if ((furniCount <= 0) && (coinCount <= 0)) return '-';

    if ((furniCount > 0) && (coinCount === 0)) return t('wiredchests.logs.only_furni', '', { amount: String(furniCount) });

    if ((furniCount === 0) && (coinCount > 0)) return t('wiredchests.logs.only_coins', '', { amount: String(coinCount) });

    return t('wiredchests.logs.furni_and_coins', '', { amount: String(furniCount), amount2: String(coinCount) });
};

export const isWiredTradePaymentOnly = (requirement: ITradeRequirement | undefined): boolean => {
    const youGetRule = requirement?.rules?.definition.youGetRule;

    return !youGetRule || (youGetRule.nodes.length === 0);
};
