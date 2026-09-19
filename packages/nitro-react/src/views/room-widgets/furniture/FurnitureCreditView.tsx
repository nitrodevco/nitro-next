import { useTranslation } from '#base/context/system';
import { Border, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

export interface FurnitureCreditViewProps {
    /** Credits the bag, bar or coin is worth. */
    value: number;
    /** An NFT credit furni: Flash words the prompt differently and appends a second sentence. */
    isNftCredit: boolean;
    onExchange: () => void;
    onClose: () => void;
}

/**
 * The redeem prompt for a credit furni, on the `credit_redeem` layout (315x165): what the item
 * is worth, and the exchange that turns it into credits. Exchanging destroys the furni, so the
 * Flash client asked first rather than redeeming on use, and so does this.
 */
export const FurnitureCreditView = ({ value, isNftCredit, onExchange, onClose }: FurnitureCreditViewProps) => {
    const t = useTranslation();
    const description = t(isNftCredit ? 'nft.creditfurni.redeem.description' : 'widgets.furniture.credit.redeem.value', '', { value: value.toString() });

    return (
        <Frame
            variant="0"
            id="furniture-credit"
            caption={t('catalog.redeem.dialog.title')}
            onClose={onClose}
            defaultPosition={{ x: 100, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 315, height: 165 }}
        >
            <Border
                variant="0"
                layout={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 12 }}
            >
                <ThemeText
                    text={isNftCredit ? `${description} ${t('nft.creditfurni.redeem.prompt')}` : description}
                    textStyle="text-style-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 265 }}
                    verticalAlign="top"
                    layout={{ width: 265, height: 60 }}
                />
                <Region layout={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        variant="0"
                        onPointerTap={onClose}
                        layout={{ width: 80, height: 22 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                    <ButtonThick
                        variant="0"
                        onPointerTap={onExchange}
                        layout={{ width: 100, height: 22 }}
                    >
                        {t('catalog.redeem.dialog.button.exchange')}
                    </ButtonThick>
                </Region>
            </Border>
        </Frame>
    );
};
