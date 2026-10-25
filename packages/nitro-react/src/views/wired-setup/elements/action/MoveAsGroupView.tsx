/**
 * `actiontypes/MoveAsGroup.buildInputs` - the usage info, then the x and y offset inputs (-64 to
 * 64, named `place_furni.offsets.x` / `.y`) in the `place_furni.offsets` section. The target
 * location's furni / users switch is the dialog's merged input source section.
 */
import { MOVE_AS_GROUP_OFFSET_MAX, MOVE_AS_GROUP_OFFSET_MIN, MoveAsGroupActionForm, WiredElementView } from '#base/wired';

import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

export const MoveAsGroupView: WiredElementView<MoveAsGroupActionForm> = ({ form, setForm }) => (
    <>
        <WiredUsageInfoSection text="${wiredfurni.params.move_as_group.usage_info}" />
        <WiredSection title="${wiredfurni.params.place_furni.offsets}">
            <WiredSimpleList>
                <WiredNamedNumberInput
                    name="${wiredfurni.params.place_furni.offsets.x}"
                    value={form.offsetX}
                    onChange={offsetX => setForm({ offsetX })}
                    min={MOVE_AS_GROUP_OFFSET_MIN}
                    max={MOVE_AS_GROUP_OFFSET_MAX}
                />
                <WiredNamedNumberInput
                    name="${wiredfurni.params.place_furni.offsets.y}"
                    value={form.offsetY}
                    onChange={offsetY => setForm({ offsetY })}
                    min={MOVE_AS_GROUP_OFFSET_MIN}
                    max={MOVE_AS_GROUP_OFFSET_MAX}
                />
            </WiredSimpleList>
        </WiredSection>
    </>
);
