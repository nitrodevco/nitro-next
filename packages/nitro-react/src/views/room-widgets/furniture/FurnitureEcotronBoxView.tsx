import { useTranslation } from '#base/context/system';
import { Border, Box, Button, ButtonThick, Frame, ThemeText } from '#base/theme';

export interface FurnitureEcotronBoxViewProps {
    /** The furni's own name, which is what tells a Furni-Matic box from an Ecotron one. */
    name: string;
    onOpen: () => void;
    onClose: () => void;
}

/**
 * The prompt for a Furni-Matic box, from the `ecotron_box_card` layout: what it is, and the
 * button that opens it. Opening is a plain use, and the prize arrives as an inventory update.
 */
export const FurnitureEcotronBoxView = ({ name, onOpen, onClose }: FurnitureEcotronBoxViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-ecotron-box"
            caption={t('widget.furni.ecotronbox.title')}
            onClose={onClose}
            defaultPosition={{ x: 110, y: 110 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 257, height: 150 }}
        >
            <Border
                variant="0"
                layout={{ flex: 1, padding: 10 }}
            >
                <ThemeText
                    text={name}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 225 }}
                    verticalAlign="top"
                    layout={{ width: 225, height: 50 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 3 }}>
                <ButtonThick
                    variant="0"
                    onPointerTap={onOpen}
                    layout={{ width: 140, height: 22 }}
                >
                    {t('widget.furni.ecotronbox.open')}
                </ButtonThick>
                <Button
                    variant="0"
                    onPointerTap={onClose}
                    layout={{ width: 80, height: 22 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Frame>
    );
};
