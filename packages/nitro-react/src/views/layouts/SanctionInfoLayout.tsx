import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2916_sanction_info_xml` (layout "sanction_info", 450x359) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SanctionInfoLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onFaqLink?: () => void;
    onOkButton?: () => void;
}

export const SanctionInfoLayout = ({ layout, onClose, onFaqLink, onOkButton }: SanctionInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={35073}
            caption={t('help.sanction.info.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 450, height: 359, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 10, width: 426, top: 10, height: 254 }}
                >
                    <Region
                        name="main_contents_list"
                        params={16}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            name="sanction_info"
                            params={8536080}
                            layout={{ width: 404, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="sanction info"
                                textOptions={{ wordWrap: true, wordWrapWidth: 404 }}
                            />
                        </Region>
                        <Border
                            variant="3"
                            name="divider"
                            params={16}
                            tintColor="#000000"
                            layout={{ width: 404, height: 1, flexShrink: 0 }}
                        />
                    </Region>
                </ScrollArea>
                <Region
                    name="bottom"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 426, top: 270, height: 40 }}
                >
                    <Region
                        name="sanction_info_disclaimer"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.sanction.info.disclaimer')}
                            textOptions={{ fill: '#696969' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 420, top: 19, height: 30, flexDirection: 'row' }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_link_icon.png')}
                            layout={{ width: 22, height: 19, flexShrink: 0 }}
                        />
                        <Region
                            name="faq_link"
                            params={147457}
                            layout={{ width: 389, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onFaqLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={t('help.main.faq.link.text')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="ok_button"
                        params={393297}
                        tintColor="#009900"
                        onPointerTap={onOkButton}
                        layout={{ position: 'absolute', left: 327, width: 99, top: 0, height: 40, minWidth: 99 }}
                    >
                        {t('generic.got.it')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
