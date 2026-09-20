/**
 * `conditions/ActorIsWearingBadge.buildInputs` - the `badgecode` section: a text input (1000
 * characters) with the `wiredfurni.tooltip.badgecode` tooltip.
 */
import { ACTOR_IS_WEARING_BADGE_MAX_LENGTH, ActorIsWearingBadgeConditionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const ActorIsWearingBadgeView: WiredElementView<ActorIsWearingBadgeConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.badgecode}">
        <WiredTextInput
            value={form.badgeCode}
            onChange={badgeCode => setForm({ badgeCode })}
            maxCharacters={ACTOR_IS_WEARING_BADGE_MAX_LENGTH}
            tooltip="${wiredfurni.tooltip.badgecode}"
        />
    </WiredSection>
);
