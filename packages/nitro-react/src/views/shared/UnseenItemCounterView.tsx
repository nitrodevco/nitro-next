/**
 * The red "new items" count - `HabboWindowManagerComponent.createUnseenItemCounter`, which builds
 * `unseen_item_counter_xml` (layout `new_items_counter`): an unnamed style 7 border
 * `unseen_item_container` in `0xee2924`, 18 high, around the `count` text (`il_regular_white`,
 * bold) 4 in from its left. The text sizes itself (`auto_size` left) and reflects its width onto
 * the border (`reflect_horizontal_resize_to_parent`), which keeps its right edge
 * (`on_resize_align_right`) - so the border is the text and 4 either side, and the caller places
 * it by its right edge.
 *
 * `count` follows the toolbar's `setUnseenItemCount`: above 0 it is the number, below 0 a blank
 * (a count shown without a number), and 0 hides the counter. The inventory tabs' counters
 * (`InventoryMainView.updateCounter`) only ever pass 0 or more.
 */
import { Border, BoxLayout, ThemeText } from '#base/theme';

export interface UnseenItemCounterViewProps {
    count: number;
    layout?: BoxLayout;
}

export const UnseenItemCounterView = ({ count, layout }: UnseenItemCounterViewProps) => {
    if (!count) return null;

    return (
        <Border
            variant="7"
            name="unseen_item_container"
            tintColor="#ee2924"
            layout={{ flexDirection: 'row', alignItems: 'flex-start', height: 18, paddingLeft: 4, paddingRight: 4, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={(count < 0) ? ' ' : count.toString()}
                textStyle="il_regular_white"
                flashFormat={{ bold: true }}
                name="count"
                verticalAlign="top"
            />
        </Border>
    );
};
