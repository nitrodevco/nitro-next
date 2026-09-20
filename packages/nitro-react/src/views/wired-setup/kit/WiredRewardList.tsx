/**
 * `uibuilder/presets/combinations/RewardListPreset` + `RewardRowPreset` - the reward table of the
 * "give reward" box (`GiveReward`): a header row ("Badge?", "Product/Badge code", "Probability" -
 * Flash's literals) over the first `displayedRewards` of the box's rows (`WiredRewardRow`), all
 * `genericVerticalSpacing` apart.
 *
 * `probabilityEnabled` is `setProbabilityEnabled`: when off ("unique rewards") the header's
 * "Probability" and every chance field are disabled, their text kept.
 *
 * Controlled: `rows` are all `maxRewards` rows of the form (`createWiredRewardRows`), hidden ones
 * included - a row that is hidden again keeps what was typed, as the Flash rows outlive their
 * place in the list. `displayedRewards` is the form's count (`clampDisplayedRewards`), grown by
 * the element's own "Add reward" button. `onRowChange` hands back one changed row.
 */
import { WiredRewardRowData } from '#base/wired';

import { WiredRewardRow } from './WiredRewardRow';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

export interface WiredRewardListProps {
    rows: readonly WiredRewardRowData[];
    displayedRewards: number;
    probabilityEnabled: boolean;
    onRowChange: (index: number, row: WiredRewardRowData) => void;
}

export const WiredRewardList = ({ rows, displayedRewards, probabilityEnabled, onRowChange }: WiredRewardListProps) => {
    const style = useWiredStyle();

    return (
        <WiredSimpleList spacing={style.genericVerticalSpacing}>
            <WiredSimpleList vertical={false}>
                <WiredText
                    text="Badge?"
                    mode="stretch"
                />
                <WiredText
                    text="Product/Badge code"
                    mode="overflow"
                />
                <WiredText
                    text="Probability"
                    mode="stretch"
                    disabled={!probabilityEnabled}
                />
            </WiredSimpleList>
            <WiredSimpleList spacing={style.genericVerticalSpacing}>
                {rows.slice(0, displayedRewards).map((row, index) => (
                    <WiredRewardRow
                        // The rows are positions in the box's list, not items with an identity of their own.
                        key={index}
                        row={row}
                        probabilityEnabled={probabilityEnabled}
                        onChange={next => onRowChange(index, next)}
                    />
                ))}
            </WiredSimpleList>
        </WiredSimpleList>
    );
};
