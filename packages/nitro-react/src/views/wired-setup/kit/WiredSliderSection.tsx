/**
 * `wired_setup.uibuilder.presets.sections.SliderSection` - a section whose content is a
 * `WiredSlider`, titled by `titleKey`.
 *
 * - With `showInput` (the default, Flash's `param10`) and no `headerOptionLeft` of the caller's,
 *   a `WiredNumberInput` 40px wide sits after the title (`NumberInputParam(0, min, max, 40,
 *   converter.precision, converter.endsWithFive)`), the title lowered by the style's
 *   `namedInputOffset`; typing moves the slider and the slider rewrites the number.
 * - Without it the title carries the value: `titleKey` localized with `%<unitKey>%` replaced by
 *   `converter.toText(value)` (`getLocalizationWithParams(titleKey, "", unitKey, ...)`), so
 *   `unitKey` is the placeholder's name, not a localization key.
 *
 * Controlled: `value` is the slider's int, `onChange` gets it from the slider and the input
 * alike. Converters are in `#base/wired` (`SLIDER_CONVERTER_ECHO` is `CONVERTER_ECHO`,
 * `SLIDER_CONVERTER_PULSES` is `CONVERTER_PULSES`).
 */
import { useTranslation } from '#base/context/system';
import { WiredSliderConverter } from '#base/wired';

import { WiredNumberInput } from './WiredNumberInput';
import { WiredSection, WiredSectionProps } from './WiredSection';
import { WiredSlider } from './WiredSlider';
import { useWiredStyle } from './WiredStyleContext';

/** The number input's width `SliderSection` asks for. */
const INPUT_WIDTH = 40;

export interface WiredSliderSectionProps {
    /** `_localizationKey` - a localization key (not `${...}` wrapped). */
    titleKey: string;
    /** The `%name%` placeholder of `titleKey` that takes the value when there is no input. */
    unitKey: string;
    converter: WiredSliderConverter;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    /** `param10`. Default `true`. */
    showInput?: boolean;
    /** The section's `SectionParam` (collapsible, a source type selector, header options, `headerOptionLeft`, ...). */
    sectionProps?: Partial<WiredSectionProps>;
}

export const WiredSliderSection = ({ titleKey, unitKey, converter, min, max, step, value, onChange, showInput = true, sectionProps }: WiredSliderSectionProps) => {
    const style = useWiredStyle();
    const t = useTranslation();
    const withInput = showInput && !sectionProps?.headerOptionLeft;
    const title = showInput ? t(titleKey, titleKey) : t(titleKey, '', { [unitKey]: converter.toText(value) });

    return (
        <WiredSection
            {...sectionProps}
            title={title}
            headerOptionLeft={withInput
                ? (
                        <WiredNumberInput
                            value={value}
                            onChange={onChange}
                            min={min}
                            max={max}
                            width={INPUT_WIDTH}
                            precision={converter.precision}
                            endsWithFive={converter.endsWithFive}
                        />
                    )
                : sectionProps?.headerOptionLeft}
            titleYOffset={withInput ? style.namedInputOffset : sectionProps?.titleYOffset}
        >
            <WiredSlider
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
        </WiredSection>
    );
};
