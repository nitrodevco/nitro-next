import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1522_opened_to_web_popup_xml` (layout "opened_to_web_popup", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OpenedToWebPopupLayoutProps {
    layout?: BoxLayout;
    openedToWebMain?: OpenedToWebPopupLayoutOpenedToWebMainProps;
}

export const OpenedToWebPopupLayout = ({ layout, openedToWebMain }: OpenedToWebPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <OpenedToWebPopupLayoutOpenedToWebMain {...openedToWebMain} />
        </Region>
    );
};

/** Named region `cont` of OpenedToWebPopupLayout - configured through the parent's `cont` prop. */
export interface OpenedToWebPopupLayoutContProps {
    layout?: BoxLayout;
}

export const OpenedToWebPopupLayoutCont = ({ layout }: OpenedToWebPopupLayoutContProps) => {
    return (
        <Region
            name="cont"
            params={16}
            backgroundColor="#ffcc66"
            layout={{ position: 'absolute', left: 2, width: 185, top: 2, height: 41, ...layout }}
        />
    );
};

/** Named region `opened_to_web_main` of OpenedToWebPopupLayout - configured through the parent's `openedToWebMain` prop. */
export interface OpenedToWebPopupLayoutOpenedToWebMainProps {
    captionInfoText?: string;
    cont?: OpenedToWebPopupLayoutContProps;
    layout?: BoxLayout;
    srcOpenedToWeb?: string;
}

export const OpenedToWebPopupLayoutOpenedToWebMain = ({ captionInfoText, cont, layout, srcOpenedToWeb }: OpenedToWebPopupLayoutOpenedToWebMainProps) => {
    const t = useTranslation();

    return (
        <Region
            name="opened_to_web_main"
            backgroundColor="#cc6600"
            layout={{ position: 'absolute', left: 0, width: 189, top: 0, height: 45, ...layout }}
        >
            <OpenedToWebPopupLayoutCont {...cont} />
            <Region
                name="info_text"
                params={1}
                layout={{ position: 'absolute', left: 50, width: 100, top: 10, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfoText ?? t('friendlist.weblinkinfo')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 100 }}
                />
            </Region>
            <ThemeImage
                name="opened_to_web"
                params={17}
                src={srcOpenedToWeb}
                layout={{ position: 'absolute', left: 5, width: 43, top: 6, height: 34 }}
            />
        </Region>
    );
};
