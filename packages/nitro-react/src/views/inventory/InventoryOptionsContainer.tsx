/**
 * The `options_container` row the furni, pets and badges regions of `inventory_xml` open with: a
 * grey (`0x0cacaca`) style 3 border, 468x25, holding the style 0 border (4,3 139x20) the `filter`
 * input sits in with its `clear_filter_button`, and the `filter.options` dropmenu (style 0,
 * 150,2 119x21).
 *
 * The clear button shows only while the input has text, as `FurniView` and `BadgesView` do when
 * they hide it on init; pressing it empties the box and re-runs the filters
 * (`windowEventProc`'s `clear_filter_button` case).
 */
import { Border, Dropmenu, DropmenuOption, LayoutImage, Region, TextInput, ThemeImage } from '#base/theme';

interface InventoryOptionsContainerProps {
    /** The `filter` box's text; a page with no text filter passes none and the box is left out. */
    filterText?: string;
    onFilterTextChange?: (text: string) => void;
    /** The closed `filter.options` menu's caption. */
    filterCaption?: string;
    filterOptions?: readonly DropmenuOption[];
}

export const InventoryOptionsContainer = ({ filterText, onFilterTextChange, filterCaption, filterOptions }: InventoryOptionsContainerProps) => (
    <Border
        variant="3"
        tintColor="#cacaca"
        layout={{ position: 'absolute', left: 0, top: 0, width: 468, height: 25 }}
    >
        <Border
            variant="0"
            layout={{ position: 'absolute', left: 4, top: 3, width: 139, height: 20 }}
        >
            {(filterText !== undefined) && onFilterTextChange && (
                <>
                    <TextInput
                        value={filterText}
                        onChange={onFilterTextChange}
                        textStyle="u_regular"
                        flashPlacement
                        backgroundColor={null}
                        focusedBackgroundColor={null}
                        layout={{ position: 'absolute', left: 3, top: 2, width: 122, height: 15, minWidth: 60 }}
                    />
                    {(filterText.length > 0) && (
                        <Region
                            name="clear_filter_button"
                            cursor="pointer"
                            onPointerTap={() => onFilterTextChange('')}
                            layout={{ position: 'absolute', left: 120, top: 0, width: 20, height: 20 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/icons_close.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 20, height: 20 }}
                            />
                        </Region>
                    )}
                </>
            )}
        </Border>
        <Dropmenu
            variant="0"
            caption={filterCaption}
            options={filterOptions}
            layout={{ position: 'absolute', left: 150, top: 2, width: 119, height: 21 }}
        />
    </Border>
);
