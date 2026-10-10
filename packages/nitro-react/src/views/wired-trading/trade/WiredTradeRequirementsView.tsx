/**
 * What a wired trade asks for - Flash `inventory/wired_trading/requirements/WiredTradeRequirementsView`
 * with `offerings/OfferingRequirementsView`, `OfferingRuleView` and `OfferingNodeView`, drawn from
 * the `trade_requirements_bubble` of `inventory_trading_wired_xml`:
 *
 * - `requirementsUpdated`: the title with the trade type; "you give" in `you_give_container` and,
 *   for a trade or a payment with a receive text, "you get" in `you_get_container` with the
 *   `offering_containers_separator` between them - each a clone of `offering_requirements_template`.
 * - `OfferingRequirementsView.initializeUI`: for the "any" requirement types the give side shows
 *   the matching `any_*_text`; otherwise a side lists its rules in `rules_list` (clones of
 *   `rule_template`), or shows its custom text. `OfferingRuleView` puts "or" before every rule but
 *   the first and the nodes two a row (clones of `rule_node_columns_template`); `OfferingNodeView`
 *   puts "&" before every node but the first, "Nx" for more than one, and the furni's
 *   `product_icon` or the credits icon.
 * - `resizeRequirementContainers` (the `arrange`): both sides 180 wide - 122 when both
 *   `canMinimalizeWidth` (every rule a single node, or a custom text whose `textWidth` is at most
 *   100) - and as high as the taller side's active element plus 2 x 18, at least 80, plus the
 *   template's margins round `requirements_definition`; the active element centred in it
 *   (`centerActiveElement`), and a lone rule of a `Rules` requirement centred across
 *   (`OfferingRuleView.center`).
 * - `requirementsStateUpdated`: the multiplier sentence, "met" (numbered for the automatic
 *   multiplier), or "not met", with a check or cross; the automatic multiplier's hint; and for a
 *   payment with a receive text the red disclaimer. Each html is `resizeHtml`ed to 15px a line plus 2.
 * - `highlightRefresh` (an overridden trade) fades `highlight_border` in and out over 500 ms
 *   (`highlight`: a 16 ms timer, `easeInOutCubic` towards 0.35), then hides it.
 */
import type { ITradeRequirement, ITradeRequirementNode, ITradeRequirementRule } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType, TradeRequirementRulesType, TradeRequirementType } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { LayoutImage, LayoutWindow, measureTemplateText, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows } from '#base/theme';
import { isWiredTradePaymentOnly } from '#base/utils';
import { inventoryTemplateId } from '#base/views/inventory/inventoryPage';
import { ChestItemIcon } from '#base/views/wired-trading/chests/WiredChestFurniContentsView';

const TEMPLATE = inventoryTemplateId('inventory_trading_wired_xml');

/** `WiredTradeRequirementsView.NORMAL_BORDER_WIDTH` / `MINIMALIZED_BORDER_WIDTH` / `MIN_BORDER_HEIGHT` / `BORDER_TOP_BOTTOM_OFFSET`. */
const NORMAL_BORDER_WIDTH = 180;
const MINIMALIZED_BORDER_WIDTH = 122;
const MIN_BORDER_HEIGHT = 80;
const BORDER_TOP_BOTTOM_OFFSET = 18;
/** `OfferingRuleView.MAX_COLS`. */
const MAX_COLS = 2;
/** `OfferingRequirementsView.initializeUI`: a custom text this narrow lets the sides shrink. */
const MINIMALIZE_TEXT_WIDTH = 100;
/** `resizeHtml`: `numLines * 15 + 2`. */
const HTML_LINE_HEIGHT = 15;
const HTML_EXTRA_HEIGHT = 2;
/** `highlight`: 500 ms in 16 ms steps, blend towards 0.35. */
const HIGHLIGHT_DELAY = 16;
const HIGHLIGHT_STEPS = Math.trunc(500 / HIGHLIGHT_DELAY);
const HIGHLIGHT_MAX = 0.35;

/** `WiredTradeRequirementsView.easeInOutCubic` - which, despite its name, overshoots below 0 at the end. */
const easeInOutCubic = (step: number, start: number, change: number, steps: number) => {
    const t = step / steps;

    return start + (change * (-((t * 1.75) - 0.7) * ((t * 1.75) - 0.7) + 1));
};

/** The window `OfferingRequirementsView.initializeUI` shows - its `§_-t2§` - by name; undefined for none. */
const getActiveElement = (requirementType: TradeRequirementType, rules: ITradeRequirementRule[] | undefined, text: string | undefined, give: boolean): string | undefined => {
    const type = Number(requirementType);

    if ((type !== Number(TradeRequirementType.Rules)) && give) {
        if (type === Number(TradeRequirementType.AnyCoins)) return 'any_coins_text';
        if (type === Number(TradeRequirementType.AnyFurni)) return 'any_furni_text';
        if (type === Number(TradeRequirementType.AnyAll)) return 'any_all_text';

        return undefined;
    }

    if (rules && rules.length) return 'rules_list';
    if (text) return 'custom_text';

    return undefined;
};

/** `OfferingNodeView.initializeUI` on a clone of `rule_node_template`. */
const nodeItem = (node: ITradeRequirementNode, index: number): TemplateItem => {
    const isFurni = (Number(node.type) === Number(TradeRequirementNodeType.Furni));

    return {
        key: `node-${index}`,
        from: 'rule_node_template',
        bindings: {
            furni_icon: { visible: isFurni, children: (isFurni && node.itemType) ? <ChestItemIcon itemType={node.itemType} /> : undefined },
            coin_icon: { visible: Number(node.type) === Number(TradeRequirementNodeType.Coin) },
            and_text: { visible: index > 0 },
            amount_text: { visible: node.amount > 1, ...((node.amount > 1) && { caption: `${node.amount}x` }) },
        },
    };
};

/** `OfferingRuleView.initializeUI` on a clone of `rule_template`: "or" after the first, the nodes `MAX_COLS` a row. */
const ruleItem = (rule: ITradeRequirementRule, index: number): TemplateItem => {
    const rows: ITradeRequirementNode[][] = [];

    rule.nodes.forEach((node, nodeIndex) => {
        if (!(nodeIndex % MAX_COLS)) rows.push([]);

        rows[rows.length - 1].push(node);
    });

    return {
        key: `rule-${index}`,
        from: 'rule_template',
        bindings: {
            or_text: { visible: index > 0 },
            rule_nodes_rows: {
                items: rows.map((row, rowIndex): TemplateItem => ({
                    key: `row-${rowIndex}`,
                    from: 'rule_node_columns_template',
                    bindings: { '': { items: row.map((node, column) => nodeItem(node, (rowIndex * MAX_COLS) + column)) } },
                })),
            },
        },
    };
};

/** `OfferingRequirementsView.initialize` on a clone of `offering_requirements_template`. */
const offeringItem = (give: boolean, active: string | undefined, rules: ITradeRequirementRule[] | undefined, text: string | undefined, title: string): TemplateItem => ({
    key: give ? 'give' : 'get',
    from: 'offering_requirements_template',
    bindings: {
        offerings_title: { caption: title },
        any_coins_text: { visible: active === 'any_coins_text' },
        any_furni_text: { visible: active === 'any_furni_text' },
        any_all_text: { visible: active === 'any_all_text' },
        rules_list: { visible: active === 'rules_list', items: (active === 'rules_list') ? (rules ?? []).map(ruleItem) : [] },
        custom_text: { visible: active === 'custom_text', ...((active === 'custom_text') && { caption: text }) },
    },
});

/** An item list's items (`getListItemAt`): the windows in its `_CONTAINER`. */
const listItems = (window: LayoutWindow | undefined): LayoutWindow[] => ((window && ('container' in window) && (window.container instanceof LayoutWindow)) ? window.container.children : []);

/** A window's direct child by its element's name. */
const childNamed = (window: LayoutWindow | undefined, name: string) => window?.children.find(child => child.element?.name === name);

/** `TextField.numLines`: its text's height in lines of the field's style. */
const numLines = (window: LayoutWindow): number => {
    const lineHeight = window.element ? (measureTemplateText(window.element, 'X', undefined)?.textHeight ?? 0) : 0;

    return (lineHeight > 0) ? Math.max(1, Math.round(window.textHeight / lineHeight)) : 1;
};

/** `resizeHtml`. */
const resizeHtml = (window: LayoutWindow | undefined) => window?.setHeight((numLines(window) * HTML_LINE_HEIGHT) + HTML_EXTRA_HEIGHT);

/** One side as the arrange measures it: its container, the offering clone in it, and what its view knows. */
interface OfferingSide {
    container: string;
    active: string | undefined;
    rules: ITradeRequirementRule[] | undefined;
    /** `OfferingRuleView.center` applies: a `Rules` requirement with one rule. */
    centerRule: boolean;
}

/**
 * `requirementsStateUpdated`'s `resizeHtml`s and `resizeRequirementContainers`, after each
 * `OfferingRuleView.initializeUI` (the rule as wide as its offering, as high as its rows).
 */
const arrangeFor = (give: OfferingSide, get: OfferingSide | undefined) => ({ find }: TemplateWindows) => {
    resizeHtml(find('req_met_text'));
    resizeHtml(find('additional_text'));
    resizeHtml(find('disclaimer_text'));

    const sides = [ give, ...(get ? [ get ] : []) ].map((side) => {
        const container = find(side.container);
        const view = container?.children[0];
        const border = view && find(`${side.container}/requirements_definition`);
        const rulesList = view && find(`${side.container}/rules_list`);

        for (const rule of listItems(rulesList)) {
            rule.setWidth(view?.width ?? rule.width);
            rule.setHeight(childNamed(rule, 'rule_nodes_rows')?.height ?? rule.height);
        }

        const active = side.active ? find(`${side.container}/${side.active}`) : undefined;
        // `canMinimalizeWidth`: every rule a single node, or the custom text narrow enough.
        const canMinimalize = ((side.active === 'rules_list') && !!side.rules?.every(rule => rule.nodes.length === 1))
            || ((side.active === 'custom_text') && !!active && (active.textWidth <= MINIMALIZE_TEXT_WIDTH));

        return { side, container, view, border, rulesList, active, canMinimalize };
    });

    const [ giveSide, getSide ] = sides;
    const width = (getSide && giveSide.canMinimalize && getSide.canMinimalize) ? MINIMALIZED_BORDER_WIDTH : NORMAL_BORDER_WIDTH;
    const borderHeight = Math.max(MIN_BORDER_HEIGHT, Math.max(...sides.map(({ active }) => active?.height ?? 0)) + (2 * BORDER_TOP_BOTTOM_OFFSET));

    find('offering_containers_separator')?.setHeight(borderHeight);

    for (const { side, container, view, border, rulesList, active } of sides) {
        if (!container || !view || !border) continue;

        // `_offeringBorderMargins`: the template's height round its `requirements_definition`.
        const margins = (view.element && border.element) ? (view.element.height - border.element.height) : 0;

        container.setWidth(width);
        container.setHeight(borderHeight + margins);
        // `initializeStretchingWithParent`: the clone as large as its container.
        view.setRectangle(0, 0, container.width, container.height);

        // `centerActiveElement`.
        if (active) active.setY(Math.trunc((border.height / 2) - (active.height / 2)));

        if (side.centerRule && rulesList) {
            const rows = childNamed(listItems(rulesList)[0], 'rule_nodes_rows');
            const colsWidth = Math.max(0, ...listItems(rows).map(row => row.width));

            rows?.setX(Math.trunc(((border.width - (rulesList.x * 2)) / 2) - (colsWidth / 2)));
        }
    }
};

export interface WiredTradeRequirementsViewProps {
    requirement: ITradeRequirement;
    tradeTypeName: string;
    canAccept: boolean;
    extra: number;
    highlightCount: number;
}

export const WiredTradeRequirementsView = ({ requirement, tradeTypeName, canAccept, extra, highlightCount }: WiredTradeRequirementsViewProps) => {
    const t = useTranslation();
    const [ highlighting, setHighlighting ] = useState(false);
    const [ highlightStep, setHighlightStep ] = useState(0);
    const [ highlightFor, setHighlightFor ] = useState(highlightCount);

    if (highlightFor !== highlightCount) {
        setHighlightFor(highlightCount);
        setHighlightStep(0);
        setHighlighting(true);
    }

    // `highlight`: the timer ticks the blend, and on completion the border hides.
    useEffect(() => {
        if (!highlighting) return;

        const interval = setInterval(() => setHighlightStep(step => step + 1), HIGHLIGHT_DELAY);
        const timeout = setTimeout(() => setHighlighting(false), HIGHLIGHT_DELAY * HIGHLIGHT_STEPS);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [ highlighting, highlightFor ]);

    const { rules } = requirement;
    const isPayment = isWiredTradePaymentOnly(requirement);
    const showGet = !isPayment || (requirement.youGetText.length > 0);
    const giveRules = rules?.definition.youGiveRule;
    const youGetRule = rules?.definition.youGetRule;
    const getRules = useMemo(() => (youGetRule ? [ youGetRule ] : []), [ youGetRule ]);
    const isRulesType = (Number(requirement.type) === Number(TradeRequirementType.Rules));
    const giveActive = getActiveElement(requirement.type, giveRules, undefined, true);
    const getActive = getActiveElement(requirement.type, getRules, requirement.youGetText, false);
    const rulesType = rules ? Number(rules.type) : undefined;
    const isAuto = (rulesType === Number(TradeRequirementRulesType.AutoMultiplier));

    let metText = t(canAccept ? 'inventory.wired_trading.requirements.indicator.met' : 'inventory.wired_trading.requirements.indicator.not_met');

    if (rules && (rulesType === Number(TradeRequirementRulesType.Multiplier))) metText = t('inventory.wired_trading.requirements.indicator.multi', '', { times: String(rules.multiplier), amount: String(extra) });
    else if (canAccept && isAuto && (extra > 1)) metText = t('inventory.wired_trading.requirements.indicator.met_numbered', '', { amount: String(extra) });

    const showDisclaimer = isPayment && showGet;
    const arrange = useMemo(() => arrangeFor(
        { container: 'you_give_container', active: giveActive, rules: giveRules, centerRule: isRulesType && (giveRules?.length === 1) },
        showGet ? { container: 'you_get_container', active: getActive, rules: getRules, centerRule: isRulesType && (getRules.length === 1) } : undefined,
    ), [ giveActive, giveRules, getActive, getRules, isRulesType, showGet ]);

    const bindings: TemplateBindings = {
        bubble_title: { caption: t('inventory.wired_trading.requirements.title', '', { type: tradeTypeName }) },
        highlight_border: { visible: highlighting, blend: highlighting ? easeInOutCubic(highlightStep, 0, HIGHLIGHT_MAX, HIGHLIGHT_STEPS) : 0 },
        you_give_container: { items: [ offeringItem(true, giveActive, giveRules, undefined, t('inventory.wired_trading.requirements.offering')) ] },
        offering_containers_separator: { visible: showGet },
        you_get_container: { visible: showGet, items: showGet ? [ offeringItem(false, getActive, getRules, requirement.youGetText, t('inventory.wired_trading.requirements.receiving')) ] : [] },
        req_met_text: { caption: metText },
        req_met_icon: { asset: LayoutImage(canAccept ? 'habbo-window-manager-com/common_check_mark.png' : 'habbo-window-manager-com/common_cross_mark.png') },
        additional_text: {
            visible: isAuto,
            ...(isAuto && { caption: t(isPayment ? 'inventory.wired_trading.requirements.auto_mode_hint_payment' : 'inventory.wired_trading.requirements.auto_mode_hint_trade', '', { amount: String(rules?.autoMultiplierMax ?? 0) }) }),
        },
        disclaimer_text: {
            visible: showDisclaimer,
            ...(showDisclaimer && { caption: t('inventory.wired_trading.requirements.receive_text_disclaimer', '', { you_get_name: t('inventory.wired_trading.requirements.receiving') }) }),
        },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            part="trade_requirements_bubble"
            bindings={bindings}
            arrange={arrange}
        />
    );
};
