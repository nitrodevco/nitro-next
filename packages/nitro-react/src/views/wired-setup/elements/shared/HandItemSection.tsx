/**
 * The `handitem` section `conditions/ActorHasHandItem` and `selectors/§_-l1M§` (users with hand
 * item) build the same way in their `buildInputs`: the hand item dropdown
 * (`wiredfurni.tooltip.handitem` as its caption, `${handitem<code>}` per option) over the
 * `capture.handitem` button. What a capture selects is each element's own `captureHanditem`, so
 * the button only reports the press.
 */
import { WiredButton } from '../../kit/WiredButton';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';

export interface HandItemSectionProps {
    /** The dropdown's hand item codes, in order. */
    handItems: readonly number[];
    selected: number;
    onSelect: (handItem: number) => void;
    /** `captureHanditem`. */
    onCapture: () => void;
}

export const HandItemSection = ({ handItems, selected, onSelect, onCapture }: HandItemSectionProps) => (
    <WiredSection title="${wiredfurni.params.handitem}">
        <WiredSimpleList>
            <WiredDropdown
                options={handItems.map(code => ({ id: code, label: `\${handitem${code}}` }))}
                selected={selected}
                onSelect={onSelect}
                caption="${wiredfurni.tooltip.handitem}"
            />
            <WiredButton
                label="${wiredfurni.params.capture.handitem}"
                onPress={onCapture}
            />
        </WiredSimpleList>
    </WiredSection>
);
