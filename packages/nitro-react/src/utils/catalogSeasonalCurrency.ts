/**
 * `HabboCatalog.getSeasonalCurrencyActivityPointType`: the activity point type a page that takes
 * the seasonal currency as credits shows its credits in - `getInteger("seasonalcurrencyindicator.currency", 1)`.
 * `config` is the hotel's variables, read the way `getInteger` reads them.
 */
export const getSeasonalCurrencyActivityPointType = (config: Record<string, unknown>): number => {
    const value = config['seasonalcurrencyindicator.currency'];
    const type = parseInt(((typeof value === 'string') || (typeof value === 'number')) ? String(value) : '');

    return isNaN(type) ? 1 : type;
};
