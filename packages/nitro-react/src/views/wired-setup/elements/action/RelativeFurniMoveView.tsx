/**
 * `actiontypes/§_-Pi§.buildInputs` (RELATIVE_FURNI_MOVE) - a section per axis
 * (`wiredfurni.params.movement.horizontal.selection` / `.vertical.selection`), each a list of the
 * two arrow radio (`move_2` / `move_6` across, `move_4` / `move_0` down and up, four columns),
 * the distance text and a 0 to 20 slider. Flash re-registers the text's `%distance%` parameter
 * on every slider change (`updateDistanceLocalization`); here the text is localized with the
 * form's distance.
 */
import { RELATIVE_MOVE_MAX_DISTANCE, RELATIVE_MOVE_NEGATIVE, RELATIVE_MOVE_POSITIVE, RelativeFurniMoveActionForm, RelativeFurniMoveAxis, WiredElementContext, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSlider } from '../../kit/WiredSlider';
import { WiredText } from '../../kit/WiredText';

interface RelativeFurniMoveAxisSectionProps {
    axis: 'horizontal' | 'vertical';
    icons: [ string, string ];
    value: RelativeFurniMoveAxis;
    onChange: (value: RelativeFurniMoveAxis) => void;
    ctx: WiredElementContext;
}

const RelativeFurniMoveAxisSection = ({ axis, icons, value, onChange, ctx }: RelativeFurniMoveAxisSectionProps) => (
    <WiredSection title={`\${wiredfurni.params.movement.${axis}.selection}`}>
        <WiredSimpleList>
            <WiredRadioGroup
                options={[ { id: RELATIVE_MOVE_POSITIVE, label: '', icon: icons[0] }, { id: RELATIVE_MOVE_NEGATIVE, label: '', icon: icons[1] } ]}
                selected={value.direction}
                onSelect={direction => onChange({ ...value, direction })}
                columns={4}
            />
            <WiredText text={ctx.localize(`wiredfurni.params.movement.${axis}.distance`, { distance: String(value.distance) })} />
            <WiredSlider
                min={0}
                max={RELATIVE_MOVE_MAX_DISTANCE}
                step={1}
                value={value.distance}
                onChange={distance => onChange({ ...value, distance })}
            />
        </WiredSimpleList>
    </WiredSection>
);

export const RelativeFurniMoveView: WiredElementView<RelativeFurniMoveActionForm> = ({ form, setForm, ctx }) => (
    <>
        <RelativeFurniMoveAxisSection
            axis="horizontal"
            icons={[ 'move_2', 'move_6' ]}
            value={form.horizontal}
            onChange={horizontal => setForm({ horizontal })}
            ctx={ctx}
        />
        <RelativeFurniMoveAxisSection
            axis="vertical"
            icons={[ 'move_4', 'move_0' ]}
            value={form.vertical}
            onChange={vertical => setForm({ vertical })}
            ctx={ctx}
        />
    </>
);
