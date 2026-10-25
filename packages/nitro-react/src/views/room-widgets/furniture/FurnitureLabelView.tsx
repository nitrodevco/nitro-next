import { TemplateBindings, TemplateWindow } from '#base/theme';

/** `FurnitureLabelView`'s layout, from the room UI library's `furniture_label_xml` (a bubble of 142x80). */
const TEMPLATE = 'habbo-room-ui-com/furniture_label_xml';

/** `FurnitureLabelView.PREVIEW_BLEND`: a label shown only while the pointer is over its furni. */
const PREVIEW_BLEND = 0.7;

export interface FurnitureLabelViewProps {
    text: string;
    /** `FurnitureLabelData.bubbleColor`, `0xRRGGBB`. */
    bubbleColor: number;
    /** Opened by a click on the furni, or always open (`_isOpen || _alwaysOpen`): drawn at full blend. */
    shown: boolean;
    /** Takes the pointer and the caret (`_isOpen || _alwaysOpen && canModify`). */
    interactive: boolean;
    /** Typing changes the text (`interactive && canModify`); the placeholder shows only then, on an empty label. */
    editable: boolean;
    onChange: (text: string) => void;
    onBlur: () => void;
}

/**
 * One WIRED label's bubble (WIN63-202610121624 `FurnitureLabelView`, layout `furniture_label`):
 * the label's text in the bubble's `input`, in the label's colour, faded while it is only a hover
 * preview; the "Write something here..." placeholder over an empty label its viewer may edit.
 */
export const FurnitureLabelView = ({ text, bubbleColor, shown, interactive, editable, onChange, onBlur }: FurnitureLabelViewProps) => {
    const bindings: TemplateBindings = {
        label: { color: (0xff000000 | bubbleColor) >>> 0, alpha: shown ? 1 : PREVIEW_BLEND },
        input: { caption: text, onChange: (value) => { if (editable) onChange(value); }, onBlur, disabled: !interactive },
        placeholder: { visible: shown && editable && (text.length === 0) },
        // `updateInputSize`: the scrollbar only for a text taller than the input may grow.
        scrollbar: { visible: false },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            bindings={bindings}
        />
    );
};
