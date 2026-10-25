import { FurnitureTemplatePanel } from './FurnitureTemplatePanel';

/**
 * The prompt for an Ecotron or Furni-Matic box - `EcotronBoxFurniWidget.showInterface`, which
 * builds `habbo-room-ui-com/ecotronbox_card` or `habbo-room-ui-com/ecotronbox_card_furnimatic` by
 * the furni's class name (`_interfaceMapByFurniTypeName`) into a container at (100, 100): a card
 * with no frame that drags by itself (`draggable_with_mouse`), the box's date in
 * `ecotronbox_card_date`, and the open (`ecotronbox_card_btn_open`) and close
 * (`ecotronbox_card_btn_close`) buttons. Opening is a plain use, and the prize arrives as an
 * inventory update.
 *
 * Flash hides the open button from anyone who is neither the room's owner nor a controller of any
 * room (`setOpenButton`), and after the open shows the prize's icon in `ecotronbox_card_preview` and
 * its name in `ecotronbox_card_msg`; the widget offers the button to everyone and closes the card on
 * open, so neither is drawn here.
 */
export interface FurnitureEcotronBoxViewProps {
    /** The box's furni class, which picks the card: `matic_box` is the Furni-Matic one, anything else Ecotron's. */
    furniTypeName: string;
    /** The furni's `furniture_data`, which is the date written in the card's corner. */
    date: string;
    onOpen: () => void;
    onClose: () => void;
}

/** `showInterface`: the card's container is made at (100, 100) of the desktop. */
const CARD_POSITION = 100;

export const FurnitureEcotronBoxView = ({ furniTypeName, date, onOpen, onClose }: FurnitureEcotronBoxViewProps) => {
    const isFurnimatic = (furniTypeName === 'matic_box');

    return (
        <FurnitureTemplatePanel
            id={isFurnimatic ? 'habbo-room-ui-com/ecotronbox_card_furnimatic' : 'habbo-room-ui-com/ecotronbox_card'}
            position={{ x: CARD_POSITION, y: CARD_POSITION }}
            bindings={{
                ecotronbox_card_date: { caption: date },
                ecotronbox_card_btn_open: { onPointerTap: onOpen },
                ecotronbox_card_btn_close: { onPointerTap: onClose },
            }}
        />
    );
};
