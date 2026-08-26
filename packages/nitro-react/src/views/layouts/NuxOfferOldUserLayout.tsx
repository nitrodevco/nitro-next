import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1224_nux_offer_old_user_xml` (layout "nux_offer_old_user", 456x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxOfferOldUserLayoutProps {
    layout?: BoxLayout;
    onBtnGo?: () => void;
    onBtnSkip?: () => void;
    onClose?: () => void;
}

export const NuxOfferOldUserLayout = ({ layout, onBtnGo, onBtnSkip, onClose }: NuxOfferOldUserLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32801}
            caption={t('notification.notification.nux.popup.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 456, height: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2176}
                    backgroundColor="#3d6373"
                    layout={{ position: 'absolute', left: 0, width: 454, top: 23, height: 60 }}
                >
                    <Region
                        params={2176}
                        backgroundColor="#0f4052"
                        layout={{ position: 'absolute', left: 2, width: 450, top: 2, height: 56 }}
                    >
                        <Region
                            params={273}
                            layout={{ position: 'absolute', left: 75, width: 360, top: 11, height: 28, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('nux.offer.old.user.title')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 360 }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="club_icon"
                        tags={[ 'ICON' ]}
                        src="${image.library.url}nux/nux_cropped_frank.png"
                        layout={{ position: 'absolute', left: 12, width: 56, top: 5, height: 54 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 4, width: 446, top: 89, height: 118 }}>
                    <Region
                        name="txtBody"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 434, top: 3, height: 16, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('nux.offer.old.user.summary')}
                            textStyle="text-style-u-tool-tip"
                            textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 434 }}
                        />
                    </Region>
                    <Region
                        name="user_input_buttons"
                        params={1458320}
                        layout={{ position: 'absolute', left: 138, width: 298, top: 82, height: 30 }}
                    >
                        <Region
                            name="btnSkip"
                            params={1048577}
                            layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 30, maxWidth: 158, minHeight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onBtnSkip}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={t('nux.offer.old.user.button.skip')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <ButtonThick
                            variant="6"
                            name="btnGo"
                            params={131073}
                            tintColor="#1da100"
                            onPointerTap={onBtnGo}
                            layout={{ position: 'absolute', left: 168, width: 130, top: 0, height: 30, minWidth: 130, maxWidth: 130 }}
                        >
                            {t('nux.offer.old.user.button.verify')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
