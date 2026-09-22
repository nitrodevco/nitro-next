/**
 * What a wired trade asks for - Flash `inventory/wired_trading/requirements/WiredTradeRequirementsView`
 * with `offerings/OfferingRequirementsView`, `OfferingRuleView` and `OfferingNodeView`, drawn in
 * the `trade_requirements_bubble` of `inventory_trading_wired_xml` (a style 7 bubble window, 430
 * wide, content margins 8 on every side, `bubble_contents` at 13,7 of the content area):
 *
 * - the title (`inventory.wired_trading.requirements.title` with the trade type), the 1px
 *   `bubble_title_spacing`, then the 180 high `offerings` row, all 6 apart;
 * - "you give" beside "you get" (the latter only for a trade, or a payment with a receive text),
 *   180 wide each - 122 when both sides `canMinimalizeWidth` (every rule a single node, or a custom
 *   text whose `textWidth` is at most 100) - with the vertical `separator` widget between them.
 *   `resizeRequirementContainers`: the border is the taller side's active element plus 2 x 18,
 *   at least 80, and the container 26 more; the active element sits in the middle of it. A side
 *   lists its rules ("or" before every one but the first, two nodes a row 3 apart, "&" before
 *   every node but the first, "Nx" above one, the furni's `product_icon` or the credits icon; a
 *   lone rule of a `Rules` requirement centred, `OfferingRuleView.center`), or for the "any"
 *   requirement types the matching sentence, or the custom text;
 * - whether the offer meets it (`requirementsStateUpdated`): the multiplier sentence, "met"
 *   (numbered for the automatic multiplier), or "not met", with a check or cross; the grey
 *   container grows with its text (`resizeHtml`: 15px a line plus 2, reflected to the parent);
 * - the automatic multiplier's hint, and for a payment with a receive text the red disclaimer.
 *
 * The bubble's height follows `bubble_contents` (reflected to the parent: the list plus 35).
 * `highlightRefresh` (an overridden trade) fades the style 2 `#4fbce3` `highlight_border` in and
 * out over 500 ms (`highlight`: a 16 ms timer, `easeInOutCubic` towards 0.35).
 */
import type { ITradeRequirement, ITradeRequirementNode, ITradeRequirementRule } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType, TradeRequirementRulesType, TradeRequirementType } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, Bubble, LayoutImage, Region, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';
import { isWiredTradePaymentOnly } from '#base/utils';

const BUBBLE_WIDTH = 430;
/** `bubble_contents` at 13,7 of the content area (8 in) and the bubble's 20px below it. */
const BUBBLE_EXTRA_HEIGHT = 35;
const CONTENTS_WIDTH = 390;
const CONTENTS_SPACING = 6;
const TITLE_HEIGHT = 17;
const TITLE_SPACING_HEIGHT = 1;
const OFFERINGS_HEIGHT = 180;
/** `WiredTradeRequirementsView.NORMAL_BORDER_WIDTH` / `MINIMALIZED_BORDER_WIDTH` / `MIN_BORDER_HEIGHT` / `BORDER_TOP_BOTTOM_OFFSET`. */
const NORMAL_BORDER_WIDTH = 180;
const MINIMALIZED_BORDER_WIDTH = 122;
const MIN_BORDER_HEIGHT = 80;
const BORDER_TOP_BOTTOM_OFFSET = 18;
/** `_offeringBorderMargins`: the template's 179 less `requirements_definition`'s 153. */
const OFFERING_BORDER_MARGINS = 26;
/** `requirements_definition` at y 24 of the template. */
const REQUIREMENTS_BORDER_TOP = 24;
const SEPARATOR_WIDTH = 30;
/** `OfferingRuleView.MAX_COLS`. */
const MAX_COLS = 2;
const NODE_HEIGHT = 40;
/** `rule_nodes_rows`' spacing. */
const ROW_SPACING = 3;
/** `OfferingRequirementsView.initializeUI`: a custom text this narrow lets the sides shrink. */
const MINIMALIZE_TEXT_WIDTH = 100;
/** `requirements_met_container`: 30 high around a 16 high `req_met_text` at 5,7. */
const MET_CONTAINER_HEIGHT = 30;
const MET_TEXT_HEIGHT = 16;
/** `highlight`: 500 ms in 16 ms steps, blend towards 0.35. */
const HIGHLIGHT_DELAY = 16;
const HIGHLIGHT_STEPS = Math.trunc(500 / HIGHLIGHT_DELAY);
const HIGHLIGHT_MAX = 0.35;
/** A text's own gutter: 2px each side of a `TextField`. */
const TEXT_GUTTER = 4;
/** `resizeHtml`: `numLines * 15 + 2`. */
const HTML_LINE_HEIGHT = 15;

/** `WiredTradeRequirementsView.easeInOutCubic` - which, despite its name, overshoots below 0 at the end. */
const easeInOutCubic = (step: number, start: number, change: number, steps: number) => {
    const t = step / steps;

    return start + (change * (-((t * 1.75) - 0.7) * ((t * 1.75) - 0.7) + 1));
};

/** `resizeHtml` from a text's natural height: its lines, 15px each, plus 2. */
const htmlHeight = (naturalHeight: number) => (Math.max(1, Math.round((naturalHeight - TEXT_GUTTER) / HTML_LINE_HEIGHT)) * HTML_LINE_HEIGHT) + 2;

/** `rule_nodes_rows`' height: 40 a row, 3 between. */
const ruleHeight = (rule: ITradeRequirementRule) => {
    const rows = Math.ceil(rule.nodes.length / MAX_COLS);

    return (rows > 0) ? ((rows * NODE_HEIGHT) + ((rows - 1) * ROW_SPACING)) : 0;
};

/** `OfferingNodeView` on `rule_node_template`: "&", "Nx" and the 36x36 `rule_icon`, 1 apart. */
const OfferingNode = ({ node, index }: { node: ITradeRequirementNode; index: number }) => {
    const isFurni = (Number(node.type) === Number(TradeRequirementNodeType.Furni));
    const iconUrl = useWiredChestItemIconUrl(isFurni ? node.itemType : undefined);

    return (
        <Box layout={{ flexDirection: 'row', height: NODE_HEIGHT, gap: 1, flexShrink: 0 }}>
            {(index > 0) && (
                <ThemeText
                    text="&"
                    textStyle="u_regular"
                    verticalAlign="top"
                    layout={{ height: 17, marginTop: 11, flexShrink: 0 }}
                />
            )}
            {(node.amount > 1) && (
                <ThemeText
                    text={`${node.amount}x`}
                    textStyle="u_regular"
                    verticalAlign="top"
                    layout={{ height: 17, marginTop: 11, flexShrink: 0 }}
                />
            )}
            <Region layout={{ width: 36, height: 36, flexShrink: 0, overflow: 'hidden' }}>
                {isFurni && (
                    // `furni_icon`: a 40x40 `product_icon` at 0,0, cut at the 36x36 `rule_icon`.
                    <Box layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        {(iconUrl !== '') && <ThemeImage src={iconUrl} />}
                    </Box>
                )}
                {!isFurni && (
                    <ThemeImage
                        src={LayoutImage('shared/pursearea_credits_icon2.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, top: 2, width: 32, height: 36 }}
                    />
                )}
            </Region>
        </Box>
    );
};

interface OfferingRuleProps {
    rule: ITradeRequirementRule;
    index: number;
    width: number;
    /** `OfferingRuleView.center`: the rows centred in the list's width, not at 32. */
    centered: boolean;
}

/** `OfferingRuleView` on `rule_template`: "or" in a 32 wide column, then the node rows. */
const OfferingRule = ({ rule, index, width, centered }: OfferingRuleProps) => {
    const t = useTranslation();
    const rows: ITradeRequirementNode[][] = [];

    rule.nodes.forEach((node, nodeIndex) => {
        if (!(nodeIndex % MAX_COLS)) rows.push([]);

        rows[rows.length - 1].push(node);
    });

    const nodeRows = (
        <Box layout={{ flexDirection: 'column', gap: ROW_SPACING }}>
            {rows.map((row, rowIndex) => (
                <Box
                    key={rowIndex}
                    layout={{ flexDirection: 'row', height: NODE_HEIGHT, gap: 1, flexShrink: 0 }}
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
    );

    return (
        <Region layout={{ width, height: ruleHeight(rule), flexShrink: 0 }}>
            {(index > 0) && (
                <Region
                    alpha={0.5}
                    layout={{ position: 'absolute', left: 0, width: 32, top: 11, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('inventory.wired_trading.requirements.or')}
                        textStyle="u_regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
            {centered
                ? (
                        <Box layout={{ position: 'absolute', left: 0, top: 0, width, flexDirection: 'row', justifyContent: 'center' }}>
                            {nodeRows}
                        </Box>
                    )
                : (
                        <Box layout={{ position: 'absolute', left: 32, top: 0 }}>
                            {nodeRows}
                        </Box>
                    )}
        </Region>
    );
};

interface OfferingSideProps {
    requirementType: TradeRequirementType;
    rules: ITradeRequirementRule[] | undefined;
    text: string | undefined;
    give: boolean;
    width: number;
    borderHeight: number;
    /** The sentence or custom text's natural height, measured by the parent. */
    textHeight: number;
    textRef: (node: PixiContainer | null) => void;
}

/** What `OfferingRequirementsView.initializeUI` shows: `any_*_text`, `rules_list` or `custom_text`. */
const getActiveElement = (requirementType: TradeRequirementType, rules: ITradeRequirementRule[] | undefined, text: string | undefined, give: boolean): 'any' | 'rules' | 'custom' | null => {
    if ((Number(requirementType) !== Number(TradeRequirementType.Rules)) && give) return 'any';
    if (rules && rules.length) return 'rules';
    if (text) return 'custom';

    return null;
};

/** `offering_requirements_template` as `OfferingRequirementsView` fills it. */
const OfferingSide = ({ requirementType, rules, text, give, width, borderHeight, textHeight, textRef }: OfferingSideProps) => {
    const t = useTranslation();
    const type = Number(requirementType);
    const active = getActiveElement(requirementType, rules, text, give);
    const activeHeight = (active === 'rules') ? (rules ?? []).reduce((sum, rule) => sum + ruleHeight(rule), 0) : textHeight;
    // `centerActiveElement`.
    const activeTop = Math.trunc((borderHeight / 2) - (activeHeight / 2));
    let anyKey = 'inventory.wired_trading.requirements.donation.all';

    if (type === Number(TradeRequirementType.AnyCoins)) anyKey = 'inventory.wired_trading.requirements.donation.coins';
    else if (type === Number(TradeRequirementType.AnyFurni)) anyKey = 'inventory.wired_trading.requirements.donation.furni';

    return (
        <Region layout={{ width, height: borderHeight + OFFERING_BORDER_MARGINS, flexShrink: 0 }}>
            <ThemeText
                text={t(give ? 'inventory.wired_trading.requirements.offering' : 'inventory.wired_trading.requirements.receiving')}
                textStyle="u_regular"
                textOptions={{ align: 'center' }}
                flashFormat={{ bold: true }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width, top: 0, height: 17 }}
            />
            <Border
                variant="0"
                tintColor="#f7f7f7"
                layout={{ position: 'absolute', left: 0, width, top: REQUIREMENTS_BORDER_TOP, height: borderHeight }}
            >
                {(active === 'any') && (
                    <Box
                        ref={textRef}
                        alpha={0.6}
                        layout={{ position: 'absolute', left: 10, width: width - 20, top: activeTop }}
                    >
                        <ThemeText
                            text={t(anyKey)}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: width - 20 - TEXT_GUTTER }}
                            verticalAlign="top"
                        />
                    </Box>
                )}
                {(active === 'rules') && (
                    <Box layout={{ position: 'absolute', left: 1, width: width - 2, top: activeTop, flexDirection: 'column' }}>
                        {(rules ?? []).map((rule, index) => (
                            <OfferingRule
                                key={index}
                                rule={rule}
                                index={index}
                                width={width - 2}
                                centered={(type === Number(TradeRequirementType.Rules)) && ((rules ?? []).length === 1)}
                            />
                        ))}
                    </Box>
                )}
                {(active === 'custom') && (
                    <Box
                        ref={textRef}
                        alpha={0.6}
                        layout={{ position: 'absolute', left: 10, width: width - 20, top: activeTop, flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={text ?? ''}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: width - 20 - TEXT_GUTTER, align: 'center' }}
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                        />
                    </Box>
                )}
            </Border>
        </Region>
    );
};

/** Whether every rule is a single node - one half of `canMinimalizeWidth`. */
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
    const [ highlightStep, setHighlightStep ] = useState(0);
    const [ highlightFor, setHighlightFor ] = useState(highlightCount);
    const [ giveTextNode, setGiveTextNode ] = useState<PixiContainer | null>(null);
    const [ getTextNode, setGetTextNode ] = useState<PixiContainer | null>(null);
    const [ customWidthNode, setCustomWidthNode ] = useState<PixiContainer | null>(null);
    const [ metTextNode, setMetTextNode ] = useState<PixiContainer | null>(null);
    const [ additionalTextNode, setAdditionalTextNode ] = useState<PixiContainer | null>(null);
    const [ disclaimerTextNode, setDisclaimerTextNode ] = useState<PixiContainer | null>(null);
    const giveTextHeight = useLayoutSize(giveTextNode).height;
    const getTextHeight = useLayoutSize(getTextNode).height;
    const customTextWidth = useLayoutSize(customWidthNode).width;
    const metTextHeight = htmlHeight(useLayoutSize(metTextNode).height);
    const additionalTextHeight = htmlHeight(useLayoutSize(additionalTextNode).height);
    const disclaimerTextHeight = htmlHeight(useLayoutSize(disclaimerTextNode).height);
    const rules = requirement.rules;
    const isPayment = isWiredTradePaymentOnly(requirement);
    const showGet = !isPayment || (requirement.youGetText.length > 0);
    const giveRules = rules?.definition.youGiveRule;
    const getRules = rules?.definition.youGetRule ? [ rules.definition.youGetRule ] : [];

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

    const giveActive = getActiveElement(requirement.type, giveRules, undefined, true);
    const getActive = getActiveElement(requirement.type, getRules, requirement.youGetText, false);
    // `canMinimalizeWidth` of each side: every rule a single node, or a custom text no wider than 100.
    const canMinimalize = (active: ReturnType<typeof getActiveElement>, list: ITradeRequirementRule[] | undefined) => ((active === 'rules') && isMinimalizable(list)) || ((active === 'custom') && ((customTextWidth - TEXT_GUTTER) <= MINIMALIZE_TEXT_WIDTH));
    const narrow = showGet && canMinimalize(giveActive, giveRules) && canMinimalize(getActive, getRules);
    const sideWidth = narrow ? MINIMALIZED_BORDER_WIDTH : NORMAL_BORDER_WIDTH;
    // `minBorderHeight`: the active element's height.
    const minHeight = (active: ReturnType<typeof getActiveElement>, list: ITradeRequirementRule[] | undefined, textHeight: number) => {
        if (active === 'rules') return (list ?? []).reduce((sum, rule) => sum + ruleHeight(rule), 0);
        if (active) return textHeight;

        return 0;
    };
    const borderHeight = Math.max(MIN_BORDER_HEIGHT, Math.max(minHeight(giveActive, giveRules, giveTextHeight), showGet ? minHeight(getActive, getRules, getTextHeight) : 0) + (2 * BORDER_TOP_BOTTOM_OFFSET));

    let metText = t(canAccept ? 'inventory.wired_trading.requirements.indicator.met' : 'inventory.wired_trading.requirements.indicator.not_met');

    if (rules && (Number(rules.type) === Number(TradeRequirementRulesType.Multiplier))) metText = t('inventory.wired_trading.requirements.indicator.multi', '', { times: String(rules.multiplier), amount: String(extra) });
    else if (canAccept && rules && (Number(rules.type) === Number(TradeRequirementRulesType.AutoMultiplier)) && (extra > 1)) metText = t('inventory.wired_trading.requirements.indicator.met_numbered', '', { amount: String(extra) });

    const isAuto = !!rules && (Number(rules.type) === Number(TradeRequirementRulesType.AutoMultiplier));
    const autoHintKey = isPayment ? 'inventory.wired_trading.requirements.auto_mode_hint_payment' : 'inventory.wired_trading.requirements.auto_mode_hint_trade';
    const showDisclaimer = isPayment && showGet;
    // `req_met_text` reflects its growth to the container.
    const metContainerHeight = MET_CONTAINER_HEIGHT + (metTextHeight - MET_TEXT_HEIGHT);
    const contentsHeight = TITLE_HEIGHT + CONTENTS_SPACING + TITLE_SPACING_HEIGHT + CONTENTS_SPACING + OFFERINGS_HEIGHT + CONTENTS_SPACING + metContainerHeight
        + (isAuto ? (CONTENTS_SPACING + additionalTextHeight) : 0)
        + (showDisclaimer ? (CONTENTS_SPACING + disclaimerTextHeight) : 0);
    const bubbleHeight = contentsHeight + BUBBLE_EXTRA_HEIGHT;

    return (
        <Bubble
            variant="7"
            pointer="left"
            margins={[ 8, 8, 8, 8 ]}
            layout={{ width: BUBBLE_WIDTH, height: bubbleHeight }}
        >
            {highlighting && (
                <Border
                    variant="2"
                    tintColor="#4fbce3"
                    blend={Math.max(0, easeInOutCubic(highlightStep, 0, HIGHLIGHT_MAX, HIGHLIGHT_STEPS))}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 415, height: bubbleHeight - 15 }}
                />
            )}
            <Box layout={{ position: 'absolute', left: 13, top: 7, width: CONTENTS_WIDTH, flexDirection: 'column', gap: CONTENTS_SPACING }}>
                <Region
                    alpha={0.5}
                    layout={{ width: CONTENTS_WIDTH, height: TITLE_HEIGHT, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('inventory.wired_trading.requirements.title', '', { type: tradeTypeName })}
                        textStyle="u_regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Box layout={{ width: 0, height: TITLE_SPACING_HEIGHT, flexShrink: 0 }} />
                <Region layout={{ width: CONTENTS_WIDTH, height: OFFERINGS_HEIGHT, flexShrink: 0, flexDirection: 'row', justifyContent: 'center', overflow: 'hidden' }}>
                    <OfferingSide
                        requirementType={requirement.type}
                        rules={giveRules}
                        text={undefined}
                        give
                        width={sideWidth}
                        borderHeight={borderHeight}
                        textHeight={giveTextHeight}
                        textRef={setGiveTextNode}
                    />
                    {showGet && (
                        <>
                            {/* `offering_containers_separator`: `SeparatorWidget` tiles `illumina_light_separator_vertical` down the middle (x = width / 2 - 1). */}
                            <Box layout={{ width: SEPARATOR_WIDTH, height: borderHeight, marginTop: REQUIREMENTS_BORDER_TOP, flexShrink: 0 }}>
                                <ThemeImage
                                    src={LayoutImage('help/illumina_light_separator_vertical.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, wrapY: true }}
                                    layout={{ position: 'absolute', left: (SEPARATOR_WIDTH / 2) - 1, top: 0, width: 2, height: borderHeight }}
                                />
                            </Box>
                            <OfferingSide
                                requirementType={requirement.type}
                                rules={getRules}
                                text={requirement.youGetText}
                                give={false}
                                width={sideWidth}
                                borderHeight={borderHeight}
                                textHeight={getTextHeight}
                                textRef={setGetTextNode}
                            />
                        </>
                    )}
                </Region>
                <Region
                    backgroundColor="#d9d9d9"
                    layout={{ width: CONTENTS_WIDTH, height: metContainerHeight, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, top: 7, width: 342, height: metTextHeight, overflow: 'hidden' }}>
                        <Box ref={setMetTextNode}>
                            <ThemeText
                                text={metText}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 342 - TEXT_GUTTER }}
                                markup
                                verticalAlign="top"
                            />
                        </Box>
                    </Region>
                    <ThemeImage
                        src={LayoutImage(canAccept ? 'wired/common_check_mark.png' : 'inventory/common_cross_mark.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 359, top: 0, width: 30, height: 30 }}
                    />
                </Region>
                {isAuto && (
                    <Region layout={{ width: CONTENTS_WIDTH, height: additionalTextHeight, flexShrink: 0, overflow: 'hidden' }}>
                        <Box ref={setAdditionalTextNode}>
                            <ThemeText
                                text={t(autoHintKey, '', { amount: String(rules?.autoMultiplierMax ?? 1) })}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: CONTENTS_WIDTH - TEXT_GUTTER }}
                                markup
                                verticalAlign="top"
                            />
                        </Box>
                    </Region>
                )}
                {showDisclaimer && (
                    <Region layout={{ width: CONTENTS_WIDTH, height: disclaimerTextHeight, flexShrink: 0, overflow: 'hidden' }}>
                        <Box ref={setDisclaimerTextNode}>
                            <ThemeText
                                text={t('inventory.wired_trading.requirements.receive_text_disclaimer', '', { you_get_name: t('inventory.wired_trading.requirements.receiving') })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#bf272a', wordWrap: true, wordWrapWidth: CONTENTS_WIDTH - TEXT_GUTTER }}
                                markup
                                verticalAlign="top"
                            />
                        </Box>
                    </Region>
                )}
            </Box>
            {/* `customText.textWidth`, read unwrapped for `canMinimalizeWidth`; never drawn. */}
            {(getActive === 'custom') && (
                <Box
                    ref={setCustomWidthNode}
                    alpha={0}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                >
                    <ThemeText
                        text={requirement.youGetText}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                    />
                </Box>
            )}
        </Bubble>
    );
};
