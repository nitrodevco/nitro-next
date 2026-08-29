import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1522_opened_to_web_popup_xml` (layout "opened_to_web_popup", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OpenedToWebPopupLayoutProps {
    captionInfoText?: string;
    cont?: ReactNode;
    layout?: BoxLayout;
    srcOpenedToWeb?: string;
    tintOpenedToWeb?: string;
}

export const OpenedToWebPopupLayout = ({ captionInfoText, cont, layout, srcOpenedToWeb, tintOpenedToWeb }: OpenedToWebPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="opened_to_web_main"
                backgroundColor="#cc6600"
                layout={{ position: 'absolute', left: 0, width: 189, top: 0, height: 45 }}
            >
                <Region
                    name="cont"
                    backgroundColor="#ffcc66"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                >
                    {cont}
                </Region>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 50, width: 100, top: 10, bottom: 5, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('friendlist.weblinkinfo')}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 100 }}
                    />
                </Region>
                <ThemeImage
                    name="opened_to_web"
                    src={srcOpenedToWeb}
                    tint={tintOpenedToWeb}
                    layout={{ position: 'absolute', left: 5, width: 43, top: 6, height: 34 }}
                />
            </Region>
        </Region>
    );
};
