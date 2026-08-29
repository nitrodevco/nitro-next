import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1230_nux_noob_room_offer_xml` (layout "nux_noob_room_offer", 382x222) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxNoobRoomOfferLayoutProps {
    captionTxtBody?: string;
    layout?: BoxLayout;
    onBtnGo?: () => void;
    onClose?: () => void;
}

export const NuxNoobRoomOfferLayout = ({ captionTxtBody, layout, onBtnGo, onClose }: NuxNoobRoomOfferLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('notification.notification.nux.popup.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 222, ...layout }}
        >
            <ThemeImage
                src="${image.library.url}nux/NUXroom_prompt.png"
                layout={{ position: 'absolute', left: 0, width: 380, top: 23, height: 95 }}
            />
            <Region layout={{ position: 'absolute', left: 15, width: 364, top: 129, height: 81 }}>
                <Region
                    name="txtBody"
                    layout={{ position: 'absolute', left: 0, width: 366, top: 0, height: 13, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTxtBody ?? t('nux.offer.noob.lobby.summary')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 366 }}
                    />
                </Region>
                <ButtonThick
                    variant="6"
                    name="btnGo"
                    tintColor="#1da100"
                    onPointerTap={onBtnGo}
                    layout={{ position: 'absolute', left: 178, width: 184, top: 45, height: 30, minWidth: 180 }}
                >
                    {t('nux.offer.noob.lobby.button')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
