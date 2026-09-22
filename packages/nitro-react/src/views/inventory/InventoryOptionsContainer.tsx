/**
 * The `options_container` row the furni, pets and badges regions of `inventory_xml` open with:
 * a grey (`0x0cacaca`) style 3 border, 468x25, holding the style 0 border (4,3 139x20) the
 * `filter` input sits in and the `filter.options` dropmenu (style 0, 150,2 119x21).
 *
 * Not ported: the `filter` input and its `clear_filter_button` (shown only while the input has
 * text - `FurniView` / `BadgesView` hide it on init), and what the dropmenus choose - no page of
 * the port filters its grid yet (`FurniView.updateGridFilters`), so the box is drawn empty and
 * the dropmenu shows only the caption Flash selects when it populates it.
 */
import { Border, Dropmenu } from '#base/theme';

interface InventoryOptionsContainerProps {
    /** The closed `filter.options` menu's caption. */
    filterCaption?: string;
}

export const InventoryOptionsContainer = ({ filterCaption }: InventoryOptionsContainerProps) => (
    <Border
        variant="3"
        tintColor="#cacaca"
        layout={{ position: 'absolute', left: 0, top: 0, width: 468, height: 25 }}
    >
        <Border
            variant="0"
            layout={{ position: 'absolute', left: 4, top: 3, width: 139, height: 20 }}
        />
        <Dropmenu
            variant="0"
            caption={filterCaption}
            layout={{ position: 'absolute', left: 150, top: 2, width: 119, height: 21 }}
        />
    </Border>
);
