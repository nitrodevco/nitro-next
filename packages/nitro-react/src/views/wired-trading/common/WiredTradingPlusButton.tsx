/**
 * The ubuntu skin's 22x22 "+" button - a Flash `iconbutton` of style 3 (`plus_button_skin_3`,
 * `habbo_skin_button_plus_3_xml`), which the theme's `IconButton` draws. The chest's
 * `upgrade_capacity_btn` and the rule editor's `add_more` are both this button.
 *
 * `interactive_cursor_disabled` is set on the chest's, so no hand cursor. The region around it
 * carries the tooltip, which a disabled button still shows (`upgrade_capacity_region`).
 */
import { IconButton, Region } from '#base/theme';

export interface WiredTradingPlusButtonProps {
    disabled?: boolean;
    /** Already translated; the region's `toolTipCaption`. */
    tooltip?: string;
    onPress: () => void;
}

export const WiredTradingPlusButton = ({ disabled = false, tooltip, onPress }: WiredTradingPlusButtonProps) => (
    <Region
        tooltip={tooltip || undefined}
        layout={{ width: 22, height: 22, flexShrink: 0 }}
    >
        <IconButton
            variant="3"
            disabled={disabled}
            onPointerTap={onPress}
        />
    </Region>
);
