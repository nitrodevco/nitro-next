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
 * The redeem prompt for a credit furni, on the `credit_redeem` layout (315x165) that
 * `CreditFurniWidget.showInterface` builds at (100, 100): what the item is worth, and the exchange
 * that turns it into credits. Exchanging destroys the furni, so the Flash client asked first
 * rather than redeeming on use, and so does this.
 *
 * The buttons carry `expand_to_accommodate_children`, so each is sized to its caption from its
 * `width_min` up; `exchange` also has `on_accommodate_align_center`, so it grows either side of
 * its layout centre. The `link` region (`read_more`) is hidden for an NFT credit and otherwise
 * opens `widget.furni.info.url` when that is a web address, as `onMouseEvent` does.
 */
export const FurnitureCreditView = ({ value, isNftCredit, onExchange, onClose }: FurnitureCreditViewProps) => {
    const t = useTranslation();
    const description = t(isNftCredit ? 'nft.creditfurni.redeem.description' : 'widgets.furniture.credit.redeem.value', '', { value: value.toString() });

    const openInfoUrl = () => {
        const url = t('widget.furni.info.url');

        if (url.indexOf('http') === 0) window.open(url, 'habboMain', 'noopener');
    };

    return (
        <Frame
            variant="0"
            id="creditExchangeTitle"
            caption={t('catalog.redeem.dialog.title')}
            tintColor="#418db0"
            dropShadow={false}
            onClose={onClose}
            defaultPosition={{ x: 100, y: 100 }}
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 315, height: 165 }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Button
                    variant="0"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 12, top: 100, height: 22, minWidth: 80 }}
                >
                    {t('generic.cancel')}
                </Button>
                <Region layout={{ position: 'absolute', left: 190, top: 100, width: 100, height: 22, flexDirection: 'row', justifyContent: 'center' }}>
                    <ButtonThick
                        variant="0"
                        onPointerTap={onExchange}
                        layout={{ height: 22, minWidth: 100, flexShrink: 0 }}
                    >
                        {t('catalog.redeem.dialog.button.exchange')}
                    </ButtonThick>
                </Region>
                <ThemeText
                    text={isNftCredit ? `${description} ${t('nft.creditfurni.redeem.prompt')}` : description}
                    textOptions={{ fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: 261 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 20, top: 17, width: 265, height: 26 }}
                />
                {!isNftCredit && (
                    <Region
                        cursor="pointer"
                        onPointerTap={openInfoUrl}
                        layout={{ position: 'absolute', left: 20, top: 60, width: 158, height: 17 }}
                    >
                        <Region
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, top: 0, height: 13, flexDirection: 'row', alignItems: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('catelog.redeem.dialog.readmore.description')}
                                flashFormat={{ underline: true }}
                            />
                        </Region>
                    </Region>
                )}
            </Border>
        </Frame>
    );
};
