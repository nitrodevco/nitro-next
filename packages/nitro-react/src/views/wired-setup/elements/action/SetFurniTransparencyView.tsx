/**
 * `actiontypes/§_-z1S§.buildInputs` (SET_FURNI_TRANSPARENCY) - four sections: who sees the
 * effect (dropdown), visible / invisible (radio), click handling (one checkbox) and the easing
 * (dropdown). Choosing "everyone" the first time alerts that only a Room Initialized trigger
 * keeps the effect after a room reload (`onAudienceChanged`).
 */
import { useWindowActions } from '#base/context/system';
import {
    SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE,
    SET_FURNI_TRANSPARENCY_AUDIENCE_SELECTED_USERS,
    SET_FURNI_TRANSPARENCY_EASINGS,
    SET_FURNI_TRANSPARENCY_INVISIBLE,
    SET_FURNI_TRANSPARENCY_VISIBLE,
    SetFurniTransparencyActionForm,
    WiredElementView,
} from '#base/wired';

import { WiredCheckboxOption } from '../../kit/WiredCheckboxOption';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const AUDIENCE_OPTIONS = [
    { id: SET_FURNI_TRANSPARENCY_AUDIENCE_SELECTED_USERS, label: '${wiredfurni.params.furni_visualization.audience.selected_users}' },
    { id: SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE, label: '${wiredfurni.params.furni_visualization.audience.everyone}' },
];
const VISIBILITY_OPTIONS = [
    { id: SET_FURNI_TRANSPARENCY_VISIBLE, label: '${wiredfurni.params.set_furni_transparency.visible}' },
    { id: SET_FURNI_TRANSPARENCY_INVISIBLE, label: '${wiredfurni.params.set_furni_transparency.invisible}' },
];
const EASING_OPTIONS = SET_FURNI_TRANSPARENCY_EASINGS.map(id => ({ id, label: `\${wiredfurni.params.set_furni_transparency.easing.${id}}` }));

export const SetFurniTransparencyView: WiredElementView<SetFurniTransparencyActionForm> = ({ form, setForm, ctx }) => {
    const { showAlert } = useWindowActions();

    const onAudienceChanged = (audience: number) => {
        const alert = (audience === SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE) && !form.everyoneInfoShown;

        setForm({ audience, everyoneInfoShown: form.everyoneInfoShown || alert });

        if (alert) showAlert(ctx.localize('wiredfurni.params.furni_visualization.audience.everyone_info.title'), ctx.localize('wiredfurni.params.furni_visualization.audience.everyone_info.body'));
    };

    return (
        <>
            <WiredSection title="${wiredfurni.params.furni_visualization.audience}">
                <WiredDropdown
                    options={AUDIENCE_OPTIONS}
                    selected={form.audience}
                    onSelect={onAudienceChanged}
                    caption="${wiredfurni.params.furni_visualization.audience}"
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_transparency.visibility}">
                <WiredRadioGroup
                    options={VISIBILITY_OPTIONS}
                    selected={form.transparency}
                    onSelect={transparency => setForm({ transparency })}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_transparency.click_handling}">
                <WiredCheckboxOption
                    label="${wiredfurni.params.set_furni_transparency.allow_click_through}"
                    selected={form.allowClickThrough}
                    onToggle={allowClickThrough => setForm({ allowClickThrough })}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_transparency.easing}">
                <WiredDropdown
                    options={EASING_OPTIONS}
                    selected={form.easing}
                    onSelect={easing => setForm({ easing })}
                    caption="${wiredfurni.params.set_furni_transparency.easing}"
                />
            </WiredSection>
        </>
    );
};
