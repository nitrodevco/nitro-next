import { useConfigValue, useTranslation } from '#base/context/system';
import { Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

export interface FurnitureEcotronBoxViewProps {
    /** The box's furni class, which picks the card: `matic_box` is the Furni-Matic one, anything else Ecotron's. */
    furniTypeName: string;
    /** The furni's `furniture_data`, which is the date written in the card's corner. */
    date: string;
    onOpen: () => void;
    onClose: () => void;
}

const WIDTH = 257;
const HEIGHT = 114;

/**
 * The prompt for an Ecotron or Furni-Matic box, on the `ecotronbox_card` / `ecotronbox_card_furnimatic`
 * layout (257x114) that `EcotronBoxFurniWidget.showInterface` picks by the furni's class name
 * (`_interfaceMapByFurniTypeName`): a draggable card with no frame, its art from the image library,
 * the date in its corner, what the box is, and the open and close buttons, each sized to its
 * caption and growing right from its layout x. Opening is a plain use, and the prize arrives as an
 * inventory update.
 *
 * Flash builds the card at (100, 100) of the desktop. It also hides the open button from anyone who
 * is neither the room's owner nor a controller of any room (`setOpenButton`), and after the open
 * shows the prize's icon in `ecotronbox_card_preview`; the widget offers the button to everyone
 * and closes the card on open, so neither is drawn here.
 */
export const FurnitureEcotronBoxView = ({ furniTypeName, date, onOpen, onClose }: FurnitureEcotronBoxViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const isFurnimatic = (furniTypeName === 'matic_box');

    return (
        <Region
            dragTarget
            dragTrigger
            layout={{ position: 'absolute', left: 100, top: 100, width: WIDTH, height: HEIGHT }}
        >
            <ThemeImage
                src={`${imageLibraryUrl}Giftcards/${isFurnimatic ? 'ecotronbox_card_bg_furnimatic' : 'ecotronbox_card_bg'}.png`}
                layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: HEIGHT }}
            />
            <ButtonThick
                variant="0"
                onPointerTap={onOpen}
                layout={{ position: 'absolute', left: 47, top: 90, height: 22 }}
            >
                {t(isFurnimatic ? 'widget.furni.furnimaticbox.open' : 'widget.furni.ecotronbox.open')}
            </ButtonThick>
            <Button
                variant="0"
                onPointerTap={onClose}
                layout={{ position: 'absolute', left: 200, top: 90, height: 22 }}
            >
                {t('generic.close')}
            </Button>
            <ThemeText
                text={t(isFurnimatic ? 'widget.furni.furnimaticbox.title' : 'widget.furni.ecotronbox.title')}
                textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 49, top: 39, width: 139, height: 45 }}
            />
            <ThemeText
                text={date}
                textOptions={{ wordWrap: true, wordWrapWidth: 100 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, top: 9, width: 104, height: 12 }}
            />
        </Region>
    );
};
