/**
 * `wired_setup.uibuilder.presets.CollapseExpandSectionButtonPreset` - the style's
 * `expand_collapse_region`: the up arrow while the section is expanded, the down arrow while it
 * is collapsed; a click flips it and reports the new state. Static width: the region's.
 *
 * `WiredSection` puts one at the end of its header for `collapsible` sections; it is exported
 * for a header that folds something else (Flash builds it through
 * `PresetManager.createCollapseExpandSectionButton` for sections only).
 */
import { LayoutImage, Region, ThemeImage } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredCollapseExpandButtonProps {
    /** `isExpanded` - the up arrow shows. */
    expanded: boolean;
    /** The constructor's callback, with the state after the click. */
    onToggle: (expanded: boolean) => void;
    disabled?: boolean;
}

export const WiredCollapseExpandButton = ({ expanded, onToggle, disabled = false }: WiredCollapseExpandButtonProps) => {
    const { expandCollapse } = useWiredStyle().templates;
    const isDisabled = useWiredDisabled(disabled);

    return (
        <Region
            cursor="pointer"
            disabled={isDisabled}
            onPointerTap={() => onToggle(!expanded)}
            backgroundColor={expandCollapse.backgroundColor ?? undefined}
            layout={{ position: 'relative', width: expandCollapse.width, height: expandCollapse.height, marginTop: expandCollapse.offsetY, flexShrink: 0 }}
        >
            <ThemeImage
                src={LayoutImage(`wired/${expanded ? expandCollapse.upAsset : expandCollapse.downAsset}.png`)}
                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                tint={expandCollapse.arrowTint ?? undefined}
                alpha={wiredDisabledAlpha(isDisabled)}
                eventMode="none"
                layout={{ position: 'absolute', left: 0, top: expandCollapse.arrowY }}
            />
        </Region>
    );
};
