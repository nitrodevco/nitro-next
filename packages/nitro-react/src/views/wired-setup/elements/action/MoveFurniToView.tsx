/**
 * `actiontypes/MoveFurniTo.buildInputs` - the direction radio (`movefurni.0`, `.2`, `.4`, `.6`) in
 * the `movefurni` section, then the empty tiles slider (1 to 5).
 */
import { MOVE_FURNI_TO_MAX_TILES, MOVE_FURNI_TO_MIN_TILES, MoveFurniToActionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

const DIRECTION_OPTIONS = [ 0, 2, 4, 6 ].map(id => ({ id, label: `\${wiredfurni.params.movefurni.${id}}` }));

export const MoveFurniToView: WiredElementView<MoveFurniToActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.movefurni}">
            <WiredRadioGroup
                options={DIRECTION_OPTIONS}
                selected={form.direction}
                onSelect={direction => setForm({ direction })}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.emptytiles"
            unitKey="tiles"
            converter={SLIDER_CONVERTER_ECHO}
            min={MOVE_FURNI_TO_MIN_TILES}
            max={MOVE_FURNI_TO_MAX_TILES}
            step={1}
            value={form.tiles}
            onChange={tiles => setForm({ tiles })}
        />
    </>
);
