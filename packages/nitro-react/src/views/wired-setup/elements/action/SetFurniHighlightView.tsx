/**
 * `actiontypes/§_-d22§.buildInputs` (SET_FURNI_HIGHLIGHT, WIN63-202610201032): who sees it, the type (with the
 * steady-tint warning under it), the strength, the colour (two palettes, the tint's without white), the
 * animation and the easing, which only a steady highlight uses. Choosing "everyone" the first time tells the
 * builder to stack it with Room Initialized (`onAudienceChanged`).
 */
import { useWindowActions } from '#base/context/system';
import { getAnimationOptions, getHighlightPalette, getStrengthOptions, isDarkeningAvailable, SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN, SET_FURNI_HIGHLIGHT_TYPE_DARKEN, SET_FURNI_HIGHLIGHT_TYPE_TINT, SetFurniHighlightActionForm, WiredElementView, withHighlightType } from '#base/wired';

import { WiredColorPalette } from '../../kit/WiredColorPalette';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';

const AUDIENCE_OPTIONS = [
    { id: 0, label: '${wiredfurni.params.furni_visualization.audience.selected_users}' },
    { id: 1, label: '${wiredfurni.params.furni_visualization.audience.everyone}' },
];
const EASING_OPTIONS = [ 0, 1, 2, 3, 4 ].map(id => ({ id, label: `\${wiredfurni.params.set_furni_highlight.easing.${id}}` }));

export const SetFurniHighlightView: WiredElementView<SetFurniHighlightActionForm> = ({ form, setForm, ctx }) => {
    const style = useWiredStyle();
    const { showAlert } = useWindowActions();

    const typeOptions = [ 0, 1, 2, 3, 4, 5 ]
        .filter(id => (id !== SET_FURNI_HIGHLIGHT_TYPE_DARKEN) || isDarkeningAvailable(ctx))
        .map(id => ({ id, label: `\${wiredfurni.params.set_furni_highlight.type.${id}}` }));
    // `levelLabel`: Darken's levels count by their place in the list, the tint's by quarter.
    const strengthOptions = getStrengthOptions(form.type, ctx).map((id, index) => ({
        id,
        label: (id === 0)
            ? '${wiredfurni.params.set_furni_highlight.off}'
            : (form.type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN)
                    ? ctx.localize('wiredfurni.params.set_furni_highlight.level', { level: String(index) })
                    : (form.type === SET_FURNI_HIGHLIGHT_TYPE_TINT)
                            ? ctx.localize('wiredfurni.params.set_furni_highlight.level', { level: String(id / 25) })
                            : '${wiredfurni.params.set_furni_highlight.on}',
    }));
    const animationOptions = getAnimationOptions(form.type).map(id => ({ id, label: `\${wiredfurni.params.set_furni_highlight.animation.${id}}` }));
    const palette = getHighlightPalette(form.type);

    const onAudience = (id: number) => {
        const everyone = id === 1;

        if (everyone && !form.everyoneInfoShown) showAlert(ctx.localize('wiredfurni.params.furni_visualization.audience.everyone_info.title'), ctx.localize('wiredfurni.params.furni_visualization.audience.everyone_info.body'));

        setForm({ everyone, everyoneInfoShown: form.everyoneInfoShown || everyone });
    };

    return (
        <>
            <WiredSection title="${wiredfurni.params.furni_visualization.audience}">
                <WiredDropdown
                    options={AUDIENCE_OPTIONS}
                    selected={form.everyone ? 1 : 0}
                    onSelect={onAudience}
                    caption="${wiredfurni.params.furni_visualization.audience}"
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_highlight.type}">
                <WiredSimpleList>
                    <WiredDropdown
                        options={typeOptions}
                        selected={form.type}
                        onSelect={type => setForm(current => withHighlightType(current, type, ctx))}
                        caption="${wiredfurni.params.set_furni_highlight.type}"
                    />
                    {/* `updateHighlightWarning`: the tint on furni. */}
                    {!form.targetUsers && (form.type === SET_FURNI_HIGHLIGHT_TYPE_TINT) && (
                        <WiredText
                            text="${wiredfurni.params.set_furni_highlight.normal_furni_warning}"
                            color={style.warningTextColor}
                        />
                    )}
                </WiredSimpleList>
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_highlight.strength}">
                <WiredDropdown
                    options={strengthOptions}
                    selected={form.strength}
                    onSelect={strength => setForm({ strength })}
                    caption="${wiredfurni.params.set_furni_highlight.strength}"
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.set_furni_highlight.color}"
                disabled={(form.type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) || (form.type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN)}
            >
                <WiredColorPalette
                    colors={palette}
                    color={form.color}
                    onSelect={color => setForm({ color })}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.set_furni_highlight.animation}">
                <WiredDropdown
                    options={animationOptions}
                    selected={form.animation}
                    onSelect={animation => setForm({ animation })}
                    caption="${wiredfurni.params.set_furni_highlight.animation}"
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.set_furni_highlight.easing}"
                disabled={form.animation !== 0}
            >
                <WiredDropdown
                    options={EASING_OPTIONS}
                    selected={form.easing}
                    onSelect={easing => setForm({ easing })}
                    caption="${wiredfurni.params.set_furni_highlight.easing}"
                />
            </WiredSection>
        </>
    );
};
