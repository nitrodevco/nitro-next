import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `991_viprequired_xml` (layout "viprequired", 310x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ViprequiredLayoutProps {
    layout?: BoxLayout;
    onBuyVip?: () => void;
    onClose?: () => void;
    onVipBenefits?: () => void;
}

export const ViprequiredLayout = ({ layout, onBuyVip, onClose, onVipBenefits }: ViprequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="frame"
            name="frame"
            params={163841}
            caption={t('viprequired.header')}
            onClose={onClose}
            layout={{ width: 310, height: 149, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="illustration"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 10, width: 1, top: 0, height: 1 }}
                />
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 290, top: 0, height: 109, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="list_top"
                        params={147472}
                        layout={{ width: 290, height: 43, flexShrink: 0, flexDirection: 'column' }}
                    >
                        <Region
                            name="title"
                            params={16}
                            layout={{ width: 114, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('viprequired.title')}
                                textStyle="text-style-il-heading-1"
                                textOptions={{ fill: '#c30000' }}
                            />
                        </Region>
                        <Region
                            name="bodytext"
                            params={16}
                            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('viprequired.bodytext')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="list_bottom"
                        params={147472}
                        layout={{ width: 290, height: 63, flexShrink: 0, flexDirection: 'column', gap: 1 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('illumina_horizontal_separator.png')}
                            layout={{ width: 291, height: 3, flexShrink: 0 }}
                        />
                        <ThemeImage
                            name="spacer"
                            params={16}
                            src={undefined}
                            layout={{ width: 291, height: 4, flexShrink: 0 }}
                        />
                        <ButtonThick
                            variant="5"
                            name="buy_vip"
                            params={131281}
                            tintColor="#00aa00"
                            onPointerTap={onBuyVip}
                            layout={{ width: 133, height: 32, flexShrink: 0 }}
                        >
                            {t('viprequired.buy.vip')}
                        </ButtonThick>
                        <Region
                            name="vip_benefits"
                            params={193}
                            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            onPointerTap={onVipBenefits}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={t('viprequired.vip.benefits')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
