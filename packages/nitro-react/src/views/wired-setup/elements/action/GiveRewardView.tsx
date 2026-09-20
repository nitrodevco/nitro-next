/**
 * `actiontypes/GiveReward.buildInputs` - four sections, captioned with Flash's English literals:
 * - "Reward limit": the `wiredfurni.params.prizelimit` checkbox (its `%amount%` emptied) continued
 *   by the limit input (1 to 1000, 60 wide), over a red warning shown only while the box is
 *   unticked (`updatePrizeLimitState`);
 * - "How often can a user be rewarded": the interval radio in two columns over the "n =" input
 *   (4 digits, 60 wide), disabled while "Once" is selected (`onRewardIntervalChange`);
 * - "Unique Rewards": the checkbox with its explanation under it; ticking it disables the
 *   probabilities (`setProbabilityVisibility`);
 * - "Rewards": the reward list, with the "Add reward" link in the header (one more row, up to 20).
 */
import { clampDisplayedRewards, GIVE_REWARD_INTERVAL_MAX_CHARACTERS, GIVE_REWARD_INTERVAL_RESTRICT, GIVE_REWARD_LIMIT_MAX, GIVE_REWARD_MAX_REWARDS, GiveRewardActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredNamedTextInput } from '../../kit/WiredNamedTextInput';
import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredRewardList } from '../../kit/WiredRewardList';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredText } from '../../kit/WiredText';
import { WiredTextualButton } from '../../kit/WiredTextualButton';

/** `NumberInputParam(1, 1, 1000, 60)` and `TextInputParam("1", 4, null, 60, "0-9")`: both fields are 60 wide. */
const INPUT_WIDTH = 60;
/** The warning's `TextParam.textColor`, 13369344. */
const WARNING_COLOR = '#cc0000';

const INTERVAL_OPTIONS = [
    { id: 0, label: 'Once' },
    { id: 1, label: '1 / n Days' },
    { id: 2, label: '1 / n Hours' },
    { id: 3, label: '1 / n Mins' },
];

/** `createRadioGroup(..., onRewardIntervalChange, 2)`. */
const INTERVAL_COLUMNS = 2;

export const GiveRewardView: WiredElementView<GiveRewardActionForm> = ({ form, setForm, ctx }) => (
    <>
        <WiredSection title="Reward limit">
            <WiredSimpleList>
                <WiredCheckboxGroup
                    options={[ {
                        id: 0,
                        label: ctx.localize('wiredfurni.params.prizelimit', { amount: '' }),
                        selected: form.limitEnabled,
                        extra: (
                            <WiredNumberInput
                                value={form.limit}
                                onChange={limit => setForm({ limit })}
                                min={1}
                                max={GIVE_REWARD_LIMIT_MAX}
                                width={INPUT_WIDTH}
                            />
                        ),
                    } ]}
                    onToggle={(_, limitEnabled) => setForm({ limitEnabled })}
                />
                {!form.limitEnabled && (
                    <WiredText
                        text="Reward limit not set. Make sure rewards are badges or non-tradeable items."
                        color={WARNING_COLOR}
                    />
                )}
            </WiredSimpleList>
        </WiredSection>
        <WiredSection title="How often can a user be rewarded">
            <WiredSimpleList>
                <WiredRadioGroup
                    options={INTERVAL_OPTIONS}
                    selected={form.interval}
                    onSelect={interval => setForm({ interval })}
                    columns={INTERVAL_COLUMNS}
                />
                <WiredNamedTextInput
                    name="n ="
                    value={form.intervalText}
                    onChange={intervalText => setForm({ intervalText })}
                    maxCharacters={GIVE_REWARD_INTERVAL_MAX_CHARACTERS}
                    width={INPUT_WIDTH}
                    restrict={GIVE_REWARD_INTERVAL_RESTRICT}
                    disabled={form.interval === 0}
                />
            </WiredSimpleList>
        </WiredSection>
        <WiredSection title="Unique Rewards">
            <WiredCheckboxGroup
                options={[ {
                    id: 0,
                    label: 'Unique Rewards?',
                    selected: form.unique,
                    extraUnder: <WiredText text="If checked each reward will be given once to each user. Probabilities are not in use." />,
                } ]}
                onToggle={(_, unique) => setForm({ unique })}
            />
        </WiredSection>
        <WiredSection
            title="Rewards"
            headerOptions={(
                <WiredTextualButton
                    text="Add reward"
                    onPress={() => setForm(current => ({ ...current, displayedRewards: clampDisplayedRewards(GIVE_REWARD_MAX_REWARDS, current.displayedRewards + 1) }))}
                />
            )}
        >
            <WiredRewardList
                rows={form.rows}
                displayedRewards={form.displayedRewards}
                probabilityEnabled={!form.unique}
                onRowChange={(index, row) => setForm(current => ({ ...current, rows: current.rows.map((value, i) => ((i === index) ? row : value)) }))}
            />
        </WiredSection>
    </>
);
