/**
 * What a wired trade asks for - Flash `inventory/wired_trading/requirements/WiredTradeRequirementsView`
 * with `offerings/OfferingRequirementsView`, `OfferingRuleView` and `OfferingNodeView`, drawn in
 * the `trade_requirements_bubble` of `inventory_trading_wired_xml` (430 wide):
 *
 * - the title (`inventory.wired_trading.requirements.title` with the trade type);
 * - "you give" beside "you get" (the latter only for a trade, or a payment with a receive text),
 *   180 wide each - 122 when every rule on both sides is a single node (`canMinimalizeWidth`;
 *   for a custom text Flash measures it against 100px, here a text of up to 14 characters counts);
 *   a side lists its rules ("or" before every one but the first, two nodes a row, "&" before
 *   every node but the first, "Nx" above one, the furni's icon or the credits icon), or for the
 *   "any" requirement types the matching sentence, or the custom text;
 * - whether the offer meets it (`requirementsStateUpdated`): the multiplier sentence, "met"
 *   (numbered for the automatic multiplier), or "not met", with a check or cross;
 * - the automatic multiplier's hint, and for a payment with a receive text the red disclaimer.
 *
 * `highlightRefresh` (an overridden trade) flashes a `#4fbce3` border over the bubble for 500 ms.
 */
import type { ITradeRequirement, ITradeRequirementNode, ITradeRequirementRule } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType, TradeRequirementRulesType, TradeRequirementType } from '@nitrodevco/nitro-packets';
import { ReactNode, useEffect, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, Bubble, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { isWiredTradePaymentOnly } from '#base/utils';
import { WiredStyleProvider } from '#base/views/wired-setup/kit/WiredStyleContext';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

/**
 * `trade_requirements_bubble`: a style 7 window 430 wide whose skin leaves a 6px transparent
 * margin; `bubble_contents` (390 wide) sits at 21,15 of it (the content area's 8 plus 13,7), 20px
 * above its bottom, and `highlight_border` covers the content area 8px in (7 at the right and
 * bottom).
 */
const BUBBLE_WIDTH = 430;
const NORMAL_BORDER_WIDTH = 180;
const MINIMALIZED_BORDER_WIDTH = 122;
const MIN_BORDER_HEIGHT = 80;
/** `OfferingRuleView.MAX_COLS`. */
const MAX_COLS = 2;
/** `highlight`: 500 ms in 16 ms steps, blend rising to 0.35 and back. */
const HIGHLIGHT_MS = 500;
const TEXT_BLEND = 0.6;

/** `OfferingNodeView`. */
const OfferingNode = ({ node, index }: { node: ITradeRequirementNode; index: number }) => {
    const isFurni = (Number(node.type) === Number(TradeRequirementNodeType.Furni));
    const iconUrl = useWiredChestItemIconUrl(isFurni ? node.itemType : undefined);

    return (
        <Box layout={{ flexDirection: 'row', height: 40, gap: 1, alignItems: 'flex-start' }}>
            {(index > 0) && (
                <ThemeText
                    text="&"
                    textStyle="u_regular"
                    layout={{ marginTop: 11 }}
                />
            )}
            {(node.amount > 1) && (
                <ThemeText
                    text={`${node.amount}x`}
                    textStyle="u_regular"
                    layout={{ marginTop: 11 }}
                />
            )}
            <Box layout={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                <ThemeImage src={isFurni ? iconUrl : LayoutImage('shared/pursearea_credits_icon2.png')} />
            </Box>
        </Box>
    );
};

/** `OfferingRuleView`: "or" and the nodes, two a row. */
const OfferingRule = ({ rule, index }: { rule: ITradeRequirementRule; index: number }) => {
    const t = useTranslation();
    const rows: ITradeRequirementNode[][] = [];

    rule.nodes.forEach((node, nodeIndex) => {
        if (!(nodeIndex % MAX_COLS)) rows.push([]);

        rows[rows.length - 1].push(node);
    });

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Box layout={{ width: 32, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                {(index > 0) && (
                    <ThemeText
                        text={t('inventory.wired_trading.requirements.or')}
                        textStyle="u_regular"
                        alpha={0.5}
                    />
                )}
            </Box>
            <Box layout={{ flexDirection: 'column' }}>
                {rows.map((row, rowIndex) => (
                    <Box
                        key={rowIndex}
                        layout={{ flexDirection: 'row', gap: 3 }}
                    >
                        {row.map((node, columnIndex) => (
                            <OfferingNode
                                key={columnIndex}
                                node={node}
                                index={(rowIndex * MAX_COLS) + columnIndex}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

interface OfferingSideProps {
    requirementType: TradeRequirementType;
    rules: ITradeRequirementRule[] | undefined;
    text: string | undefined;
    give: boolean;
    width: number;
    height: number;
}

/** `OfferingRequirementsView.initializeUI`. */
const OfferingSide = ({ requirementType, rules, text, give, width, height }: OfferingSideProps) => {
    const t = useTranslation();
    const type = Number(requirementType);
    let content: ReactNode = null;

    if ((type !== Number(TradeRequirementType.Rules)) && give) {
        let key = 'inventory.wired_trading.requirements.donation.all';

        if (type === Number(TradeRequirementType.AnyCoins)) key = 'inventory.wired_trading.requirements.donation.coins';
        else if (type === Number(TradeRequirementType.AnyFurni)) key = 'inventory.wired_trading.requirements.donation.furni';

        content = (
            <ThemeText
                text={t(key, key)}
                textStyle="u_regular"
                alpha={TEXT_BLEND}
                textOptions={{ wordWrap: true, wordWrapWidth: width - 20, align: 'center' }}
            />
        );
    } else if (rules && rules.length) {
        content = (
            <Box layout={{ flexDirection: 'column' }}>
                {rules.map((rule, index) => (
                    <OfferingRule
                        key={index}
                        rule={rule}
                        index={index}
                    />
                ))}
            </Box>
        );
    } else if (text) {
        content = (
            <ThemeText
                text={text}
                textStyle="u_bold"
                alpha={TEXT_BLEND}
                textOptions={{ wordWrap: true, wordWrapWidth: width - 20, align: 'center' }}
            />
        );
    }

    return (
        <Box layout={{ width, flexDirection: 'column', gap: 7 }}>
            <ThemeText
                text={t(give ? 'inventory.wired_trading.requirements.offering' : 'inventory.wired_trading.requirements.receiving')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                layout={{ width }}
            />
            <Border
                variant="0"
                tintColor="#f7f7f7"
                layout={{ width, height, alignItems: 'center', justifyContent: 'center' }}
            >
                {content}
            </Border>
        </Box>
    );
};

/** Whether every rule is a single node - the narrow layout. */
const isMinimalizable = (rules: ITradeRequirementRule[] | undefined) => !!rules && (rules.length > 0) && rules.every(rule => rule.nodes.length === 1);

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
    const [ highlightFor, setHighlightFor ] = useState(highlightCount);
    const rules = requirement.rules;
    const isPayment = isWiredTradePaymentOnly(requirement);
    const showGet = !isPayment || (requirement.youGetText.length > 0);
    const giveRules = rules?.definition.youGiveRule;
    const getRules = rules?.definition.youGetRule ? [ rules.definition.youGetRule ] : [];

    if (highlightFor !== highlightCount) {
        setHighlightFor(highlightCount);
        setHighlighting(true);
    }

    useEffect(() => {
        if (!highlighting) return;

        const timeout = setTimeout(() => setHighlighting(false), HIGHLIGHT_MS);

        return () => clearTimeout(timeout);
    }, [ highlighting ]);

    const narrow = showGet && isMinimalizable(giveRules) && (isMinimalizable(getRules) || (getRules.length === 0 && requirement.youGetText.length > 0 && requirement.youGetText.length <= 14));
    const sideWidth = narrow ? MINIMALIZED_BORDER_WIDTH : NORMAL_BORDER_WIDTH;
    const ruleRows = (list: ITradeRequirementRule[] | undefined) => (list ?? []).reduce((sum, rule) => sum + Math.max(1, Math.ceil(rule.nodes.length / MAX_COLS)), 0);
    const sideHeight = Math.max(MIN_BORDER_HEIGHT, (Math.max(ruleRows(giveRules), ruleRows(getRules)) * 40) + 36);

    let metText = t(canAccept ? 'inventory.wired_trading.requirements.indicator.met' : 'inventory.wired_trading.requirements.indicator.not_met');

    if (rules && (Number(rules.type) === Number(TradeRequirementRulesType.Multiplier))) metText = t('inventory.wired_trading.requirements.indicator.multi', '', { times: String(rules.multiplier), amount: String(extra) });
    else if (canAccept && rules && (Number(rules.type) === Number(TradeRequirementRulesType.AutoMultiplier)) && (extra > 1)) metText = t('inventory.wired_trading.requirements.indicator.met_numbered', '', { amount: String(extra) });

    const isAuto = !!rules && (Number(rules.type) === Number(TradeRequirementRulesType.AutoMultiplier));
    const autoHintKey = isPayment ? 'inventory.wired_trading.requirements.auto_mode_hint_payment' : 'inventory.wired_trading.requirements.auto_mode_hint_trade';

    return (
        <Bubble
            variant="7"
            pointer="left"
            layout={{ width: BUBBLE_WIDTH, flexDirection: 'column', paddingLeft: 21, paddingRight: 19, paddingTop: 15, paddingBottom: 20 }}
        >
            {highlighting && (
                <Region
                    backgroundColor="#4fbce3"
                    alpha={0.35}
                    layout={{ position: 'absolute', left: 8, top: 8, right: 7, bottom: 7 }}
                />
            )}
            <Box layout={{ width: 390, flexDirection: 'column', gap: 6 }}>
                <ThemeText
                    text={t('inventory.wired_trading.requirements.title', '', { type: tradeTypeName })}
                    textStyle="u_regular"
                    alpha={0.5}
                    textOptions={{ align: 'center' }}
                    layout={{ width: 390 }}
                />
                <Box layout={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <OfferingSide
                        requirementType={requirement.type}
                        rules={giveRules}
                        text={undefined}
                        give
                        width={sideWidth}
                        height={sideHeight}
                    />
                    {showGet && (
                        <>
                            <Box layout={{ width: 30, height: sideHeight, marginTop: 24, alignItems: 'center' }}>
                                <Region
                                    backgroundColor="#b5b5b5"
                                    layout={{ width: 1, height: sideHeight }}
                                />
                            </Box>
                            <OfferingSide
                                requirementType={requirement.type}
                                rules={getRules}
                                text={requirement.youGetText}
                                give={false}
                                width={sideWidth}
                                height={sideHeight}
                            />
                        </>
                    )}
                </Box>
                <Region
                    backgroundColor="#d9d9d9"
                    layout={{ width: 390, minHeight: 30, flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}
                >
                    <Box layout={{ width: 342, flexDirection: 'column' }}>
                        <WiredStyleProvider style={UBUNTU_WIRED_STYLE}>
                            <WiredText
                                text={metText}
                                html
                            />
                        </WiredStyleProvider>
                    </Box>
                    <ThemeImage
                        src={LayoutImage(canAccept ? 'wired/common_check_mark.png' : 'inventory/common_cross_mark.png')}
                        layout={{ marginLeft: 12 }}
                    />
                </Region>
                {isAuto && (
                    <ThemeText
                        text={t(autoHintKey, '', { amount: String(rules?.autoMultiplierMax ?? 1) })}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
                    />
                )}
                {isPayment && showGet && (
                    <ThemeText
                        text={t('inventory.wired_trading.requirements.receive_text_disclaimer', '', { you_get_name: t('inventory.wired_trading.requirements.receiving') })}
                        textStyle="u_regular"
                        textOptions={{ fill: '#bf272a', wordWrap: true, wordWrapWidth: 390 }}
                    />
                )}
            </Box>
        </Bubble>
    );
};
