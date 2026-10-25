import { useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { openHabboMainPage } from '#base/utils';

/**
 * The redeem prompt for a credit furni - `CreditFurniWidget.showInterface`, which builds the
 * `habbo-room-ui-com/credit_redeem` layout in a window it creates at (100, 100): `exchange_text`
 * says what the item is worth (`nft.creditfurni.redeem.description` and the
 * `nft.creditfurni.redeem.prompt` sentence for an NFT credit), `exchange` turns it into credits
 * (`sendRedeemMessage`), and `cancel` and the header close only close (`onMouseEvent`,
 * `onWindowClose`). Exchanging destroys the furni, so the Flash client asked first rather than
 * redeeming on use, and so does this.
 *
 * The `link` region (`read_more`) is hidden for an NFT credit and otherwise opens
 * `widget.furni.info.url` when that is a web address.
 */
export interface FurnitureCreditViewProps {
    /** Credits the bag, bar or coin is worth. */
    value: number;
    /** An NFT credit furni: Flash words the prompt differently and appends a second sentence. */
    isNftCredit: boolean;
    onExchange: () => void;
    onClose: () => void;
}

/** `CreditFurniWidget.showInterface`: the window is created at (100, 100). */
const WINDOW_POSITION = { x: 100, y: 100 };

export const FurnitureCreditView = ({ value, isNftCredit, onExchange, onClose }: FurnitureCreditViewProps) => {
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'creditExchangeTitle', defaultPosition: WINDOW_POSITION, rememberPosition: false, onClose });
    const description = t(isNftCredit ? 'nft.creditfurni.redeem.description' : 'widgets.furniture.credit.redeem.value', '', { value: value.toString() });

    const openInfoUrl = () => {
        const url = t('widget.furni.info.url');

        if (url.indexOf('http') === 0) openHabboMainPage(url);
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/credit_redeem"
            frame={frame}
            bindings={{
                exchange_text: { caption: isNftCredit ? `${description} ${t('nft.creditfurni.redeem.prompt')}` : description },
                cancel: { onPointerTap: onClose },
                exchange: { onPointerTap: onExchange },
                link: { visible: !isNftCredit, onPointerTap: openInfoUrl },
            }}
        />
    );
};
