/**
 * The sandbox self donation tool - Flash `roomevents/misc/SelfDonationToolView`, an ubuntu wired
 * window 420 wide titled `selfdonation.title` ("Sandbox donation tool"): the amount (1-500, 80
 * wide), the furni type selection, and the footer - its "ready" captioned `selfdonation.donate`
 * and its splitter shown, all three in one list. Every text has Flash's English fallback, since
 * a sandbox hotel may not carry the keys.
 *
 * `showTool` starts from 1 and an empty search; "Donate" validates and sends
 * (`SelfDonationTool.onDonate`); the answer is an alert.
 */
import type { IChestItemType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { selfDonateWiredItem, WIRED_SELF_DONATION_MAX_AMOUNT } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { WiredNumberInput } from '#base/views/wired-setup/kit/WiredNumberInput';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredItemTypeSelectionSection } from '#base/views/wired-trading/common/WiredItemTypeSelection';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

const FRAME_WIDTH = 420;

export interface WiredSelfDonationViewProps {
    onClose: () => void;
}

export const WiredSelfDonationView = ({ onClose }: WiredSelfDonationViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ amount, setAmount ] = useState(1);
    const [ itemType, setItemType ] = useState<IChestItemType | undefined>(undefined);

    return (
        <WiredTradingFrame
            id="wired-self-donation"
            title={t('selfdonation.title', 'Sandbox donation tool')}
            width={FRAME_WIDTH}
            onClose={onClose}
            parts={[
                <WiredSimpleList key="tool">
                    <WiredSection title={t('selfdonation.amount', 'Amount')}>
                        <WiredNumberInput
                            value={amount}
                            onChange={setAmount}
                            min={1}
                            max={WIRED_SELF_DONATION_MAX_AMOUNT}
                            width={80}
                        />
                    </WiredSection>
                    <WiredItemTypeSelectionSection
                        selected={itemType}
                        onSelect={setItemType}
                    />
                    <WiredTradingFooter
                        onSave={() => selfDonateWiredItem(send, itemType, amount)}
                        onCancel={onClose}
                        saveCaption={t('selfdonation.donate', 'Donate')}
                    />
                </WiredSimpleList>,
            ]}
        />
    );
};
