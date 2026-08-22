import { useNavigatorActions, useNavigatorSelectors, useTranslation } from '#base/context';
import { createLinkEvent } from '#base/hooks';
import { Button, Frame } from '#base/theme';

/**
 * nav_simple_alert — frame style 3, 193x157, margins 6/25/6/7, holding
 * body_text (12,14) 160x78 with word_wrap and an ok button (62,97) 60x22 style 3.
 * SimpleAlertView.setupAlertWindow fills body_text and closes on ok.
 */
export const NavigatorSimpleAlertView = () => {
    const { alert } = useNavigatorSelectors();
    const { hideAlert } = useNavigatorActions();
    const t = useTranslation();

    if (!alert) return null;

    /*
     * ClubPromoAlertView — nav_promo_alert (224x182): body_text (7,12) 186x57, the
     * clickable promo_container (7,72) 199x43 opening the club center, ok (76,122)
     */
    if (alert.promo !== undefined) {
        return (
            <Frame
                caption={alert.title}
                className="inset-0 m-auto w-56 h-45.5"
                id="navigator-alert"
                resizeDirection="none"
                variant="3"
                onClose={hideAlert}>
                <div className="relative size-full">
                    <span className="absolute top-3 left-1.75 block w-46.5 h-14.25 text-style-regular break-words">{alert.message}</span>
                    <div
                        className="absolute top-18 left-1.75 w-49.75 h-10.75 flex items-center bg-[#EAECE8] border border-black cursor-pointer"
                        onClick={() => { createLinkEvent('catalog/club_buy'); hideAlert(); }}>
                        <span className="pl-11.5 pr-2 text-style-regular break-words">{alert.promo}</span>
                    </div>
                    <Button className="absolute top-30.5 left-19 w-15 h-6" variant="3" onClick={hideAlert}>
                        {t('generic.ok')}
                    </Button>
                </div>
            </Frame>
        );
    }

    return (
        <Frame
            caption={alert.title}
            /* alerts open centred on the desktop */
            className="inset-0 m-auto w-48.25 h-39.25"
            id="navigator-alert"
            resizeDirection="none"
            variant="3"
            onClose={hideAlert}>
            <div className="relative size-full">
                <span className="absolute top-3.5 left-3 block w-40 h-19.5 text-style-regular break-words">{alert.message}</span>
                <Button className="absolute top-24.25 left-15.5 w-15 h-5.5" variant="3" onClick={hideAlert}>
                    {t('generic.ok')}
                </Button>
            </div>
        </Frame>
    );
}
