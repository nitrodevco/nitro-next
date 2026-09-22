import { useTranslation } from '#base/context/system';
import { Border, Button, CheckBox, Frame, Region, ThemeText } from '#base/theme';

/** Which of the area's switches is being flipped. */
export type AreaHideOption = 'invisible' | 'wallItems' | 'inverted';

export interface FurnitureAreaHideViewProps {
    /** The tiles currently marked, so the dialog can say whether there is an area at all. */
    width: number;
    length: number;
    invisible: boolean;
    wallItems: boolean;
    inverted: boolean;
    /** While the area is hiding, its settings are fixed - only the off switch still does anything. */
    isOn: boolean;
    onToggleOption: (option: AreaHideOption, value: boolean) => void;
    onSelect: () => void;
    onClear: () => void;
    onApply: () => void;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * The area-hide controls, on the `area_hide_ui` layout (292x334) that
 * `AreaHideFurniWidget.createWindow` builds and centres: mark an area on the floor, then say what
 * should happen inside it. Selecting happens in the room itself, not in here - the dialog only
 * starts and clears it.
 *
 * The `tab_content` item list is laid out flat: its invisible `header_container` (whose
 * `hidearea_info` Flash never shows) takes no room, then the 5px `spacer`, `area_container` and
 * `saturation_container` sit at the offsets the list gives them. The buttons carry
 * `expand_to_accommodate_children`, so `ButtonController` sizes them to their caption
 * (`width = 0` on `WE_CHILD_RESIZED`) rather than to the width the layout editor saved;
 * `on_off_button` also aligns right, so it grows leftwards from its right edge. While the area is
 * on, `AreaHideFurniWidget.disableContents` fades every text and checkbox to a blend of 0.5.
 *
 * Flash hides `apply_button` (`AUTO_SAVE`) and sends every change as it is made; this port keeps
 * the button, because the widget sends its draft only on Apply.
 */
export const FurnitureAreaHideView = ({
    width, length, invisible, wallItems, inverted, isOn,
    onToggleOption, onSelect, onClear, onApply, onToggle, onClose,
}: FurnitureAreaHideViewProps) => {
    const t = useTranslation();
    const hasArea = ((width > 0) && (length > 0));
    const blend = (isOn ? 0.5 : 1);

    const checkbox = (key: AreaHideOption, selected: boolean) => (
        <Region
            alpha={blend}
            layout={{ position: 'absolute', left: 1, top: 0, width: 18, height: 18 }}
        >
            <CheckBox
                variant="0"
                disabled={isOn}
                selected={selected}
                onPointerTap={() => onToggleOption(key, !selected)}
                layout={{ width: 18, height: 18 }}
            />
        </Region>
    );

    const text = (caption: string, top: number, width: number, height: number, info = false) => (
        <ThemeText
            text={caption}
            textStyle="u_small"
            textOptions={{ ...(info && { fill: '#999999' }), wordWrap: true, wordWrapWidth: width - 4 }}
            clip
            alpha={blend}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 20, top, width, height }}
        />
    );

    return (
        <Frame
            variant="3"
            id="areahide_ui"
            caption={t('widget.areahide.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ width: 292, height: 334, minHeight: 0 }}
        >
            <Border
                variant="100"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 3, top: 16, width: 275, height: 250, overflow: 'hidden' }}
            >
                <Region layout={{ position: 'absolute', left: 6, top: 7, width: 260, height: 98, overflow: 'hidden' }}>
                    <ThemeText
                        text={t('widget.areahide.area_selection')}
                        textStyle="u_small"
                        flashFormat={{ bold: true }}
                        alpha={blend}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0, width: 158, height: 15 }}
                    />
                    <ThemeText
                        text={t('widget.areahide.area_selection.info')}
                        textStyle="u_small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 258 }}
                        clip
                        alpha={blend}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 20, width: 262, height: 40 }}
                    />
                    <Region layout={{ position: 'absolute', left: 0, top: 66, width: 260, height: 25, overflow: 'hidden', flexDirection: 'row', gap: 12 }}>
                        <Button
                            variant="0"
                            disabled={isOn}
                            onPointerTap={onSelect}
                            layout={{ height: 24, flexShrink: 0 }}
                        >
                            {t('widget.areahide.area_selection.select')}
                        </Button>
                        <Button
                            variant="0"
                            disabled={isOn}
                            onPointerTap={onClear}
                            layout={{ height: 24, flexShrink: 0 }}
                        >
                            {t('widget.areahide.area_selection.clear')}
                        </Button>
                    </Region>
                </Region>
                <Region layout={{ position: 'absolute', left: 6, top: 105, width: 262, height: 143 }}>
                    <ThemeText
                        text={t('widget.areahide.options')}
                        textStyle="u_small"
                        flashFormat={{ bold: true }}
                        alpha={blend}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0, width: 123, height: 15 }}
                    />
                    <Region layout={{ position: 'absolute', left: 0, top: 20, width: 262, height: 123 }}>
                        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 262, height: 55 }}>
                            {checkbox('wallItems', wallItems)}
                            {text(t('widget.areahide.options.wallitems'), 0, 240, 15)}
                        </Region>
                        <Region layout={{ position: 'absolute', left: 0, top: 20, width: 262, height: 43, overflow: 'hidden' }}>
                            {checkbox('inverted', inverted)}
                            {text(t('widget.areahide.options.invert'), 0, 240, 15)}
                            {text(t('widget.areahide.options.invert.info'), 16, 242, 30, true)}
                        </Region>
                        <Region layout={{ position: 'absolute', left: 0, top: 68, width: 262, height: 55, overflow: 'hidden' }}>
                            {checkbox('invisible', invisible)}
                            {text(t('widget.areahide.options.invisibility'), 0, 240, 15)}
                            {text(t('widget.areahide.options.invisibility.info'), 16, 242, 40, true)}
                        </Region>
                    </Region>
                </Region>
            </Border>
            <Button
                variant="0"
                disabled={isOn || !hasArea}
                onPointerTap={onApply}
                layout={{ position: 'absolute', left: 4, top: 272, height: 24 }}
            >
                {t('widget.areahide.button.apply')}
            </Button>
            <Button
                variant="0"
                onPointerTap={onToggle}
                layout={{ position: 'absolute', right: 3, top: 272, height: 24 }}
            >
                {t(isOn ? 'widget.areahide.button.off' : 'widget.areahide.button.on')}
            </Button>
        </Frame>
    );
};
