import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1597_layout_frontpage_xml` (layout "ctlg_frontpage4", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpage_1597LayoutProps {
    captionCtlgTxt1?: string;
    captionCtlgTxt2?: string;
    layout?: BoxLayout;
    onRedeem?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutFrontpage_1597Layout = ({ captionCtlgTxt1, captionCtlgTxt2, layout, onRedeem, srcCtlgTeaserimg1 }: LayoutFrontpage_1597LayoutProps) => {
    const t = useTranslation();
    const [ voucherCodeValue, setVoucherCodeValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_frontpage4"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/frontpage_teaser.gif'}
                    layout={{ position: 'absolute', left: 246, width: 103, top: 4, height: 374 }}
                />
                <Region
                    name="ctlg_txt1"
                    params={1}
                    layout={{ position: 'absolute', left: 15, width: 225, top: 10, height: 380, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgTxt1 ?? t('loremipsum.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 225 }}
                    />
                </Region>
                <Border
                    variant="2"
                    name="bgBorder"
                    params={1040}
                    tintColor="#51bbee"
                    layout={{ position: 'absolute', left: 8, width: 345, bottom: 2, height: 61 }}
                >
                    <Region
                        name="ctlg_txt2"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 272, top: 6, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgTxt2 ?? t('lorem.title')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                        />
                    </Region>
                    <Region
                        name="redeemItemCodeWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 345, top: 20, height: 34 }}
                    >
                        <Border
                            variant="0"
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 216, top: 5, height: 25 }}
                        >
                            <TextInput
                                value={voucherCodeValue}
                                onChange={setVoucherCodeValue}
                                multiline
                                layout={{ position: 'absolute', left: 4, width: 206, top: 4, height: 15 }}
                            />
                        </Border>
                        <Button
                            variant="3"
                            name="redeem"
                            params={393361}
                            onPointerTap={onRedeem}
                            layout={{ position: 'absolute', left: 274, right: 9, top: 5, height: 22, maxWidth: 100 }}
                        >
                            {t('redeem')}
                        </Button>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
