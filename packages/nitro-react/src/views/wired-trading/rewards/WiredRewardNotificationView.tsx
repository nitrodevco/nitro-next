/**
 * A reward popup - Flash `reward_notification/RewardNotificationView`, an ubuntu wired window 276
 * wide titled `wiredrewards.title`, padded 7 all round: the reward text (or
 * `wiredrewards.desc_default`), the rewarded nodes (`NodeOverviewPreset`: a click on a coins node
 * opens the vault, on a furni the inventory), the earnings note when coins are among them, and an
 * OK button. `RewardNotificationController` moves each popup off the previous one
 * (`WiredRewardView.offsetX/Y`).
 */
import { TradeRequirementNodeType } from '@nitrodevco/nitro-packets';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInterpolate, useTranslation } from '#base/context/system';
import { WiredRewardContents, WiredRewardView } from '#base/context/wired-trading';
import { WiredButton } from '#base/views/wired-setup/kit/WiredButton';
import { WiredHtml } from '#base/views/wired-setup/kit/WiredHtml';
import { WiredPaddedContainer } from '#base/views/wired-setup/kit/WiredPaddedContainer';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';
import { WiredTradeRuleEditor } from '#base/views/wired-trading/common/WiredTradeRuleEditor';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

const FRAME_WIDTH = 276;
const PADDING = 7;

export interface WiredRewardNotificationViewProps {
    view: WiredRewardView;
    reward: WiredRewardContents;
    onClose: () => void;
}

export const WiredRewardNotificationView = ({ view, reward, onClose }: WiredRewardNotificationViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();
    const nodes = reward.rewardContents?.nodes ?? [];
    const hasCreditNode = nodes.some(node => Number(node.type) === Number(TradeRequirementNodeType.Coin));
    const text = reward.rewardText ?? '';

    return (
        <WiredTradingFrame
            id={`wired-reward-${reward.internalId}`}
            title={interpolate('${wiredrewards.title}')}
            width={FRAME_WIDTH}
            openOffset={{ x: view.offsetX, y: view.offsetY }}
            onClose={onClose}
            parts={[
                <WiredPaddedContainer
                    key="content"
                    left={PADDING}
                    top={PADDING}
                    right={PADDING}
                    bottom={PADDING}
                >
                    <WiredSimpleList>
                        <WiredText text={(text.length === 0) ? '${wiredrewards.desc_default}' : text} />
                        <WiredTradeRuleEditor
                            title="${wiredrewards.title}"
                            nodes={nodes}
                            overview
                            onEditNode={index => openClientLink(send, (Number(nodes[index].type) === Number(TradeRequirementNodeType.Coin)) ? 'habboUI/open/vault' : 'inventory/open')}
                        />
                        {hasCreditNode && (
                            <WiredHtml text={t('wiredrewards.earnings', 'wiredrewards.earnings')} />
                        )}
                        <WiredButton
                            label="${wiredrewards.ok}"
                            onPress={onClose}
                        />
                    </WiredSimpleList>
                </WiredPaddedContainer>,
            ]}
        />
    );
};
